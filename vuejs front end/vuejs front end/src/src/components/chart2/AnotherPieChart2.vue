<script>
import { Pie } from "vue-chartjs";
import displayshit from "../../service/Hello";
//import {labels} from 'chartjs-plugin-datalabels';
//Chart.plugins.unregister(ChartDataLabels);
import labels from "chartjs-plugin-labels";
import { plugins } from "chart.js";
export default {
  extends: Pie,
  async mounted() {
    var data = [];
    var new_data = [];
    var Type = ["Mobile", "Card", "Both"];
    var sum = 0;
    data = (await displayshit.displayanothershit7()).data.message;
    // var Mobile_number =
    //   data.find(
    //     (element) => JSON.stringify(element._id) == JSON.stringify([Type[0]])
    //   ) || 0;
    // var Card_number =
    //   data.find(
    //     (element) => JSON.stringify(element._id) == JSON.stringify([Type[1]])
    //   ) || 0;
    // var Both_number = data.find((element) => element._id.length == 2) || 0;
    // new_data.push(Mobile_number.count || 0);
    // new_data.push(Card_number.count || 0);
    // new_data.push(Both_number.count || 0);
    //  console.log(new_data)
    //  data.forEach(element => {
    //       console.log(element)
    //      if(element['_id'].length == 2)
    //                sum += element.count;
    //   })
    //   new_data.push(sum);
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
        labels: data.date,
        datasets: [
          {
            backgroundColor: data.backgroundColor, //[this.gradient, this.gradient2, "#00D8FF"],
            data: data.count,
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
            render: "value",
            //     //     fontColor: '#000',
            //     //     position: 'outside'
            //     //      }
          },
        },
      }
    );
  },
};
</script>