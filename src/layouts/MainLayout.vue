<template>
  <div>
    <loader v-if="loading" />
    <div v-else class="app-main-layout">
      <NavBar @click="isOpen = !isOpen" />
      <SideBar v-model="isOpen" />
      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <div class="fixed-action-btn" v-tooltipe="'Создать новою запись'">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/app/NavBar'
import SideBar from '@/components/app/SideBar'
import messages from '@/utilits/messages'
export default {
  name: 'main-layout',
  data () {
    return {
      isOpen: true,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    NavBar,
    SideBar
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>
