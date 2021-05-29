<script>
import { Line } from "vue-chartjs";
import display_chart from "../../service/Hello";
import labels from "chartjs-plugin-labels";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null,
    };
  },
  async mounted() {
   var data2 = (
      await display_chart.transaction_analysis({
        type: "transaction_By_Exit_Station",
        output: {
          type: "other",
        },
      })
    ).data.message;
   
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

    this.renderChart(
      {
        labels: data2.result,
        datasets: [
          {
            label: 'Transaction Per Exit Station',
          //  borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: data2.backgroundColor,
            data: data2.count,
          },
          // {
          //   label: data2.result,
          //   borderColor: "#05CBE1",
          //   pointBackgroundColor: "white",
          //   pointBorderColor: "white",
          //   borderWidth: 1,
          //   backgroundColor: data.backgroundColor,
          //   data: data2.count,
          // },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>
