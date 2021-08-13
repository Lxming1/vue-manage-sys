<template>
  <el-dialog
    title="添加商品"
    :visible.sync="isShow"
    width="40%"
    :before-close="isFalse"
    @close="close"
    :close-on-click-modal="false">
    <el-form label-width="70px" :model="message" ref="formRef" :rules="rules">
      <el-form-item
        :label="item" v-for="(item,index) in addMes"
        :prop="index === 0 ? 'cat_name' : null" label-width="95px">
        <el-input
          v-model="message.cat_name"
          :placeholder="showMes(item)"
          :prop="index ? 'cat_name' : null"
          v-if="index === 0"/>
        <el-cascader
          v-model="parentChange"
          :options="cateMes"
          :props="prop"
          v-if="index === 1"
          style="width: 100%;"
          @change="change"
          clearable
          change-on-select/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isFalse">取 消</el-button>
      <el-button type="primary" @click="commit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "cate_addDialog",
  props:{
    isShow: {
      type: Boolean,
      default: false
    },
    cateMes:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      addMes: ['分类名称：', '父级分类：'],
      message:{
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      rules: {
        cat_name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'}
        ]
      },
      prop:{
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children:'children'
      },
      parentChange: []
    }
  },
  methods: {
    isFalse() {
      this.$emit('isFalse')
    },
    commit() {
      this.$refs.formRef.validate(valid =>{
        if(!valid) return
        this.$emit('commit', this.message)
      })
    },
    showMes(mes) {
      return '请输入' + mes
    },
    close(){
      this.$refs.formRef.resetFields()
      this.message = {}
      this.message.cat_pid = 0
      this.message.cat_level = 0
    },
    change(){
      if(this.parentChange.length > 0){
        this.message.cat_pid = this.parentChange[this.parentChange.length-1]
        this.message.cat_level = this.parentChange.length
      }else{
        this.message.cat_pid = 0
        this.message.cat_level = 0
      }
    }
  }
}
</script>

<style scoped>
</style>
