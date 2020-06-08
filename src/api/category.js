import axios from 'axios';

//CancelToken:快速发送多个请求时，取消前面的请求，以最后一个为准
const CancelToken = axios.CancelToken;
let cancel;
//获取分类数据
export const getCategory = id =>{
  cancel && cancel('取消了前一次请求');
  cancel = null;

  return axios.get(`http://www.imooc.com/api/category/content/${id}`,{
    timeout:10000,
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  }).then(res => {
    if(res.data.code === 0){
      return res.data;
    }
    throw new Error('没有成功获取到数据');
  }).catch(err =>{
    console.log(err);
  })
}
