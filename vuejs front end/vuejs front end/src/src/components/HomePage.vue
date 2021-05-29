<template>
  <v-content class="grey lighten-3">
    <v-card elevation="0">
      <!-- <v-toolbar flat color="blue-grey lighten-5">
        <v-toolbar-title> User Profile </v-toolbar-title>
      </v-toolbar> -->
      <v-tabs fixed-tabs v-model="tab" flat>
        <v-tabs-slider color="primary"> </v-tabs-slider>

        <v-tab
          style="padding-inline: 60px"
          justify="space-around"
          v-for="(item, index) in itemese"
          :class="{ active: ct === index }"
          @click="ct = index"
          :key="item"
        >
          {{ item }}
        </v-tab>

        <v-tabs-items v-model="tab">
          <div v-if="ct === 0">
            <v-card class="ma-4" color="blue-grey lighten-5" elevation="0"
              ><h2>customer report</h2>
              <!-- <AreaChart /> -->
              <v-container>
                <v-row justify="space-around">
                  <v-col cols="12" xs="12" sm="12" md="6" l="6">
                    <v-card elevation="0" class="pr-2">
                      buble <v-responsive> <BubbleChart /></v-responsive>
                    </v-card>
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="5" l="6">
                    <v-card elevation="0"> pie <PieChart /> </v-card>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col cols="12" xs="12" sm="12" md="6" l="6">
                    another area
                    <v-card elevation="0"> <AnotherAreaChart /></v-card>
                  </v-col>
                  <v-col cols="12" xs="12" sm="4" md="4" l="4">
                    <v-card elevation="0" min-width="500" class="ma-4"></v-card>
                    doughter <v-card> <DoughnutChart /></v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </div>
          <div v-if="ct === 1">
            <v-card class="ma-4"
              ><h2>employee report{{ ct }}</h2>
              <v-container>
                <v-row justify="space-around">
                  <v-col cols="12" xs="12" sm="12" md="12" l="12">
                    <AnotherLineChart />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </div>

          <div v-if="ct === 2">
            <v-card flat>
              transaction
              <v-container>
                <v-row justify="space-around">
                  <v-col cols="12" xs="12" sm="6" md="6" l="6">
                    <AnotherBarChart />
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="6" l="6">
                    <AnotherPieChart2 />
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col cols="12" xs="12" sm="6" md="6" l="6">
                    <AnotherDoughnutChart />
                  </v-col>
                  <v-col cols="12" xs="12" sm="6" md="6" l="6">
                    <LineChart />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </div>

          <div v-if="ct === 3">
            <v-card flat>
              <h2>machine</h2>
              <v-container>
                <v-row justify="space-around">
                  <v-col cols="12" xs="12" sm="12" md="12" l="12">
                    <AnotherPolarAreaChart />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </div>
          <div v-if="ct === 4">
            <v-card flat>
              <h2>bus report</h2>
              <v-container>
                <v-row justify="space-around">
                  <v-col cols="12" xs="12" sm="12" md="12" l="12">
                    <PolarAreaChart />
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </div>

          <!-- <div v-show="ct === 4">
            <v-card>
              <h2>summary</h2> -->
          <!-- <div id="printSection" ref="document">
            {{ "hello" }}
            <AreaChart />
            <PieChart />
            <BarChart />
            <RadarChart />
            <LineChart />,
            <DoughnutChart />
            <PolarAreaChart />
            <BubbleChart />
            <ScatterdChart />
            <AnotherPieChart />
            <AnotherAreaChart />
            <AnotherBarChart />
            <AnotherPieChart2 />
            <AnotherDoughnutChart />
            <AnotherLineChart />
            <AnotherPolarAreaChart />
          </div> -->
          <!-- </v-card>
          </div> -->
        </v-tabs-items>
      </v-tabs>
    </v-card>
    <div>
      <!-- <div id="printSection" ref="document">
        {{ "hello" }}
        area<AreaChart /> pie<PieChart /> bar<BarChart /> radar
        <RadarChart /> line <LineChart />, dought <DoughnutChart /> polararea
        <PolarAreaChart /> buble <BubbleChart /> scater
        <ScatterdChart /> anatherpie <AnotherPieChart /> a area
        <AnotherAreaChart /> a bar <AnotherBarChart /> a pie2
        <AnotherPieChart2 /> a doughter <AnotherDoughnutChart /> a line
        <AnotherLineChart /> a polar <AnotherPolarAreaChart />
      </div> -->

      <button @click="printSection">Print Shit</button>
    </div>
  </v-content>
</template>

<script>
import AreaChart from "./chart/AreaChart";
import PieChart from "./chart/PieChart";
import BarChart from "./chart/BarChart";
import RadarChart from "./chart/RadarChart";
import LineChart from "./chart/LineChart";
import DoughnutChart from "./chart/DoughnutChart";
import PolarAreaChart from "./chart/PolarAreaChart";
import BubbleChart from "./chart/BubbleChart";
import ScatterdChart from "./chart/ScatteredChart";
import AnotherPieChart from "./chart/AnotherPieChart";
import AnotherAreaChart from "./chart/AnotherAreaChart";
import AnotherBarChart from "./chart/AnotherBarChart";
import AnotherPieChart2 from "./chart/AnotherPieChart2";
import AnotherDoughnutChart from "./chart/AnotherDoughnutChart";
import AnotherLineChart from "./chart/AnotherLineChart";
import AnotherPolarAreaChart from "./chart/AnotherPolarAreaChart";
//import { Printd } from "printd";
//import html2pdf from "html2pdf.js";
export default {
  name: "App",
  components: {
    AreaChart,
    PieChart,
    BarChart,
    RadarChart,
    LineChart,
    DoughnutChart,
    PolarAreaChart,
    BubbleChart,
    ScatterdChart,
    AnotherPieChart,
    AnotherAreaChart,
    AnotherBarChart,
    AnotherPieChart2,
    AnotherDoughnutChart,
    AnotherLineChart,
    AnotherPolarAreaChart,
  },
  data() {
    return {
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10,
        tab: null,
      },
      itemese: ["customer", "employee", "transaction", "machine", "bus"],
      ct: 0,
      tab: null,
    };
  },
  mounted() {
    var d = new Printd();
    var cssText = `
    .box {
      font-family: sans-serif;
      width: 500px;
      border: solid 1px #ccc;
      text-align: center;
      padding: 1em;
      margin: 2em auto;
    }
    button {
      background-color: #f0f0f0;
      border: solid 1px #ccc;
      padding: 5px 10px;
      font-size: 12px;
    }
    pre {
      color: #c7254e;
    }
  `;
    this.d = new Printd();
    //  this.fetchPrintStuff();
  },
  methods: {
    // ...mapActions("myModule", ["fetchPrintStuff"]),
    printShit() {
      this.d.print(this.$el, this.cssText);
    },
    exportToPDF() {
      html2pdf();
      html2pdf(this.$refs.document, {
        margin: 1,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", orientation: "landscape" },
      });
      //  console.log('llllllllll')
    },
    printSection() {
      this.$htmlToPaper("printSection");
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.v-tab {
  padding-right: 40px;
}
</style>
