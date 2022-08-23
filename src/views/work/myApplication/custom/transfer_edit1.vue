<!-- 调岗表单 -->
<template>
  <div class="operate-container">
    <fromItem :obj="this" ref="myFrom" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :label-width="110" submitName='确定'>
      <el-form-item label='附件上传:' slot='upload' v-if="!params">
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getGroupQueryAllGroupsTree } from '@/api/jcxxgl/group.js'
import { getPositionRankQueryPageData } from '@/api/jcxxgl/rank.js'
import { getRoleQueryPageData } from '@/api/jcxxgl/role.js'
import { getCustomizedFormAddAdjustPosition, getCustomizedFormGetAdjustPosition } from '@/api/work/myApplication' // 提交离职申请
import { getApplyAdd } from '@/api/work/myApplication.js'
export default {
  props: {
    layerid: '',
    params: Object,
    datas: Object
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      groupData: [],
      postData: [],
      rankData: [],
      newFromData: {},
      fromData: {
        pageSize: 999,
        pageNow: 1
      },
      fromValiData: {
      },
      rules: {
        userName: [{ required: true, message: '请填写申请人', trigger: 'blur' }],
        exportGroup: [{ required: true, message: '请选择调出部门', trigger: 'blur' }],
        exportPost: [{ required: true, message: '请选择调出岗位', trigger: 'blur' }],
        exportRank: [{ required: true, message: '请选择调出行政职级', trigger: 'blur' }],
        entranceGroup: [{ required: true, message: '请选择调入部门', trigger: 'blur' }],
        entrancePost: [{ required: true, message: '请选择调入岗位', trigger: 'blur' }],
        entranceRank: [{ required: true, message: '请选择调入行政职级', trigger: 'blur' }],
        cause: [{ required: true, message: '请填写调入原因', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '申请人', prop: 'userName', value: '', type: 'input', disabled: true, isRqd: true },
        { label: '调出部门', prop: 'exportGroup', value: '', type: 'input', disabled: true, isRqd: true },
        { label: '调出岗位', prop: 'exportPost', value: '', type: 'input', disabled: true, isRqd: true },
        { label: '调出行政职级', prop: 'exportRank', value: '', type: 'input', disabled: true, isRqd: true },
        { label: '调入部门', prop: 'entranceGroup', value: '', type: 'input', isRqd: true, data: [] },
        { label: '调入岗位', prop: 'entrancePost', value: '', type: 'select', isRqd: true, multiple: true, data: [] },
        { label: '调入行政职级', prop: 'entranceRank', value: '', type: 'select', click: 'getRankName', isRqd: true },
        { label: '调入原因', prop: 'cause', value: '', type: 'textarea', isRqd: true },
        { label: '备注', prop: 'exp', value: '', type: 'textarea' }
      ]
    }
  },
  methods: {
    onSubmit() {
      if (this.params) {
        this.$layer.close(this.layerid)
      } else {
        this.fromValiData.entranceGroupId = String(this.fromValiData.entranceGroup)
        delete this.fromValiData.entranceGroup
        let postName = this.getDataName(this.fromValiData.entrancePost, this.postData)
        this.fromValiData.entrancePost = postName.map(xdd => {
          return xdd.name
        })
        this.fromValiData.entrancePostId = postName.map(xdd => {
          return xdd.id
        })
        this.fromValiData.entrancePost = String(this.fromValiData.entrancePost)
        this.fromValiData.entrancePostId = String(this.fromValiData.entrancePostId)
        getCustomizedFormAddAdjustPosition(this.fromValiData).then(res => {
          this.newFromData = this.datas
          this.newFromData.customFormType = 16
          this.newFromData.customFormId = res.result.id
        }).then(() => {
          getApplyAdd(this.newFromData)
            .then(res => {
              this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$share.message()
              this.btnLoading = false
            })
            .catch(err => {
              this.$message.error(err.message)
              this.loading = false
            })
        })
      }
    },
    // 获取部门数据
    handelOption(options) {
      options.forEach(item => {
        if (item.children.length === 0) {
          delete item.children
        } else {
          this.handelOption(item.children)
        }
      })
    },

    getGroupData() {
      getGroupQueryAllGroupsTree({ father: '0' }).then(res => {
        this.groupData = res.result
        this.handelOption(this.groupData)
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'entranceGroup') {
            xdd.data = this.groupData
          }
        })
      })
    },
    getentrancePostData() {
      getRoleQueryPageData(this.fromData).then(res => {
        this.fromItemList.forEach(xdd => {
          this.postData = res.result.pageList
          if (xdd.prop === 'entrancePost') {
            xdd.data = res.result.pageList
          }
        })
      })
    },
    getEntranceRankData() {
      this.fromData.positionType = '行政职级'
      getPositionRankQueryPageData(this.fromData).then(res => {
        this.rankData = res.result.pageList.map(item => {
          return {
            id: item.id,
            name: item.positionName
          }
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'entranceRank') {
            xdd.data = this.rankData
          }
        })
      })
    }
  },
  mounted() {
    this.getGroupData()
    this.getentrancePostData()
    this.getEntranceRankData()
    if (this.params) {
      this.fromItemList.forEach(xdd => {
        xdd.disabled = true
      })
      let obj = {}
      obj.id = this.params.applyId
      getCustomizedFormGetAdjustPosition(obj).then(res => {
        this.fromValiData = res.result
        this.fromValiData.entrancePost = res.result.entrancePost.split(',')
        this.fromValiData.entranceGroup = res.result.entranceGroup.s.replace(/,/g, '/')
        this.getGroupData()
      })
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
