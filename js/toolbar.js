//toolbar布局计算
function toolbarlayout(){
	//获取toolbar容器宽高
	var toolbarwidth = $('#toolbar').width();
	
	//计算全部按钮宽度之和
	var btnwidth = 0;
	$('.btn').each(function() {
		btnwidth += $(this).outerWidth(true);
	});
	//计算地址栏宽度
	var omniwidth = toolbarwidth - btnwidth;
	$('#omnibox').width(omniwidth - $('#omnibox').outerWidth(true) + $('#omnibox').width());//20为5margin+5padding乘以2
	//计算地址栏内部元素宽度之和（除了输入区域）
	var omniitemwidth = 0;
	$('.omnibtn').each(function() {
		omniitemwidth += $(this).outerWidth(true);
	});
	//计算地址栏输入框宽度
	$('#omniinput').width($('#omnibox').width() - omniitemwidth);//20为5margin+5padding乘以2
	
}



//初始化
toolbarlayout();
