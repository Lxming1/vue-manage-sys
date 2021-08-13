<template>
  <div>
    <tree-table
      class="tree-table"
      :data="cateList"
      :columns="columns"
      :selection-type="false"
      :expand-type="false"
      show-index
      index-text="#"
      border
      :show-row-hover="false">
      <template slot="isok" slot-scope="scope">
        <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightseagreen"/>
        <i class="el-icon-error" v-else style="color: red"/>
      </template>
      <template slot="sort" slot-scope="scope">
        <el-tag size="mini" :type="scope.row.cat_level | getTagColor">{{scope.row.cat_level | getLevel}}</el-tag>
      </template>
      <template slot="operate" slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteCate(scope.row)">删除</el-button>
      </template>
    </tree-table>
    <el-pagination
      class="el-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="querInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {tagStyle, pagination} from '@/common/mixin'
export default {
  name: "cate_table",
  mixins: [tagStyle, pagination],
  props:{
    cateList:{
      typ: Array,
      default(){
        return []
      }
    },
    total:{
      type: Number,
      default: 0
    },
    querInfo:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      columns:[
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        //将当前列定义为模板列
        {
          label: '是否有效',
          type: 'template',
          //这一列使用的模板名称
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'sort'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate'
        }
      ]
    }
  },
  methods:{
    async deleteCate(mes){
      const confirm = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirm !== 'confirm') return this.$message.info('已取消删除')
      this.$emit('deleteCate', mes.cat_id)
    }
  }
}
</script>

<style scoped>
.tree-table{
  margin-top: 15px;
  font-size: 13px;
}
.el-pagination{
  margin-top: 15px;
}
</style>
