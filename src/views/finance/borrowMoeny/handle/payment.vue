<template>
  <div class="operate-container">
    <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="doAdd()" v-if="params.balanceMoney!=0">添加</el-button>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :isSelection="false" :button="button" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange" style='margin-top:15px;'>
    </tableItem>
  </div>
</template>

<script>
import { getPaymentDetailedQueryPageData } from '@/api/finance/borrow.js'
import edit from './paymentEdit.vue'
export default {
  props: {
    layerid: '',
    type: Number,
    params: Object
  },
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      button: {
        width: 200,
        buttonList: [
          // {
          //   name: '编辑',
          //   type: 'primary',
          //   click: 'handleEdit'
          // }
        ]
      },
      tableData: [],
      tableHeader: [
        {
          label: '付款金额',
          prop: 'paymentAmount'
        },
        {
          label: '付款时间',
          prop: 'paymentTime'
        },
        {
          label: '付款人',
          prop: 'createUserName'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getPaymentDetailedQueryPageData(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      })
    },
    doAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            datas: this.params,
            type: this.type
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData.fatherId = this.params.id
    }
    this.fromValiData.paymentType = this.type
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
