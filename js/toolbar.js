//toolbar布局计算
function toolbarlayout(){
	//获取toolbar容器宽高
	var toolbarwidth = $('#toolbar').width();
	
	//计算全部按钮宽度之和
	var btnwidth = 0;
	$('.btn:not(.hidden)').each(function() {
		btnwidth += $(this).outerWidth(true);//未隐藏的按钮宽度，累加
	});
	//计算地址栏宽度
	var omniwidth = toolbarwidth - btnwidth;
	$('#omnibox').width(omniwidth - $('#omnibox').outerWidth(true) + $('#omnibox').width());//20为5margin+5padding乘以2
	//计算地址栏内部元素宽度之和（除了输入区域）
	var omniitemwidth = 0;
	$('.omnibtn').each(function() {
		omniitemwidth += $(this).outerWidth(true);//地址栏区域按钮的宽度累加
	});
	//计算地址栏输入框宽度
	$('#omniinput').width($('#omnibox').width() - omniitemwidth);//20为5margin+5padding乘以2
	// alert("toolbarlayout");
}

$('#omniinput').keyup(function(e){
    if(e.keyCode === 13)//当在地址输入框按下回车时
    {
        $(".frame.showframe").each(function () {
			var url = $("#omniinput").val();
			if (url.match("http://")) {
				var iframeSrc = url;//如果输入的url有http://，则不处理
			}else if(url.match("file://")){
				var iframeSrc = url;//如果输入的url有file://，则不处理
			}else if(url.match("chrome://")){
				var iframeSrc = url;//如果输入的url有chrome://，则不处理
			}else if(url.match("about://")){
				var iframeSrc = url;//如果输入的url有about://，则不处理
			}else if(url.match("https://")){
				var iframeSrc = url;//如果输入的url有https://，则不处理
			}else{
				var iframeSrc = "http://" + url;//如果输入的url没有头部，则加上http://
				// checkurllist("iframeSrc");
			}
			$(this).attr("src", iframeSrc);//把处理后的url作为当前iframe的转向url
			$(".tab_current .tabtitle").html(url);//把当前tab标题替换为url
			// $(".tab_current .favicon").attr("src", (iframeSrc + "/favicon.ico"));//把当前tab的favicon替换为url对应的favicon

			var config = {
		        siteIcon:'http://www.google.com/s2/favicons?domain={{siteUrl}}',
		    };
		    var siteUrl = iframeSrc;
		    var imgUrl = config.siteIcon.replace('{{siteUrl}}', siteUrl);
			$(".tab_current .favicon").attr("src", (imgUrl));//把当前tab的favicon替换为url对应的favicon
		});
    }else{}
});

// function checkurllist(){
// 	if (iframeSrc.indexOf('http://www.taobao.com') == 0) {
//       alert("is ireland");
//     }
// }

$("#btn_refresh").mousedown(function(){
	$(".frame.showframe").each(function () {
		var iframeSrc = $(this).attr("src");
		$(this).attr("src", iframeSrc);//点击刷新，用当前url重定向iframe
	});
});
$("#btn_homepage").mousedown(function(){
	$(".frame.showframe").each(function () {
		var iframeSrc = "http://daohang.qq.com";
		$(this).attr("src", iframeSrc);
		$("#omniinput").val("http://daohang.qq.com");
		$(".tab_current .tabtitle").html("上网导航");
		$(".tab_current .favicon").attr("src", ("http://daohang.qq.com/favicon.ico"));
	});
});
			
$(".btn").mousedown(function(){
	$(this).siblings().removeClass("on");
	if($(this).hasClass("toggleBtn")){
		$(this).toggleClass("on");
	}
	if($(this).hasClass("menuBtn")){
		$("#" + $(this).attr("id") + "_menu").siblings().addClass("menuHide");
		$("#" + $(this).attr("id") + "_menu").siblings().removeClass("menuShow");
	}else{
		$(".menu").addClass("menuHide");
		$(".floatbox").addClass("menuHide");
	}
});

function hideAllFloat(){
	$(".menu").addClass("menuHide");
	$(".menu").removeClass("menuShow");
	$(".menuBtn").removeClass("on");
	$(".panelBtn").removeClass("on");
	$(".panel").hide();
	$(".panel").addClass("panelHide");
	$(".panel").removeClass("panelShow");
	$(".floatbox").addClass("menuHide");
	$(".floatbox").removeClass("menuShow");
}

//点击iframe上的遮罩收起菜单
$("#webmask").mousedown(function(){
	hideAllFloat();
	$(this).hide();
});



