
/*头部轮播图动画*/
(function(){
  $("#header-right>ul").delay(1000).animate({top:-55},1000).delay(1000).animate({top:-110},1000).delay(1000).animate({top:-165},1000).delay(1000).animate({top:-220},1000,function(){
    $("#header-right>ul")[0].style.top='0px';
  });
})();

