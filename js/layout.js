$windowWidth = $(window).width();
$windowHeight = $(window).height();

function calculateheight(){
	$tabbarheight = $('#tabbar').outerHeight();
	$toolbarheight = $('#toolbar').outerHeight();
	$bookmarkbarheight = $('#bookmarkbar').is(':visible') ? $('#bookmarkbar').outerHeight(true) - 2 : 0;
	
	$uiheight = $toolbarheight + $tabbarheight + $bookmarkbarheight - 1;
}

function sidebarlayout(){
	calculateheight();
	$('#sidebar').css({top: $uiheight, bottom: 0});
	if($('#sidebar').hasClass("left")){
		$('#sidebar').css({left: 0,right: "auto"});
	}else{$('#sidebar').css({right: 0,left: "auto"});}
}

function weblayout(){
	calculateheight();
	$('#web').css({top: $uiheight, left: 0, bottom: 0});
	$('#webmask').css({top: 0, left: 0, bottom: 0});
	$browserwidth = $('#browser').outerWidth();

	$webwidth = ($('#sidebar').is(':visible') && $('.sidebarItemShow').hasClass('notFloat')) ? $browserwidth - $('#sidebar').outerWidth(true) : "100%";

	$('#web').outerWidth($webwidth);

	if($('#sidebar').hasClass('visible') && $('.sidebarItemShow').hasClass('notFloat')){
		$weboffset = $('#sidebar').hasClass('left') ? $('#sidebar').outerWidth(true) : 0;
	}else{$weboffset = 0;}

	$('#web').css({left: $weboffset });
	// alert('weblayout');
}


function windowSize(){
	hideAllFloat();
	$("#webmask").hide();
	$windowWidth = $(window).width();
	$windowHeight = $(window).height();
	$('#browser').outerWidth($windowWidth - 240);
	$('#browser').outerHeight($windowHeight - 180);
	$('#browser').css({top: 90, left: 120});
	$('#browser').removeClass("max");
	toolbarlayout();
	tabslayout();
	weblayout();
	showhide();

	// alert("windowSize");
}

function windowMaxRestore(){
	if($('#browser').hasClass("max")){
		windowSize();
		$('#browser').removeClass("max");
		toolbarlayout();
		tabslayout();
		weblayout();
		showhide();
	}else{
		$('#browser').outerWidth($windowWidth);
		$('#browser').outerHeight($windowHeight + 6);
		$('#browser').css({top: -6, left: 0});
		$('#browser').addClass("max");
		toolbarlayout();
		tabslayout();
		weblayout();
		showhide();
	}
}

$('#sysbar .maxbtn').mousedown(function(){
	windowMaxRestore();
})
$('#sysbar .restorebtn').mousedown(function(){
	windowMaxRestore();
})
$('#tophotarea').dblclick(function(){
	windowMaxRestore();
})

function layout1(){
	$('#tabbar').insertBefore($('#toolbar'));
	calculateheight();
	$('#toolbar').css({top: $tabbarheight, left: 0});
	$('#poparea').css({top: $tabbarheight + $toolbarheight - 1, left: 0});
	$('#tabbar').css({top: 0, left: 0});
	$('#bookmarkbar').css({top: ($toolbarheight + $tabbarheight - 2 ), left: 0});
	$('#browser').addClass('tabup');
	$('#browser').removeClass('tabdown');
	toolbarlayout();
	tabslayout();
	// marktab();
}


function layout2(){
	$('#toolbar').insertBefore($('#tabbar'));
	calculateheight();
	$('#tabbar').css({top: $toolbarheight + $bookmarkbarheight - 1, left: 0});
	$('#toolbar').css({top: 0, left: 0});
	$('#bookmarkbar').css({top: ($toolbarheight), left: 0});
	$('#browser').addClass('tabdown');
	$('#browser').removeClass('tabup');
	toolbarlayout();
	tabslayout();
	// marktab();
}



function bookmarkbarshow(){
	$('#bookmarkbar').show();
	$('#browser').addClass('bookmark');
	// $('#btn_bookmark').hide();
	// $('#btn_bookmark').addClass("hidden");
	toolbarlayout();
	weblayout();
	sidebarlayout();
}

function bookmarkbarhide(){
	$('#bookmarkbar').hide();
	$('#browser').removeClass('bookmark');
	$bookmarkbarheight = 0;
	// $('#btn_bookmark').removeClass("hidden");
	// $('#btn_bookmark').show();
	toolbarlayout();
	weblayout();
	sidebarlayout();
}

function sidebarshow(){
	$('#sidebar').fadeIn(100);
	$('#sidebar').addClass("visible");
	weblayout();
	sidebarlayout();
}

function sidebarhide(){
	$('#sidebar').fadeOut(100);
	$('#sidebar').removeClass("visible");
	weblayout();
	sidebarlayout();
}



var layout = 1;
$("#changeLayout").click(function(){
	
	if(layout === 1){
		layout2();
		layout = 2;
		$(this).html("Tab置顶");
	}else{
		layout1();
		layout = 1;
		$(this).html("Tab下置");
	}

});

var sidebar = 1;
$("#changeSidebar").click(function(){
	
	if(sidebar === 1){
		$("#sidebar").removeClass("left");
		$("#sidebar").addClass("right");
		sidebar = 2;
		$(this).html("切换为左侧边栏");
		sidebarlayout();
		weblayout();
	}else{
		$("#sidebar").addClass("left");
		$("#sidebar").removeClass("right");
		sidebar = 1;
		$(this).html("切换为右侧边栏");
		sidebarlayout();
		weblayout();
	}
});

var bookmarkbar = 0;
$("#bookmarkBarSwitch").click(function(){
	
	if(bookmarkbar === 0){
		bookmarkbarshow();
		bookmarkbar = 1;
		$(this).html("隐藏书签栏");
	}else{
		bookmarkbarhide();
		bookmarkbar = 0;
		$(this).html("显示书签栏");
	}

});

var bookmarksidebar = 0;
$("#bookmarkSidebarSwitch").click(function(){
	
	if(bookmarksidebar === 0){
		bookmarksidebar = 1;
		// $(this).html("切换书签侧边栏隐藏/显示");
	}else{
		bookmarksidebar = 0;
		// $(this).html("切换书签侧边栏隐藏/显示");
	}

});




$(function(){ 
	window.onresize = windowSize;  
	windowSize();
	// bookmarkbarshow();
	bookmarkbarhide();
	layout1();
	// weblayout();
	sidebarlayout();
	 // the whole page
});