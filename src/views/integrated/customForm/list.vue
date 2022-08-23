<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-s-management" @click="handleForm()" v-if="Number(this.$store.getters.userInfo.level) >= 5">自定义表单</el-button>
      <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="Number(this.$store.getters.userInfo.level) >= 5">批量删除</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :button="button" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
    </tableItem>
    <!-- 预览弹出框 -->
    <el-dialog title="表单预览" :visible.sync="dialogVisible" :modal-append-to-body='false' width="50%" top="5vh">
      <dialogform ref="dialogForm"></dialogform>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import newForm from './newForm/container'
import editor from './newForm/editor'
import edit from './edit'
import dialogform from './newForm/dialogForm'

import {
  getCustomerFormQueryPageData,
  getCustomerFormDel
} from '@/api/integrated/form.js'
export default {
  components: {
    dialogform: dialogform
  },
  data() {
    return {
      dialogVisible: false,
      previewVisible: false,
      preview: null,
      loading: false,
      times: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        groupId: this.$store.getters.userInfo.groupId
      },
      fromData: [
        {
          type: 'input',
          prop: 'formName',
          label: '表单名称'
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'formName',
          label: '表单名称',
          width: 140,
          type: 'view'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: 200
        }
      ],
      button: {
        width: 250,
        buttonList: [
          { name: '编辑', type: 'primary', click: 'handleEditor' },
          { name: '查看', type: 'primary', click: 'handleDetails' },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete'
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getCustomerFormQueryPageData(this.fromValiData)
        .then(res => {
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
    // 自定义表单
    handleForm() {
      this.$layer.iframe({
        content: {
          content: newForm, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: ''
          } // props
        },
        area: ['1160px', '800px'],
        title: '自定义表单',
        maxmin: true,
        shadeClose: false
      })
    },
    // 编辑
    handleEditor(params) {
      this.$layer.iframe({
        content: {
          content: editor, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            code: params,
            layerid: ''
          } // props
        },
        area: ['1160px', '800px'],
        title: '自定义表单',
        maxmin: true,
        shadeClose: false
      })
    },
    // 查看
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            show: true
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '自定义表单',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCustomerFormDel({ ids: row.id }).then(res => {
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
    }
  },
  mounted() {
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
