import axios from "@/utils/http"

export default function () {

    /**
     * 查询分类
     */
    async function getAllCategory() {
        const res = await axios({
            method: 'GET',
            url: '/sysCategory/getAllCategory',
        })
        return res
    }

    /**
     * 删除分类
     */
    async function deleteCategory(categoryId: number) {
        const res = await axios({
            method: 'POST',
            url: '/sysCategory/deleteCategory',
            data: {
                categoryId
            }
        })
        return res
    }

    /**
     * 修改分类
     */
    async function updateCategory(category) {
        const res = await axios({
            method: 'POST',
            url: '/sysCategory/updateCategory',
            data: category
        })
        return res
    }

    /**
     * 添加分类
     */
    async function addCategory(category) {
        const res = await axios({
            method: 'POST',
            url: '/sysCategory/addCategory',
            data: category
        })
        return res
    }

    /**
     * 删除大类
     */
    async function deleteMainCategory(mainCategoryId: number) {
        const res = await axios({
            method: 'POST',
            url: '/sysCategory/deleteMainCategory',
            data: {
                mainCategoryId
            }
        })
        return res
    }

    /**
     * 新增大类
     */
    async function addMainCategory(mainCategoryName: string) {
        const res = await axios({
            method: 'POST',
            url: '/sysCategory/addMainCategory',
            data: {
                name: mainCategoryName
            }
        })
        return res
    }

    return { addMainCategory, deleteMainCategory, addCategory, getAllCategory, deleteCategory, updateCategory }
}