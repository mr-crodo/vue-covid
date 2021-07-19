import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Vue.component('line-chart',{
    extends: Line,
    mixins: [reactiveProp],
    props: {
        options: Object
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
    },
})