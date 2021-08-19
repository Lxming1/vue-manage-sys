<template>
<div>
  <el-tabs v-model="activeName" @tab-click="tabClick" class="tabs">
    <el-tab-pane label="动态参数" name="many">
      <el-button
        type="primary"
        :disabled="!btnShow"
        size="small"
        @click="addShow = true">添加参数</el-button>
      <params_tabs_table
        :arr="manyArr"
        :title="tableTitle"
        :editTitle="addDialogTilte"
        @editCommit="editCommit"
        @deleteAtr="deleteAtr"
        @updateTags="updateTags"/>
    </el-tab-pane>
    <el-tab-pane label="静态属性" name="only">
      <el-button
        type="primary"
        :disabled="!btnShow"
        size="small"
        @click="addShow = true">添加属性</el-button>
      <params_tabs_table
        :arr="onlyArr"
        :title="tableTitle"
        :editTitle="addDialogTilte"
        @editCommit="editCommit"
        @deleteAtr="deleteAtr"
        @updateTags="updateTags"/>
    </el-tab-pane>
  </el-tabs>
  <params_tabs_addDialog
    :isShow="addShow"
    @isFalse="addShow = false"
    :title="addDialogTilte"
    @commit="commit"/>
</div>
</template>

<script>
import params_tabs_table from './params_tabs_table'
import params_tabs_addDialog from './params_tabs_addDialog'
export default {
  name: "params_tabs",
  components:{
    params_tabs_table,
    params_tabs_addDialog
  },
  props:{
    btnShow:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      //默认选中哪一个
      activeName: 'many',
      idArr: [],
      manyArr: [],
      onlyArr: [],
      addShow: false,
      goodsId: ''
    }
  },
  created() {
    this.getArr()
  },
  methods:{
    tabClick(){
      //切换导航时请求新的数据
      if(this.idArr.length === 0){
        this.$message.warning('请选择商品！')
      }else{
        this.getMes()
      }
    },
    //获取列表数据
    async getMes(){
      const {data: res} = await this.$http.get
      (`categories/${this.getId}/attributes`, {
        params: {sel: this.activeName}
      })
      if(res.meta.status !== 200) return this.$message.error('获取参数列表失败！')
      if(this.activeName === 'many') this.manyArr = res.data
      else this.onlyArr = res.data
    },
    //添加按钮
    async commit(mes){
      mes.attr_sel = this.activeName
      const {data: res} = await this.$http.post(`categories/${this.goodsId}/attributes`, mes)
      if(res.meta.status !== 201) return this.$message.error('添加参数失败！')
      this.$message.success('添加参数成功！')
      this.addShow = false
      await this.getMes()
    },
    //编辑按钮
    async editCommit(mes, id){
      mes.attr_sel = this.activeName
      const {data: res} = await this.$http.put(`categories/${this.goodsId}/attributes/${id}`, mes)
      if(res.meta.status !== 200) return this.$message.error('编辑失败！')
      this.$message.success('编辑成功！')
      await this.getMes()
    },
    //删除按钮
    async deleteAtr(id){
      const {data: res} = await this.$http.delete(`categories/${this.goodsId}/attributes/${id}`)
      if(res.meta.status !== 200) return this.$message.error('删除失败！')
      this.$message.success('删除成功！')
      await this.getMes()
    },
    //修改tag
    async updateTags(mes, id){
      const {data: res} = await this.$http.put(`categories/${this.goodsId}/attributes/${id}`, mes)
      if(res.meta.status !== 200) return this.$message.error('修改参数项失败！')
      this.$message.success('修改参数项成功！')
    },
    getArr(){
      this.$bus.$on('getMes', idArr =>{
        if(idArr.length !== 3){
          this.manyArr = []
          this.onlyArr = []
        }else {
          this.idArr = idArr
          this.goodsId = idArr[idArr.length-1]
          this.getMes()
        }
      })
    }
  },
  computed:{
    getId(){
      if(this.idArr.length === 3) {
        return this.idArr[2]
      }
      return null
    },
    tableTitle(){
      if(this.activeName === 'many'){
        return '参数'
      }
      return '属性'
    },
    addDialogTilte(){
      if(this.activeName === 'many'){
        return '动态参数'
      }else if(this.activeName === 'only'){
        return '静态属性'
      }
    }
  }
}
</script>

<style scoped>
.tabs{
  font-size: 12px;
}
</style>
