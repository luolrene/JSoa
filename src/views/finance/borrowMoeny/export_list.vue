<template>
  <div class="operate-container">
    <el-scrollbar class="page-component__scroll" :native="false" style="height: 90%">
      <el-tree ref="myTree" node-key="id" :data="treeData" show-checkbox default-expand-all :props="defaultProps" :check-on-click-node="true">
      </el-tree>
    </el-scrollbar>
    <div class="btn">
      <el-button :size="$layer_Size.buttonSize" @click='$layer.close(layerid)'>取消</el-button>
      <el-button :size="$layer_Size.buttonSize" @click="onSelectAll">全选</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" @click="onSubmit">导出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: Number,
    params: Object,
    layerid: ''
  },
  data() {
    return {
      fromValidata: {},
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      host: process.env.BASE_API + process.env.JS_Server
    }
  },
  methods: {
    onSubmit() {
      let title = ''
      let nodes = this.$refs.myTree.getCheckedNodes(true)
      if (nodes.length === 0) {
        this.$share.message('请勾选需要导出的字段名称', 'warning')
        return
      }
      nodes.forEach(xdd => {
        title += xdd.name + ','
      })
      title = title.substring(0, title.length - 1)
      // 1借款 2报销 3付款 4招待 5 采购
      if (this.type === 1) {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/FinanceLoan/download?' + 'ids=' + this.params.ids + '&names=' + title)
      } else if (this.type === 2) {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/Reimbursement/download?' + 'ids=' + this.params.ids + '&names=' + title)
      } else if (this.type === 3) {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/PaymentFinance/download?' + 'ids=' + this.params.ids + '&names=' + title)
      } else if (this.type === 4) {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/Entertain/download?' + 'ids=' + this.params.ids + '&names=' + title)
      } else if (this.type === 5) {
        window.open(process.env.BASE_API + process.env.JS_Server + '/Excel/Purchase/download?' + 'ids=' + this.params.ids + '&names=' + title)
      }
    },
    onSelectAll() {
      this.$refs.myTree.setCheckedNodes(this.treeData)
    }
  },
  mounted() { },
  created() {
    if (this.type === 1) {
      this.treeData = [
        { id: '申请人', name: '申请人' },
        { id: '部门名称', name: '部门名称' },
        { id: '借款编号', name: '借款编号' },
        { id: '状态', name: '状态' },
        { id: '类别', name: '类别' },
        { id: '借款金额', name: '借款金额' },
        { id: '借款时间', name: '借款时间' },
        { id: '借款原因', name: '借款原因' },
        { id: '借款需求时间', name: '借款需求时间' },
        { id: '预计还款时间', name: '预计还款时间' },
        { id: '支付方式', name: '支付方式' },
        { id: '开户银行', name: '开户银行' },
        { id: '开户支行', name: '开户支行' },
        { id: '开户人', name: '开户人' },
        { id: '银行账号', name: '银行账号' },
        { id: '未核销金额', name: '未核销金额' },
        { id: '核销备注', name: '核销备注' },
        { id: '延期时间', name: '延期时间' },
        { id: '合同号', name: '合同号' },
        { id: '合同金额', name: '合同金额' },
        { id: '采购申请', name: '采购申请' },
        { id: '备注', name: '备注' }
      ]
    } else if (this.type === 2) {
      this.treeData = [
        { id: '申请人', name: '申请人' },
        { id: '部门名称', name: '部门名称' },
        { id: '报销编号', name: '报销编号' },
        { id: '状态', name: '状态' },
        { id: '报销类别', name: '报销类别' },
        { id: '总额', name: '总额' },
        { id: '未付款金额', name: '未付款金额' },
        { id: '报销时间', name: '报销时间' },
        { id: '报销方式', name: '报销方式' },
        { id: '开户银行', name: '开户银行' },
        { id: '开户支行', name: '开户支行' },
        { id: '开户人', name: '开户人' },
        { id: '银行账号', name: '银行账号' },
        { id: '客户名称', name: '客户名称' },
        { id: '合同编号', name: '合同编号' },
        { id: '合同名称', name: '合同名称' },
        { id: '同行人', name: '同行人' },
        { id: '出差事由', name: '出差事由' },
        { id: '借款信息', name: '借款信息' },
        { id: '付款信息', name: '付款信息' },
        { id: '备注', name: '备注' }
      ]
    } else if (this.type === 3) {
      this.treeData = [
        { id: '申请人', name: '申请人' },
        { id: '部门名称', name: '部门名称' },
        { id: '付款编号', name: '付款编号' },
        { id: '状态', name: '状态' },
        { id: '类别', name: '类别' },
        { id: '申请付款金额', name: '申请付款金额' },
        { id: '申请付款时间', name: '申请付款时间' },
        { id: '申请原因', name: '申请原因' },
        { id: '申请需求时间', name: '申请需求时间' },
        { id: '审批金额', name: '审批金额' },
        { id: '审批付款时间', name: '审批付款时间' },
        { id: '当前应付款金额', name: '当前应付款金额' },
        { id: '付款完成状态', name: '付款完成状态' },
        { id: '支付方式', name: '支付方式' },
        { id: '开户银行', name: '开户银行' },
        { id: '开户支行', name: '开户支行' },
        { id: '开户人', name: '开户人' },
        { id: '银行账号', name: '银行账号' },
        { id: '合同号', name: '合同号' },
        { id: '合同金额', name: '合同金额' },
        { id: '采购申请', name: '采购申请' },
        { id: '备注', name: '备注' }
      ]
    } else if (this.type === 4) {
      this.treeData = [
        { id: '申请人', name: '申请人' },
        { id: '部门名称', name: '部门名称' },
        { id: '参与人', name: '参与人' },
        { id: '状态', name: '状态' },
        { id: '招待时间', name: '招待时间' },
        { id: '招待事由', name: '招待事由' },
        { id: '招待客户', name: '招待客户' },
        { id: '招待单位', name: '招待单位' },
        { id: '对方职务', name: '对方职务' },
        { id: '联系电话', name: '联系电话' },
        { id: '招待客户②', name: '招待客户②' },
        { id: '招待单位②', name: '招待单位②' },
        { id: '对方职务②', name: '对方职务②' },
        { id: '联系电话②', name: '联系电话②' },
        { id: '招待客户③', name: '招待客户③' },
        { id: '招待单位③', name: '招待单位③' },
        { id: '对方职务③', name: '对方职务③' },
        { id: '联系电话③', name: '联系电话③' },
        { id: '预计金额', name: '预计金额' },
        { id: '招待项目', name: '招待项目' },
        { id: '预计金额②', name: '预计金额②' },
        { id: '招待项目②', name: '招待项目②' },
        { id: '预计金额③', name: '预计金额③' },
        { id: '招待项目③', name: '招待项目③' },
        { id: '金额合计', name: '金额合计' }
      ]
    } else if (this.type === 5) {
      this.treeData = [
        { id: '申请人', name: '申请人' },
        { id: '部门名称', name: '部门名称' },
        { id: '采购编号', name: '采购编号' },
        { id: '状态', name: '状态' },
        { id: '物资类别', name: '物资类别' },
        { id: '物资名称', name: '物资名称' },
        { id: '物品规格', name: '物品规格' },
        { id: '单位', name: '单位' },
        { id: '数量', name: '数量' },
        { id: '物资用途', name: '物资用途' },
        { id: '预计需求时间', name: '预计需求时间' },
        { id: '物资名称②', name: '物资名称②' },
        { id: '物品规格②', name: '物品规格②' },
        { id: '单位②', name: '单位②' },
        { id: '数量②', name: '数量②' },
        { id: '物资用途②', name: '物资用途②' },
        { id: '预计需求时间②', name: '预计需求时间②' },
        { id: '物资名称③', name: '物资名称③' },
        { id: '物品规格③', name: '物品规格③' },
        { id: '单位③', name: '单位③' },
        { id: '数量③', name: '数量③' },
        { id: '物资用途③', name: '物资用途③' },
        { id: '预计需求时间③', name: '预计需求时间③' },
        { id: '预计金额', name: '预计金额' },
        { id: '实际金额', name: '实际金额' },
        { id: '申请备注', name: '申请备注' },
        { id: '采购备注', name: '采购备注' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.btn {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
}
</style>
