import axios from "@/utils/http"

export default function () {

    /**
     * 登录
     */
    async function login(user) {
        const res = await axios({
            method: 'POST',
            url: '/user/login',
            data: user
        })
        return res
    }

    /**
     * 获取所有的用户
     */
    async function getAllUser() {
        const res = await axios({
            method: 'GET',
            url: '/user/get'
        })
    }

    return { login }
}