<template>
  <el-dialog
    title="修改地址"
    :visible.sync="isShow"
    width="50%"
    @close="close"
    :before-close="isFalse"
    :close-on-click-modal="false">
    <el-form
      label-width="70px"
      :model="addressForm"
      :rules="addressFormRules"
      ref="formRef">
      <el-form-item
        :label="item"
        v-for="(item,index) in addressLabel"
        :prop="Object.keys(addressForm)[index]"
        label-width="90px">
        <el-cascader
          v-model="addressForm.address1"
          :options="cityData"
          v-if="index === 0"
          @change="change"
          change-on-select
          placeholder="请选择省市区/县"
          style="width: 100%"/>
        <el-input
          v-model="addressForm.address2"
          placeholder="请输入详细地址"
          v-else/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isFalse">取 消</el-button>
      <el-button type="primary" @click="isFalse">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import cityData from '@/common/citydata'
export default {
  name: "orders_table_editPositon",
  props:{
    isShow:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      addressLabel: ['省市区/县', '详细地址'],
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules:{
        address1:[{required: true, message: '请选择详细地址', trigger: 'blur'}],
        address2:[{required: true, message: '请输入省市区/县', trigger: 'blur'}]
      },
      prop:{
        expandTrigger: 'hover',
        value: '',
        label: '',
        children:''
      },
      cityData,
    }
  },
  methods:{
    change(){

    },
    close(){
      this.$refs.formRef.resetFields()
    },
    isFalse(){
      this.$emit('isFalse')
    }
  }
}
</script>

<style scoped>

</style>
