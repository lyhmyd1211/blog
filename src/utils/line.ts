class Dotline {
  opt: { [x: string]: any; dom?: string ; cw?: number | undefined; ch?: number | undefined; ds?: number | undefined; r?: number | undefined; cl?: string | undefined; dis?: number | undefined; };
  ctx: any;
  c: any;
  dotSum: number | undefined;
  radius: number | undefined;
  disMax: number | undefined;
  color: string | undefined;
  dots: any[];
  animate: () => void;
  constructor(option: any) {
    this.opt = this.extend({
      dom: 'J_dotLine',//画布id
      cw: 1000,//画布宽
      ch: 500,//画布高
      ds: 100,//点的个数
      r: 0.5,//圆点半径
      cl: '#000',//颜色
      dis: 100//触发连线的距离
    }, option);
    this.c = document.getElementById(this.opt.dom||'');//canvas元素id
    if(this.c){
      this.ctx = this.c.getContext('2d');
    }
    this.c.width = this.opt.cw;//canvas宽
    this.c.height = this.opt.ch;//canvas高
    this.dotSum = this.opt.ds;//点的数量
    this.radius = this.opt.r;//圆点的半径
    if(this.opt.dis&&this.opt.dis){
      this.disMax = this.opt.dis * this.opt.dis;//点与点触发连线的间距
    }
    if (this.opt.cl) {
      this.color = this.color2rgb(this.opt.cl);//设置粒子线颜色
    }
    this.dots = [];
    //requestAnimationFrame控制canvas动画
    let RAF = window.requestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
    let _self = this;
    //增加鼠标效果
    let mousedot:{x:number|null,y:number|null,label:string} = { x: null, y: null, label: 'mouse' };
    this.c.onmousemove = function (e: MouseEvent) {
      let ev = e || window.event;
      mousedot.x = ev.pageX - _self.c.offsetLeft;
      mousedot.y = ev.pageY - _self.c.offsetTop;
    };
    this.c.onmouseout = function (e: any) {
      mousedot.x = null;
      mousedot.y = null;
    }
    //控制动画
    this.animate = function () {
      _self.ctx.clearRect(0, 0, _self.c.width, _self.c.height);
      _self.drawLine([mousedot].concat(_self.dots));
      RAF(_self.animate);
    };
  }

  //合并配置项，es6直接使用obj.assign();
  extend(o: { [x: string]: any; dom?: string; cw?: number; ch?: number; ds?: number; r?: number; cl?: string; dis?: number; }, e: { [x: string]: any; }) {
    for (let key in e) {
      if (e[key]) {
        o[key] = e[key]
      }
    }
    return o;
  }

  //设置线条颜色
  color2rgb(colorStr: string) {
    let red = null,
      green = null,
      blue = null;
    let cstr = colorStr.toLowerCase();//变小写
    let cReg = /^#[0-9a-fA-F]{3,6}$/;//确定是16进制颜色码
    if (cstr && cReg.test(cstr)) {
      if (cstr.length == 4) {
        let cstrnew = '#';
        for (let i = 1; i < 4; i++) {
          cstrnew += cstr.slice(i, i + 1).concat(cstr.slice(i, i + 1));
        }
        cstr = cstrnew;
      }
      red = parseInt('0x' + cstr.slice(1, 3));
      green = parseInt('0x' + cstr.slice(3, 5));
      blue = parseInt('0x' + cstr.slice(5, 7));
    }
    return red + ',' + green + ',' + blue;
  }

  //画点
  addDots() {
    let dot;
    if (this.dotSum&&this.radius) {
      for (let i = 0; i < this.dotSum; i++) {//参数
        dot = {
          x: Math.floor(Math.random() * this.c.width) - this.radius,
          y: Math.floor(Math.random() * this.c.height) - this.radius,
          ax: (Math.random() * 2 - 1) / 1.5,
          ay: (Math.random() * 2 - 1) / 1.5
        }
        this.dots.push(dot);
      }
    }
   
  }

  //点运动
  move(dot: { x: number; ax: number; y: number; ay: number; }) {
    dot.x += dot.ax;
    dot.y += dot.ay;
    if (this.radius) {
        //点碰到边缘返回
    dot.ax *= (dot.x > (this.c.width - this.radius) || dot.x < this.radius) ? -1 : 1;
    dot.ay *= (dot.y > (this.c.height - this.radius) || dot.y < this.radius) ? -1 : 1;
    }
  
    //绘制点
    this.ctx.beginPath();
    this.ctx.arc(dot.x, dot.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.stroke();
  }

  //点之间画线
  drawLine(dots: string | any[]) {
    let nowDot;
    let _that = this;
    //自己的思路：遍历两次所有的点，比较点之间的距离，函数的触发放在animate里
    this.dots.forEach(function (dot: { x: number; y: number;ax: number ;ay: number; }) {

      _that.move(dot);
      for (let j = 0; j < dots.length; j++) {
        nowDot = dots[j];
        if (nowDot === dot || nowDot.x === null || nowDot.y === null) continue;//continue跳出当前循环开始新的循环
        let dx = dot.x - nowDot.x,//别的点坐标减当前点坐标
          dy = dot.y - nowDot.y;
        let dc = dx * dx + dy * dy;
        if (Math.sqrt(dc) > Math.sqrt(_that.disMax||0)) continue;
        // 如果是鼠标，则让粒子向鼠标的位置移动
        if (nowDot.label && Math.sqrt(dc) > Math.sqrt(_that.disMax||0) / 2) {
          dot.x -= dx * 0.02;
          dot.y -= dy * 0.02;
        }
        let ratio;
        ratio = (_that.disMax||0 - dc) / (_that.disMax||1);
        _that.ctx.beginPath();
        _that.ctx.lineWidth = ratio / 2;
        _that.ctx.strokeStyle = 'rgba(' + _that.color + ',' + (ratio + 0.2).toFixed(1) + ')';
        _that.ctx.moveTo(dot.x, dot.y);
        _that.ctx.lineTo(nowDot.x, nowDot.y);
        _that.ctx.stroke();//不描边看不出效果

        //dots.splice(dots.indexOf(dot), 1);
      }
    });
  }

  //开始动画
  start() {
    let _that = this;
    this.addDots();
    setTimeout(function () {
      _that.animate();
    }, 100);
  }
}

export default Dotline;