 <template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :label-width="100">
    </fromItem>
  </div>
</template>

<script>
import input from './input_person.vue'
import { getgroupGetDataById, getGroupModifyGroup } from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      userData: [],
      fromValiData: {
        id: this.$store.getters.userInfo.groupId,
        assetsUserIdAll: null,
        assetsUserNameAll: null
      },
      rules: {
        assetsUserNameAll: [
          { required: true, message: '请选择操作用户', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '部门名称',
          prop: 'name',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '操作用户',
          prop: 'assetsUserNameAll',
          value: '',
          type: 'inputChoice',
          click: 'getUserData',
          isRqd: true
        }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getgroupGetDataById(this.fromValiData).then(res => {
        this.fromValiData = res.result
        this.loading = false
        if (this.fromValiData.assetsUserNameAll) {
          let assetsId = this.fromValiData.assetsUserIdAll.split(',')
          let assetsName = this.fromValiData.assetsUserNameAll.split(',')
          let newArr = assetsId.map((id, i) => ({ id, name: assetsName[i] }))
          this.userData = newArr
        }
      })
    },
    getUserData() {
      this.$layer.iframe({
        content: {
          content: input, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            groupId: this.$store.getters.userInfo.groupId,
            userData: this.userData
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择操作用户',
        maxmin: true,
        shadeClose: false
      })
    },
    onSubmit() {
      this.btnLoading = true
      getGroupModifyGroup(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      })
    }
  },
  mounted() {
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
