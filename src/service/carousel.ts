import axios from "@/utils/http"

export default function () {

    /**
     * 获取轮播图列表
     */
    async function getCarouselList() {
        const res = await axios({
            method: 'GET',
            url: '/carousel/get'
        })
        return res
    }

    /**
     * 更新轮播图列表
     */
    async function updateList(carouselList) {
        const res = await axios({
            method: 'POST',
            url: '/carousel/update',
            data: carouselList
        })
        return res
    }

    return { getCarouselList, updateList }
}