import axios from "@/utils/http"

export default function () {

    /**
     * 测试
     */
    async function getRecipeList() {
        const res = await axios({
            method: 'GET',
            url: '/recipe/test',
        })
        return res
    }

    return { getRecipeList }
}