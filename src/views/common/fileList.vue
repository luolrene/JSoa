<template>
  <div class="pc-container">
    <ul class="el-upload-list el-upload-list--text" v-for="(item,index) in fileList" :key="index">
      <li tabindex="0" class="el-upload-list__item is-ready">
        <div v-if="!direct">
          <a class="el-upload-list__item-name" @click="clickFile(item)">
            <i class="el-icon-document"></i>{{item.loadName}}
          </a>
          <i class="el-icon-close" @click.stop="delFile(item)" v-if="delType"></i>
        </div>
        <div v-else-if="direct">
          <a class="el-upload-list__item-name" @click="getDownload(item)">
            <i class="el-icon-document"></i>{{item.loadName}}
          </a>
          <i v-if="delType===''" class="el-icon-close" @click.stop="delFile(item)"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import preview from './preview.vue'
import { getKnowledgeFileDelFile } from '@/api/file.js'
export default {
  data() {
    return {
      host: process.env.BASE_API + process.env.JS_Server,
      Interface: { default: '/Knowledge/file/download' }
    }
  },
  props: {
    fileList: {
      type: Array,
      default: function () {
        return []
      }
    },
    delType: {
      type: String,
      default: ''
    },
    direct: {
      type: Boolean,
      default: false
    },
    file: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    delFile(item) {
      this.$confirm('此操作将删除已提交过的附件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getKnowledgeFileDelFile({ fileId: item.id }).then(res => {
          let obj = this.fileList.findIndex(xdd => xdd.id === item.id)
          this.fileList.splice(obj, 1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    clickFile(params) {
      this.$layer.iframe({
        content: {
          content: preview, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '预览',
        maxmin: true,
        shadeClose: false
      })
    },
    getDownload(item) {
      window.open(this.host + '/Knowledge/file/download ' + '?id=' + item.id + '&token=' + this.$store.getters.userInfo.token)
    }
  },
  mounted() {
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
