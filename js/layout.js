
function calculateheight(){
	$tabbarheight = $('#tabbar').outerHeight();
	$toolbarheight = $('#toolbar').outerHeight();
	$bookmarkbarheight = $('#bookmarkbar').is(':visible') ? $('#bookmarkbar').outerHeight(true) : 0;
	$('#bookmarkbar').css({top: ($toolbarheight + $tabbarheight), left: 0});
	$uiheight = $toolbarheight + $tabbarheight + $bookmarkbarheight - 1;
}

function weblayout(){
	calculateheight();
	$('#web').css({top: $uiheight, left: 0, bottom: 0});
}

function layout1(){
	$('#tabbar').insertBefore($('#toolbar'));
	calculateheight();
	$('#toolbar').css({top: $tabbarheight, left: 0});
	$('#tabbar').css({top: 0, left: 0});
	$('#browser').addClass('tabup');
	$('#browser').removeClass('tabdown');
	toolbarlayout();
	tabslayout();
	// marktab();
}


function layout2(){
	$('#toolbar').insertBefore($('#tabbar'));
	calculateheight();
	$('#tabbar').css({top: $toolbarheight, left: 0});
	$('#toolbar').css({top: 0, left: 0});
	$('#browser').addClass('tabdown');
	$('#browser').removeClass('tabup');
	toolbarlayout();
	tabslayout();
	// marktab();
}

function bookmarkbarshow(){
	$('#bookmarkbar').show();
	$('#browser').addClass('bookmark');
	weblayout();
}

function bookmarkbarhide(){
	$('#bookmarkbar').hide();
	$('#browser').removeClass('bookmark');
	weblayout();
}

bookmarkbarhide();
layout1();
weblayout();