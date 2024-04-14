<template>
    <div class="title">
        <span>首页</span>
        <div class="exit">
            <el-dropdown>
                <el-button>
                    个人中心<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="updatePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item @click="toProject">项目地址</el-dropdown-item>
                        <el-dropdown-item @click="exit" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <hr>
    <!-- 数据展示区 -->
    <div class="outBox">
        <!-- 分成左右两个部分 -->
        <div class="leftBox">
            <!-- 左边，是今日数据 -->
            <span>今日数据</span>
            <div class="todayIncrement">
                <!-- 当日新增数量 -->
                <div class="item">
                    <!-- 当日新增菜谱数 -->
                    <img src="@/assets/icon_recipe.png">
                    <div class="content">
                        <span>今日新增菜谱数</span>
                        <span style="font-size: 30px;">{{ todayVo.recipeAddition }}个</span>
                    </div>
                </div>
                <div class="item">
                    <img src="@/assets/新增评论.png">
                    <div class="content">
                        <!-- 当日新增评论数 -->
                        <span>今日新增用户数</span>
                        <span style="font-size: 30px;">{{ todayVo.userAddition }}个</span>
                    </div>
                </div>
            </div>
            <div class="todayBest">
                <!-- 当日点赞最多的菜谱和点赞最多的收藏 -->
                <div v-if="todayVo.likeRecipe != null">
                    <span style="margin-bottom: 10px;">今日点赞最多的菜谱</span>
                    <!-- 当日点赞最多的菜谱介绍 -->
                    <img :src="todayVo.likeRecipe.imageUrl" alt="">
                    <span>{{ todayVo.likeRecipe.title }}</span>
                    <span>{{ todayVo.likeRecipe.nickName }}</span>
                    <span>点赞数: {{ todayVo.likeRecipe.likeNumber }}</span>
                </div>
                <div v-else>
                    <span style="margin-bottom: 10px;">今日点赞最多的菜谱</span>
                    <span>暂无数据</span>
                </div>
                <div v-if="todayVo.favoriteRecipe != null">
                    <!-- 当日收藏最多的菜谱介绍 -->
                    <span style="margin-bottom: 10px;">今日收藏最多的菜谱</span>
                    <img :src="todayVo.favoriteRecipe.imageUrl" alt="">
                    <span>{{ todayVo.favoriteRecipe.title }}</span>
                    <span>{{ todayVo.favoriteRecipe.nickName }}</span>
                    <span>收藏数: {{ todayVo.favoriteRecipe.favoriteNumber }}</span>
                </div>
                <div v-else>
                    <span style="margin-bottom: 10px;">今日收藏最多的菜谱</span>
                    <span>暂无数据</span>
                </div>
            </div>
        </div>
        <div class="rightBox">
            <!-- 右边,是总体数据 -->
            <span>总体数据</span>
            <div class="todayIncrement">
                <div class="item">
                    <img src="@/assets/总用户数量.png">
                    <div class="content">
                        <span>站内用户数量</span>
                        <span style="font-size: 30px;">{{ overAllVo.userNumber }}个</span>
                    </div>
                </div>
                <div class="item">
                    <img src="@/assets/Cookbook.png">
                    <div class="content">
                        <span>站内菜谱数量</span>
                        <span style="font-size: 30px;">{{ overAllVo.recipeNumber }}个</span>
                    </div>
                </div>
            </div>
            <div class="topTenBox">
                <div class="topTenItem">
                    <!-- 点赞数量前十 -->
                    <span>全站点赞数量top10</span>
                    <span v-for="(item, index) in overAllVo.likeTop10" :key="item.recipeId">{{ index + 1 }} {{
                        cutStrLength(item.title)
                        }} <img src="http://47.109.139.173:9000/food.guide/%E7%82%B9%E8%B5%9Eed.png">{{
                            item.likeNumber }} </span>
                </div>
                <div class="topTenItem">
                    <!-- 收藏数量前十 -->
                    <span>全站收藏数量top10</span>
                    <span v-for="(item, index) in overAllVo.favoriteTop10" :key="item.recipeId">{{ index + 1 }} {{
                        cutStrLength(item.title)
                        }} <img src="http://47.109.139.173:9000/food.guide/admin收藏.png"> {{
                            item.favoriteNumber
                        }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { onBeforeMount, ref } from 'vue'
import statistics from '@/service/statistics'

const { getToday, getOverAll } = statistics()

let overAllVo = ref({
    likeTop10: [],
    favoriteTop10: [],
    userNumber: 0,
    recipeNumber: 0
})

function cutStrLength(text: string) {
    if (text.length > 5) {
        return text.substring(0, 5) + '...';
    }
    return text;
}

let todayVo = ref({
    // 今日点赞最多
    likeRecipe: {},
    // 今日收藏最多
    favoriteRecipe: {},
    // 今日新增菜谱数
    recipeAddition: 0,
    // 今日新增评论数
    userAddition: 0
})



const updatePwd = async () => {
    // 跳转至修改密码的界面
    router.push('/changePwd')
}

function toProject() {
    // 跳转至项目地址
    window.location.href = "https://github.com/jimmy66886"
}

const exit = async () => {
    // 退出登录
    localStorage.removeItem('userInfo')
    router.push('/')
}

onBeforeMount(async () => {
    // 初始数据
    const res = await getToday()
    todayVo.value = res.data
    const overRes = await getOverAll()
    overAllVo.value = overRes.data
})

</script>

<style scoped>
.topTenItem img {
    width: 20px;
    height: 20px;
}

.topTenItem {
    padding-left: 20px;
}

.title {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.topTenBox div {
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: #f8f8f8;
    width: 230px;
    height: 300px;
    margin-right: 40px;
    font-size: 20px;
}

.topTenBox {
    display: flex;
}

.todayBest div {
    display: flex;
    flex-direction: column;
    justify-content: left;
    background-color: #f8f8f8;
    width: 250px;
    height: 300px;
    padding-left: 20px;
    margin-right: 40px;
    font-size: 20px;
}

.todayBest img {
    width: 150px;
    height: 150px;
    object-fit: cover;
}

.todayBest {
    display: flex;
}

.todayIncrement .item {
    width: 250px;
    height: 100px;
    background-color: #f8f8f8;
    line-height: 40px;
    margin-right: 40px;
}

.todayIncrement img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.item {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.todayIncrement {
    display: flex;
    margin-bottom: 100px;
}

.leftBox {
    width: 50%;
    height: 100%;
    border-right: 1px solid #ccc;
    margin-left: 10px;
}

.rightBox {
    width: 50%;
    height: 100%;
    margin-left: 20px;
}

.outBox {
    width: 100%;
    height: 90%;
    display: flex;
    background-color: #EBEDF0;
}
</style>