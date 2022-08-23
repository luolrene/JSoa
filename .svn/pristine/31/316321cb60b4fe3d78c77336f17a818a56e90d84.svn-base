<!-- <template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      fileList: [],
      btnLoading: false,
      fromValiData: {},
      rules: {
        name: [{ required: true, message: '请填写行业名称', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '上级分类',
          prop: 'fatherName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        }
      ]
    }
  },
  methods: {
    getData(ids) {
      this.fromValiData.ids = ids.id.split(',')
    },
    onSubmit() {
      this.btnLoading = true
      getKnowledgeAdd(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$parent.getTreeData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    },
    getGroupData() {
      this.$layer.iframe({
        content: {
          content: group, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            ids: this.fromValiData.ids
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择部门',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style> -->
