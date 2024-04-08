<template>
    首页
    <el-popconfirm title="确定退出登录?" @confirm="exit">
        <template #reference>
            <el-button type="primary">退出登录</el-button>
        </template>
    </el-popconfirm>
    <hr>
    <!-- 数据展示区 -->
    <div class="outBox">
        <!-- 分成左右两个部分 -->
        <div class="leftBox">
            <!-- 左边，是今日数据 -->
            <span>今日数据</span>
            <div class="todayIncrement">
                <!-- 当日新增数量 -->
                <div>
                    <!-- 当日新增菜谱数 -->
                    <span>今日新增菜谱数</span>
                    <span style="font-size: 30px;">10个</span>
                </div>
                <div>
                    <!-- 当日新增评论数 -->
                    <span>今日新增评论数</span>
                    <span style="font-size: 30px;">50个</span>
                </div>
            </div>
            <div class="todayBest">
                <!-- 当日点赞最多的菜谱和点赞最多的收藏 -->
                <div>
                    <!-- 当日点赞组多的菜谱介绍 -->
                    <span style="margin-bottom: 10px;">今日点赞最多的菜谱</span>
                    <span>麻辣小龙虾</span>
                    <span>灼灼某人</span>
                    <span>100赞</span>
                </div>
                <div>
                    <!-- 当日收藏最多的菜谱介绍 -->
                    <span style="margin-bottom: 10px;">今日收藏最多的菜谱</span>
                    <span>麻辣小龙虾</span>
                    <span>灼灼某人</span>
                    <span>100赞</span>
                </div>
            </div>
        </div>
        <div class="rightBox">
            <!-- 右边,是总体数据 -->
            <span>总体数据</span>
            <div class="todayIncrement">
                <div>
                    <span>站内用户数量</span>
                    <span style="font-size: 30px;">100个</span>
                </div>
                <div>
                    <span>站内菜谱数量</span>
                    <span style="font-size: 30px;">500个</span>
                </div>
            </div>
            <div class="topTenBox">
                <div>
                    <!-- 点赞数量前十 -->
                    <span>全站点赞数量top10</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                </div>
                <div>
                    <!-- 收藏数量前十 -->
                    <span>全站收藏数量top10</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                    <span>麻辣小龙虾</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue'

const exit = async () => {
    // 退出登录
    localStorage.removeItem('userInfo')
    router.push('/')
}

</script>

<style scoped>
.topTenBox div {
    display: flex;
    flex-direction: column;
    justify-content: left;
    background-color: #f8f8f8;
    width: 200px;
    height: 300px;
    padding-left: 20px;
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
    width: 200px;
    height: 300px;
    padding-left: 20px;
    margin-right: 40px;
    font-size: 20px;
}

.todayBest {
    display: flex;
}

.todayIncrement div {
    width: 200px;
    height: 100px;
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: left;
    line-height: 40px;
    padding-left: 20px;
    margin-right: 40px;
}

.todayIncrement {
    display: flex;
    margin-bottom: 100px;
}

.leftBox {
    width: 50%;
    height: 100%;
    border-right: 1px solid #ccc;
}

.rightBox {
    width: 50%;
    height: 100%;
    margin-left: 60px;
}

.outBox {
    width: 100%;
    height: 90%;
    display: flex;
}
</style>