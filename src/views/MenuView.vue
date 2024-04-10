<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="currentRoute" width="100px" router>
                    <el-menu-item :index="menuItem.route" v-for="menuItem in menuItems" :key="menuItem.route">
                        <el-icon>
                            <component :is="menuItem.icon"></component>
                        </el-icon>
                        <span>{{ menuItem.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ElMessage } from 'element-plus';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const menuItems = [
    { name: '首页', route: '/menu/index', icon: 'House' },
    { name: '用户管理', route: '/menu/user', icon: 'User' },
    { name: '菜谱管理', route: '/menu/recipe', icon: 'ForkSpoon' },
    { name: '分类管理', route: '/menu/category', icon: 'List' },
    { name: '轮播图管理', route: '/menu/carousel', icon: 'PictureFilled' }
];

const currentRoute = menuItems.find((item) => item.route === route.path)?.route || '';

// 进入页面时判断是否登录
onBeforeMount(() => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo === null) {
        ElMessage({
            message: '请先登录',
            type: 'error',
            plain: true
        })
        router.push('/')
    }
})

</script>

<style scoped>
.el-menu {
    height: 97vh;
}
</style>