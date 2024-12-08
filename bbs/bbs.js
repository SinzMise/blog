function loadbbs(){
    $.get("/bbs/bbs",function(data){
        $("#memos-bbsset").html(data);
    });
}

window.DOMReady = function () {
	if (document.querySelector('#memos-bbsset')) loadbbs(); 
};

window.addEventListener("load", DOMReady)
document.addEventListener("pjax:complete", DOMReady)

