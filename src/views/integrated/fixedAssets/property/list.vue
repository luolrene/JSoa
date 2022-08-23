<template>
  <div class="operate-container">
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
      </el-col>
      <el-col :span="20">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        </fromSearch>
        <div class="myTable">
          <el-table :data="propertyData" border v-loading="loading" style="width: 100%;" highlight-current-row>
            <el-table-column align="center" label="序号" width="70" fixed='left'>
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="imgUrl" label="图片">
              <template v-slot="{ row }">
                <el-image :src="upload+row.imgUrl" v-if="row.imgUrl && row.imgUrl!=='0'"></el-image>
                <span v-else style=" color:#ccc">未上传图片</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="分类名称"></el-table-column>
            <el-table-column align="center" prop="groupNameAll" label="管理部门"></el-table-column>
            <el-table-column align="center" prop="operationUserNameAll" label="管理用户"></el-table-column>
            <el-table-column align="center" prop="remarks" label="备注"></el-table-column>
            <el-table-column align="center" label="操作">
              <template v-slot="{ row }">
                <el-button type="primary" @click="handleEdit(row)" v-if="row.operationUserIdAll.split(',').includes(userId.id)||Number(userId.level)>8">编辑</el-button>
                <el-button type="danger" @click="handleDelete(row)" v-if="row.operationUserIdAll.split(',').includes(userId.id)||Number(userId.level)>8">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-button type="primary" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAssetsTypeGetChildren, getAssetsTypeQueryPageData, getAssetsTypeDel } from '@/api/integrated/fixedAssets.js'
import edit from './edit.vue'
export default {
  inject: ['reload'],
  data() {
    return {
      loading: false,
      userId: this.$store.getters.userInfo,
      propertyData: [],
      upload:
        process.env.BASE_API +
        process.env.JS_Server +
        '/Knowledge/file/download?id=',
      props: {
        label: 'name',
        children: 'children'
      },
      typeData: {
        fatherId: 0,
        fatherName: ' '
      },
      infoData: {},
      fromValiData: {
        name: '',
        pageSize: 99,
        pageNow: 1,
        fatherId: 0
      },
      fromData: [{ type: 'input', prop: 'name', label: '类别名称' }],
      tableData: [],
      treeData: [],
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getAssetsTypeQueryPageData(this.fromValiData).then(res => {
        this.propertyData = res.result.pageList
        this.loading = false
      })
    },
    // 获取树
    getTreeData() {
      getAssetsTypeGetChildren({
        groupIdAll: this.$store.getters.userInfo.groupId
      }).then(res => {
        this.treeData = res.result
      })
    },
    // 点击树
    getNodeClick(data, node, now) {
      this.fromValiData.fatherId = data.id
      this.typeData.fatherId = data.id
      this.typeData.fatherName = data.name
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
      delete this.fromValiData.fatherId
      this.typeData.fatherId = 0
      this.typeData.fatherName = ' '
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
      console.log(params.operationUserIdAll.split(','));
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
          let list = []
          list.push(row)
          getAssetsTypeDel(list).then(res => {
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
    this.getTreeData()
    this.getListData()
  },
  created() { },
  destroyed() {
    this.reload()
  }
}
</script>

<style scoped lang="scss">
.myTable >>> .el-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
}
.myTable >>> .el-table .cell,
.myTable >>> .el-table--border td:first-child .cell,
.myTable >>> .el-table--border th:first-child .cell {
  padding-left: 5px;
  padding-right: 5px;
}
.myTable >>> .el-table .cell span {
  margin-left: 0 !important;
}
.myTable >>> .el-pager li.active,
.myTable >>> .el-select-dropdown__item.selected {
  color: #0195db;
}
.myTable >>> .el-pagination__sizes .el-input .el-input__inner:hover,
.myTable >>> .el-select .el-input.is-focus .el-input__inner,
.myTable >>> .el-select .el-input__inner:focus {
  border: 1px solid #0195db;
}
.myTable >>> .el-table--border th,
.myTable >>> .el-table__fixed-right-patch {
  height: 54px;
  background-color: #dddddd !important;
  color: #000000;
  font-size: 16px;
  font-weight: 400;
}
.myTable >>> .el-table--enable-row-transition .el-table__body td {
  height: 48px;
  color: #0195db;
}
.myTable .detailClass {
  color: #409eff;
  font-size: 14px;
  cursor: pointer;
}
.myTable .detailClass:hover {
  color: #14b9ff;
  text-decoration: underline;
}
</style>
