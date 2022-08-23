<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
      <el-form-item label='附件上传:' slot='upload' v-if="this.params.knowledgeId">
        <myUpload ref='myUpload' :fileList='fileList' :delType="file"></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getKnowledgePointsGetFile } from '@/api/file.js'
import { getKnowledgeModify, getKnowledgePointsModify } from '@/api/jcxxgl/knowledge.js'
import group from './groupData1.vue'
import fileList from '../../common/fileList.vue'
export default {
  props: {
    params: Object,
    file: String,
    layerid: ''
  },
  components: {
    fileList
  },
  data() {
    return {
      fileList: [],
      btnLoading: false,
      fromValiData: {},
      rules: {
        name: [{ required: true, message: '请填写行业名称', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '上级分组', prop: 'fatherName', value: '', type: 'input', disabled: true },
        { label: '部门', prop: 'groupId', value: '', type: 'inputChoice', click: 'getGroupData', hasInput: true, isRqd: true, isShow: true },
        { label: '名称', prop: 'name', value: '', type: 'input', isRqd: true },
        { label: '备注', prop: 'oaDescribe', value: '', type: 'textarea', isRqd: false }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.params.knowledgeId) {
        getKnowledgePointsModify(this.fromValiData)
          .then(res => {
            if (this.$refs.myUpload.uploadList.length > 0) {
              this.$refs.myUpload.upload(
                res.result.onlyCode,
                this,
                this.layerid
              )
            } else {
              this.$layer.close(this.layerid)
              this.$parent.getTreeData()
              this.$parent.getListData()
              this.$share.message()
              this.btnLoading = false
            }
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        getKnowledgeModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getTreeData()
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      }
    },
    getData(ids) {
      this.fromValiData.ids = ids.id.split(',')
    },
    getGroupData() {
      this.$layer.iframe({
        content: {
          content: group, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            ids: this.fromValiData.ids
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择部门',
        maxmin: true,
        shadeClose: false
      })
    },
    // 获取附件信息
    getFileData(data) {
      getKnowledgePointsGetFile({ onlyCode: data.onlyCode }).then(res => {
        this.fileList = res.result
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.fatherName = this.params.knowledgeName
    }
    if (!this.params.knowledgeId) {
      this.fromItemList[1].isShow = false
    }
    this.getFileData(this.params)
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
