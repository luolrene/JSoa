<template>
  <div class="operate-container">
    <div class="mb20" style="display: flex;align-items: center;">
      <div class="title">名称：</div>
      <div class="content">{{params.name}}</div>
    </div>
    <div class="mb20" style="display: flex;align-items: center;">
      <div class="title">描述：</div>
      <div class="content">{{params.oaDescribe}}</div>
    </div>
    <div class="modular" style="display: flex;align-items: center;">
      <div class="title">附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList" style="padding:0;" v-else></fileList>
      </div>
    </div>
  </div>
</template>
<script>
import fileList from '../../common/fileList.vue'
import { getKnowledgePointsGetFile } from '@/api/file.js'
export default {
  data() {
    return {
      loading: false,
      fileList: []
    }
  },
  props: {
    params: Object
  },
  components: {
    fileList
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
    getKnowledgePointsGetFile({ onlyCode: this.params.onlyCode }).then(res => {
      this.fileList = res.result
    })
  },
  created() { }
}
</script>

<style scoped>
</style>
