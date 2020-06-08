import jsonp from 'jsonp';

const parseParam = param =>{
  let params = [];
  for(let key in param){
    params.push([key,encodeURIComponent(param[key])]);
  }
  return params.map(val => val.join('=')).join('&');
}
export default (url, data, options) =>{
  url += (url.indexOf('?') < 0 ? '?' : '&') + parseParam(data);

   return new Promise((resolve,reject)=>{
     jsonp(url,options,(err,data) => {
       if(err){
         reject(err);
       } else {
         resolve(data);
       }
     });
   });
}
