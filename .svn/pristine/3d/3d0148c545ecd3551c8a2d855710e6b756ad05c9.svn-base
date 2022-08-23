<template>
  <div class="operate-container">
    <div class="head">
      <div class="title">{{params.name}}</div>
      <div class="nav">
        <span class="name1"> {{params.createTime}}</span>
        <span class="name1"> {{params.knowledgeName}}</span>
        <span class="name1">发件人:{{params.createUserName}}</span>
      </div>
    </div>
    <div class="describe">
      <div class="paragraph" v-html="params.oaDescribe"></div>
    </div>
    <div class="main">
      <div class="name">附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0"></div>
        <fileList :fileList="fileList" style="padding:0;" v-else></fileList>
      </div>
    </div>
  </div>
</template>
<script>
import fileList from '../../common/fileList.vue'
import { getUserQueryPageData } from '@/api/jcxxgl/user.js'
import { getKnowledgePointsGetFile } from '@/api/file.js'
export default {
  data() {
    return {
      loading: false,
      show: false,
      fileList: [],
      user: {}
    }
  },
  props: {
    params: Object
  },
  components: {
    fileList
  },
  methods: {
    getInfo() {
      this.show = !this.show
    },
    getUser() {
      let data = {}
      data.pageSize = 1
      data.pageNow = 1
      data.id = this.params.createUser
      getUserQueryPageData(data).then(res => {
        this.user = res.result.pageList[0]
        switch (this.user.onTheJobStatus) {
          case '1':
            this.user.onTheJobStatusName = '在职'
            break
          case '2':
            this.user.onTheJobStatusName = '离职'
            break
          case '3':
            this.user.onTheJobStatusName = '试用期'
            break
          case '4':
            this.user.onTheJobStatusName = '退休'
            break
          case '5':
            this.user.onTheJobStatusName = '临时'
            break
          case '6':
            this.user.onTheJobStatusName = '实习期'
            break
          case '7':
            this.user.onTheJobStatusName = '挂靠'
            break
          case '8':
            this.user.onTheJobStatusName = '其他'
        }
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
    getKnowledgePointsGetFile({ onlyCode: this.params.onlyCode }).then(res => {
      this.fileList = res.result
    })
    this.getUser()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.head {
  height: 80px;
  text-align: center;
  border-bottom: 1px #ccc double;
  .title {
    margin-bottom: 10px;
    font-size: 28px;
    letter-spacing: 4px;
    color: #333;
  }
  .nav {
    position: relative;
    font-size: 14px;
    color: #333;
    .name1 {
      display: inline-block;
      margin: 10px 60px 10px 60px;
    }
    i {
      display: inline-block;
      width: 20px;
      height: 18px;
      background: url('../../../../static/img/default/card.png');
      background-size: cover;
      cursor: pointer;
    }
  }
}
.describe {
  margin: 20px auto;
  width: 70%;
  min-height: 100px;
  text-align: left;
  line-height: 20px;
  font-size: 18px;
  color: #333;
}
.paragraph {
  margin: 0px;
  padding: 0px;
  font-size: 12pt;
  text-align: justify;
  text-indent: 2em;
  font-family: 宋体;
}

.main {
  .name {
    font-size: 16px;
    color: #0195db;
  }
}
.messageBox {
  position: absolute;
  left: 74%;
  z-index: 99999;
  padding: 10px;
  width: 280px;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #999;
  box-shadow: 0 5px 10px #999;
}
td {
  text-align: left;
  color: #999;
  span {
    font-size: 14px;
    color: #333;
    line-height: 21px;
  }
}

.td1 {
  width: 90%;
  font-size: 18px;
  font-weight: 700;
  color: #0195db;
}
.td2 {
  min-width: 130px;
}
.close {
  cursor: pointer;
  color: #0195db;
  font-size: 14px;
}
</style>
