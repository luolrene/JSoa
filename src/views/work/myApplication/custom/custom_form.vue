<!-- 自定义表单 -->
<template>
  <div class="operate-container">
    <el-form :size="eleList.config.size" :label-position="eleList.config.labelPosition" :label-width="eleList.config.labelWidth + 'px'" disabled>
      <div style="width:100%" v-for="(item, index) in eleList.list" :key="index" class="formitem-style">
        <el-form-item :label="item.name+':'" :required="item.options.required">
          <dialogformitems :eleItem="item" :eleConfig="eleList.config"></dialogformitems>
        </el-form-item>
      </div>
    </el-form>
    <div class="operate-button">
      <el-button class="cancel-btn" @click='$layer.close(layerid)'>取消</el-button>
      <el-button type="primary" @click='$layer.close(layerid)'>确定</el-button>
    </div>
  </div>
</template>

<script>
import dialogformitems from '../../../integrated/customForm/newForm/dialogFormItems'
export default {
  props: {
    layerid: '',
    params: Object
  },
  components: {
    dialogformitems
  },
  data() {
    return {
      eleList: null,
      rules: {}
    }
  },
  methods: {},
  mounted() { },
  created() {
    this.eleList = this.params
  }
}
</script>

<style scoped lang="scss">
</style>
