<script>
import { Line } from "vue-chartjs";
import display_chart from "../../service/Hello";
import labels from "chartjs-plugin-labels";
import { plugins } from "chart.js";

export default {
  extends: Line,
  async mounted() {
    var data = (
      await display_chart.transaction_analysis({
        type: "transaction_per_transaction_amount",
        output: { type: "month" },
      })
    ).data.message;
    // console.log("pppppppp");
    //console.log(data);
    this.renderChart(
      {
        labels: data.result,
        datasets: [
          {
            label: "Transaction Amount Made in a month",
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