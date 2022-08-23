<template>
  <div class="operate-container">
    <!-- <qrcode :value="'资产名称:' + params.name + '\r' + '资产类型:' + params.typeName + '\r'+'资产编号:' + params.assetNumber + '\r'+'标准型号:' + params.standardModel + '\r' + '来源:' + params.sourceName + '\r'+ '供应商:' + params.supplierName + '\r'+ '入库时间:' + params.warehousingTime + '\r'+ '金额:' + params.amountOfMoney + '\r'+ '状态:' + params.stateName + '\r'+ '部门:' + params.groupNameAll + '\r'+ '有无维保:' + params.maintenanceName + '\r'" :options="{ width: 150 }" style="margin-left: 100px" id="chart"></qrcode> -->
    <div class="title">
      <span>为了更好的使用效果，建议使用浏览器扫码</span>
    </div>
    <div class="btn">
      <el-button @click="download('#chart')">下载二维码</el-button>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      title: ''
    }
  },
  methods: {
    // download(selector) {
    //   // 通过 API 获取目标 canvas 元素
    //   const canvas = document.querySelector(selector)
    //   // 创建一个 a 标签，并设置 href 和 download 属性
    //   const el = document.createElement('a')
    //   // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
    //   el.href = canvas.toDataURL()
    //   el.download = this.title
    //   // 创建一个点击事件并对 a 标签进行触发
    //   const event = new MouseEvent('click')
    //   el.dispatchEvent(event)
    // }
  },
  mounted() {
    this.title = this.params.name
  },
  created() {
    let url = encodeURIComponent('http://192.168.2.23:9001/#/qrCode?' + 'id=' + this.params.id)
    window.open(process.env.BASE_API + process.env.JS_Server + '/qrCode/AssetsDetails/download?' + 'url=' + url)
  }
}
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 14px;
  color: red;
}
.btn {
  margin-top: 10px;
  text-align: center;
}
</style>
