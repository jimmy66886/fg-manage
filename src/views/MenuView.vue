<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="/menu/index" width="100px" router>
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
</script>

<style scoped>
.el-menu {
    height: 97vh;
}
</style>