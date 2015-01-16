$('.userbtn').click(function(){
	$('#popup-login').fadeIn(100);
});

$('.exitbtn').click(function(){
	$(this).parents('.popup').fadeOut(100);
});



	//点击'我'按钮
	$('#popup-login-btn').click(function(){
		$('#sysbar .userbtn').addClass('on');
		$(this).parents('.popup').fadeOut(100);
		newtab('browserdefault','wo/wo.html','我','wo/favicon.png');
		var tabnumber = $('.tab').size();
		//获取tab容器宽度
		var tabswidth = $('#tabs').width();
		//平均分配tab宽度
		var tabwidth = Math.floor((tabswidth - 4)/tabnumber);//首tab的左margin
		$('.tab').outerWidth(tabwidth);
		if($('#tabs').hasClass('max')){
			if($('.tab').outerWidth() <= 120){
				$('#tabList').removeClass('hide');
				if(tmpNewTabClick == 1){
					tmpNewTabClick = 2;
					$("#tabs").outerWidth( $("#tabs").width() - $("#tabList").outerWidth(true) );
				}else{
					$("#tabs").outerWidth( $("#tabs").width());
				}
				$('.tab').outerWidth(Math.floor($("#tabs").width()/$('.tab').size()));
			}
		}
        activateTab($($('#tabs').get(0).lastChild));
		marktab();
		$("#omniinput").val("");
		window.setTimeout("document.getElementById('omniinput').focus();", 350);
		tabslayout();
	});