<template>
  <div class="pc-container">
    <el-tabs type="card" v-model="activeName">
      <el-tab-pane label="新增图片" name="first">
        <div class="content">
          <fromItem ref='fromData' :obj="this" :fromItemList="fromItemList" :fromValiData="fromValiData" :type="'1'" :rules="rules" :btnLoading="btnLoading" :labelWidth="110">
            <el-form-item label='上传图片:' prop="imgUrl">
              <uploadImg ref="myUpload" :datas='imgUrl' class="img"></uploadImg>
            </el-form-item>
          </fromItem>
        </div>
        <div>
          <el-button type="primary" @click="onCancel()">取消</el-button>
          <el-button type="primary" @click="onSubmit()">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="照片墙管理" name="second">
        <div class="contentBox">
          <div class="box" v-for="(item,index) in rollingData" :key="index">
            <div class="hidden" v-if="item.exhibition==='1'">已隐藏</div>
            <div class="handle">
              <i class="el-icon-edit" @click="handleEdit(item)"></i>
              <i class="el-icon-delete" @click="handleDel(item)"></i>
            </div>
            <div class="imgBox">
              <img :src="upload+item.imgUrl" alt="" v-if="item.imgUrl" width="100%" height="100%" :title="item.content" />
            </div>
            <div class="text">{{item.title}}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import edit from './edit.vue'
import { getHomeHonorWallQueryPageData, getHomeHonorWallAdd, getHomeHonorWallDel } from '@/api/integrated/walls.js'
export default {
  inject: ['reload'],
  data() {
    return {
      upload: process.env.BASE_API + process.env.JS_Server + '/Knowledge/file/download?id=',
      btnLoading: false,
      activeName: 'first',
      imgUrl: null,
      rollingData: [],
      rules: {
        title: [{ required: true, message: '请输入标题', tigger: 'blur' }],
        exhibition: [{ required: true, message: '请选择是否展示', tigger: 'blur' }],
        content: [{ required: true, message: '请输入文本内容', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '标题', prop: 'title', value: '', type: 'input', isRqd: true },
        { label: '是否展示', prop: 'exhibition', value: '', type: 'select', data: [{ name: '否', id: '1' }, { name: '是', id: '2' }], isRqd: true },
        { label: '文本内容', prop: 'content', value: '', type: 'textarea', isRqd: true }
      ],
      fromValiData: {
        exhibition: '2'
      },
      fromData: {
        pageSize: 999,
        pageNow: 1
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.btnLoading = true
      if (this.$refs.myUpload.FileId) {
        this.fromValiData.imgUrl = this.$refs.myUpload.FileId
        getHomeHonorWallAdd(this.fromValiData).then((res) => {
          this.$share.message()
          this.btnLoading = false
          this.reload()
        })
      } else {
        this.$message({
          message: '请上传图片',
          type: 'warning'
        })
        this.btnLoading = false
      }
    },
    onCancel() {
      this.fromValiData = {}
    },
    // 获取轮播图图片
    getListData() {
      getHomeHonorWallQueryPageData(this.fromData).then(res => {
        this.rollingData = res.result.pageList
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
    handleDel(a) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getHomeHonorWallDel({ ids: a.id }).then(res => {
            that.$message({
              message: '删除成功',
              type: 'success'
            });
            that.getListData()
          })
        }
      })
    }
  },
  mounted() { },
  created() {
    this.getListData()
  }
}
</script>

<style scoped lang="scss">
.content {
  width: 80%;
  height: 55vh;
}
.img {
  display: flex;
}
.footer {
  width: 80%;
}
.contentBox {
  display: flex;
  flex-wrap: wrap;
}
.box {
  position: relative;
  margin: 15px;
  width: 200px;
  height: 300px;
  border: 1px solid lightgrey;
  background: #000;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
}
.hidden {
  position: absolute;
  font-size: 60px;
  top: 120px;
  left: 25px;
  font-weight: 1000;
  color: rgba($color: #fff, $alpha: 0.7);
}
.handle {
  height: 10%;
  color: #fff;
  // line-height: 10%;
  i {
    margin: 10px 20px;
    display: inline-block;
    line-height: 70%;
  }
}
.imgBox {
  width: 100%;
  height: 80%;
}
.text {
  margin: 2px;
  height: 10%;
  font-size: 24px;
  color: #fff;
}
</style>
