<template>
  <v-content class="grey lighten-3 ma-4">
    <!-- <v-toolbar flat color="blue-grey lighten-5">
        <v-toolbar-title>DashBoard </v-toolbar-title>
      </v-toolbar> -->
    <div id="printSection" ref="document">
      {{ "hello" }}
      area<AreaChart /> pie<PieChart /> bar<BarChart /> radar
      <RadarChart /> line <LineChart />, dought <DoughnutChart /> polararea
      <PolarAreaChart /> buble <BubbleChart /> scater
      <ScatterdChart /> anatherpie <AnotherPieChart /> a area
      <AnotherAreaChart /> a bar <AnotherBarChart /> a pie2
      <AnotherPieChart2 /> a doughter <AnotherDoughnutChart /> a line
      <AnotherLineChart /> a polar <AnotherPolarAreaChart />
    </div>

    <button @click="printSection">Print Shit</button>
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
