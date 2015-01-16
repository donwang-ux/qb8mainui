$(".entry-box").click(function(){
	$(this).toggleClass("selected");
})

$(".entry-box").dblclick(function(){
	alert("debug提示：双击了，将在新页面打开");
})

// $(".day").click(function(){
// 	$(this).toggleClass("open");
// 	$(this).siblings('ol').toggleClass("show");
// 	$(this).siblings('ol').toggleClass("hide");
// })

$(".tab-vertical").click(function(){
	$(this).addClass("current");
	$(this).removeClass("notcurrent");
	$(this).siblings().removeClass("current");
	$(this).siblings().addClass("notcurrent");
	var tabtarget = $('.tabs-vertical').children('.current').index('ul li');
	console.log(tabtarget);
	var $page = $('#pages-wrapper').children().eq(tabtarget);
	console.log($page);
	$page.siblings().removeClass('showpage');
	$page.siblings().addClass('hidepage');
	$page.addClass('showpage');
	$page.removeClass('hidepage');
})
