<template>
  <el-container class="home_container">
    <!--头部信息-->
    <el-header class="home_header">
      <div class="home_header_left">
        <img src="../assets/img/heima.png" alt="">
        <span style="margin-left: 10px;">电商后台管理系统</span>
      </div>
      <el-button round @click="backClick" type="info" class="backBtn">退出</el-button>
    </el-header>
    <el-container>
    <!--侧边栏信息-->
      <el-aside class="home_left" :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleClick">|||</div>
        <el-menu
          :unique-opened="true"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          style="border-right: 1px"
          router
          :default-active="currentPath">
          <!--一级菜单-->
          <el-submenu :index="item.id+''"
                      v-for="(item,index) in leftMenus"
                      :key="item.id">
            <!--一级菜单模板区域-->
            <template slot="title">
              <!--一级菜单图标-->
              <i :class="iconGroup[index]"></i>
              <!--一级菜单文本-->
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="'/'+item1.path"
                          v-for="item1 in item.children"
                          :key="item1.id">
              <template slot="title">
                <!--一级菜单图标-->
                <i class="el-icon-menu"></i>
                <!--一级菜单文本-->
                <span>{{ item1.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_right">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      leftMenus: [],
      iconGroup:{
        0: 'el-icon-user-solid',
        1: 'el-icon-s-opportunity',
        2: 'el-icon-s-shop',
        3: 'el-icon-s-claim',
        4: 'el-icon-s-goods'
      },
      isCollapse: false,
      currentPath: ''
    }
  },
  created() {
    this.getLeftMes()
  },
  updated() {
    this.currentPath = this.$route.path
  },
  methods:{
    backClick(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getLeftMes(){
      const {data: res} = await this.$http.get('menus')
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.leftMenus = res.data
    },
    toggleClick(){
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.home_container{
  height: 100%;
}
.home_header{
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #373d41;
}
.home_header_left{
  display: flex;
  align-items: center;
  color: white;
  font-size: 25px;
}
.home_left{
  background-color: #333744;
  border-right: none;
}
.home_right{
  background-color: #eaedf1;
}
.toggle-button{
  font-size: 12px;
  color: white;
  text-align: center;
  cursor: pointer;
  background-color: #4A5064;
  line-height: 24px;
  letter-spacing: 0.2em;
}
</style>
