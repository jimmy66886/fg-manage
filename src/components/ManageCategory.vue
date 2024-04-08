<template>
    <div>
        <el-button @click="addMainCategoryFlag = true">添加大类</el-button>
    </div>

    <el-dialog v-model="addMainCategoryFlag" title="添加大类" width="500" align-center>
        <div class="mainCategoryBox">
            <div>
                大类名: <input type="text" v-model="mainCategoryName">
            </div>
            <el-button class="addMainButton" type="primary" @click="saveMainCategory">保存</el-button>
        </div>
    </el-dialog>

    <el-dialog v-model="dialogFlag" title="修改分类" width="500" align-center>
        <div class="updateBox">
            <img :src="categoryItem.img">
            <el-upload :show-file-list="false" multiple action="http://localhost:8080/upload"
                :on-success="handlerUploadSuccess">
                <template #trigger>
                    <el-button class="uploadButton" type="primary">点击更换照片</el-button>
                </template>
            </el-upload>
            <div style="width: 150px; display: flex;">
                分类名:<input style="width: 100px;" v-model="categoryItem.name" />
            </div>
            <el-button class="saveButton" type="primary" @click="saveUpdate">保存</el-button>
        </div>
    </el-dialog>

    <el-dialog v-model="addCategoryFlag" title="添加分类" width="500" align-center>
        <div class="updateBox">
            <img v-if="categoryItem.img != ''" :src="categoryItem.img">
            <img v-else src="http://47.109.139.173:9000/food.guide/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.jpg">
            <el-upload :show-file-list="false" multiple action="http://localhost:8080/upload"
                :on-success="handlerUploadSuccess">
                <template #trigger>
                    <el-button class="uploadButton" type="primary">点击更换照片</el-button>
                </template>
            </el-upload>
            <div style="width: 150px; display: flex;">
                分类名:<input style="width: 100px;" v-model="categoryItem.name" />
            </div>
            <el-button class="saveButton" type="primary" @click="addCategoryData">保存</el-button>
        </div>
    </el-dialog>

    <el-table :data="mainCategoryList">
        <el-table-column prop="name" label="大类名" width="200" />
        <el-table-column label="包含分类" width="600">
            <template #default="scope">
                <!-- 直接使用v-for遍历吧,不适用table了 -->
                <div v-if="scope.row.categoryList.length > 0" class="categoryItem"
                    v-for="item in scope.row.categoryList">
                    <div class="categoryInfo">
                        <span>{{ item.name }}</span>
                        <img :src="item.img">
                    </div>
                    <div class="categoryCtrl">
                        <el-button link type="primary" @click="editCategory(item)">编辑</el-button>
                        <el-popconfirm title="确定要删除该分类吗?" @confirm="deleteCategoryData(item)">
                            <template #reference>
                                <el-button link type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </div>
                <div v-else>暂无分类</div>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="380">
            <template #default="scope">
                <el-popconfirm title="确定要删除该大类吗?该操作会同时删除大类下的所有分类"
                    @confirm="deleteMainCategoryData(scope.row.mainCategoryId)">
                    <template #reference>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
                <el-button type="primary" @click="showAddDialog(scope.row.mainCategoryId)">添加</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import category from '@/service/category';
import { ElMessage } from 'element-plus';

const { addMainCategory, deleteMainCategory, addCategory, getAllCategory, deleteCategory, updateCategory } = category()

let mainCategoryList = ref([])

let dialogFlag = ref(false)
let addCategoryFlag = ref(false)
let addMainCategoryFlag = ref(false)

let categoryItem = ref({
    categoryId: '',
    name: '',
    img: '',
    mainCategoryId: -1
})

let mainCategoryName = ref('')

const saveMainCategory = async () => {
    const res = await addMainCategory(mainCategoryName.value)
    fetchCategoryData()
    ElMessage({
        message: '添加成功',
        type: 'success',
        plain: true
    })
    mainCategoryName.value = ''
    addMainCategoryFlag.value = false
}

const deleteMainCategoryData = async (mainCategoryId: number) => {
    const res = await deleteMainCategory(mainCategoryId)
    fetchCategoryData()
    ElMessage({
        message: '删除成功',
        type: 'success',
        plain: true
    })
}

const addCategoryData = async () => {

    // 校验
    if (categoryItem.value.name === '' || categoryItem.value.img === '') {
        ElMessage({
            message: '请输入完整的信息',
            type: 'warning',
            plain: true
        })
        return
    }

    const res = await addCategory(categoryItem.value)
    ElMessage({
        message: '添加成功',
        type: 'success',
        plain: true
    })
    addCategoryFlag.value = false
    fetchCategoryData()
}

const showAddDialog = async (mainCategoryId: number) => {
    addCategoryFlag.value = true
    // 赋值
    categoryItem.value = {
        categoryId: '',
        name: '',
        img: '',
        mainCategoryId
    }
}

function handlerUploadSuccess(response: any) {
    // response中能拿到上传后返回的结果,其中就有url地址
    categoryItem.value.img = response.data.fileUrl
}

const deleteCategoryData = async (item: any) => {
    const res = await deleteCategory(item.categoryId)
    // 刷新数据
    fetchCategoryData()
    ElMessage({
        message: '删除成功',
        type: 'success',
        plain: true
    })
}

const saveUpdate = async () => {
    const res = await updateCategory(categoryItem.value)
    ElMessage({
        message: '修改成功',
        type: 'success',
        plain: true
    })
    dialogFlag.value = false
    fetchCategoryData()
}

const editCategory = async (item: any) => {
    categoryItem.value = {
        categoryId: item.categoryId,
        name: item.name,
        img: item.img,
        mainCategoryId: item.mainCategoryId
    }
    dialogFlag.value = true
}

const fetchCategoryData = async () => {
    const res = await getAllCategory()
    mainCategoryList.value = res.data
    console.log(mainCategoryList.value)
}

onBeforeMount(() => {
    fetchCategoryData()
})

</script>

<style scoped>
.mainCategoryBox {
    display: flex;
    flex-direction: column;
}

.mainCategoryBox input {
    border: none;
    outline: none;
    border-bottom: 1px solid black;
}

.mainCategoryBox .addMainButton {
    margin-top: 20px;
    width: 220px;
}

.uploadButton {
    width: 150px;
    margin-top: 5px;
    margin-bottom: 10px;
}

.saveButton {
    width: 150px;
}

.updateBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.updateBox input {
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
}

.updateBox img {
    width: 150px;
    height: 150px;
    object-fit: cover;
}

.categoryInfo {
    display: flex;
    justify-content: space-between;
    width: 200px;
    align-items: center;
}

.categoryCtrl {
    display: flex;
}

.categoryItem {
    display: flex;
    width: 300px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.categoryItem img {
    width: 80px;
    height: 80px;
    object-fit: cover;
}
</style>