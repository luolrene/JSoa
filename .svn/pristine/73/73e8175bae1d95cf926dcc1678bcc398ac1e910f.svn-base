 <template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :label-width="100">
      <el-form-item label='上传图片:' slot='upload'>
        <uploadImg ref="myUpload" :datas='imgUrl'></uploadImg>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import group from './groupData.vue'
import input from './input_person.vue'
import {
  getAssetsTypeAdd,
  getAssetsTypeModify
} from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    params: Object,
    fatherId: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      imgUrl: null,
      groupData: null,
      userData: null,
      fromValiData: {
        fatherId: null,
        fatherName: ' ',
        groupNameAll: '',
        operationUserNameAll: '',
        imgUrl: null
      },
      rules: {
        name: [{ required: true, message: '请填写资产类别', trigger: 'blur' }],
        groupNameAll: [{ required: true, message: '请选择管理部门', trigger: 'blur' }],
        operationUserNameAll: [{ required: true, message: '请选择操作人员', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '上级类别', prop: 'fatherName', value: '', type: 'input', disabled: true },
        { label: '资产类别', prop: 'name', value: '', type: 'input', isRqd: true },
        { label: '管理部门', prop: 'groupNameAll', value: '', type: 'inputChoice', click: 'getGroupData', isRqd: true, isShow: false, hasInput: true },
        { label: '操作用户', prop: 'operationUserNameAll', value: '', type: 'inputChoice', click: 'getUserData', isRqd: true, isShow: false, hasInput: true },
        { label: '备注', prop: 'remarks', value: '', type: 'textarea' }
      ]
    }
  },
  methods: {
    getData(ids) {
      this.ids = ids.id.split(',')
    },
    onSubmit() {
      this.btnLoading = true
      if (this.$refs.myUpload.FileId) {
        this.fromValiData.imgUrl = this.$refs.myUpload.FileId
      }
      if (this.params) {
        getAssetsTypeModify(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getTreeData()
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        getAssetsTypeAdd(this.fromValiData)
          .then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getTreeData()
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    getGroupData() {
      this.$layer.iframe({
        content: {
          content: group, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            groupData: this.groupData
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择部门',
        maxmin: true,
        shadeClose: false
      })
    },
    getUserData() {
      if (this.fromValiData.groupIdAll) {
        this.$layer.iframe({
          content: {
            content: input, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              layerid: '',
              groupIdAll: this.fromValiData.groupIdAll,
              groupData: this.groupData,
              userData: this.userData
            } // props
          },
          area: this.$layer_Size.Max,
          title: '选择负责人',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择管理部门'
        })
      }
    }
  },
  mounted() { },
  created() {
    // 判断是否为一级菜单
    if (this.fatherId) {
      this.fromValiData = this.fatherId
      if (this.fatherId.fatherId !== 0) {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'groupNameAll') {
            xdd.isShow = true
            xdd.isRqd = false
          }
          if (xdd.prop === 'operationUserNameAll') {
            xdd.isShow = true
            xdd.isRqd = false
          }
        })
      }
    }
    // 判断是否为编辑
    if (this.params) {
      this.fromValiData = this.params
      this.ids = this.params.groupIdAll.split(',')
      this.fromValiData.imgUrl = Number(this.params.imgUrl)
      this.imgUrl = Number(this.params.imgUrl)
      if (this.params.groupIdAll) {
        let groupId = this.params.groupIdAll.split(',')
        let groupName = this.params.groupNameAll.split(',')
        let newArr = groupId.map((id, i) => ({ id, name: groupName[i] }))
        this.groupData = newArr
      }
      if (this.params.operationUserIdAll) {
        let operationUserId = this.params.operationUserIdAll.split(',')
        let operationUserName = this.params.operationUserNameAll.split(',')
        let newArr1 = operationUserId.map((id, i) => ({
          id,
          name: operationUserName[i]
        }))
        this.userData = newArr1
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
