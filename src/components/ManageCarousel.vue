<template>
    <div class="carouselList" v-for="(item, index) in carouselList" :key="index">
        {{ index }}:<img :src="item">
        <el-upload :show-file-list="false" multiple action="http://localhost:8080/upload"
            :on-success="handlerUploadSuccess" @click="handlerIndex(index)">
            <template #trigger>
                <el-button class="changeButton">点击更换照片</el-button>
            </template>
        </el-upload>
    </div>
    <div class="bottom">
        <el-button class="saveButton" @click="reset">重置</el-button>
        <el-button class="saveButton" type="primary" @click="save">保存</el-button>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import carousel from '@/service/carousel';
import { ElLoading, ElMessage } from 'element-plus';

const { getCarouselList, updateList } = carousel()

let carouselList = ref()
let carouselIndex = ref('')

function reset() {
    fetchData()
}

const save = async () => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    console.log(carouselList.value)
    const res = await updateList(carouselList.value)
    ElMessage({
        message: '修改成功',
        type: 'success',
        plain: true
    })
    fetchData()
    loading.close()
}

function handlerUploadSuccess(response: any) {
    console.log(response)
    // 赋值
    carouselList.value[carouselIndex.value] = response.data.fileUrl
}

function handlerIndex(index: string) {
    carouselIndex.value = index
}

const fetchData = async () => {
    const res = await getCarouselList()
    carouselList.value = res.data
    console.log('轮播图结果为:', carouselList.value)
}


onBeforeMount(() => {
    fetchData()
})

</script>

<style scoped>
.bottom {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    text-align: center;
}

.saveButton {
    width: 200px;
    height: 100px;
}


.changeButton {
    margin-left: 50px;
    width: 100px;
    height: 100px;
}

.carouselList {
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-bottom: 10px;
}

img {
    width: 750px;
    height: 360px;
    object-fit: cover;
}
</style>