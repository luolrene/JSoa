<template>
  <div class="operate-container">
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="aside">
          <el-menu default-active="" v-for="(item,index) in iconDatas" :key="index" :index="item.name" @select="handleSelect(item)">
            <el-menu-item>
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
          <div class="inp" style=" position: fixed; bottom: 60px;">
            <el-input placeholder="查询申请" v-model="name" style="width:72%;" clearable @clear="clearData" @keyup.enter.native="handleIconClick"></el-input>
            <i class="el-icon-search mous" slot="suffix" @click="handleIconClick" />
          </div>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="main">
          <div class="content" v-for="(item,index) in iconData" :key="index">
            <div class="title">
              <div class="on"></div>
              <span>{{item.name}}</span>
            </div>
            <div class="boxs">
              <div v-for="(_item,_index) in item.children" :key="_index">
                <div class="box" @click="addApply(_item.name,_item.id,item.name)">
                  <img :src='_item.img' alt="" width="50" height="50">
                  <div style="font-size:14px;font-weight: 500;">{{_item.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import edit from '../../integrated/customForm/edit.vue'
import dimissionEdit from './custom/dimission_edit.vue' // 离职申请
import officialEdit from './custom/official_edit.vue' // 转正申请
import transferEdit from './custom/transfer_edit.vue' // 调岗申请
import leaveEdit from './custom/leave_edit.vue' // 请假申请
import reissueEdit from './custom/reissue_edit.vue' // 补卡申请
import purchaseEdit from '../../finance/purchase/edit.vue' // 采购申请
import paymentEdit from '../../finance/payment/edit.vue' // 付款申请
import borrowMoeny from '../../finance/borrowMoeny/edit.vue' // 借款申请
import businessEdit from '../../finance/business/edit.vue' // 招待申请
// import expenseEdit from '../../finance/expense/edit.vue' // 报销申请
import { getOaProcessGetChildrenTwo } from '@/api/integrated/flow.js'
import { getCustomerFormGetDataByProcessId } from '@/api/integrated/form.js'

export default {
  data() {
    return {
      newData: {},
      iconDatas: [],
      iconData: [],
      fileListData: [],
      typeName: '',
      name: '',
      fromValiData: {
        userName: this.$store.getters.userInfo.name,
        userId: this.$store.getters.userInfo.id,
        groupId: this.$store.getters.userInfo.groupId
      }
    }
  },
  methods: {
    clearData() {
      this.name = ''
      this.getType()
    },
    // 搜索
    handleIconClick() {
      getOaProcessGetChildrenTwo({ processType: '1', name: this.name, id: 0 }).then(res => {
        this.iconData = this.changeicom(res.result)
      })
    },
    // 点击侧边栏
    handleSelect(a) {
      getOaProcessGetChildrenTwo({ processType: '1', id: a.id }).then(res => {
        this.iconData = this.changeicom(res.result)
      })
    },
    getListData() {
      this.$parent.getListData()
    },
    getType() {
      getOaProcessGetChildrenTwo({ processType: '1', id: 0 }).then((res) => {
        this.iconData = res.result
        let icon = ['el-icon-s-check', 'el-icon-s-marketing', 'el-icon-s-management', 'el-icon-receiving', 'el-icon-notebook-2']
        res.result.forEach((xdd, index) => {
          xdd.icon = icon[index]
          xdd.index = index
        })
        this.iconDatas = this.changeicom(res.result)
      })
    },
    changeicom(data) {
      data.forEach(item => {
        item.children.forEach(xdd => {
          xdd.img = '/static/img/icon/jcsq.png'
          switch (xdd.name) {
            case '借款申请': xdd.img = '/static/img/icon/jksq.png'
              break
            case '付款申请': xdd.img = '/static/img/icon/fksq.png'
              break
            case '采购申请': xdd.img = '/static/img/icon/cgsq.png'
              break
            case '公章申请': xdd.img = '/static/img/icon/gzsq.png'
              break
            case '证照、公章外借申请': xdd.img = '/static/img/icon/gzsq.png'
              break
            case '法人章申请': xdd.img = '/static/img/icon/frzsq.png'
              break
            case '门禁补卡申请': xdd.img = '/static/img/icon/mjsq.png'
              break
            case '业务招待申请': xdd.img = '/static/img/icon/zdsq.png'
              break
            case '招待申请': xdd.img = '/static/img/icon/zdsq.png'
              break
            case '会议室申请': xdd.img = '/static/img/icon/hyssq.png'
              break
            case '客户来访申请': xdd.img = '/static/img/icon/lfsq.png'
              break
            case '出差申请': xdd.img = '/static/img/icon/ccsq.png'
              break
            case '公租房入住申请': xdd.img = '/static/img/icon/rzsq.png'
              break
            case '公租房退房申请': xdd.img = '/static/img/icon/tfsq.png'
              break
            case '调岗申请': xdd.img = '/static/img/icon/dgsq.png'
              break
            case '离职申请': xdd.img = '/static/img/icon/lzsq.png'
              break
            case '转正申请': xdd.img = '/static/img/icon/zzsq.png'
              break
            case '培训申请': xdd.img = '/static/img/icon/pxsq.png'
              break
            case '调薪申请': xdd.img = '/static/img/icon/txsq.png'
              break
            case '请假申请': xdd.img = '/static/img/icon/qjsq.png'
              break
          }
        })
      })
      return data
    },
    addApply(a, b) {
      // 获得点击的名字和id
      this.typeName = a
      this.fromValiData.processName = a
      this.fromValiData.processId = b
      this.getFromData(b)
    },
    // 查询申请是否为自定义表单
    getFromData(datas) {
      getCustomerFormGetDataByProcessId({ id: datas })
        .then((res) => {
          // 有自定表单
          if (res.result != null) {
            this.fileListData = res.result
            this.fromValiData.codeBlock = JSON.stringify(this.fileListData)
          } else {
            this.fromValiData.codeBlock = null
          }
        })
        .then(() => {
          // 弹出定制表单
          if (this.fromValiData.codeBlock) {
            this.$layer.iframe({
              content: {
                content: edit, // 传递的组件对象
                parent: this, // 当前的vue对象
                data: {
                  datas: this.fromValiData,
                  params: this.fileListData
                } // props
              },
              area: this.$layer_Size.Normal,
              title: '填写表单',
              maxmin: true,
              shadeClose: false
            })
          } else {
            switch (this.typeName) {
              case '请假申请':
                this.$layer.iframe({
                  content: {
                    content: leaveEdit, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                      datas: this.fromValiData
                    } // props
                  },
                  area: this.$layer_Size.Normal,
                  title: '请假申请',
                  maxmin: true,
                  shadeClose: false
                })
                break;
              case '补卡申请':
                this.$layer.iframe({
                  content: {
                    content: reissueEdit, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                      datas: this.fromValiData
                    } // props
                  },
                  area: this.$layer_Size.Normal,
                  title: '补卡申请',
                  maxmin: true,
                  shadeClose: false
                })
                break;
              case '调岗申请':
                this.$layer.iframe({
                  content: {
                    content: transferEdit, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                      datas: this.fromValiData
                    } // props
                  },
                  area: this.$layer_Size.Normal,
                  title: '调岗申请',
                  maxmin: true,
                  shadeClose: false
                })
                break;
              case '离职申请':
                this.$layer.iframe({
                  content: {
                    content: dimissionEdit, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                      datas: this.fromValiData
                    } // props
                  },
                  area: this.$layer_Size.Normal,
                  title: '离职申请',
                  maxmin: true,
                  shadeClose: false
                })
                break;
              case '转正申请':
                this.$layer.iframe({
                  content: {
                    content: officialEdit, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                      datas: this.fromValiData
                    } // props
                  },
                  area: this.$layer_Size.Normal,
                  title: '转正申请',
                  maxmin: true,
                  shadeClose: false
                })
                break;
              case '采购申请':
                this.$layer.iframe({
                  content: {
                    content: purchaseEdit, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                      datas: this.fromValiData
                    } // props
                  },
                  area: this.$layer_Size.Normal,
                  title: '采购申请',
                  maxmin: true,
                  shadeClose: false
                })
                break;
              case '付款申请':
                this.$layer.iframe({
                  content: {
                    content: paymentEdit, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                      datas: this.fromValiData
                    } // props
                  },
                  area: this.$layer_Size.Normal,
                  title: '付款申请',
                  maxmin: true,
                  shadeClose: false
                })
                break;
              case '借款申请':
                this.$layer.iframe({
                  content: {
                    content: borrowMoeny, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                      datas: this.fromValiData
                    } // props
                  },
                  area: this.$layer_Size.Normal,
                  title: '借款申请',
                  maxmin: true,
                  shadeClose: false
                })
                break;
              case '招待申请':
                this.$layer.iframe({
                  content: {
                    content: businessEdit, // 传递的组件对象
                    parent: this, // 当前的vue对象
                    data: {
                      datas: this.fromValiData
                    } // props
                  },
                  area: this.$layer_Size.Normal,
                  title: '招待申请',
                  maxmin: true,
                  shadeClose: false
                })
                break;
            }
          }
        })
    }
  },
  mounted() {
    this.getType()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.aside {
  height: 90vh;
  background: #fafafa;
  border: 1px solid #ddd;
}
.main {
  min-height: 100&;
}
.content {
  .on {
    display: inline-block;
    width: 5px;
    height: 20px;
    background: #039adf;
  }
  span {
    display: inline-block;
    margin-left: 10px;
    font-size: 16px;
  }
  .boxs {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    .box {
      width: 110px;
      height: 110px;
      border: 1px solid #ddd;
      border-radius: 10px;
      margin: 20px 30px 0 30px;
      text-align: center;
      cursor: pointer;
    }
  }
}
img {
  margin: 10px 0 5px 0;
}
</style>
