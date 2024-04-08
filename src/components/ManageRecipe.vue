<template>

  <div class="searchBox">
    <el-input clearable type="text" v-model.trim="recipeDto.title" placeholder="标题/分类" @clear="resetCondition"
      @keyup.enter="fetchRecipeData">
      <el-icon>
        <Search />
      </el-icon></el-input>
    <el-button :disabled="recipeDto.title.length == 0" @click="fetchRecipeData">查询</el-button>
    <el-button @click="resetCondition">重置</el-button>
  </div>

  <el-table :data="recipeList" style="width: 100%" v-loading="loading">
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="nickName" label="作者昵称" />
    <el-table-column prop="imageUrl" label="封面">
      <template #default="scope">
        <img :src="scope.row.imageUrl">
      </template>
    </el-table-column>
    <el-table-column label="浏览量/点赞数/收藏数">
      <template #default="scope">
        {{ scope.row.views }}/{{ scope.row.likeNumber }}/{{ scope.row.favoriteNumber }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="简介">
      <template #default="scope">
        {{ cutStrLength(scope.row.intro) }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="status">
      <template #default="scope">
        <el-switch v-model="scope.row.status" @change="changeStatusData(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
  <div class="pageBox">
    <el-pagination v-model:current-page="recipeDto.page" v-model:page-size="recipeDto.pageSize" :page-sizes="[5, 10]"
      layout="sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" /> <span>共{{ total }}条数据</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import recipe from '@/service/recipe';
import { ElMessage } from 'element-plus';

const { getRecipeList, changeStatus } = recipe()

let loading = ref(false)

let recipeList = ref([])
let total = ref(0)
let recipeDto = ref({
  title: '',
  page: 1,
  pageSize: 5,
  orderBy: ''
})

const changeStatusData = async (row: any) => {
  // 得到的row中的staus是改变过的,所以直接进行修改就行了,不需要取反
  console.log(row)
  let recipe = {
    recipeId: row.recipeId,
    status: row.status
  }
  const res = await changeStatus(recipe)
  ElMessage({
    message: '修改成功',
    type: 'success',
    plain: true
  })
}

function cutStrLength(text: string) {
  if (text.length > 8) {
    return text.substring(0, 8) + '...';
  }
  return text;
}

function resetCondition() {
  recipeDto.value = {
    title: '',
    page: 1,
    pageSize: 5,
    orderBy: ''
  }
  fetchRecipeData()
}

const handleSizeChange = async () => {
  fetchRecipeData()
}

const handleCurrentChange = async () => {
  fetchRecipeData()
}

const fetchRecipeData = async () => {
  loading.value = true
  console.log('查询条件为', recipeDto.value)
  const res = await getRecipeList(recipeDto.value)
  recipeList.value = res.records
  total.value = res.total
  loading.value = false
}

onBeforeMount(() => {
  fetchRecipeData()
})

</script>

<style scoped>
.searchBox {
  width: 300px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}


.pageBox {
  display: flex;
  align-items: center;
  color: gray;
  margin-top: 20px;
}

img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>