<script>
  import { Bubble } from 'vue-chartjs'
import display_chart from "../../service/Hello";
import labels from "chartjs-plugin-labels";
import plugins from "chart.js";
  export default {
    extends: Bubble,
    data() {
      return {
        chartData: {
          datasets: [{
            label: 'Population Data',
            borderWidth: 1,
            borderColor: '#2554FF',
            backgroundColor: '#2554FF',
            data: []
            // {
            //     x: 6,
            //     y: 3,
            //     r: 15
            //   }, {
            //     x: 3,
            //     y: 12,
            //     r: 4
            //   },
            //   {
            //     x: 5,
            //     y: 15,
            //     r: 10
            //   },
            //   {
            //     x: 3,
            //     y: 12,
            //     r: 8
            //   },
            //   {
            //     x: 4,
            //     y: 5,
            //     r: 20
            //   },
            //   {
            //     x: 2,
            //     y: 6,
            //     r: 3
            //   },
            //   {
            //     x: 4,
            //     y: 9,
            //     r: 11
            //   },
            //   {
            //     x: 5,
            //     y: 10,
            //     r: 6
            //   }
            // ]
          }]
        },
        options: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    async mounted() {
       var data = (
      await display_chart.customer_analysis({
        type: "customer_registration_By_Month",
        output: { type: "month" },
      })
    ).data.message;

    this.chartData.labels = data.result;
    this.chartData.datasets[0].data = data.count;
    this.chartData.datasets[0].backgroundColor = data.backgroundColor;
    this.chartData.datasets[0].borderColor = data.borderColor;
    this.options.plugins = {
      labels: {
        render: "value",
        // },
      },
    };
      this.renderChart(this.chartData, this.options)
    }
  }
</script>