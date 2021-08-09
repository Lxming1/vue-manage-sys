<template>
<div>
  <breadcrumb>
    <span slot="one">权限管理</span>
    <span slot="two">权限列表</span>
  </breadcrumb>
  <el-card>
    <right_table :rightMes="rightMes"/>
  </el-card>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
import right_table from './childComponents/rights_table'
export default {
  name: "Rights",
  components:{
    breadcrumb,
    right_table
  },
  data(){
    return{
      rightMes: []
    }
  },
  created() {
    this.getRightMes()
  },
  methods:{
    async getRightMes(){
      const {data: listRes} = await this.$http.get(`rights/list`)
      const {data: treeRes} = await this.$http.get('rights/tree')
      if(listRes.meta.status !== 200) return this.$message.error('获取权限列表失败！')
      this.rightMes = listRes.data
      // console.log(this.rightMes)
      // console.log(treeRes.data)
    }
  }
}
</script>

<style scoped>

</style>
