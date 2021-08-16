<template>
  <el-dialog
    :title="'修改' + title"
    :visible.sync="isShow"
    width="50%"
    :before-close="isFalse"
    @close="close"
    :close-on-click-modal="false">
    <el-form label-width="70px" :model="message" ref="formRef" :rules="rules">
      <el-form-item :label="title" prop="attr_name" label-width="90px">
        <el-input
          v-model="message.attr_name"
          :placeholder="'请输入新的' + title"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isFalse">取 消</el-button>
      <el-button type="primary" @click="commit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {addDialogCom} from '@/common/mixin'
export default {
  name: "params_tabs_addManyDialog",
  mixins:[addDialogCom],
  props:{
    title:{
      type: String,
      default: ''
    }
  },
  data(){
    return{
      message: {
        attr_name: '',
        attr_sel: ''
      },
      rules:{
        attr_name: [
          {required: true, message: '请输入新的' + this.title, trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    close(){
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
