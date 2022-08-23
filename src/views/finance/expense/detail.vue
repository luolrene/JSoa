<template>
  <div class="operate-container">
    <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="报销信息" name="first">
        <message :params="params" v-if="tabData.first" />
      </el-tab-pane>
      <el-tab-pane label="报销明细" v-if="params.accountType==='1'" name="second" lazy>
        <expense :params="params" v-if="tabData.second" />
      </el-tab-pane>
      <el-tab-pane label="出差明细" v-if="params.accountType==='2'" name="third" lazy>
        <particulars :params="params" v-if="tabData.third" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import expense from './details/expense.vue'
import message from './details/message.vue'
import particulars from './details/particulars.vue'
export default {
  components: {
    expense,
    message,
    particulars
  },
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      activeName: 'first',
      tabData: {
        first: true,
        second: false,
        third: false
      }
    }
  },
  methods: {
    handleClick(tab) {
      for (var key in this.tabData) {
        if (tab.name !== key) {
          this.tabData[key] = false
        } else {
          this.tabData[key] = true
        }
      }
    }
  },
  mounted() { },
  created() { }
}
</script>

<style lang="scss">
.el-descriptions :not(.is-bordered) td,
.el-descriptions :not(.is-bordered) th {
  width: 200px;
}
.name {
  color: #0195db;
  cursor: pointer;
}
</style>
