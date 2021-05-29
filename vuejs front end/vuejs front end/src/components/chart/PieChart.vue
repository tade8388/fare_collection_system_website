<script>
import { Pie } from "vue-chartjs";
import display_chart from "../../service/Hello";
//import {labels} from 'chartjs-plugin-datalabels';
//Chart.plugins.unregister(ChartDataLabels);
import labels from "chartjs-plugin-labels";
//import { plugins } from 'chart.js';
export default {
  extends: Pie,
  async mounted() {
    //var data = [];
    var new_data = [];
    var Type = ["Mobile", "Card", "Both"];
    var sum = 0;
    var data = (
      await display_chart.customer_analysis({
        type: "Customer_by_user_access_type",
        output: { type: "other" },
      })
    ).data.message;
    var Mobile_number = data.result.findIndex(
      (element) => element.length == 1 && element.includes("Mobile")
    );
    var Card_number = data.result.findIndex(
      (element) => element.length == 1 && element.includes("Card")
    );
    var Both_number = data.result.findIndex((element) => element.length == 2);
    new_data.push(data.count[Mobile_number] || 0);
    new_data.push(data.count[Card_number] || 0);
    new_data.push(data.count[Both_number] || 0);
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    // this.addPlugin(labels);
    this.renderChart(
      {
        labels: Type,
        datasets: [
          {
            backgroundColor: [this.gradient, this.gradient2, "#00D8FF"],
            data: new_data,
          },
        ],
        // plugins: [ChartDataLabels.],
        //  options:{
        //   plugins: [ChartDataLabels]

        //}
        //              ChartDataLabels: [
        //   {
        //     render: 'percentage',
        //     fontColor: ['green', 'white', 'red'],
        //     precision: 2,
        //   }
        // ],
        // }

        //  }
        //  },
      },
      // { options: {
      //      plugins: {
      //            // {
      // labels: {
      //   render: 'label',
      //   fontColor: '#000',
      //   position: 'outside'
      //         }},
      {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          //       datalabels: {
          //          display: true,
          //     align: 'bottom',
          //     backgroundColor: '#ccc',
          //     borderRadius: 3,
          //     font: {
          //       size: 18,
          //     }
          // }
          //     } }
          labels: {
            render: "label",
            //     fontColor: '#000',
            //     position: 'outside'
            //      }
          },
        },
      }
    );
  },
};
</script>