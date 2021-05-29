<script>
import { PolarArea } from "vue-chartjs";
import display_chart from "../../service/Hello";
import labels from "chartjs-plugin-labels";
import plugins from "chart.js";

export default {
  extends: PolarArea,
  data() {
    return {
      chartData: {
        labels: ["Pink", "Blue", "Yellow", "Green", "Purple"],
        datasets: [
          {
            label: "Polar Area Chart",
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            data: [8, 14, 12, 7, 20],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    var data = (
      await display_chart.bus_analysis({
        type: "Bus_By_Service_Provider",
        output: { type: "other" },
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
    this.renderChart(this.chartData, this.options);
  },
};
</script>