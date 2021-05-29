<script>
import { Bar } from "vue-chartjs";
import displayshit from "../../service/Hello";
import labels from "chartjs-plugin-labels";
import plugins from "chart.js";
export default {
  extends: Bar,
  data() {
    return {
      chartData: {
        labels: [
          "2015-01",
          "2015-02",
          "2015-03",
          "2015-04",
          "2015-05",
          "2015-06",
          "2015-07",
          "2015-08",
          "2015-09",
          "2015-10",
          "2015-11",
          "2015-12",
        ],
        datasets: [
          {
            label: "Bar Chart",
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            pointBorderColor: "#2554FF",
            data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        // plugins:{},
        //  }
      },
    };
  },

  async mounted() {
    // var data = [];
    //  var new_data = [];
    //  var Type = ['Mobile','Card','Both']
    //  var sum = 0 ;
    var data = (await displayshit.displayanothershit6()).data.message;
    //   var  Mobile_number = data.find(element=> JSON.stringify(element._id) == JSON.stringify([Type[0]]))  || 0
    //   var  Card_number = data.find(element=> JSON.stringify(element._id) == JSON.stringify([Type[1]])) || 0
    //   var  Both_number = data.find(element=> element._id.length == 2) || 0
    //     new_data.push(Mobile_number.count || 0)
    //     new_data.push(Card_number.count || 0)
    //     new_data.push(Both_number.count || 0)
    //console.log(data);

    this.chartData.labels = data.date;
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
  // }
  //import { Bar } from "vue-chartjs";
  // // //import labels from 'chartjs-plugin-labels'

  // export default {
  //   extends: Bar,
  //   mounted() {
  //     this.renderChart(
  //       {
  //         labels: [
  //           "January",
  //           "February",
  //           "March",
  //           "April",
  //           "May",
  //           "June",
  //           "July",
  //           "August",
  //           "September",
  //           "October",
  //           "November",
  //           "December"
  //         ],
  //         datasets: [
  //           {
  //             label: "Data One",
  //             backgroundColor: "#f87979",
  //             data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
  //           }
  //         ],
  //         },
  // //         { options: {
  // //         plugins: {

  // // //   labels: {
  // // //     render: 'label',
  // // // //     arc: true,
  // // // //     position: 'border'
  // // //   }

  // // }
  //         //    }
  //       //  },

  //       { responsive: true, maintainAspectRatio: false,
  //      plugins: {
  //           labels: {
  //             render: "value",
  //             // },
  //           },
  //         }, }
  //     );
  //   }
};
</script>
