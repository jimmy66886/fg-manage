import axios from "@/utils/http"

export default function () {

    /**
     * 发送单条
     */
    async function sendOne(message) {
        const res = await axios({
            method: 'POST',
            url: '/message/send',
            data: message
        })
        return res
    }

    /**
     * 群发消息
     */
    async function sendAll(message) {
        const res = await axios({
            method: 'POST',
            url: '/message/sendAll',
            data: message
        })
        return res
    }

    return { sendOne, sendAll }
}