<!-- <template>
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
          <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAddType()">添加消息分类</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-tickets" @click="handleAddInfo()">添加消息</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      num: '1',
      props: {
        label: 'name',
        children: 'children'
      },
      times: [],
      typeData: {
        fatherId: 0,
        fatherName: ' '
      },
      infoData: {},
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: null
      },
      fromData: [{ type: 'input', prop: 'name', label: '文件名称' }],
      tableData: [],
      tableData1: [],
      treeData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '消息分类',
          width: 250,
          type: 'view'
        },
        {
          prop: 'oaDescribe',
          label: '消息标题',
          width: 250
        },
        {
          prop: 'createUserName',
          label: '接受对象',
          width: 120
        },
        {
          prop: 'createTime',
          label: '消息内容',
          width: 120
        }
      ],
      tableHeader1: [
        {
          prop: 'name',
          label: '标题',
          width: 250,
          type: 'view'
        },
        {
          prop: 'oaDescribe',
          label: '时间',
          width: 250
        },
        {
          prop: 'oaDescribe',
          label: '发布人员',
          width: 250
        },
        {
          prop: 'oaDescribe',
          label: '消息分类',
          width: 250
        },
        {
          prop: 'oaDescribe',
          label: '发布状态',
          width: 250
        }
      ],
      button: {
        width: 200,
        buttonList: [
          { name: '查看', type: 'primary', click: 'handleExamine' },
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '发布', type: 'primary', click: 'handleIssue' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
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
      this.fromValiData.knowName = '公共'
      this.fromValiData.knowledgeId = 1
      this.getTreeData()
      this.doReset('fromValiData')
      this.getListData()
    },
    // 添加消息分类
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
    // 添加消息
    handleAddInfo() {
      this.$layer.iframe({
        content: {
          content: addInfo, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.infoData
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    // handleEdit(params) {
    //   this.$layer.iframe({
    //     content: {
    //       content: edit, // 传递的组件对象
    //       parent: this, // 当前的vue对象
    //       data: {
    //         params: params
    //       } // props
    //     },
    //     area: this.$layer_Size.Normal,
    //     title: '编辑',
    //     maxmin: true,
    //     shadeClose: false
    //   })
    // },
    // handleDelete(row) {
    //   let that = this
    //   this.$share.confirm({
    //     message:
    //       '此操作将永久删除该数据及其' +
    //       '<span style="color:red;font-weight:700">子数据</span>' +
    //       ', 是否继续?',
    //     confirm: function() {
    //       if (row.fatherId || row.fatherId === 0) {
    //         let delData = {}
    //         delData.list = Array(row)
    //         getKnowledgeDel(delData.list).then(res => {
    //           that.$message({
    //             type: 'success',
    //             message: '删除成功'
    //           })
    //           that.getListData()
    //           that.getTreeData()
    //         })
    //       } else {
    //         let delData = {}
    //         delData.list = Array(row)
    //         getKnowledgePointsDel(delData.list).then(res => {
    //           that.$message({
    //             type: 'success',
    //             message: '删除成功'
    //           })
    //           that.getListData()
    //           that.getTreeData()
    //         })
    //       }
    //     }
    //   })
    // },

    // handleDetails(params) {
    //   if (params.knowledgeId) {
    //     this.$layer.iframe({
    //       content: {
    //         content: detail, // 传递的组件对象
    //         parent: this, // 当前的vue对象
    //         data: {
    //           params: params
    //         } // props
    //       },
    //       area: this.$layer_Size.Normal,
    //       title: '具体详情',
    //       maxmin: true,
    //       shadeClose: false
    //     })
    //   }
    // },
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
</style> -->
