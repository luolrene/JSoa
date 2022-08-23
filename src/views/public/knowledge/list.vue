<template>
  <div class="pc-container">
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
      </el-col>
      <el-col :span="20">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <template slot="other">
            <el-form-item label="创建时间:">
              <el-date-picker v-model="times" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px">
              </el-date-picker>
            </el-form-item>
          </template>
          <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAddType()" v-if="Number(this.$store.getters.userInfo.level)>=3">添加类型</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-tickets" @click="handleAddInfo()" v-if="Number(this.$store.getters.userInfo.level)>=3">添加信息</el-button>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange" v-if="num==='2'">
        </tableItem>
        <tableItem :obj="this" :tableData="tableData1" :tableHeader="tableHeader1" :button="button" :loading="loading" :isSelection="false" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange" v-if="num==='1'">
        </tableItem>
        <div style="display: flex;margin-top: -45px;">
          <el-button type="primary" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 弹窗部分 -->
    <el-dialog title="添加" class="dialogClass" :visible.sync="dialogFormVisible" :modal-append-to-body='false' fullscreen :append-to-body="true">
      <el-form label-width="100px" :rules="rules" :model="dialogData" ref="dialogData">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="dialogData.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="正文内容:" prop="oaDescribe">
          <Editor v-model="dialogData.oaDescribe" class="text" v-if="dialogFormVisible" />
        </el-form-item>
        <el-form-item label='附件上传:'>
          <myUpload ref='myUpload' :fileList='fileList'></myUpload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel()">取 消</el-button>
        <el-button type="primary" @click="onSubmit('dialogData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getKnowledgePointsAdd, getKnowledgeGetChildren, getKnowledgeQueryPageData, getKnowledgePointsQueryPageData, getKnowledgeDel, getKnowledgePointsDel } from '@/api/jcxxgl/knowledge.js'
import addType from './add_type.vue'
import addInfo from './add_info.vue'
import edit from './edit.vue'
import detail from './detail.vue'
import Editor from '../../home/editor.vue'

