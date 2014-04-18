	

	//当宽度小于XX，隐藏favicon
	function showhide(){
	var $tabwidth = $('.tab').outerWidth();
	if($tabwidth < 160 && $tabwidth > 40){
			$('.tab').addClass('tabwidth100');
			$('.tab').removeClass('tabwidth40 tabwidth36');
			
		}else if($tabwidth <= 40 && $tabwidth > 28){
			$('.tab').addClass('tabwidth40');
			$('.tab').removeClass('tabwidth100 tabwidth36');
			// $('#tabList').show();
		}else if($tabwidth <= 28 && $tabwidth > 18){
			$('.tab').addClass('tabwidth36');
			$('.tab').removeClass('tabwidth100 tabwidth40');
			// $('#tabList').show();
		}else if($tabwidth >= 160){
			$('.favicon').show();
			$('.tab').removeClass('tabwidth100 tabwidth40 tabwidth36');
		}
	}

	//对tab进行必要的标记
	function marktab(){
		$('.tab').removeClass('prevtab nexttab first_tab last_tab');
		$('#tabs li:first').addClass('first_tab');
		$('#tabs li:last').addClass('last_tab');
		$('.tab_current').removeClass('tab_back');
		$('.tab_current').prev(".tab").addClass('prevtab');
		$('.tab_current').next(".tab").addClass('nexttab');
		$('.tab_current').siblings(".tab").addClass("tab_back");
	}
	//新建tab
	function newtab(){
		// $('<li class="tab tab_back" tabcolor="browserdefault"><img class="favicon" src="welcome/favicon.png"><span class="tabtitle">常用网站</span><div class="tabclose"></div></li>').insertBefore($("#tabList"));
		$('#tabs').append('<li class="tab tab_back" tabcolor="browserdefault"><img class="favicon" src="welcome/favicon.png"><span class="tabtitle">常用网站</span><div class="tabclose"></div></li>');
		// $('#web').append('<iframe src="newtab/newtab.html" width="100%" height="100%" class="frame"></iframe>');
		$('#web').append('<iframe src="about:blank" width="100%" height="100%" class="frame"></iframe>');
		showhide();
		marktab();
	}

	//tab布局计算
	function tabslayout(){
		$('#tabs').width($("#tabbar").width() - $("#newTab").outerWidth());
		//计算tab数量
		var tabnumber = $('.tab').size();
		//获取tab容器宽度
		var tabswidth = $('#tabs').width();
		//平均分配tab宽度
		var tabwidth = Math.floor((tabswidth - 4)/tabnumber);//首tab的左margin
		// //todo处理tab的marginleft
		
		
		$('.tab').outerWidth(tabwidth);
		//todo：tabs容器宽度赋值
		// if(($("#tabbar").width() - $tabswidth - $("#newTab").outerWidth() - $("#tabList").outerWidth()) >= $(".tab").width() - 10 ){
		// 	$('.tab').outerWidth(($("#tabbar").width() - $("#newTab").outerWidth() - $("#tabList").outerWidth() - $('.tab').size()*5)/$('.tab').size());
		// }else{}


		if($('.tab').outerWidth() >= 232){
			// alert('232');
			$('.tab').outerWidth(232);
			$("#tabs").removeClass("max");
			$('#tabs').width($('.tab').outerWidth() * tabnumber + 4);//首tab的左margin
			$('#tabList').addClass('hide');
			// $("#tabs").width($('.tab').outerWidth() * tabnumber);
			// $("#tabs").width($('.tab').outerWidth() * tabnumber);
		}else if($('.tab').outerWidth() < 232 && $('.tab').outerWidth() > 120){//如果标签宽度小于默认宽度，也就是标签受到挤压
			// alert('100-232');
			$("#tabs").addClass("max");
			$("#tabs").outerWidth( $("#tabbar").width() - $("#newTab").outerWidth(true));
			$('.tab').outerWidth(Math.floor($("#tabs").width()/$('.tab').size()));
			$('#tabList').addClass('hide');
		}else if($('.tab').outerWidth() <= 120){
			// alert('<=100');
			$("#tabs").addClass("max");
			$('#tabList').removeClass('hide');
			$("#tabs").outerWidth( $("#tabbar").width() - $("#newTab").outerWidth(true) - $("#tabList").outerWidth(true) );
			$('.tab').outerWidth(Math.floor($("#tabs").width()/$('.tab').size()));
		}
	}

	//切换当前frame
	function framechange(){
		var frametarget = $('#tabs').children('.tab_current').index('#tabbar ul li');
		var $frame = $('#web').children().eq(frametarget);
		$frame.siblings().removeClass('showframe');
		$frame.addClass('showframe');
		$("#omniinput").val($frame.attr("src"));
		// alert("framechange");
	}
	//单击切换当前tab
	//function tabclick(){
		/*$('.tab').click(function(){
			$(this).siblings().removeClass("tab_current");
			$(this).addClass("tab_current");
			//点击某tab，切换iframe展示
			framechange();
			marktab();
			showhide();
		});*/
	//}


    function activateTab($tab) {
        $tab.siblings(".tab").removeClass("tab_current");
        $tab.siblings(".tab").addClass("tab_back");
        if($tab.hasClass("tab_back")){
        	$tab.addClass("recent");
        }
        $tab.removeClass("tab_back");

        $tab.addClass("tab_current");
        
        $tab.css("background-color",colorconfig[$tab.attr("tabcolor")]);
        // $(".tab:not(.tab_current):hover").css("background-color",colorconfig[$(this).attr("tabcolor")]);
        $tab.siblings(".tab").css("background-color","transparent");
        //点击某tab，切换iframe展示
        framechange();
        marktab();
        showhide();
    }
  //   $(".tab").mouseover(function(){
  //   	if($(this).hasClass("tab_back")){
  //   		$(this).css("background-color",lightcolorconfig[$(this).attr("tabcolor")]);
		// }
  //   });
  //   $(".tab").mouseout(function(){
  //   	if($(this).hasClass("tab_back")){
  //   		$(this).css("background-color","transparent");
		// }
  //   });


	//标记悬停tab的前后tab
	function marktabtempover($tab){
		$(".tab").removeClass('prevtabtemp nexttabtemp');
		$tab.next(".tab_back").addClass('nexttabtemp');
		$tab.prev(".tab_back").addClass('prevtabtemp');
	}
	function marktabtempout($tab){
		$(".tab").removeClass('prevtabtemp nexttabtemp');
		$tab.next(".tab_back").removeClass('nexttabtemp');
		$tab.prev(".tab_back").removeClass('prevtabtemp');
	}
	var tmpNewTabClick = 1;
	//点击新tab按钮
	$('#newTab').mousedown(function(){
		newtab();
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
		//tabclick();
        // activateTab($($('#tabs').get(0).lastChild('tab')));
        // activateTab($		($('#tabs .tab').get(0).last)		);
        // activateTab($($('.tab').get(0).lastChild));
        activateTab($($('#tabs').get(0).lastChild));
        // $("#tabs>.tab:last").activateTab();
		marktab();
		$("#omniinput").val("");
		window.setTimeout("document.getElementById('omniinput').focus();", 350);
	});

	$('#newTab').mouseout(function(){
		if($("#tabs").hasClass("max")){
			// alert('111');
		}else{
			tabslayout();
		}
	});

	//关闭某tab
	function closeTab($tab, callback){
		//移除该tab对应的iframe
		var frametarget = $tab.index('#tabbar ul li');
		var $nextframe = $('#web').children().eq(frametarget).next();
		$nextframe.length > 0 ? $nextframe.addClass('showframe') : $('#web').children().eq(frametarget).prev().addClass('showframe');
		// $('#web').children().eq(frametarget).next().addClass('showframe');
		$('#web').children().eq(frametarget).remove();


		//todo需补充“关闭末尾tab”的逻辑
		if($tab.hasClass('tab_current')){
            var $next = $tab.next();
			$tab.siblings().removeClass('prevtab');
			$tab.siblings().removeClass('nexttab');
			$tab.prev().addClass('prevtab');
			$next.next().addClass('nexttab');
			$next.length > 0 ? $next.addClass("tab_current") : $tab.prev().addClass('tab_current');
			$next.length > 0 ? $next.css("background-color",colorconfig[$next.attr("tabcolor")]) : $tab.prev().css("background-color",colorconfig[$tab.prev().attr("tabcolor")]);
			//移除tab元素
			$tab.remove();
			// alert('22222');
		}
		else{
			$('.tab_current').prev().addClass('prevtab');
			//移除tab元素
			$tab.remove();
			$('.tab_current').next().addClass('nexttab');
			// alert('11111');
		}
		tabslayout();
		marktab();
		$(".tab").removeClass('prevtabtemp nexttabtemp');
		framechange();
        if ($.isFunction(callback)) {
            callback();
        };
        if($('.tab').outerWidth() > 100){
        	tmpNewTabClick = 1;
        }

	}

	//点击X关闭tab
