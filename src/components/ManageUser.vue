<template>
  <div class="searchBox">
    <el-input clearable type="text" v-model.trim="nickName" placeholder="用户名查找" @clear="resetCondition"
      @keyup.enter="searchByNickName">
      <el-icon>
        <Search />
      </el-icon></el-input>
    <el-button :disabled="nickName.length == 0" @click="searchByNickName">查询</el-button>
    <el-button @click="resetCondition">重置</el-button>
  </div>
  <el-table :data="userList" style="width: 100%" v-loading="loading">
    <el-table-column prop="userId" label="id" width="180" />
    <el-table-column prop="nickName" label="昵称" width="180" />
    <el-table-column prop="openid" label="openId" width="180" />
    <el-table-column prop="bio" label="bio" />
    <el-table-column prop="avatarUrl" label="头像">
      <template #default="scope">
        <img :src="scope.row.avatarUrl">
      </template>
    </el-table-column>
    <el-table-column prop="status" label="status">
      <template #default="scope">
        <el-switch v-model="scope.row.status" @change="changeStatusData(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
  <div class="pageBox">
    <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[5, 10]"
      layout="sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" /> <span>共{{ total }}条数据</span>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import user from '@/service/user';
import { ElMessage } from 'element-plus';

const { getAllUser, changeStatus } = user()

let loading = ref(true)
let userList = ref([])
let total = ref()

// 查询条件
let nickName = ref('')
let page = ref(1)
let pageSize = ref(5)

function resetCondition() {
  page.value = 1
  pageSize.value = 5
  nickName.value = ''
  fetchUserData(page.value, pageSize.value)
}

const searchByNickName = async () => {
  fetchUserData(page.value, pageSize.value)
}

const handleSizeChange = async () => {
  console.log('改变页大小', pageSize.value)
  fetchUserData(page.value, pageSize.value)
}

const handleCurrentChange = async () => {
  console.log('改变当前页', page.value)
  fetchUserData(page.value, pageSize.value)
}

const changeStatusData = async (row: any) => {
  // 得到的row中的staus是改变过的,所以直接进行修改就行了,不需要取反
  let user = {
    userId: row.userId,
    // 取反状态
    status: row.status
  }
  const res = await changeStatus(user)
  ElMessage({
    message: '修改成功',
    type: 'success',
    plain: true
  })
}

const fetchUserData = async (page: number, pageSize: number) => {
  loading.value = true
  const res = await getAllUser({
    nickName: nickName.value,
    page,
    pageSize
  })
  console.log('结果为：', res)
  userList.value = res.records
  total.value = res.total
  loading.value = false
}

onBeforeMount(async () => {
  console.log('触发了，请求数据')
  fetchUserData(page.value, pageSize.value)
})

</script>

<style scoped>
.pageBox {
  display: flex;
  align-items: center;
  color: gray;
  margin-top: 20px;
}

.searchBox {
  width: 300px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 40px;
}
</style>