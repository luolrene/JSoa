<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" :btnLoading="btnLoading" :labelWidth="120">
      <el-form-item label='附件上传:' slot='upload'>
        <myUpload ref='myUpload' :fileList='fileList'></myUpload>
      </el-form-item>
      <p><i class="el-icon-circle-plus-outline icon" @click="addObject" v-if="num !==3"><span class="text el-icon-user-solid"></span></i></p>
      <p><i class="el-icon-circle-plus-outline icon1" @click="addConst" v-if="sum !==3"><span class="text el-icon-coin"></span></i></p>
    </fromItem>
  </div>
</template>

<script>
import input from '../expense/input_person.vue'
import { getEntertainAddNewData, getEntertainModify, getEntertainApply } from '@/api/finance/business.js'
import { TwoNumber } from '@/utils/public.js'
export default {
  props: {
    params: Object,
    datas: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      num: 1,
      sum: 1,
      fileList: [],
      newFromData: {},
      fromValiData: {
        name: this.$store.getters.userInfo.name,
        userId: this.$store.getters.userInfo.id,
        groupName: this.$store.getters.userInfo.groupName,
        groupId: this.$store.getters.userInfo.groupId,
        counterpartsUser: ''
      },
      userData: [], // 公司参与人
      client2: ['client2', 'company2', 'position2', 'phone2'],
      client3: ['client3', 'company3', 'position3', 'phone3'],
      money2: ['estimatedAmount2', 'project2'],
      money3: ['estimatedAmount3', 'project3'],
      rules: {
        counterpartsUser: [{ required: true, message: '请选择公司参与人', trigger: 'blur' }],
        treatTime: [{ required: true, message: '请填写招待时间', trigger: 'blur' }],
        reasons: [{ required: true, message: '请填写招待事由', trigger: 'blur' }],
        client: [{ required: true, message: '请填写招待客户', trigger: 'blur' }],
        client2: [{ required: true, message: '请填写招待客户', trigger: 'blur' }],
        client3: [{ required: true, message: '请填写招待客户', trigger: 'blur' }],
        company: [{ required: true, message: '请填写招待单位', trigger: 'blur' }],
        company2: [{ required: true, message: '请填写招待单位', trigger: 'blur' }],
        company3: [{ required: true, message: '请填写招待单位', trigger: 'blur' }],
        estimatedAmount: [{ required: true, message: '请填写预计金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        project: [{ required: true, message: '请填写招待项目', trigger: 'blur' }],
        estimatedAmount2: [{ required: true, message: '请填写预计金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }],
        project2: [{ required: true, message: '请填写招待项目', trigger: 'blur' }],
        estimatedAmount3: [{ required: true, message: '请填写预计金额', trigger: 'blur' }, { validator: TwoNumber, trigger: 'change' }]
      },
      fromItemList: [
        { label: '申请人', prop: 'name', value: '', type: 'input', disabled: true },
        { label: '部门', prop: 'groupName', value: '', type: 'input', disabled: true },
        { label: '公司参与人', prop: 'counterpartsUser', value: '', type: 'inputChoice', click: 'getUserDatas', isRqd: true },
        { label: '招待时间', prop: 'treatTime', value: '', type: 'date', isRqd: true },
        { label: '招待事由', prop: 'reasons', value: '', type: 'textarea', isRqd: true },
        { label: '招待客户', prop: 'client', value: '', type: 'input', isRqd: true },
        { label: '招待单位', prop: 'company', value: '', type: 'input', isRqd: true },
        { label: '对方职务', prop: 'position', value: '', type: 'input' },
        { label: '联系电话', prop: 'phone', value: '', type: 'input' },

        { label: '招待客户②', prop: 'client2', value: '', type: 'input', isRqd: true },
        { label: '招待单位②', prop: 'company2', value: '', type: 'input', isRqd: true },
        { label: '对方职务②', prop: 'position2', value: '', type: 'input' },
        { label: '联系电话②', prop: 'phone2', value: '', type: 'input' },

        { label: '招待客户③', prop: 'client3', value: '', type: 'input', isRqd: true },
        { label: '招待单位③', prop: 'company3', value: '', type: 'input', isRqd: true },
        { label: '对方职务③', prop: 'position3', value: '', type: 'input' },
        { label: '联系电话③', prop: 'phone3', value: '', type: 'input' },

        { label: '预计金额', prop: 'estimatedAmount', value: '', type: 'input', isRqd: true },
        { label: '招待项目', prop: 'project', value: '', type: 'input', isRqd: true },
        { label: '预计金额②', prop: 'estimatedAmount2', value: '', type: 'input', isRqd: true },
        { label: '招待项目②', prop: 'project2', value: '', type: 'input', isRqd: true },
        { label: '预计金额③', prop: 'estimatedAmount3', value: '', type: 'input', isRqd: true },
        { label: '招待项目③', prop: 'project3', value: '', type: 'input' }
      ]
    }
  },
  watch: {
    'num': {
      handler: function (newV, oldV) {
        this.fromItemList.forEach(item => {
          if (newV === 2 || newV === 3) {
            if (this.client2.includes(item.prop)) {
              item.isRqd = true
              item.isShow = false
            }
          }
          if (newV === 3) {
            if (this.client3.includes(item.prop)) {
              item.isRqd = true
              item.isShow = false
            }
          }
        })
      }
    },
    'sum': {
      handler: function (newV, oldV) {
        this.fromItemList.forEach(item => {
          if (newV === 2 || newV === 3) {
            if (this.money2.includes(item.prop)) {
              item.isRqd = true
              item.isShow = false
            }
          }
          if (newV === 3) {
            if (this.money3.includes(item.prop)) {
              item.isRqd = true
              item.isShow = false
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.params) {
        getEntertainModify(this.fromValiData)
          .then(res => {
            this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(() => {
            this.btnLoading = false
          })
      } else {
        if (this.datas) {
          getEntertainAddNewData(this.fromValiData)
            .then(res => {
              this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
              this.newFromData = res.result
            })
            .then(() => {
              getEntertainApply(this.newFromData)
                .then(res => {
                  this.$layer.close(this.layerid)
                  this.$parent.getListData()
                  this.$share.message()
                  this.btnLoading = false
                })
                .catch(() => {
                  this.btnLoading = false
                })
            })
        } else {
          getEntertainAddNewData(this.fromValiData)
            .then(res => {
              this.$refs.myUpload.upload(res.result.onlyCode, this, this.layerid)
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$share.message()
              this.btnLoading = false
            })
            .catch(() => {
              this.btnLoading = false
            })
        }
      }
    },
    // 公司参与人
    getUserDatas() {
      this.$layer.iframe({
        content: {
          content: input, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            userData: this.userData
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择参与人',
        maxmin: true,
        shadeClose: false
      })
    },
    // 添加新对象
    addObject() {
      this.num += 1
    },
    addConst() {
      this.sum += 1
    }
  },
  mounted() {
    const clientAll = this.client2.concat(this.client3)
    const moneyAll = this.money2.concat(this.money3)
    const all = clientAll.concat(moneyAll)
    this.fromItemList.forEach(item => {
      if (this.num === 1) {
        if (all.includes(item.prop)) {
          item.isRqd = false
          item.isShow = true
        }
      }
    })
    if (this.params) {
      this.fromValiData = this.params
      this.fromItemList.forEach(item => {
        if (item.prop === 'counterpartsUser') {
          item.disabled = true
        }
      })
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
.icon {
  position: relative;
  bottom: 125px;
  left: 0;
  font-size: 18px;
  color: #0195db;
  cursor: pointer;
}
.icon1 {
  position: relative;
  bottom: 50px;
  left: 0;
  font-size: 18px;
  color: #0195db;
  cursor: pointer;
}
.text {
  margin-left: 3px;
  font-size: 16px;
}
p {
  margin: 0;
}
</style>
