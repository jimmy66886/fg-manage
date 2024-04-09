import axios from "@/utils/http"

export default function () {

    /**
     * 查询今日数据
     */
    async function getToday() {
        const res = await axios({
            method: 'GET',
            url: '/statistics/getToday',
        })
        return res
    }

    /**
     * 查询总体数据
     */
    async function getOverAll() {
        const res = await axios({
            method: 'GET',
            url: '/statistics/getOverall',
        })
        return res
    }

    return { getOverAll, getToday }
}