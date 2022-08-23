<template>
  <div style="position: relative;">
    <div :id="id" :style="{width: width, height: height}"></div>
    <loadding :loadding="loadding"></loadding>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    id: {
      type: String,
      default: 'myChart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Object,
      default: () => { }
    },
    loadding: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.drawEcharts(this.id, this.data)
      },
      deep: true
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  methods: {
    drawEcharts(id, data) {
      let that = this
      if (
        this.myChart !== null &&
        this.myChart !== '' &&
        this.myChart !== undefined
      ) {
        this.myChart.dispose()
      }
      let echartId = document.getElementById(id)
      this.myChart = echarts.init(echartId)
      this.myChart.setOption(data)
      window.addEventListener('resize', function () {
        that.myChart.resize()
      })
    }
  },
  mounted() {
    this.drawEcharts(this.id, this.data)
  },
  created() { },
  beforeDestroy() {
    // this.myChart.clear()
    // this.myChart.dispose()
  }
}
</script>

<style scoped>
</style>
