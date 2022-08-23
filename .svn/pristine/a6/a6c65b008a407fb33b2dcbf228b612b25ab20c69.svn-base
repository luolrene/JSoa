<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { getGroupQueryPageData } from '../../../api/jcxxgl/group.js'
import {
  getPostAddGroup,
  getPostModifyGroup
} from '../../../api/jcxxgl/post.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        groupName: '',
        name: ''
      },
      fromData: {
        pageSize: 999,
        pageNow: 1,
        father: 0
      },
      rules: {
        name: [{ required: true, message: '请填写职务名称', trigger: 'blur' }],
        groupId: [
          { required: true, message: '请选择部门名称', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '部门名称',
          prop: 'groupId',
          value: '',
          type: 'select',
          isRqd: true,
          data: []
        },
        {
          label: '职务名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '备注',
          prop: 'exp',
          value: '',
          type: 'textarea'
        }
      ],
      groupData: []
    }
  },
  methods: {
    onSubmit() {
      if (this.params) {
        this.btnLoading = true
        getPostModifyGroup(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        this.btnLoading = true
        getPostAddGroup(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      }
    },
    getGroup() {
      getGroupQueryPageData(this.fromData).then(res => {
        let newData = res.result.pageList
        this.groupData = newData.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
        this.fromItemList[0].data = this.groupData
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {
    this.getGroup()
  }
}
</script>

<style scoped lang="scss">
</style>
