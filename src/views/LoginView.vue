<template>
  <div class="app">
    <div class="carousel">
      <el-carousel height="650px">
        <el-carousel-item v-for="item in imgUrls" :key="item.id">
          <img :src="item.url">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="login">
      <h1 class="title">有食做后台</h1>
      <div class="inputBox">
        <el-input placeholder="请输入账号" v-model.trim="userLoginDto.account" class="input"></el-input>
        <el-input placeholder="请输入密码" clearable v-model.trim="userLoginDto.password" class="input" type="password"
          show-password></el-input>
      </div>
      <div class="loginButtonBox">
        <el-button type="primary" @click="userLogin" class="loginButton">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import user from '@/service/user';
import { ref } from 'vue';
import { ElMessage, ElLoading } from 'element-plus';
import router from '@/router';
const { login } = user()

let imgUrls = ref([
  { id: 1, url: 'http://47.109.139.173:9000/food.guide/item1.jpg' },
  { id: 2, url: 'http://47.109.139.173:9000/food.guide/item2.jpg' },
  { id: 3, url: 'http://47.109.139.173:9000/food.guide/item3.jpg' }
])

let userLoginDto = ref({
  account: '',
  password: ''
})

const userLogin = async () => {
  // 弹出加载框
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {

    const res = await login(userLoginDto.value)
    console.log('得到的结果为:', res.data)
    ElMessage({
      message: '登录成功',
      type: 'success',
      plain: true
    })
    // 将返回结果存入本地缓存
    localStorage.setItem('userInfo', JSON.stringify(res.data))
    router.push('/menu/index')
  } finally {
    loading.close()
  }
}
</script>

<style scoped>
.carousel {
  width: 880px;
}

.carousel img {
  width: 880px;
  height: 650px;
  object-fit: cover;
}

.login {
  padding: 100px;
}

.app {
  margin: 50px auto;
  width: 1280px;
  height: 650px;
  display: flex;
}

.loginButtonBox {
  text-align: center;
}

.loginButton {
  width: 400px;
  background-color: #5DB298;
  border: none;
}

.title {
  text-align: center;
  color: #5DB298;
  margin-top: 100px;
}

.inputBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  height: 40px;
  width: 400px;
  margin-bottom: 10px;
}
</style>