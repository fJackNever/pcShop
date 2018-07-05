import axios from 'axios'
axios.defaults.timeout = 5000; //请求超过5s就报错
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
export default {
  fetchPost(url,params = {}){
      return new Promise((resolve,reject) => {
        axios.post(url,params).then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
  },

  fetchGet(url,params = {}){
    return new Promise((resolve,reject) => {
      axios.get(url,{params}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

}
