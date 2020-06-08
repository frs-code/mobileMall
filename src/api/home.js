import axios from 'axios';
import jsonp from '@/assets/js/jsonp.js';

//打乱数组顺序
const shuffle = arr =>{
  let arrLen = arr.length;
  let i = arrLen;
  let random;
  while(i--){
    if(i !== (random = Math.floor(Math.random() * arrLen))){
      [arr[i], arr[random]] = [arr[random], arr[i]];
    }
  }
  return arr;
}
//获取幻灯片数据
export const getHomeSlider = ()=>{
  return axios.get('http://www.imooc.com/api/home/slider',{
    timeout:10000
  }).then(
    res=>{
      if(res.data.code === 0){
        let sliders = res.data.slider;
        let slider = [sliders[Math.floor(Math.random() * sliders.length)]];
        sliders = shuffle(sliders.filter(() => Math.random() >= 0.5));
        if(sliders.length === 0){
          sliders = slider;
        }
        return sliders;
      }
      throw new Error('没有获取到数据');
    }
  ).catch(err =>{
    if(err){
      console.log(err);
    }

    return [{
      linkUrl:'https://www.taobao.com',
      picUrl: require('@/assets/img/404.png')
    }];
  });
}

//获取热卖推荐数据--jsonp
export const getHomeRecommend = (page=1,psize=20)=>{
  let url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  let params = {
    page,
    psize,
    type:0,
    fontCatId:''
  };
  return jsonp(url,params,{
    param:'callback',
    timeout: 10000
  }).then(res =>{
    if(res.code === '200'){
      return res;
    }

    throw new Error('没有成功获取到数据');
  }).catch(err =>{
    if(err){
      console.log(err);
    }
  });
}
