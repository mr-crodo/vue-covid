<template>
  <main class="grey lighten-5 pa-2">
    <section>
      <h1 class="display-1">World summary stats</h1>
      <v-row align="center" justify="center">
        <stat-card
            v-for="card in cards"
            :key="card"
            :cardTitle="card.title"
            :bgColor="card.bgColor"
            :cardAmount="card.amount"
            :cardAmountNew="card.amountNew"
            :cardIcon="card.icon"
        />
      </v-row>
    </section>

    <section>
      <h2 class="display-1">Visuals</h2>
      <v-row align="center" justify="center">
        <line-chart
            class="ma-1"
            v-for="visual in visuals"
            :key="visual.id"
            :chart-data="visual.chartData"
            :options="visual.option"
        ></line-chart>
      </v-row>
    </section>
  </main>
</template>

<script>
import StatCard from "./StatCard"
import LineChart from './LineChart'

export default {
  name: 'Total',
  components: { StatCard, LineChart },
  data() {
    return {
      cards: [
        { title: 'total case', bgColor: 'primary lighten-2', amount: 0, amountNew: 0, icon: 'mdi-alert-box'},
        { title: 'deaths', bgColor: 'red accent-2', amount: 0, amountNew: 0, icon: 'mdi-emoticon-dead'},
        { title: 'recoveries', bgColor: 'teal lighten-1', amount: 0, amountNew: 0, icon: 'mdi-hospital-box'},
      ],
      visuals: [],
      continents: null,
      allData: null,
      countryInfo: false
    }
  },
  mounted() {
    console.log('mounted now')
    if (this.countryInfo !== true) {
      this.axios
          .get('https://corona.lmao.ninja/v2/continents?sort')
          .then(response => { this.continents = response; this.updateStats() })
          .catch(error => { console.error('An API error: ', error) })
      this.axios
          .get('https://corona.lmao.ninja/v2/historical/all')
          .then(response => { this.allData = response; this.updateVisuals() })
          .catch(error => { console.error('An API error: ', error) })
    }
  },
  methods: {
    updateStats () {
      let data = this.continents.data
      let cases = 0
      let deaths = 0
      let recoveries = 0
      for (let elem of data) {
        cases += elem.cases
        deaths += elem.deaths
        recoveries += elem.recovered
      }
      this.cards[0].amount += cases
      this.cards[1].amount += deaths
      this.cards[2].amount += recoveries
    },
    updateVisuals () {
      let data = this.allData.data
      let cases = data.cases
      let deaths = data.deaths
      let recoveries = data.recovered
      let labels = []
      let casesPerDay = []
      let deathsPerDay = []
      let recoveriesPerDay = []
      for (let key in cases) {
        labels.push(key)
        casesPerDay.push(cases[key])
        deathsPerDay.push(deaths[key])
        recoveriesPerDay.push(recoveries[key])
      }
      this.visuals.push({
        id: 1,
        chartData: {
          labels: labels,
          datasets: [{
            label: 'Total cases',
            backgroundColor: '#6aaaff',
            data: casesPerDay
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      this.visuals.push({
        id: 2,
        chartData: {
          labels: labels,
          datasets: [{
            label: 'Deaths',
            backgroundColor: '#ff5252',
            data: deathsPerDay
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      this.visuals.push({
        id: 3,
        chartData: {
          labels: labels,
          datasets: [{
            label: 'recoveries',
            backgroundColor: '#26a69a',
            data: recoveriesPerDay
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      let lastDayCases = casesPerDay[casesPerDay.length - 1] - casesPerDay[casesPerDay.length - 2]
      let lastDayDeaths = deathsPerDay[deathsPerDay.length - 1] - deathsPerDay[deathsPerDay.length - 2]
      let lastDayRecoveries = recoveriesPerDay[recoveriesPerDay.length - 1] - recoveriesPerDay[recoveriesPerDay.length - 2]
      this.cards[0].amountNew += lastDayCases
      this.cards[1].amountNew += lastDayDeaths
      this.cards[2].amountNew += lastDayRecoveries
    },
    updateCountryStats () {
      this.countryInfo = true
      let data = this.$store.getters.country
      this.cards[0].amount = data.cases
      this.cards[1].amount = data.deaths
      this.cards[2].amount = data.recoveries
      this.visuals = []
      this.visuals.push({
        id: 1,
        chartData: {
          labels: data.visualLabels,
          datasets: [{
            label: 'Total cases',
            backgroundColor: '#6aaaff',
            data: data.visualData.cases
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      this.visuals.push({
        id: 2,
        chartData: {
          labels: data.visualLabels,
          datasets: [{
            label: 'Deaths',
            backgroundColor: '#ff5252',
            data: data.visualData.deatha
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
      this.visuals.push({
        id: 3,
        chartData: {
          labels: data.visualLabels,
          datasets: [{
            label: 'recoveries',
            backgroundColor: '#26a69a',
            data: data.visualData.recoveries
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      })
    }
  },
  watch: {
    currentCountry () {
      return this.$store.getters.currentCountry
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.small {
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin:  auto;
}
</style>
