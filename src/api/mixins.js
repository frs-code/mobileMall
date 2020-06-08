import {SEARCH_HISTORY_KEYWORD_KEY} from '@/pages/search/config';
import storage from '@/assets/js/storage';

export const selectItem = keyWord =>{
  let keyWords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);//找到所有搜索历史
  if(keyWords.length !== 0){
    keyWords = keyWords.filter(val => {
      //这次的关键词如果在搜索历史里已存在，先剔除掉
      return val != keyWord;
    });
  }
  keyWords.unshift(keyWord);//把这次的关键词放在搜索历史的最开头
  storage.set(SEARCH_HISTORY_KEYWORD_KEY, keyWords);//更新搜索历史
  //跳转到淘宝搜索页
  location.href= `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyWord}`;
}
