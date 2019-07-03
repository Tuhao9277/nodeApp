<template>
    <div class="index">
        <headNav></headNav>
        <list-menu></list-menu>
        <div class="rightContainer">
         <router-view></router-view>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/Header'
import listMenu from '@/components/ListMenu'
export default {
    name:"index",
    components:{
        headNav,
        listMenu
    },
}
</script>
<style scoped>
    .index{
        width:100%;
        height: 100%;
        overflow: hidden;
    }
    .rightContainer{
        position: relative;
        left: 255px;
        top: 0;
        width:calc(100%  - 255px);
        height:calc(100%  - 71px);
        overflow: hidden;
    }
</style>