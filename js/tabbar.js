	//当宽度小于XX，隐藏favicon
	function showhide(){
	if($('.tab').width() < 100){
			$('.tab_back > .favicon').hide();
			$('.tab_current > .favicon').show();
			$('.tab').addClass('noicon');
		}
	else{
			$('.favicon').show();
			$('.tab').removeClass('noicon');
		}
	}

	//新建tab
	function newtab(){
		$('#tabs').append('<li class="tab tab_back"><img class="favicon" src="http://www.baidu.com/favicon.ico"><span class="tabtitle">常用网站</span><div class="tabclose"></div></li>');
		$('#web').append('<iframe src="about:blank" width="100%" height="100%" class="frame"></iframe>');
		showhide();
		marktab();
	}

	//tab布局计算
	function tabslayout(){
		
		//计算tab数量
		var tabnumber = $('.tab').size();
		//获取tab容器宽度
		var tabswidth = $('#tabs').width();
		//平均分配tab宽度
		var tabwidth = Math.floor((tabswidth - 8)/tabnumber);//todo处理tab的marginleft
		$('.tab').outerWidth(tabwidth);
		//todo：tabs容器宽度赋值
	}

	//切换当前frame
	function framechange(){
		var frametarget = $('#tabs').children('.tab_current').index('ul li');
		var $frame = $('#web').children().eq(frametarget);
		$frame.siblings().removeClass('showframe');
		$frame.addClass('showframe');
		$('#omniinput').val($frame.attr("src"));
	}
	//单击切换当前tab
	function tabclick(){
		/*$('.tab').click(function(){
			$(this).siblings().removeClass("tab_current");
			$(this).addClass("tab_current");
			//点击某tab，切换iframe展示
			framechange();
			marktab();
			showhide();
		});*/
	}

    function activateTab($tab) {
        $tab.siblings().removeClass("tab_current");
        $tab.addClass("tab_current");
        //点击某tab，切换iframe展示
        framechange();
        marktab();
        showhide();
    }

	//对tab进行必要的标记
	function marktab(){
		$('.tab').removeClass('prevtab nexttab first_tab last_tab');
		$('#tabs li:first').addClass('first_tab');
		$('#tabs li:last').addClass('last_tab');
		$('.tab_current').removeClass('tab_back');
		$('.tab_current').prev().addClass('prevtab');
		$('.tab_current').next().addClass('nexttab');
		$('.tab_current').siblings().addClass("tab_back");
	}
	//标记悬停tab的前后tab
	// function marktab(){
	// $('.tab_back').mouseover(function(){
	// 	$(this).prev(".tab_back").addClass('prevtab');
	// 	$(this).next(".tab_back").addClass('nexttab');
	// });
	// $('.tab_back').mouseout(function(){
	// 	$(this).prev(".tab_back").removeClass('prevtab');
	// 	$(this).next(".tab_back").removeClass('nexttab');
	// });
	// }

	//点击新tab按钮
	$('#newTab').click(function(){
		newtab();
		tabslayout();
		//tabclick();
        activateTab($($('#tabs').get(0).lastChild));
		marktab();
	});

	//关闭某tab
	function closeTab($tab, callback){
		//移除该tab对应的iframe
		var frametarget = $tab.index('ul li');
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
        if ($.isFunction(callback)) {
            callback();
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
    }).on('click', '.tab', function() {
        activateTab($(this));
    }).on('dblclick', '.tab', function() {
        closeTab($(this), function() {
            // alert('这是通过双击关闭的，么么哒~~~~');
        });
    });



	//初始化
	tabslayout();//tab布局计算
	//tabclick();//tab绑定点击事件
    activateTab($($('#tabs').children()[0]));
	marktab();