$(".btn.menuBtn.toggleBtn").mousedown(function(){
	$("#webmask").show();
	var $targetMenuID = $(this).attr("id") + "_menu";
	$("#" + $targetMenuID).toggleClass("menuHide");
	$("#" + $targetMenuID).toggleClass("menuShow");
	var menuWidth = $("#" + $targetMenuID).width();
	if($(this).hasClass("right")){
	var menuPositionX = $(this).offset().left + $(this).outerWidth() - menuWidth;
	}else{
		var menuPositionX = $(this).offset().left;
	}
	var menuPositionY = $(this).offset().top + $(this).outerHeight() + 5;
	
	$("#" + $targetMenuID).css("left",menuPositionX);
	$("#" + $targetMenuID).css("top",menuPositionY);
});
$(".menu > li").click(function(){
	$(this).parent().addClass("menuHide");
	$(this).parent().removeClass("menuShow");
	$(".menuBtn").removeClass("on");
	$("#webmask").hide();
});

$(".panelBtn").mousedown(function(){
	if($(this).hasClass("toggleBtn")){
		$(this).toggleClass("on");
	}
});

$(".panelBtn.toggleBtn").mousedown(function(){
	$("#webmask").show();
	var $targetPanelID = $(this).attr("id") + "_panel";
	$("#" + $targetPanelID).slideDown(300);
	$("#" + $targetPanelID).toggleClass("panelHide");
	$("#" + $targetPanelID).toggleClass("panelShow");
});

$("#tabList").mousedown(function(){
	var tablistpanelPositionX = $("#tabbar").offset().left;
	var tablistpanelPositionY = $("#tabbar").offset().top + $("#tabbar").outerHeight();
	var tablistpanelWidth = $("#browser").width();
	$("#tabList_panel").css("left",tablistpanelPositionX);
	$("#tabList_panel").css("top",tablistpanelPositionY);
	$("#tabList_panel").outerWidth(tablistpanelWidth);
	$("#tabList_tabs").remove();
	$("#tabs").clone(true).appendTo($("#tabList_panel"));
	$("#tabList_panel>#tabs").attr("id","tabList_tabs");

	$("#tabList_tabs").removeClass("");
	$("#tabList_tabs>.tab_current").attr("class","tablist_current");
	$("#tabList_tabs>.tab_back").attr("class","tablist_back");
	$("#tabList_tabs").removeAttr("style");
	$("#tabList_tabs").children().removeClass("tab");
	$("#tabList_tabs").children().removeAttr("style");
	$("#tabList_tabs").children().addClass("tabList_tab");
	$(".tablist_current").css("background-color",colorconfig[$(".tablist_current").attr("tabcolor")]);
});

$(document).on("mouseover",".tablist_back",function(){
	$(this).css("background-color",lightcolorconfig[$(this).attr("tabcolor")]);
});
$(document).on("mouseout",".tablist_back",function(){
	$(this).css("background-color","rgba(0,0,0,0.06)");
});
$(document).on("click",".tablist_back",function(){
	$(this).removeClass("tablist_back");
	$(this).addClass("tablist_current");
	$(this).siblings().removeClass("tablist_current");
	$(this).siblings().addClass("tablist_back");
	$(this).siblings().css("background-color","rgba(0,0,0,0.06)");
	$(this).css("background-color",colorconfig[$(this).attr("tabcolor")]);
	var tablisttarget = $("#tabList_tabs").children('.tablist_current').index('#tabList_panel ul li');
	var $targettab = $('#tabs').children().eq(tablisttarget);
	activateTab($targettab);
});

$(document).on("click",".tabList_tab .tabclose",function(){
	var tablisttarget = $(this).parents('.tabList_tab').index('#tabList_panel ul li');
	var $targettab = $('#tabs').children().eq(tablisttarget);
	
	var $nextlisttab = $(this).parents('.tabList_tab').next();
	$("#tabList_tabs .tabList_tab").removeClass("tablist_current");
	$("#tabList_tabs .tabList_tab").addClass("tablist_back");
	$("#tabList_tabs .tabList_tab").removeAttr("style");
	$nextlisttab.length > 0 ? $nextlisttab.addClass('tablist_current') : $(this).parents('.tabList_tab').prev().addClass('tablist_current');
	$("#tabList_tabs .tablist_current").removeAttr("style");
	$("#tabList_tabs .tablist_current").removeClass("tablist_back");
	
	closeTab($targettab);
	$(this).parents('.tabList_tab').remove();
	$("#tabList_tabs .tablist_current").css("background-color",colorconfig[$("#tabList_tabs .tablist_current").attr("tabcolor")]);

});
function sidebarItemShow($sidebarItem){
	$sidebarItem.siblings().removeClass("sidebarItemShow");
	$sidebarItem.addClass("sidebarItemShow");
}

$(".sidebarBtn").mousedown(function(){
	if($("#sidebar").hasClass("visible") && $("#" + $(this).attr("id") + "_sidebar").hasClass("sidebarItemShow")){
		sidebarhide();
	}else{sidebarshow();}
	var $sidebarItemTargetID = $(this).attr("id") + "_sidebar";
	sidebarItemShow($("#" + $sidebarItemTargetID), function() {
        });
	sidebarlayout();
	weblayout();
});




$("#btn_back").click(function(){
	top.window.history.back();
});
$("#btn_forward").click(function(){
	top.window.history.forward();
});

//初始化
// toolbarlayout();
