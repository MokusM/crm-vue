<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p
          v-for="(cur, index) in currencies"
          :key="index"
          class="currency-line"
        >
          <span>
            {{ getCurrency(cur) | currency(cur) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR', 'UAH']
  }),
  computed: {
    base () {
      return this.$store.getters.info.bill / (this.rates['UAH'] / this.rates['EUR'])
    }
  },
  methods: {
    getCurrency (currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
