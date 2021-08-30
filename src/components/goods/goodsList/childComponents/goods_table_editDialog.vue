<template>
  <el-dialog
    title="修改用户信息"
    :visible.sync="isShow"
    width="50%"
    :before-close="isFalse"
    :close-on-click-modal="false">
    <el-form label-width="70px" :model="goodsMes" :rules="rules" ref="formRef">
      <el-form-item
        :label="item"
        :prop="Object.keys(goodsMes)[index]"
        v-for="(item,index) in mesObj">
        <el-input
          v-model="goodsMes[Object.keys(goodsMes)[index]]"
          :type="mesType(index)"
          :placeholder="showMes(item)"
          @input="limit"/>
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
  name: "goods_table_editDialog",
  props:{
    isShow:{
      type: Boolean,
      default: false
    },
    goodsMes:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      mesObj:['商品名称', '商品价格', '商品重量', '商品数量', '商品介绍'],
      addForm: {
        id: '',
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules:{
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入手机号码', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    showMes(mes) {
      return '请输入' + mes
    },
    isFalse() {
      this.$emit('isFalse')
    },
    close(){
      this.$refs.formRef.resetFields()
    },
    isUsername(item){
      return item !== '用户名';
    },
    commit(){
      this.$refs.formRef.validate(valid =>{
        if(!valid) return
        this.$emit('editCommit', this.goodsMes)
      })
    },
    mesType(index){
      if(index === 0 || index === 4) return null
      return 'number'
    },
    limit(){
      for(let i in Object.keys(this.addForm)){
        if(i > 0){
          if(Object.values(this.addForm)[i] < 0){
            this.addForm[Object.keys(this.addForm)[i]] = 0
          }
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
