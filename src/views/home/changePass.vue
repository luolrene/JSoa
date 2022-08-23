<template>
  <div class="operate-container">
    <el-form ref="psdform" :model="fromValiData" :rules="rules" label-width="90px">
      <el-form-item label="原密码:" prop="pwd">
        <el-input v-model="fromValiData.pwd" placeholder="原密码" clearable show-password>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="password" class="password">
        <el-input v-model="fromValiData.password" placeholder="8-16位密码，区分大小写" clearable show-password>
        </el-input>
        <div class="intensity">
          <span class="psdText">密码强度</span>
          <span class="line" :class="[level.includes('low') ? 'low' : '']"></span>
          <span class="line" :class="[level.includes('middle') ? 'middle' : '']"></span>
          <span class="line" :class="[level.includes('high') ? 'high' : '']"></span>
        </div>
      </el-form-item>
      <el-form-item label="确认密码:" prop="npwc">
        <el-input v-model="fromValiData.npwc" placeholder="确认密码" clearable show-password>
        </el-input>
      </el-form-item>
    </el-form>
    <p class="text">✳新密码必须包含大小写字母、数字、特殊符号</p>
    <div class="btn">
      <el-button @click='cancel()'>取消</el-button>
      <el-button type="primary" @click="onSubmit('fromValiData')">确定</el-button>
    </div>
  </div>
</template>

<script>
import { getUserChange } from '../../api/login.js'
import { b64Md5 } from '../../utils/md5.js'
export default {
  props: {
    layerid: ''
  },
  data() {
    var Validator1 = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('请重新输入新密码'))
      }
      if (value !== this.fromValiData.password) {
        return callback(new Error('两次新密码不相同'))
      }
      callback()
    }
    var Validator2 = (rule, value, callback) => {
      this.level = []
      if (!value || !value.trim()) {
        return callback(new Error('请输入新密码'))
      }
      // 校验是数字
      const regex1 = /^\d+$/
      // 校验字母
      const regex2 = /^[A-Za-z]+$/
      // 校验符号
      const regex3 =
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/
      if (regex1.test(value)) {
        this.level.push('low')
      } else if (regex2.test(value)) {
        this.level.push('low')
      } else if (regex3.test(value)) {
        this.level.push('low')
      } else if (/^[A-Za-z\d]+$/.test(value)) {
        this.level.push('low')
        this.level.push('middle')
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(
          value
        )
      ) {
        this.level.push('low')
        this.level.push('middle')
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
          value
        )
      ) {
        this.level.push('low')
        this.level.push('middle')
      } else if (
        /^[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
          value
        )
      ) {
        this.level.push('low')
        this.level.push('middle')
        this.level.push('high')
      }
      return callback()
    }
    var Validator3 = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('请输入原密码'))
      }
      callback()
    }
    return {
      fromValiData: {
        pwd: '',
        password: '',
        npwc: ''
      },
      rules: {
        pwd: [{ validator: Validator3, required: true, trigger: 'blur' }],
        password: [{ validator: Validator2, required: true, trigger: 'change' }],
        npwc: [{ validator: Validator1, required: true, trigger: 'change' }]
      },
      level: []
    }
  },
  methods: {
    cancel() {
      this.$layer.close(this.layerid)
    },
    onSubmit() {
      let ids = {}
      ids.mobile = this.$store.getters.userInfo.mobile
      if (this.fromValiData.npwc === this.fromValiData.password) {
        ids.pwd = b64Md5(this.fromValiData.pwd).replace(/\+/g, '')
        ids.password = b64Md5(this.fromValiData.password).replace(/\+/g, '')
        this.btnLoading = true
        getUserChange(ids).then(res => {
          this.$share.message('修改成功', 'success')
          this.$layer.close(this.layerid)
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.password {
  margin: 5px 0;
}
.show_pwd {
  cursor: pointer;
  user-select: none;
  padding-right: 5px;
}
.psdText {
  font-size: 14px;
  margin-right: 10px;
}
.intensity {
  word-spacing: 8px;
  text-align: center;
  color: #5e5e5e;
}
.line {
  display: inline-block;
  width: 80px;
  height: 4px;
  background: #d8d8d8;
  border-radius: 3px;
  margin-right: 8px;
  &.low {
    background: #f4664a;
  }
  &.middle {
    background: #ffb700;
  }
  &.high {
    background: #2cbb79;
  }
}
.level {
  margin: 0 16px 0 8px;
}
.text {
  margin-top: 10px;
  text-align: center;
  color: #ff2d2d;
  font-size: 10px;
  margin: 0;
}
.btn {
  margin-top: 15px;
  text-align: center;
}
</style>
