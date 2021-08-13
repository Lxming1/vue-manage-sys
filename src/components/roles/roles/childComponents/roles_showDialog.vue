<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="isFalse"
    @close="close">
    <el-tree
      :data="message"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      :default-checked-keys="arr"
      :default-expand-all="true"
      ref="tree"/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isFalse">取 消</el-button>
      <el-button type="primary" @click="commit">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  name: "roles_showDialog",
  props:{
    dialogVisible:{
      type: Boolean,
      default: false
    },
    message:{
      type: Array,
      default(){
        return []
      }
    },
    arr:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods:{
    isFalse(){
      this.$emit('isFalse')
    },
    //关闭时清空checked数组
    close(){
      this.$emit('mesNull')
    },
    commit(){
      const keys = [...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys()]
      const idStr = keys.join(',')
      this.$emit('commit', idStr)
    }
  }
}
</script>

<style scoped>

</style>
