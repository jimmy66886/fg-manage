import axios from "@/utils/http"

export default function () {

    /**
     * 获取菜谱列表
     */
    async function getRecipeList(recipeDto) {
        const res = await axios({
            method: 'POST',
            url: '/recipe/getList',
            data: recipeDto
        })
        return res
    }

    /**
     * 改变菜谱状态
     */
    async function changeStatus(recipe) {
        const res = await axios({
            method: 'POST',
            url: '/recipe/changeStatus',
            data: recipe
        })
        return res
    }

    return { changeStatus, getRecipeList }
}