<template>
  <div class="index">
    <el-container class="containerWrapper">
      <el-aside width="200px">
        <list-menu />
      </el-aside>
      <el-container>
        <el-header>
          <headNav />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import headNav from '@/components/Header'
import listMenu from '@/components/ListMenu'
export default {
  name: 'index',
  components: {
    headNav,
    listMenu,
  },
}
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.containerWrapper{
  height: 100%;
}
</style>