/*	$('.tabclose').bind("click",function(){
		closeTab.call($(this).parent().get(0));
	});

	//双击关闭tab
	$('.tab').bind("dblclick",function(){
		closeTab.call(this);
	});*/

    // 这里的this为on的第二个参数在$('#tabs')中所对应的对象
    $('#tabs').on('click', '.tabclose', function() {
        closeTab($(this).parents('.tab'), function() {
            // alert('标签关闭啦，要来段钢管舞么，么么哒~~~~');
        });
    }).on('mousedown', '.tab', function() {
    	// alert('aaa');
        activateTab($(this));
    }).on('dblclick', '.tab', function() {
        closeTab($(this), function() {
            // alert('这是通过双击关闭的，么么哒~~~~');
        });

    }).on('mouseover', '.tab', function() {
        marktabtempover($(this));
        if($(this).hasClass("tab_back")){
    		$(this).css("background-color",lightcolorconfig[$(this).attr("tabcolor")]);
		}
    }).on('mouseout', '.tab', function() {
        marktabtempout($(this));
        $(this).removeClass("recent");
        if($(this).hasClass("tab_back")){
    		$(this).css("background-color","transparent");
		}
	});

	var isClick_ = true;
	$("#omniinput").focusout(function(){
        $(this).val($(this).val());
        isClick_ = true;
	});
	$("#omniinput").click(function() {

		if (isClick_) {
			$(this).select();//don,全选
			isClick_ = false;
		}
	});



	//初始化
	// tabslayout();//tab布局计算
	//tabclick();//tab绑定点击事件
	$('.tab').outerWidth(0);
    activateTab($($('#tabs').children()[0]));
	marktab();
	marktabtempover();
	marktabtempout();
