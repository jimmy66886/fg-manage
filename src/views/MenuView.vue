<template>
    <el-container class="container">
        <el-menu width="100px" router default-active="/menu/index">
            <el-menu-item index="/menu/index">
                <el-icon>
                    <House />
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/menu/user">
                <el-icon>
                    <User />
                </el-icon>
                <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/menu/category">
                <el-icon>
                    <List />
                </el-icon>
                <span>分类管理</span>
            </el-menu-item>
            <el-menu-item index="/menu/recipe">
                <el-icon>
                    <ForkSpoon />
                </el-icon>
                <span>菜谱管理</span>
            </el-menu-item>
        </el-menu>
        <el-main>
            <RouterView />
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.el-menu {
    margin-top: -10px;
    margin-left: -10px;
    margin-bottom: -10px;
    border: none;
}
</style>