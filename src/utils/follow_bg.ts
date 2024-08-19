export default function followBg () {
  //定义滚动背景容器变量
  let oUl = document.getElementById('follow-box');
  let oLi:any;
      if (oUl) {
        oLi = oUl.getElementsByTagName('li')
      }
      //获取当前窗口的尺寸并改变其中心为原点坐标，也可以改为仅获取指定层的坐标:oUl.offsetWidth
      let x = document.body.offsetWidth/2
      let y = document.body.offsetHeight/2;

  //设置当前窗口内的鼠标移动事件，也可以改为仅作用于指定层:oUl.onmousemove
  document.body.onmousemove = function (event) {
      //获取鼠标在当前窗口内的坐标值，也可以改为获取指定层的坐标:event.offsetX
      var mx = event.clientX,
          my = event.clientY;

      //开始为每个要动的元素设置左边距和上边距，以每个元素的不同zIndex值来区别移动量
      for (var i=0; i<oLi.length; i++) {
          //左边距和上边距的值可以随意调整
          oLi[i].style.marginLeft=(x-mx)/(90*oLi[i].style.zIndex)+'px';
          oLi[i].style.marginTop=(y-my)/(70*oLi[i].style.zIndex)+'px';
      }
  };
}