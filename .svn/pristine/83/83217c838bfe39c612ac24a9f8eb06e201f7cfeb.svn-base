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
import { getHomeHonorWallModify } from '@/api/integrated/walls.js'
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
      fromValiData: {
      },
      rules: {
        title: [{ required: true, message: '请输入标题', tigger: 'blur' }],
        content: [{ required: true, message: '请输入文本内容', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '标题', prop: 'title', value: '', type: 'input', isRqd: true },
        { label: '是否展示', prop: 'exhibition', value: '', type: 'select', data: [{ name: '是', id: '2' }, { name: '否', id: '1' }], isRqd: true },
        { label: '文本内容', prop: 'content', value: '', type: 'textarea', isRqd: true }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.$refs.myUpload.FileId) {
        this.fromValiData.imgUrl = this.$refs.myUpload.FileId
      }
      getHomeHonorWallModify(this.fromValiData)
        .then(res => {
          this.$layer.close(this.layerid)
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
  mounted() { },
  created() {
    this.fromValiData = this.params
    this.fromValiData.imgUrl = Number(this.params.imgUrl)
    this.imgUrl = Number(this.params.imgUrl)
  }
}
</script>

<style scoped lang="scss">
</style>
