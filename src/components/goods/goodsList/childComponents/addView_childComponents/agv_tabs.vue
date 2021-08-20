<template>
  <el-form
    :model="addForm"
    :rules="addFormRules"
    ref="addFormRef"
    label-position="top">
    <el-tabs
      tab-position="left"
      @tab-click="tabClick"
      v-model="activeName"
      :before-leave="canLeave">
      <el-tab-pane label="基本信息" name="0">
        <el-form-item
          :label="item"
          :prop="Object.keys(addForm)[index]"
          v-for="(item,index) in mesObj">
          <el-input
            v-model="addForm[Object.keys(addForm)[index]]"
            :type="mesType(index)"
            :placeholder="showMes(item)"
            @input="limit"
            v-if="index < 4"/>
          <el-cascader
            v-model="addForm.goods_cat"
            :options="cateList"
            :props="prop"
            v-else
            style="width: 20%;"
            @change="change"
            change-on-select
            placeholder="请选择商品分类"/>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">
        <el-form-item :label='item.attr_name' v-for="item in tagData" :key="item.attr_id">
          <el-checkbox-group v-model="item.attr_vals">
            <el-checkbox :label="item1" v-for="(item1,i) in item.attr_vals" border :key="i"/>
          </el-checkbox-group>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="2">
        <el-form-item :label="item.attr_name" v-for="item in onlyData" :key="item.attr_id">
          <el-input v-model="item.attr_vals"/>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <el-upload
          :action="uploadUrl"
          :on-preview="onPreview"
          :on-remove="onRemove"
          list-type="picture"
          :headers="headerObj"
          :on-success="onSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-dialog
          title="图片预览"
          :visible.sync="showImg"
          width="50%"
          @close="showImg = false">
          <el-image :src="picUrl" style="width: 100%"/>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">
        <quill-editor v-model="addForm.goods_introduce"/>
        <el-button
          type="primary"
          style="margin-top: 15px;"
          size="medium"
          @click="addGoods">添加商品</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import _ from 'lodash'
export default {
  name: "agv_tabs",
  data(){
    return{
      activeName: '0',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      mesObj:['商品名称', '商品价格', '商品重量', '商品数量', '商品分类'],
      addFormRules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
      },
      cateList: [],
      prop:{
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children:'children'
      },
      tagData: [],
      onlyData: [],
      uploadUrl: 'http://timemeetyou.com:8889/api/private/v1/upload',
      headerObj:{
        Authorization: window.sessionStorage.getItem('token')
      },
      showImg: false,
      picUrl: ''
    }
  },
  created() {
    this.getCateMes()
  },
  methods:{
    //获取分类数据
    async getCateMes(){
      const {data: res} = await this.$http.get('categories')
      if(res.meta.status !== 200) return this.$message.error('获取商品分类失败！')
      this.cateList = res.data
    },
    //点击tab时的函数
    tabClick(){
      this.$emit('currentIndex', this.activeName)
      if(this.activeName === '1'){
        this.getCateArr('many')
      }else if(this.activeName === '2'){
        this.getCateArr('only')
      }
    },
    //input类型
    mesType(index){
      if(index === 0) return null
      return 'number'
    },
    //提示
    showMes(mes) {
      return '请输入' + mes
    },
    //限制价格重量数量的值不小于零
    limit(){
      for(let i in Object.keys(this.addForm)){
        if(i > 0){
          if(Object.values(this.addForm)[i] < 0){
            this.addForm[Object.keys(this.addForm)[i]] = 0
          }
        }
      }
    },
    //操作级联选择器时的函数
    change(){
      if(this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
        return this.$message.warning('只允许选中三级分类！')
      }else {
        const str = this.addForm.goods_cat.join(',')
      }
    },
    //判断是否可以切换tabs
    canLeave(activeName, oldActiveName){
      if(oldActiveName === '0' && this.addForm.goods_cat.length !== 3){
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    //请求参数&属性列表
    async getCateArr(sel){
      const id = this.addForm.goods_cat[2]
      const {data: res} = await this.$http.get(`categories/${id}/attributes`,{ params:{ sel } })
      if(res.meta.status !== 200) return this.$message.error('获取数据失败！')
      if(sel === 'many'){
        this.manyDataCon(res)
      }else {
        this.onlyData = res.data
      }
    },
    manyDataCon(res){
      //获取动态属性的操作
      res.data.forEach(item =>{
        item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        item.attr_vals.forEach(i =>{
          if(i === '') item.attr_vals.splice(i, 1)
        })
      })
      this.tagData = res.data
    },
    //图片上传成功的函数
    onSuccess(response){
      //操作收受到的数据
      const picInfo = { pic: response.data.tmp_path }
      this.addForm.pics.push(picInfo)
    },
    //移除图片的函数
    onRemove(file) {
      //准备移除的图片的临时路径
      const filePath = file.response.data.tmp_path
      //获取数组中对应的索引并移除该项
      const index = this.addForm.pics.findIndex(value =>{
        return value.pic === filePath
      })
      this.addForm.pics.splice(index, 1)
      console.log(this.addForm)
    },
    //点击图片的函数
    onPreview(file) {
      this.picUrl = file.response.data.url
      this.showImg = true
    },
    addGoods(){
      this.$refs.addFormRef.validate(async valid =>{
        if(!valid) return this.$message.error('请填写必要的表单项！')
        //深克隆，因为后台要的数据的数据类型要改变，会导致前台报错，所以克隆一份一样的进行操作
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')
        //处理动态参数
        this.tagData.forEach(item =>{
          const newArr = {
            attr_id: item.attr_id,
            attr_vaule: item.attr_vals.join(' ')
          }
          this.addForm.attrs.push(newArr)
        })
        //处理静态参数
        this.onlyData.forEach(item =>{
          const newArr = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addForm.attrs.push(newArr)
        })
        form.attrs = this.addForm.attrs
        const {data: res} = await this.$http.post('goods', form)
        if(res.meta.status !== 201 && res.meta.msg !== '商品名称以存在') return this.$message.error(`创建商品失败！`)
        this.$message.success('创建商品成功！')
        await this.$router.push('/goods')
      })
    }
  }
}
</script>

<style scoped>
.el-tabs{
  margin-top: 15px;
}
.el-input{
}
.el-checkbox{
  margin: 0 10px 0 0 !important;
}
.el-tab-pane{
  padding: 0 20px 0 5px;
}
</style>
