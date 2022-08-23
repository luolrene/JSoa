<template>
  <div v-if="loadding" style="position:absolute;top: 0;width: 98%;display: flex;margin-left: 1%;z-index: 3;
      align-items: center;justify-content: center;height: 100%;background: rgba(210, 216, 222, 0.5);">
    <h6 style="color:#2d8cf0;display: flex;align-items: center;"><span>正在加载图表数据</span><i class="el-icon-loading" style="font-size: 20px;margin-left:2px;"></i></h6>
  </div>
</template>

<script>
export default {
  name: 'loadding',
  props: {
    loadding: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  created() { }
}
</script>

<style scoped lang="scss">
</style>
