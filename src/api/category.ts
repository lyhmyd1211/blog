import axios from "@/service/request"

export const getArticleTypeList = (data?:any) => {
  return axios({
      url: "/api/getArticleTypeList",
      method: "get",
      data,
  })
}

export const getListByType = (data?:any) => {
  return axios({
      url: "/api/getArticleList",
      method: "get",
      data,
  })
}