 <template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :label-width="90">
    </fromItem>
  </div>
</template>

<script>
import { validatePhoneTwo, NumberIndex } from '@/utils/public.js'
import { getAssetsSupplierAdd, getAssetsSupplierModify } from '@/api/integrated/fixedAssets.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      handleData: function (data) {
        let newData = data.map(item => {
          let option = {
            value: item.id,
            label: item.name
          }
          if (item.children && item.children !== []) {
            option.children = this.handleData(item.children)
          }
          return option
        })
        return newData
      },
      handelOption(options) {
        options.forEach(item => {
          if (item.children.length === 0) {
            delete item.children
          } else {
            this.handelOption(item.children)
          }
        })
      },
      btnLoading: false,
      typeData: [],
      fromValiData: {},
      rules: {
        name: [{ required: true, message: '请填写供应商', trigger: 'blur' }],
        contacts: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
        telephone: [{ required: true, message: '请填写联系电话', trigger: 'blur' }, { validator: validatePhoneTwo, trigger: 'change' }],
        warehousingTime: [{ required: true, message: '请填写合作时间', trigger: 'blur' }],
        mailingAddress: [{ required: true, message: '请填写通信地址', trigger: 'blur' }],
        supplierScale: [{ required: true, message: '请填写规模', trigger: 'blur' }, { validator: NumberIndex, trigger: 'change' }],
        nature: [{ required: true, message: '请选择供应商性质', trigger: 'blur' }]
      },
      fromItemList: [
        { label: '供应商', prop: 'name', value: '', type: 'input', isRqd: true },
        { label: '联系人', prop: 'contacts', value: '', type: 'input', isRqd: true },
        { label: '联系电话', prop: 'telephone', value: '', type: 'input', isRqd: true },
        { label: '合作时间', prop: 'warehousingTime', value: '', type: 'date', isRqd: true },
        { label: '通信地址', prop: 'mailingAddress', value: '', type: 'input', isRqd: true },
        { label: '规模(/人)', prop: 'supplierScale', value: '', type: 'input', isRqd: true },
        {
          label: '性质',
          prop: 'nature',
          value: '',
          type: 'select',
          data: [
            { name: '个人', id: '1' },
            { name: '政府', id: '2' },
            { name: '事业单位', id: '3' },
            { name: '私有企业', id: '4' },
            { name: '国有企业', id: '5' },
            { name: '外资企业', id: '6' },
            { name: '合资企业', id: '7' }
          ],
          isRqd: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.params) {
        getAssetsSupplierModify(this.fromValiData)
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
      } else {
        getAssetsSupplierAdd(this.fromValiData)
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
</style>
