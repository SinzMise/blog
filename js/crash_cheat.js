 /*动态标题开始*/
 var OriginTitile = document.title,
 titleTime;
document.addEventListener("visibilitychange",
function() {
 if (document.hidden) {
   document.title = "笑语盈盈暗香去。众里寻他千百度。";
   clearTimeout(titleTime)
} else {
   document.title = "蓦然回首，那人却在，灯火阑珊处。" ;
   titleTime = setTimeout(function() {
       document.title = OriginTitile
   },
   1000)
}
});
/*动态标题结束*/