<template>
  <span class="hideSearch">
    <fragment v-if="mode === 'show'">
      <div @click="handleClick">
        <i class="el-icon-d-arrow-right icon"></i>
        <span>条件搜索</span>
      </div>
    </fragment>
    <fragment v-else-if="mode === 'hide'">
      <div @click="handleClick">
        <i class="el-icon-d-arrow-left icon"></i>
        <span>收起搜索</span>
      </div>
    </fragment>
  </span>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object
    },
    mode: {
      type: String,
      default: 'hide'
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      this.obj.boxshow = !this.obj.boxshow
    }
  },
  mounted() {
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
.icon {
  margin-left: 10px;
  font-size: 18px;
  color: #66b1ff;
}
.hideSearch {
  cursor: pointer;
  float: right;
}
.hideSearch:hover span:nth-child(2) {
  color: #0195db;
  text-decoration: underline;
}
</style>