export default {
  components: {
    Editor,
    addInfo
  },
  data() {
    return {
      props: {
        label: 'name',
        children: 'children'
      },
      layerid: '',
      loading: false,
      btnLoading: false,
      userInfo: this.$store.getters.userInfo.id,
      fileList: [],
      dialogFormVisible: false,
      num: '1',
      times: [],
      multipleSelection: [],
      typeData: {
        fatherId: 0,
        fatherName: ' '
      },
      infoData: {
        knowledgeId: null,
        knowName: ''
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: null
      },
      dialogData: {},
      fromData: [{ type: 'input', prop: 'name', label: '文件名称' }],
      tableData: [],
      tableData1: [],
      treeData: [],
      tableHeader: [
        { prop: 'name', label: '名称', width: 250, type: 'view' },
        { prop: 'oaDescribe', label: '描述', width: 250 },
        { prop: 'createUserName', label: '创建人', width: 120 },
        { prop: 'createTime', label: '创建时间', width: 120 }
      ],
      tableHeader1: [
        { prop: 'name', label: '名称', width: 250, type: 'view' },
        { prop: 'oaDescribe', label: '描述', width: 250 }
      ],
      button: {
        width: 200,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (
                ([1, 2, 3, 4, 5].includes(params.id)) || params.createUser !== this.userInfo
              ) {
                return false
              } else {
                return true
              }
            }
          },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (
                ([1, 2, 3, 4, 5].includes(params.id)) || params.createUser !== this.userInfo || Number(this.$store.getters.userInfo.level) === 10
              ) {
                return false
              } else {
                return true
              }
            }
          }
        ]
      },
      rules: {
        name: [{ required: true, message: '请填写行业名称', trigger: 'blur' }],
        oaDescribe: [{ required: true, message: '请输入正文内容', trigger: 'blur' }]
      }

    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true
          getKnowledgePointsAdd(this.dialogData).then(res => {
            this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
            this.getListData()
            this.getTreeData()
            this.$share.message()
            this.btnLoading = false
            this.dialogFormVisible = false
            this.dialogData = []
          })
            .catch(err => {
              this.$message.error(err.message)
              this.btnLoading = false
            })
        }
      })
    },
    onCancel() {
      this.dialogFormVisible = false
      this.fromdialogData = {}
    },
    getListData() {
      this.loading = true
      if (this.fromValiData.knowledgeId) {
        this.num = '2'
        getKnowledgePointsQueryPageData(this.fromValiData)
          .then(res => {
            this.tableData = res.result.pageList
            this.fromValiData.dataSum = res.result.dataSum
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        getKnowledgeQueryPageData(this.fromValiData)
          .then(res => {
            this.tableData1 = res.result.pageList
            this.fromValiData.dataSum = res.result.dataSum
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    // 获取树
    getTreeData() {
      getKnowledgeGetChildren({}).then(res => {
        this.treeData = res.result
      })
    },
    // 点击树
    getNodeClick(data, node, now) {
      this.fromValiData.knowledgeId = data.id
      this.typeData.fatherId = data.id
      this.typeData.fatherName = data.name
      this.infoData.knowledgeId = data.id
      this.infoData.knowName = data.name
      if (this.fromValiData.name) {
        this.num = '2'
        getKnowledgePointsQueryPageData(this.fromValiData)
          .then(res => {
            this.tableData = res.result.pageList
            this.fromValiData.dataSum = res.result.dataSum
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        this.getListData()
      }
    },
    doSearch() {
      this.fromValiData.stateTime = this.times[0]
      this.fromValiData.endTime = this.times[1]
      this.fromValiData.pageNow = 1
      this.num = '2'
      getKnowledgePointsQueryPageData(this.fromValiData)
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
    doReset(formName) {
      delete this.fromValiData.stateTime
      delete this.fromValiData.endTime
      delete this.fromValiData.knowledgeId
      this.times = []
      this.fromValiData.knowledgeId = null
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    // 返回顶部
    doBackToTop() {
      delete this.fromValiData.knowledgeId
      delete this.fromValiData.knowName
      this.num = '1'
      this.typeData.fatherId = 0
      this.typeData.fatherName = ' '
      this.fromValiData.knowName = '新闻资讯'
      this.fromValiData.knowledgeId = 1
      this.infoData.knowledgeId = null
      this.infoData.knowName = null
      this.getTreeData()
      this.doReset('fromValiData')
      this.getListData()
    },
    // 添加类型
    handleAddType() {
      this.$layer.iframe({
        content: {
          content: addType, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.typeData
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    // 添加信息
    handleAddInfo() {
      if (this.infoData.knowledgeId) {
        this.dialogFormVisible = true
        this.dialogData = this.infoData
      } else {
        this.$message({
          message: '请选择文件类型',
          type: 'warning'
        });
      }
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            file: '1'
          } // props
        },
        area: this.$layer_Size.Maxs,
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
          if (row.fatherId || row.fatherId === 0) {
            let delData = {}
            delData.list = Array(row)
            getKnowledgeDel(delData.list).then(res => {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
              that.getListData()
              that.getTreeData()
            })
          } else {
            let delData = {}
            delData.list = Array(row)
            getKnowledgePointsDel(delData.list).then(res => {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
              that.getListData()
              that.getTreeData()
            })
          }
        }
      })
    },

    handleDetails(params) {
      if (params.knowledgeId) {
        this.$layer.iframe({
          content: {
            content: detail, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Maxs,
          title: '具体详情',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.num = '1'
        this.fromValiData.knowledgeId = params.id
        this.infoData.knowledgeId = params.id
        this.infoData.knowName = params.name
        this.getListData()
      }
      // if (params.knowledgeId) {
      //   this.$router.push({ name: 'news', params: params })
      // }
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
.dialog-footer {
  text-align: center;
}
>>> .el-dialog__header {
  background: #f8f8f8;
}
>>> .el-dialog__wrapper {
  border-radius: 20px;
}
</style>
