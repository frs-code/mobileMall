/*
函数防抖：将多次操作合并为一次操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。

函数节流：使得一定时间内只触发一次函数。原理是通过判断是否有延迟调用函数未执行。

区别： 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。
*/
//防抖
export const debounce = (func, delay = 200) =>{
  let timer = null;
  return function(){
    timer && clearTimeout(timer);
    timer = setTimeout(()=>{
      func.apply(this, arguments);
    }, delay);
  }
}
//节流
export const throttle = (func, delay = 200)=>{
  let flag = true;
  return function () {
    if(!flag){
      return;
    }
    flag = false;
    setTimeout(()=>{
      func.apply(this, arguments);
      flag = true;
    },delay);
  }
}
