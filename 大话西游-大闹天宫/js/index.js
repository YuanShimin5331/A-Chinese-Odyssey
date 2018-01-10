/**
 * Created by momolizi on 2017/11/22.
 */
var page = document.getElementsByClassName("page");
var view = document.getElementById("view");
var pages = document.getElementById("pages");
var left_part = document.getElementById("left-part");       //左侧固定位置部分
var right_part = document.getElementById("right-part");    //右侧固定导航
var navs = right_part.getElementsByTagName("a");
var index = 0;       //页面牵引
var topBarHeight = document.getElementsByClassName("header")[0].offsetHeight;                  //获取头部
var current = document.getElementsByClassName("current")[0];        //当前页面
console.log(document.documentElement.clientHeight);
var viewY = document.documentElement.clientHeight - topBarHeight;  //可视区域高度
var spans = document.querySelector(".sp");
/*设置每个页面的大小*/
(function(){
  view.style.height = viewY + "px";
  for(var i = 0; i < page.length; i++) {
    page[i].style.height = viewY + "px";
  }
})();

/* 滑轮滚动页面转换事件*/
(function(){
  view.addEventListener("mousewheel",function(e){
    for(var i = index; i >= 0; i--) {
      page[i].style.height = viewY + "px";
    }
    if(e.wheelDelta < 0){
      index +=1;
    }else{
      index -= 1;
    }
    if(index <= 0){
      index = 0
    }
    if(index >=  page.length - 1){
      index = page.length - 1;
    }
    partMove(index);
    pages.style.transform= "translateY("+ (-index * viewY)+"px)";
    
    getNav();
    getCurrent(index);
    textMove(index);
  });
})();

/*第一个page处动画效果*/
/*遮盖层动画*/
(function(){
  var l_mark = document.getElementById("left-mark");
  var r_mark = document.getElementById("right-mark");
  l_mark.style.left = "-100%";
  r_mark.style.right = "-100%";
})();

/* line下滑动画 */
(function(){
     var id =setTimeout(function(){
      var lines = document.getElementsByClassName("line");
      lines[1].style.top = "0px";
      lines[2].style.top = "0px";
      clearTimeout(id);
      id =setTimeout(function(){
        var f_text = document.getElementsByClassName("f-text")[0];
        var f_logo = document.getElementsByClassName("f-logo")[0];
        var f_title = document.getElementsByClassName("f-title")[0];
        lines[0].style.top = "0px";
        lines[3].style.top = "0px";
        f_text.style.bottom = "0px";
        f_logo.style.opacity = 1;
        f_title.style.opacity = 1;
        clearTimeout(id);
        id = setTimeout(function(){
          var f_left =document.getElementById("f-left");
          var f_right = document.getElementById("f-right");
          f_left.style.marginLeft = "0px";
          f_right.style.marginRight = "0px";
          clearTimeout(id);
        },500)
      },500);
    },1000);
})();

/* 点击跳转事件 */
(function(){
  var tabs = document.getElementsByClassName("line-a");
  for(var i = 0; i < tabs.length; i++) {
    tabs[i].setAttribute("index",i);
    tabs[i].onclick = tabSwitch;
  }
})();

/*点击右侧导航跳转*/
(function(){
  for(var i = 0; i < navs.length; i++) {
    navs[i].setAttribute("index",i - 1);
    navs[i].onclick = tabSwitch;
  }
})();

function tabSwitch(){
  index = +this.getAttribute("index") + 1;
  partMove(index);
  var y = -index * viewY;
  pages.style.transform= "translateY("+ y+"px)";
  getNav();
  getCurrent(index);
  textMove(index);
}
/*获取当前页面函数*/
function getCurrent(index){
  for(var i = 0; i < page.length; i++) {
    page[i].className = page[i].className.replace("current","");
  }
  page[index].className += " current";
  current = document.getElementsByClassName("current")[0];        //当前页面
}
/*获取当前页面的nav*/
function getNav(){
  for(var i = 0; i < navs.length; i++) {
    navs[i].className = navs[i].className.replace("hover","");
  }
  navs[index].className += " hover";
}

/* 浏览器窗口变化事件 */
window.onresize = function(){
  console.log(document.documentElement.clientHeight);
  viewY = document.documentElement.clientHeight - topBarHeight;  //可视区域高度
  view.style.height = viewY + "px";
  for(var i = index; i < page.length; i++) {
    page[i].style.height = viewY + "px";
  }
};

/*左右两侧固定部分动画函数*/
function partMove(index){
  if(index === 0){
    right_part.style.display = "none";
    left_part.style.left = "-100px";
  }else{
    right_part.style.display = "block";
    left_part.style.left = "10px";
  }
};

/*文本拖动动画*/
function textMove(index){
  var box = document.getElementsByClassName('hf_box')[index-1];
  var scroll = document.getElementsByClassName('hf_scroll')[index-1];
  var content = document.getElementsByClassName('hf_content')[index-1];
  var bar = document.getElementsByClassName('hf_bar')[index-1];
  var barY_max = scroll.offsetHeight - bar.offsetHeight;
  var barY_min = 0;

  if(content.scrollHeight < box.offsetHeight){
    bar.style.display = 'none';
  }else{
    bar.style.display = 'block';
  }
  
  bar.onmousedown = function(e){
    var y = e.clientY - box.offsetTop - bar.offsetTop;
    document.onmousemove = function(e){
      var barY = e.clientY - box.offsetTop - y;
      barY = barY > barY_max ? barY_max : barY;
      barY = barY < barY_min ? barY_min : barY;
      bar.style.top = barY + 'px';
      var contentY = barY / barY_max *(content.scrollHeight - box.offsetHeight);
      content.style.top = -contentY + 'px';
    }
  };
  document.onmouseup = function(){
    document.onmousemove = null;
  };
  box.addEventListener("mousewheel",function(e){
    e.stopPropagation();
    var barY = bar.offsetTop;
    if(e.wheelDelta < 0){
      barY = bar.offsetTop + 5;
      barY = barY > barY_max ? barY_max : barY;
      bar.style.top = barY+ "px";
    }else{
      barY = bar.offsetTop - 5;
      barY = barY < barY_min ? barY_min : barY;
      bar.style.top = barY + "px";
    }
    var contentY = barY / barY_max *(content.scrollHeight - box.offsetHeight);
    content.style.top = -contentY + 'px';
  })
};



