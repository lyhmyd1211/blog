import axios from "@/service/request"

export const getMonth = (data?:any) => {
  return axios({
      url: "/api/getMonth",
      method: "get",
      data,
  })
}