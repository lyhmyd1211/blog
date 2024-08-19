import axios from "@/service/request"
//get
export const getArticleById = (data?:any) => {
    return axios({
        url: "/api/getArticleById",
        method: "get",
        data,
    })
}

