import axios from 'axios';
import jsonp from '@/assets/js/jsonp';

//获取热门搜索数据
export const getHot = ()=>{
  return axios.get('http://www.imooc.com/api/search/hot').then(res =>{
    let data = res.data.hotKeyWord;
    if(data && data.owner){
      return data.owner;
    }
    throw new Error('没有成功获取到数据');
  }).catch(err => {
    console.log(err);
  });
}

//获取搜索框结果
export const getSearchResult = keyWord =>{
  const url = 'https://suggest.taobao.com/sug';
  const params = {
    q: keyWord,
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  };
  //https://suggest.taobao.com/sug?q=keyWord&code=utf-8&area=c2c&nick=&sid=null&callback=jsonp
  return jsonp(url, params, {
    param: 'callback'
  }).then(res=>{
    if(res.result){
      return res.result;
    }
    throw new Error('没有成功获取到数据');
  }).catch(err=>{
    if(err){
      console.log(err);
    }

  });
}
