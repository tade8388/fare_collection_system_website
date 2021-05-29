<script>
import { Line } from "vue-chartjs";
import displayshit from "../../service/Hello";
import labels from "chartjs-plugin-labels";
import { plugins } from "chart.js";

export default {
  extends: Line,
  async mounted() {
    var data = (await displayshit.displayanothershit9()).data.message;
    // console.log("pppppppp");
    //console.log(data);
    this.renderChart(
      {
        labels: data.date,
        datasets: [
          {
            label: "Transaction Made in a month",
            data: data.count,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)",
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data",
        },
      }
    );
  },
};
</script>