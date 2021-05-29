<template>
  <div>
  <div id="printSection" ref="document">
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
  </div>
   
        <button @click="printSection">Print Shit</button>
    </div>
</template>

<script>
import AreaChart from "./SuperAdmin/AreaChart";
import PieChart from "./SuperAdmin/PieChart";
import BarChart from "./SuperAdmin/BarChart";
import RadarChart from "./SuperAdmin/RadarChart";
import LineChart from "./SuperAdmin/LineChart";
import DoughnutChart from "./SuperAdmin/DoughnutChart";
import PolarAreaChart from "./SuperAdmin/PolarAreaChart";
import BubbleChart from "./SuperAdmin/BubbleChart";
import ScatterdChart from "./SuperAdmin/ScatteredChart";
import AnotherPieChart from "./SuperAdmin/AnotherPieChart";
import AnotherAreaChart from "./SuperAdmin/AnotherAreaChart";
import AnotherBarChart from "./SuperAdmin/AnotherBarChart";
import AnotherPieChart2 from "./SuperAdmin/AnotherPieChart2";
import AnotherDoughnutChart from "./SuperAdmin/AnotherDoughnutChart";
import AnotherLineChart from "./SuperAdmin/AnotherLineChart";
import AnotherPolarAreaChart from "./SuperAdmin/AnotherPolarAreaChart";
import { Printd } from "printd";
import html2pdf from 'html2pdf.js';
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
      },
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
  `
    this.d = new Printd()
  //  this.fetchPrintStuff();
  },
  methods: {
   // ...mapActions("myModule", ["fetchPrintStuff"]),
    printShit () {
      this.d.print( this.$el, this.cssText)
    },
    exportToPDF () {
        html2pdf()
				html2pdf(this.$refs.document, {
					margin: 1,
					filename: 'document.pdf',
					image: { type: 'jpeg', quality: 0.98 },
					html2canvas: { dpi: 192, letterRendering: true },
					jsPDF: { unit: 'in',  orientation: 'landscape' }
        })
       //  console.log('llllllllll')
      
      },
      printSection() {
        this.$htmlToPaper("printSection");
      }
  }
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
</style>
