<template>
  <div>
    <loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history"  class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход'}}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            :class="record.type === 'income' ? 'green' : 'red'"
            class="card"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ record.data  | date('date')  }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">Запись с id=<strong>{{$route.params.id}}</strong> не найдена</p>
  </div>
</template>
<script>
export default {
  name: 'detail',
  metaInfo () {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title

    }

    this.loading = false
  }
}
</script>
