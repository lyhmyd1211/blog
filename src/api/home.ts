import axios from "@/service/request"
//get
export const getArticleList = (data?:any) => {
    return axios({
        url: "/api/getArticleList",
        method: "get",
        data,
    })
}
export const search = (data?:any) => {
    return axios({
        url: "/api/search",
        method: "get",
        data,
    })
}

// //post
// export const search = (data) => {
//   return axios({
//       url: "/api/search",
//       method: "post",
//       data,
//       config: {
//           headers: {
//               'Request-Type': 'wechat'
//           },
//           timeout: 10000
//       }
//   })
// }