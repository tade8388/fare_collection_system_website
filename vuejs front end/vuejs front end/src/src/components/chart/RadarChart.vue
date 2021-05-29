<script>
import { Radar } from "vue-chartjs";
import display_chart from "../../service/Hello";
import labels from "chartjs-plugin-labels";
import plugins from "chart.js";

export default {
  extends: Radar,
 async  mounted() {
    var data = (
      await display_chart.customer_analysis({
        type: "customer_By_Gender",
        output: { type: "other" },
      })
    ).data.message;
    this.renderChart(
      {
        // labels: [
        //   "Eating",
        //   "Drinking",
        //   "Sleeping",
        //   "Designing",
        //   "Coding",
        //   "Cycling",
        //   "Running"
        // ],
        labels: data.result,
        datasets: [
          {
            label: "Customer By gender",
            backgroundColor: "rgba(179,181,198,1)",
         //   borderColor: data.borderColor,
          //  pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: data.count
          },
          // {
          //   label: "My Second dataset",
          //   backgroundColor: "rgba(255,99,132,0.2)",
          //   borderColor: "rgba(255,99,132,1)",
          //   pointBackgroundColor: "rgba(255,99,132,1)",
          //   pointBorderColor: "#fff",
          //   pointHoverBackgroundColor: "#fff",
          //   pointHoverBorderColor: "rgba(255,99,132,1)",
          //   data: [28, 48, 40, 19, 96, 27, 100]
          // }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>