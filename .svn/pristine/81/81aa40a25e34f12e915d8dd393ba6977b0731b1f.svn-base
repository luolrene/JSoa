<template>
  <div class="operate-container">
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="3">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
      </el-col>
      <el-col :span="21">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
        </tableItem>
        <div style="display: flex;margin-top: -45px;">
          <el-button type="primary" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAssetsTypeGetChildren, getAssetsSupplierQueryPageData, getAssetsSupplierDel } from '@/api/integrated/fixedAssets.js'
import edit from './edit.vue'
export default {
  data() {
    return {
      loading: false,
      props: {
        label: 'name',
        children: 'children'
      },
      typeData: {},
      fromValiData: {
        typeId: '',
        pageSize: 10,
        pageNow: 1
      },
      fromData: [{ type: 'input', prop: 'name', label: '供应商' }],
      tableData: [],
      treeData: [],
      tableHeader: [
        { prop: 'name', label: '供应商', width: 140, type: 'view' },
        { prop: 'contacts', label: '联系人', width: 60 },
        { prop: 'telephone', label: '联系电话', width: 90 },
        { prop: 'warehousingTime', label: '合作时间', width: 90 },
        { prop: 'mailingAddress', label: '通信地址', width: 150 },
        { prop: 'supplierScale', label: '规模(/人)', width: 80 },
        { prop: 'natureName', label: '性质', width: 100 }
      ],
      button: {
        width: 150,
        buttonList: [
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (Number(this.$store.getters.userInfo.level) >= 5) {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getAssetsSupplierQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.nature) {
            case '1':
              xdd.natureName = '个人'
              break
            case '2':
              xdd.natureName = '政府'
              break
            case '3':
              xdd.natureName = '事业单位'
              break
            case '4':
              xdd.natureName = '私有企业'
              break
            case '5':
              xdd.natureName = '国有企业'
              break
            case '6':
              xdd.natureName = '外资企业'
              break
            case '7':
              xdd.natureName = '合资企业'
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      })
    },
    // 获取树
    getTreeData() {
      getAssetsTypeGetChildren({}).then(res => {
        this.treeData = res.result
      })
    },
    // 点击树
    getNodeClick(data, node, now) {
      this.fromValiData.typeId = data.id
      this.typeData.typeId = data.id
      this.getListData()
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    // 返回顶部
    doBackToTop() {
      delete this.fromValiData.typeId
      this.typeData.fatherId = 0
      this.fromValiData.fatherId = 0
      this.getTreeData()
      this.doReset('fromValiData')
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            fatherId: this.typeData
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
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        message:
          '此操作将永久删除该数据及其' +
          '<span style="color:red;font-weight:700">子数据</span>' +
          ', 是否继续?',
        confirm: function () {
          getAssetsSupplierDel({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
            that.getTreeData()
          })
        }
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
    this.getListData()
    this.getTreeData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
