<template>
  <div class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
          <div class="logo">
        <img src="@/assets/logo.svg" />
          </div>
        <div class="title">美团网后台管理系统</div>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img
            :src="user.avatar"
            class="avatar"
            srcset
          />
                <div class="welcome">
                  <p class="name comename">
                    欢迎
                    <span class="name avatarname">
                      {{user.name}}

                    </span>
                  </p>
                </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout"> 退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "header-nav",
  computed: {
      user(){
          return this.$store.getters.user;
      }
  },
  methods: {
      setDialogInfo(cmdItem){
          switch (cmdItem){
              case "info":
                  this.showInfoList();
                  break;
              case "logout":
                  this.logout();
                  break;
          }
      },
      showInfoList(){
          this.$router.push('/infoshow')
      },
      logout(){
          // 清除token
          localStorage.removeItem('eleToken')
          // 清除vuex store
          this.$store.dispatch('clearCurrentState')
          // 跳转
          this.$router.push('/login')
      }
  },
};

</script>
<style  scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  color: #fff;
  overflow: hidden;
  background: linear-gradient(120deg, #00e4d0, #5983e8);
  transition: background 0.25s ease;
}

.logo-container {
  line-height: 60px;
  min-width: 600px;
  display: flex;
 
}

.logo {
  height: 100%;
  min-width: 255px;
  background-color: #fff;
  text-align: center;
  margin-right: 5px;
}
.logo img{
    width: 125px;
    height: 28px;
    vertical-align: middle;
}

.title {
  vertical-align: middle;
  font-size: 22px;
  margin-left: 20px;
  letter-spacing: 3px;
}

.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}

.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}

.comename {
  font-size: 12px;
}

.avatarname {
  color: #fff;
  font-weight: bolder;
}

.username {
  cursor: pointer;
  margin-right: 5px;
}

.el-dropdown {
  color: #fff;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
