<template>
  <div v-if="eleList">
    <!-- 表单生成器 -->
    <el-form
      v-if="eleList.list.length > 0"
      :size="eleList.config.size"
      :label-position="eleList.config.labelPosition"
      :label-width="eleList.config.labelWidth + 'px'"
      ref="c_form"
    >
      <!-- 循环展示拖拽的组件 -->
      <div
        v-for="(item, index) in eleList.list"
        :key="index"
        class="formitem-style"
      >
        <el-form-item :label="item.name" :required="item.options.required">
          <dialogformitems
            :eleItem="item"
            :eleConfig="eleList.config"
          ></dialogformitems>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import dialogformitems from '../dialogFormItems'
export default {
  components: {
    dialogformitems: dialogformitems
  },
  props: ['eleList'],
  data() {
    return {}
  },
  methods: {
    // 表单验证方法
    valueCheck() {
      const promises = []
      for (const key of this.eleList.list) {
        if (key.options.required) {
          if (key.options.defaultValue instanceof Array) {
            if (key.options.defaultValue.length === 0) {
              if (key.options.requiredMsg) {
                promises.push(Promise.reject(key.options.requiredMsg))
              } else {
                // eslint-disable-next-line prefer-promise-reject-errors
                promises.push(Promise.reject(`${key.name}必填`))
              }
            }
          } else {
            if (!key.options.defaultValue) {
              if (key.options.requiredMsg) {
                promises.push(Promise.reject(key.options.requiredMsg))
              } else {
                // eslint-disable-next-line prefer-promise-reject-errors
                promises.push(Promise.reject(`${key.name}必填`))
              }
            }
          }
        } else {
          promises.push(Promise.resolve())
        }
      }
      return promises
    },
    getFormVal() {
      return new Promise((resolve, reject) => {
        Promise.all(this.valueCheck())
          .then(res => {
            // 读取数据前先清空表单数据
            this.formsVal = {}
            // 循环读取表单数据
            for (const key of this.eleList.list) {
              Object.assign(this.formsVal, {
                [key.model]: key.options.defaultValue
              })
            }
            resolve(this.formsVal)
          })
          .catch(err => {
            this.$message.error(err)
          })
      })
    }
  }
}
</script>
