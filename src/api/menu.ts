import axios from "@/service/request"

export const getAllTime = (data?:any) => {
  return axios({
      url: "/api/getAllTime",
      method: "get",
      data,
  })
}