<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加印章</el-button>
      <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="Number(this.$store.getters.userInfo.level) >= 5">批量删除</el-button>
    </fromSearch>
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="缩略图查看" name="first">
        <div class="contentBox">
          <div class="box" v-for="(item,index) in tableData" :key="index">
            <div class="icon">
              <!-- <img src="../../../../static/img/default/在库.png" alt=""> -->
              <!-- <img src="../../../../static/img/default/借出.png" alt="" v-if="1"> -->
            </div>
            <div class="img">
              <img :src="upload+item.imgUrl" alt="" v-if="item.imgUrl" width="100%" height="100%">
              <span v-else style="color:#ccc;display: inline-block;margin-top:33%;">未上传图片</span>
            </div>
            <div class="line"></div>
            <div class="textBox">
              <span :title="item.type">印章类型:{{item.type}}</span>
              <span :title="item.seal">印章名称:{{item.seal}}</span>
              <span :title="item.groupNameAll">保管部门:{{item.groupNameAll}}</span>
              <span :title="item.operationUserNameAll">保管人:{{item.operationUserNameAll}}</span>
              <span :title="item.exp">说明:{{item.exp}}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="列表查看" name="second">
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import edit from './edit.vue'
import apply from './apply.vue'
import { getGroupQueryPageData } from '@/api/jcxxgl/group.js'
import { getOfficialSealQueryPageData, getOfficialSealDel } from '@/api/integrated/stamp'
export default {
  components: {},
  data() {
    return {
      loading: false,
      activeName: 'first',
      multipleSelection: [],
      upload: process.env.BASE_API + process.env.JS_Server + '/Knowledge/file/download?id=',
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {
          type: 'select',
          prop: 'company',
          label: '公司信息',
          data: [
            { name: '重庆市九升检测技术有限公司', id: '重庆市九升检测技术有限公司' },
            { name: '重庆吉东科技有限公司', id: '重庆吉东科技有限公司' },
            { name: '重庆两山生态环境科技有限公司', id: '重庆两山生态环境科技有限公司' },
            { name: '重庆九升科技集团有限公司', id: '重庆九升科技集团有限公司' },
            { name: '重庆市九升检测技术有限公司广安分公司', id: '重庆市九升检测技术有限公司广安分公司' }
          ]
        },
        {
          type: 'select',
          prop: 'type',
          label: '印章类型',
          data: [
            { name: '公章', id: '公章' },
            { name: '法人章', id: '法人章' },
            { name: 'CMA章', id: 'CMA章' },
            { name: 'CATL章', id: 'CATL章' },
            { name: '财务专用章', id: '财务专用章' },
            { name: '发票专用章', id: '发票专用章' },
            { name: '合同专用章', id: '合同专用章' },
            { name: '报价专用章', id: '报价专用章' },
            { name: '检验检测专用章', id: '检验检测专用章' }
          ]
        },
        { type: 'input', prop: 'type', label: '印章名称' },
        { type: 'select', prop: 'groupIdAll', label: '保管部门', data: [] },
        { type: 'input', prop: 'name', label: '负责人' }
      ],
      tableData: [],
      tableHeader: [
        { prop: 'company', label: '公司信息', width: 200 },
        { prop: 'type', label: '印章类型', width: 100 },
        { prop: 'seal', label: '印章名称', width: 200 },
        { prop: 'filingName', label: '是否备案', width: 80 },
        { prop: 'groupNameAll', label: '保管部门', width: 140 },
        { prop: 'operationUserNameAll', label: '保管人', width: 100 },
        { prop: 'address', label: '保管地点', width: 100 },
        { prop: 'exp', label: '说明', width: 220 }
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
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getOfficialSealQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(item => {
            switch (item.filing) {
              case '1':
                item.filingName = '是'
                break
              case '2':
                item.filingName = '否'
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
    handleApply(row) {
      this.$layer.iframe({
        content: {
          content: apply, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: row
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '用印申请',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getOfficialSealDel({ ids: row.id }).then(res => {
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
    getGroup() {
      getGroupQueryPageData({ pageSize: 999, pageNow: 1, father: '0' }).then(
        res => {
          this.fromData.forEach(item => {
            if (item.prop === 'groupIdAll') {
              item.data = res.result.pageList
            }
          })
        }
      )
    }
  },
  mounted() {
    this.getListData()
    this.getGroup()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.icon {
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  width: 50px;
}
.contentBox {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  .box {
    position: relative;
    display: flex;
    width: 350px;
    height: 150px;
    border: 1px solid lightgrey;
    padding: 15px;
    margin: 20px 20px;
    border-radius: 10px;
    .img {
      margin: 10px 0;
      width: 48%;
    }
    .line {
      width: 2%;
      height: 150px;
      border-left: 1px dotted#000;
      float: left;
      margin: 0 15px;
    }
    .textBox {
      width: 55%;
      margin-top: 10px;
      span {
        display: block;
        font-size: 14px;
        text-align: left;
        line-height: 23px;
        text-overflow: ellipsis;
        word-wrap: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
