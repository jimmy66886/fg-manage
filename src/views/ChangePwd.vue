<template>
  <div class="title">
    <h1>修改密码</h1>
  </div>
  <div class="inputBox">
    <span>原密码</span><el-input v-model.trim="oldPwd" placeholder="请输入原密码" type="password" clearable show-password></el-input>
  </div>
  <div class="inputBox">
    <span>新密码</span><el-input v-model.trim="newPwd" placeholder="请输入新密码" type="password" clearable show-password></el-input>
  </div>
  <div class="inputBox">
    <span>重复新密码</span><el-input v-model.trim="repeatPwd" placeholder="请重复新密码" type="password" clearable
      show-password></el-input>
  </div>

  <div class="bottom">
    <el-button @click="cancel">取消</el-button>
    <el-button @click="save" :disabled="!(newPwd && oldPwd && repeatPwd)">保存</el-button>
  </div>

</template>

<script lang="ts" setup>
import router from '@/router';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import user from '@/service/user';

const { changePwd } = user()

let newPwd = ref('')
let repeatPwd = ref('')
let oldPwd = ref('')

function cancel() {
  router.back()
}

const save = async () => {

  // 先校验新密码和重复密码是否相等
  if (newPwd.value !== repeatPwd.value) {
    ElMessage({
      message: '新密码和重复密码不一致',
      type: 'warning',
      plain: true
    })
    return
  }
  const res = await changePwd({
    oldPwd: oldPwd.value,
    newPwd: newPwd.value
  })
  ElMessage({
    message: '保存成功,请重新登录',
    type: 'success',
    plain: true
  })
  setTimeout(() => {
    localStorage.removeItem('userInfo')
    router.push('/')
  }, 500);

}

</script>

<style scoped>
.title {
  text-align: center;
  color: grey;
}

.bottom {
  text-align: center;
}

.inputBox {
  align-items: center;
  margin: 0 auto;
  width: 600px;
  display: flex;
  margin-bottom: 10px;
}

.inputBox span {
  width: 150px;
}
</style>