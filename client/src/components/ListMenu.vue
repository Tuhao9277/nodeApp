<template>
  <div>
    <el-col class="menu_page">
      <div class="logo">
        <img src="@/assets/logo.svg" />
      </div>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin ' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              :to="citem.path"
              v-for="(citem, cindex) in item.children"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'fa-money',
          name: '资金管理',
          path: 'fund',
          children: [{ path: '/fundlist', name: '资金流水' }],
        },
        {
          icon: 'fa-money',
          name: '设备反馈',
          path: 'review',
          children: [{ path: '/userreview', name: '设备反馈' }],
        },
        {
          icon: 'fa-asterisk',
          name: '信息管理',
          path: 'info',
          children: [{ path: '/infoshow', name: '个人信息' }],
        },
      ],
    }
  },
}
</script>
<style scoped>
.logo {
  height: 100%;
  min-width: 200px;
  background-color: #fff;
  text-align: center;
  margin-right: 5px;
}
.logo img{
    width: 125px;
    height: 28px;
    vertical-align: middle;
}
.menu_page {
  position: fixed;
  left: 0;
  width: auto;
  min-height: calc(100vh - 20px);
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: calc(100vh - 20px);
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
