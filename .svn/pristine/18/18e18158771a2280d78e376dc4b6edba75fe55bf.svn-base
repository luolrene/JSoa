<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { getRoleGetDateByGroupId } from '@/api/jcxxgl/role.js'
import userList from './input_person.vue'
import group from './groupData.vue'
export default {
  props: {
    params: Object,
    layerid: '',
    steps: Array
  },
  data() {
    return {
      btnLoading: false,
      postData: [],
      fromValiData: {
        type: '1',
        name: ''
      },
      rules: {
        state: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        name: [{ required: true, message: '请选择角色名称', trigger: 'blur' }],
        groupName: [{ required: true, message: '请选择具体部门', trigger: 'blur' }]
      },
      fromItemList: [
        {
          label: '区分',
          prop: 'state',
          value: '',
          type: 'select',
          click: 'getOrId',
          data: [
            { name: '本部门', id: '本部门' },
            { name: '其他部门', id: '其他部门' },
            { name: '人员', id: '人员' }
          ],
          isRqd: true
        },
        {
          label: '部门选择',
          prop: 'groupName',
          value: '',
          type: 'inputChoice',
          click: 'getGroupData',
          isRqd: true
        },
        {
          label: '角色名称',
          prop: 'name',
          value: 'nameOrId',
          type: 'select',
          data: [],
          isRqd: true,
          filterable: true
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      if (this.fromValiData.state === '其他部门') {
        this.fromValiData.name = this.fromValiData.groupName + '-' + this.fromValiData.name
      } else if (this.fromValiData.userName) {
        this.fromValiData.name =
          this.fromValiData.state + '-' + this.fromValiData.userName
      } else if (this.fromValiData.state === '部门分管领导') {
        this.fromValiData.name = this.fromValiData.state
      } else {
        this.fromValiData.nameOrId = this.fromValiData.name
        this.fromValiData.name =
          this.fromValiData.state + '-' + this.fromValiData.name
      }
      this.fromValiData.showName = this.fromValiData.name
      this.$parent.getSteps(this.fromValiData)
      this.$layer.close(this.layerid)
      this.$share.message()
    },
    getOrId() {
      if (this.fromValiData.state === '本部门') {
        getRoleGetDateByGroupId({}).then(res => {
          this.postData = res.result.map(item => {
            return {
              id: item.id,
              name: item.name
            }
          })
          this.fromItemList.forEach(item => {
            if (item.prop === 'name') {
              item.data = this.postData
            }
          })
        })
      } else if (this.fromValiData.state === '其他部门') {
        getRoleGetDateByGroupId({ groupId: this.fromValiData.groupId }).then(
          res => {
            this.postData = res.result.map(item => {
              return {
                id: item.id,
                name: item.name
              }
            })
            this.fromItemList.forEach(item => {
              if (item.prop === 'name') {
                item.data = this.postData
              }
            })
          }
        )
      }
    },
    getGroupData() {
      this.fromValiData.name = ''
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
    },
    addProcess() {
      this.$layer.iframe({
        content: {
          content: userList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            id: this.fromValiData.id,
            obj: this
          } // props
        },
        area: this.$layer_Size.Max,
        title: '添加流程人员',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  watch: {
    'fromValiData.state': {
      deep: true,
      handler: function (newV) {
        if (newV === '人员') {
          this.addProcess()
        }
        this.fromItemList.forEach(item => {
          if (newV === '本部门') {
            if (this.fromValiData.groupName) {
              delete this.fromValiData.groupName
              delete this.fromValiData.name
            }
            if (item.prop === 'groupName') {
              item.isShow = true
              item.isRqd = false
            }
          }
          if (newV === '其他部门') {
            if (item.prop === 'groupName') {
              item.isShow = false
              item.isRqd = true
            }
          }
        })
      }
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData.fatherId = this.params.id
    }
  },
  created() { }
}
</script>

<style scoped lang="scss">
</style>
