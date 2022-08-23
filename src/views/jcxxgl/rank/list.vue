<!-- 职务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <!-- <el-button type="primary" class="default-btn" icon="el-icon-s-platform" @click="handleType()" v-if="Number(this.$store.getters.userInfo.level) === 10">职级类型管理</el-button> -->
      <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="Number(this.$store.getters.userInfo.level) >= 5">批量删除</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import type from './type.vue'
import {
  getPositionRankQueryPageData,
  getDictionariesGetByCode,
  getPositionRankDel
} from '../../../api/jcxxgl/rank.js'
export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        { type: 'select', prop: 'positionType', label: '职级类型', data: [] },
        { type: 'input', prop: 'positionName', label: '职级名称' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'positionType',
          label: '职级类型',
          width: 250
        },
        {
          prop: 'positionName',
          label: '职级名称',
          width: 250
        }
      ],
      button: {
        width: 250,
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
      this.loading = true
      getPositionRankQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.positionType) {
              case '1':
                xdd.positionTypeName = '行政'
                break
              case '2':
                xdd.positionTypeName = '技术'
                break
              case '3':
                xdd.positionTypeName = '市场'
                break
            }
          })
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
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
    handleType() {
      this.$layer.iframe({
        content: {
          content: type, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Max,
        title: '职级类型管理',
        maxmin: true,
        shadeClose: false
      })
    },

    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getPositionRankDel({ ids: String(row.id) }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getByCode() {
      getDictionariesGetByCode({ dicCode: 'ZJLX' }).then(res => {
        let byCode = res.result.map(item => {
          return {
            id: item.dicName,
            name: item.dicName
          }
        })
        this.fromData.forEach(item => {
          if (item.prop === 'positionType') {
            item.data = byCode
          }
        })
      })
    }
  },
  mounted() {
    this.getListData()
    this.getByCode()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
