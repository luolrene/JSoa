<template>
  <div class='operate-container'>
    <el-scrollbar class="page-component__scroll" :native="false" >
            <div class="block" style="padding-right: 40px;margin:5px 0 0 5px;">
              <el-steps direction="vertical" :active="this.params.currentStep-1" space='50px'>
                <el-step v-for="(item, id) in flowData" :key="id" :title="item.currentUserName"></el-step>
              </el-steps>
            </div>
          </el-scrollbar>
          <div v-for="(item,index) in logList" :key="index" class="border" :color="item.optinColor">
            <div v-if="item.state==='1'"></div>
            <div v-else>
              <span>{{item.currentUserName}}</span>
              <span style="margin-left:20px">{{item.currentUserTime}}</span>
              <span id='text' :style="{color:item.color}">{{item.stateName}}</span>
              <div style="width:500px;white-space:normal">意见：{{item.currentOpinion}}</div>
            </div>
        </div>
  </div>
</template>

<script>
import { getToExamineStructure } from '@/api/work/myApplication.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      flowData: [],
      logList: []
    }
  },
  methods: {},
  mounted() {
    let obj = {}
    obj.maximumStep = this.params.maximumStep
    obj.applyId = this.params.applyId
    getToExamineStructure(obj).then(res => {
      res.result.forEach(xdd => {
        if (xdd.currentOpinion) {
          xdd.currentOpinion = xdd.currentOpinion
        } else {
          xdd.currentOpinion = ''
        }
        switch (xdd.state) {
          case '1':
            xdd.stateName = '待审核'
            break
          case '2':
            xdd.stateName = '通过'
            xdd.color = '#0bbd87'
            break
          case '3':
            xdd.stateName = '退回'
            xdd.color = '#ff0033'
        }
      })
      this.logList = [].concat(...res.result)
      this.logList.forEach(xdd => {
        switch (xdd.state) {
          case '1':
            xdd.stateName = '待审核'
            break
          case '2':
            xdd.stateName = '通过'
            xdd.color = '#0bbd87'
            break
          case '3':
            xdd.stateName = '退回'
            xdd.color = '#ff0033'
        }
      })
      this.logList = this.logList.filter(item => {
        return item.state !== '1'
      })
      res.result.map(item => {
        if (item.length > 1) {
          let info = { currentUserName: '', currentUserId: '' }
          item.forEach(xdd => {
            info.currentUserName += xdd.currentUserName + ','
          })
          info.currentUserName = info.currentUserName.slice(
            0,
            info.currentUserName.length - 1
          )
          this.flowData.push(info)
        } else {
          this.flowData.push(item[0])
        }
      })
    })
  },
  created() {
    if (this.params) {
      this.fromValiData = this.params
    }
  }
}
</script>

<style>
</style>
