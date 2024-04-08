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
    async function getAllUser(userDto) {
        const res = await axios({
            method: 'POST',
            url: '/user/get',
            data: userDto
        })
        return res
    }

    /**
     * 改变用户状态
     */
    async function changeStatus(user) {
        const res = await axios({
            method: 'POST',
            url: '/user/changeStatus',
            data: user
        })
        return res
    }

    return { login, getAllUser, changeStatus }
}