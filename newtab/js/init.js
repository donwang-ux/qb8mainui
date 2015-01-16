(function(W) {

    var kw = '';
    var searchInterval;
    var checkMoveTimeout;
    var videoBannerInterval = setInterval(videoBannerFunc, 3000);
    var videoBannerIdx = 0;

    // 可能会频繁使用的参数
    var videoWidth;
    var newsWidth;
    var newsNum;

    // 临时页面对象复用
    var wrapperJQ = $('#wrapper');
    var qaJQ = $('#quick-access');
    var searchKWJQ = $('#search-keyword');
    var infoJQ = $('#information');
    var menuJQ = $('#info-menu');
    var detailJQ = $('#info-detail');

    function videoBannerFunc (e) {
        videoBannerIdx = videoBannerIdx > 6 ? 0 : ++videoBannerIdx;
        $('[video-idx="'+videoBannerIdx+'"]').click();
    }

    // init八宫格
    QA.api.getData(function (arr) {
        arr = QA.api.convertGridArr(arr);
        if (arr.length) {
            QA.api.copyData(arr);
            QA.business.buildGird();
        }
        // 增加监听
        QA.api.addDataChangeListener(function (arr) {
            arr = QA.api.convertGridArr(arr);
            if (QA.api.isVariation(arr)) {
                QA.api.copyData(arr);
                QA.business.buildGird();
            }
        });
    });

    // init 搜索引擎列表
    QA.api.getSearchEngineList(function (arr) {
        var tmpArr = [];
        for (var i=0; i<arr.length; i++) {
            tmpArr.push(arr[i]);
        }
        arr = tmpArr;
        if (arr.length) {
            search_engine_arr = arr;
        }
        QA.business.buildEngineList();
        // 增加监听
        QA.api.addSearchEngineChangeListener(function (id) {
            var curId = +$('#logo-btn').attr('seid');
            if (curId != id) {
                for (var i=0; i<search_engine_arr.length; i++) {
                    if (id == search_engine_arr[i].id) {
                        QA.business.setSearchEngine(i);
                        break;
                    }
                }
            }
        });
    });

    // 拖拽
    wrapperJQ.delegate('.grid', 'mousedown', function (e) {
        var wrapperJQ = $('#wrapper');
        var thatJQ = $(this);
        var originX;
        var originY;
        var rect = {}, clientRect;
        var mousemoveFunc;
        var mouseupFunc;
        // 原始点坐标
        originX = e.pageX;
        originY = e.pageY;
        clientRect = thatJQ[0].getBoundingClientRect();
        rect.left = clientRect.left;
        rect.top = clientRect.top;
        rect.width = clientRect.width || (clientRect.right-clientRect.left);
        rect.height = clientRect.height || (clientRect.bottom-clientRect.top);

        mousemoveFunc = function (e) {
            var x, y, l, t;
            // 距离小于4不生效
            x = e.pageX - originX;
            y = e.pageY - originY;
            if (Math.abs(x) < 4 && Math.abs(y) < 4) {
                return;
            }
            if (!is_drag) {
                // 锁定元素显示图标
                for (var i=0; i<grid_arr.length; i++) {
                    if (grid_arr[i].status&2) {
                        $('#'+grid_arr[i].id+' .show-status').fadeIn();
                    }
                }
                is_drag = true;
            }
            l = rect.left + x - page_nav_width;
            t = rect.top + y;
            thatJQ.addClass('drag');
            // ie6 下快一点
            thatJQ[0].style.left = l + 'px';
            thatJQ[0].style.top = t + 'px';

            checkMoveTimeout = clearTimeout(checkMoveTimeout);
            checkMoveTimeout = setTimeout(function () {
                QA.business.checkGridForMove(thatJQ.attr('id'), l+rect.width/2, t+rect.height/2);
            }, 17);

            e.preventDefault();
        }

        // 放开鼠标后移除事件
        mouseupFunc = function (e) {
            // 锁定元素隐藏图标
            for (var i=0; i<grid_arr.length; i++) {
                if (grid_arr[i].status&2) {
                    $('#'+grid_arr[i].id+' .show-status').fadeOut();
                }
            }
            setTimeout(function () {
                QA.business.dropGrid(thatJQ.attr('id'));
            }, 20);
            wrapperJQ.off('mousemove', mousemoveFunc);
            wrapperJQ.off('mouseup', mouseupFunc);
        }
        // 增加move、up事件
        wrapperJQ.on('mousemove', mousemoveFunc);
        wrapperJQ.on('mouseup', mouseupFunc);
    });

    // 点击界面搜索列表和引擎列表消失
    wrapperJQ.on('click', function () {
        var engineListJQ = $('#engine-list');
        var searchDataJQ = $('#search-data');
        engineListJQ.hide();
        searchDataJQ.hide();
    });


    // ie6-8用propertychange实现
    if (is_msie && !document.addEventListener) {
        searchKWJQ.on('propertychange', function () {
             QA.search.searchKeyword(this.value);
        });
    }
    // ie9下input和propertychange都有bug，用定时器实现
    else if (is_msie_9) {
        searchKWJQ.on('focus', function () {
            searchInterval = setInterval(function () {
                var searchKWJQ = $('#search-keyword');
                var keyword = searchKWJQ.val();
                if (kw != keyword) {
                    kw = keyword;
                    QA.search.searchKeyword(kw);
                }
                else {

                }
            }, 100);
        });
        searchKWJQ.on('blur', function () {
            searchInterval = clearInterval(searchInterval);
        });
    }
    // 其他用input
    else {
        searchKWJQ.on('input', function () {
            QA.search.searchKeyword(this.value);
        });
    }
    // 回车事件
    searchKWJQ.on('keydown', function (e) {
        if (e.keyCode == '13') {
            $('#search-btn').click();
        }
    });

    // 上锁/解锁
    qaJQ.delegate('.unpin, .pin', 'click', function () {
        var gridJQ = $(this).parents('.grid');
         QA.business.pinToggleGrid(gridJQ[0]);
    });
    // 删除
    qaJQ.delegate('.grid-del', 'click', function () {
        var gridJQ = $(this).parents('.grid');
         QA.business.deleteGrid(gridJQ[0]);
    });

    // 点击格子
    qaJQ.delegate('.grid', 'click', function (e) {
        if (!is_drag && !$(e.target).parents('.grid-operate').length) {
            QA.api.openUrl(this.id);
        }
    });

    // 搜索引擎列表切换
    $('#logo-btn').on('click', function (e) {
        QA.business.toggleEngineList(e);
    });
    $('#down-btn').on('click', function (e) {
        QA.business.toggleEngineList(e);
    });

    // 改变搜索引擎
    $('#engine-list').delegate('.engine-unit', 'click', function (e) {
        var idx = +$(this).attr('idx');
        var engineListJQ = $('#engine-list');
        var searchKWJQ = $('#search-keyword');
        QA.business.setSearchEngine(idx);
        searchKWJQ.focus();
        engineListJQ.hide();
        e.stopPropagation();
    });

    // 点击搜索按钮
    $('#search-btn').on('click', function () {
        var text = $('#search-keyword').val();
        var id = $('#logo-btn').attr('seid');
        QA.api.searchText(id, text, 0);
    });

    // 点击匹配列表
    $('#search-data').delegate('.search-unit', 'click', function () {
        var text = $(this).text();
        var id = $('#logo-btn').attr('seid');
        QA.api.searchText(id, text, 1);
    });

    // 页面切换
    $('#page-nav p').on('click', function () {
        var qaJQ = $('#quick-access');
        var infoJQ = $('#information');
        var val = +$(this).attr('val');
        var duration = 400;
        var closeJQ = $('#info-detail-close');
        var qaBtn = $('#qa-btn');
        var infoBtn = $('#info-btn');
        if (page_idx == val) {
            return;
        }
        page_idx = val;
        qaBtn.removeClass();
        infoBtn.removeClass();
        switch (page_idx) {
        case 0:
            qaJQ.animate({top: 0}, duration);
            infoJQ.animate({top: -window_height}, duration, function () {
                $(this).css({top: window_width});
            });
            closeJQ.hide();
            qaBtn.addClass('qa-current');
            break;
        case 1:
            qaJQ.animate({top: -window_height}, duration, function () {
                $(this).css({top: window_width});
            });
            infoJQ.animate({top: 0}, duration);
            closeJQ.show();
            infoBtn.addClass('info-current');
            break;
        }
    });

    // 防止鼠标选择
    qaJQ.on('selectstart', function (e) {
        if (e.target.tagName != 'INPUT') {
            e.preventDefault();
        }
    });

    // init资讯
    QA.api.getInfoData(function () {
        QA.business.buildInfoPage();
    });

    // 视频banner
    infoJQ.delegate('.video-title-icon', 'click', function (e) {
        var thatJQ = $(this);
        var titleJQ = thatJQ.siblings('.video-title-text');
        var imgJQ = $('[name="video-pic-'+thatJQ.attr('video-idx')+'"]');
        var picJQ = thatJQ.parents('.video-pic');
        // 清空之前属性，重新判断
        picJQ.removeAttr('video-id').removeAttr('video-url');
        if (thatJQ.attr('video-id')) {
            picJQ.attr('vid', thatJQ.attr('video-id'));
        }
        else {
            picJQ.attr('vurl', thatJQ.attr('video-url'));
        }
        // 改title
        titleJQ.html(thatJQ.attr('video-name'));
        // 图片切换
        imgJQ.fadeIn().siblings('img').hide();
        // 按钮切换
        thatJQ.addClass('current-icon').siblings('.current-icon').removeClass('current-icon');
        // 更新idx
        videoBannerIdx = +thatJQ.attr('video-idx');
        e.stopPropagation();
    });
    infoJQ.delegate('.video-pic', 'mouseenter', function (e) {
        videoBannerInterval = clearInterval(videoBannerInterval);
    });
    infoJQ.delegate('.video-pic', 'mouseleave', function (e) {
        videoBannerInterval = setInterval(videoBannerFunc, 3000);
    });

    infoJQ.delegate('[vurl]', 'click', function (e) {
        var url = $(this).attr('vurl');
        window.open(url);
    });

    // 资讯页横滚动
    infoJQ.on('mousewheel', function (e) {
        var infoContentJQ, newsJQ, pageNavJQ;
        var blankW, newsJQ, totalW;
        var sign, left;
        // 防止频繁触发
        if (is_scroll) {
            return;
        }
        is_scroll = true;
        pageNavJQ = $('#page-nav');
        // menu隐藏
        $('#info-menu').fadeOut();
        // 先计算相关参数
        infoContentJQ = $('#info-content');
        if (videoWidth==undefined && newsWidth==undefined && newsNum==undefined) {
            newsJQ = infoContentJQ.find('.news');
            videoWidth = infoContentJQ.find('.video').outerWidth();
            newsWidth = newsJQ.outerWidth();
            newsNum = newsJQ.length;
        }
        blankW = window_width - page_nav_width;
        totalW = videoWidth + newsWidth * newsNum;
        sign = e.originalEvent.wheelDelta > 0 ? 'R' : 'L';
        left = infoContentJQ.css('left');
        left = left == 'auto' ? 0 : parseInt(left);
        // 计算left
        if (sign == 'L') {
            if (blankW-left < totalW) {
                left = left - newsWidth;
                left = (blankW-left >= totalW) ? (blankW-totalW) : left;
            }
        }
        else {
            if (left < 0) {
                left = left + newsWidth;
                left = left > 0 ? 0 : left;
            }
        }
        if (left) {
            pageNavJQ.css({'border-color': '#ccc'});
        }
        else {
            pageNavJQ.css({'border-color': '#fff'});
        }
        infoContentJQ.animate({left: left}, 200, function () {
            is_scroll = false;
        });
    });

    // info menu竖滚动
    menuJQ.on('mousewheel', function (e) {
        e.stopPropagation();
    });

    // info detail滚动
    detailJQ.on('mousewheel', function (e) {
        e.stopPropagation();
    })

    //  点击更多
    infoJQ.delegate('.info-more', 'click', function (e) {
        var infoDivJQ = $(this).parents('.info');
        var menuJQ = $('#info-menu');
        QA.business.infoMenuGoUp(menuJQ, infoDivJQ);
    });

    // 隐藏info menu
    infoJQ.on('click', function (e) {
        var menuJQ = $('#info-menu');
        var thatJQ = $(e.target);
        if (thatJQ.is('#info-menu *') || thatJQ.is('#info-detail *') || thatJQ.hasClass('info-more') || thatJQ.is('#info-detail')) {
            return;
        }
        menuJQ.fadeOut();
    });

    // 展开detail
    infoJQ.delegate('[vid], [aid]', 'click', function(e) {
        var thatJQ = $(this);
        var menuJQ = $('#info-menu');
        var infoDivJQ = thatJQ.parents('.info');
        // 判断是否在menu里点击
        if (!infoDivJQ.parent().is(menuJQ)) {
            menuJQ = QA.business.infoMenuGoUp(menuJQ, infoDivJQ);
        }
        menuJQ.css({left: -1}).fadeIn();
        $('#info-detail').width(window_width-page_nav_width-menuJQ.outerWidth()+1).fadeIn();
        e.stopPropagation();
        // 生成对应页面
        $('#info-detail-content').hide().html('');
        if (thatJQ.is('[cid]')) {
            QA.api.getNewsData(thatJQ.attr('cid'), thatJQ.attr('aid'), QA.business.buildNewsDetail);
        }
        else {
            QA.api.getVideoData(thatJQ.attr('vid'), QA.business.buildVideoDetail);
        }
    });

    // 关闭detail
    $('#info-detail-close').on('click', function (e) {
        var menuJQ = $('#info-menu');
        var detailJQ = $('#info-detail');
        menuJQ.fadeOut();
        detailJQ.fadeOut();
    });

    // 切换video播放源
    infoJQ.delegate('#change-video-src', 'change', function () {
        var thatJQ = $(this);
        var episodeJQ = $('#info-detail-content .detail-video-episode');
        var idx = thatJQ[0].selectedIndex;
        $('#video-detail-update').html(info_video_detail.vUrl[idx][0] ? info_video_detail.vUrl[idx][0].sSetNum : ' ');
        $('#play-video-src').attr('href', thatJQ.val());
        $('#video-src-logo').removeClass().addClass('video-src-logo-'+thatJQ.find('option:selected').attr('idx'));
        episodeJQ.replaceWith(QA.business.createEpisodeListEle(info_video_detail.iType, info_video_detail.vUrl[idx]));
        $('#info-detail-content .detail-video-episode')[0].style.display = episodeJQ[0].style.display;
    });

    // 切换简介/剧集/评论
    infoJQ.delegate('.detail-video-toggle > span', 'click', function () {
        var thatJQ = $(this);
        if (thatJQ.hasClass('current')) {
            return;
        }
        thatJQ.addClass('current').siblings().removeClass();
        thatJQ.parent().siblings().hide().siblings('.detail-video-'+thatJQ.attr('val')).fadeIn();
    });

    /* 页面init */
    $(W).on('resize', function (e) {
        var wrapperJQ = $('#wrapper');
        var qaJQ = $('#quick-access');
        var infoJQ = $('#information');
        var searchEngineJQ = $('#search-engine');
        var infoContentJQ = $('#info-content');
        var infoDivJQ = $('#info-content > .info');
        var menuJQ = $('#info-menu');
        var detailJQ = $('#info-detail');
        // 重新计算宽高
        window_width = $(window).width();
        window_height = $(window).height();
        // info浮动层重新定位
        menuJQ.height(window_height);
        detailJQ.height(window_height).width(window_width-page_nav_width-menuJQ.outerWidth());
        // 界面
        wrapperJQ.height(window_height);
        // 搜索框位置
        searchEngineJQ.css({width: window_width-page_nav_width,top: window_height * .03, left: page_nav_width});
        // 导航
        $('#page-nav').width(page_nav_width-1).height(window_height);
        // 八宫格
        qaJQ.width(window_width-page_nav_width).height(window_height);
        // 资讯留出导航位置
        infoJQ.width(window_width-page_nav_width).height(window_height);
        // 资讯页上部的留白
        infoContentJQ.css({'padding-top': 60 + (window_height*.1)>>0, 'left': 0});
        infoDivJQ.height((window_height*.9-90)>>0);
        // init位置
        qaJQ.css({left: page_nav_width});
        infoJQ.css({left: page_nav_width});
        switch (page_idx) {
        case 0:
            qaJQ.css({top: 0});
            infoJQ.css({top: window_height});
            $('#qa-btn').addClass('qa-current');
            break;
        case 1:
            qaJQ.css({top: window_height});
            infoJQ.css({top: 0});
            $('#info-btn').addClass('info-current');
            break;
        }
        // 重新定位格子
        QA.business.buildGird();
    }).resize();

}(window));