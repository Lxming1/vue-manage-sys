<template>
  <el-dialog
    title="分配角色"
    :visible.sync="showRole"
    width="50%"
    @close="selectClose"
    :before-close="isFalse"
    :close-on-click-modal="false">
    <div>
      <p>当前的用户：{{twoName.username}}</p>
      <p>当前的角色：{{twoName.role_name}}</p>
      <p>分配新角色：
        <el-select v-model="selectRoles" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isFalse">取 消</el-button>
      <el-button type="primary" @click="commit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "users_addRoles",
  props:{
    showRole:{
      type: Boolean,
      default: false
    },
    twoName:{
      type: Object,
      default:{
        return: {}
      }
    },
    rolesList:{
      type: Array,
      default:{
        return: []
      }
    }
  },
  data(){
    return{
      selectRoles: ''
    }
  },
  methods:{
    isFalse(){
      this.$emit('isFalse')
    },
    commit(){
      if(!this.selectRoles) return this.$message.error('请选择要分配的角色')
      this.$emit('finish', this.selectRoles)
    },
    selectClose(){
      this.selectRoles = ''
      this.$emit('selectClose')
    }
  }
}
</script>

<style scoped>
div{
  font-size: 13px;
}
</style>
