<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>
    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"

        >
        <label for="description">{{ 'Name' | localize}}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >{{ 'Message_EnterName' | localize}}</small>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isUkLocale">
          <span class="lever"></span>
          Українська
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' |localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
export default {
  metaInfo () {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  data: () => ({
    name: '',
    isUkLocale: true
  }),
  validations: {
    name: { required }
  },
  mounted () {
    this.name = this.info.name
    this.isUkLocale = this.info.locale === 'uk-Ua'
    setTimeout(() => {
      window.M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isUkLocale ? 'uk-Ua' : 'en-Us'
        })
      } catch (e) {}
    }
  }
}
</script>
<style scoped>
  .switch{
    margin: 0 0 2rem 0;
  }
</style>
