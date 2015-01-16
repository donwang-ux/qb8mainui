(function(W) {

    function buildEngineList() {
        var engineListJQ = $('#engine-list');
        var logoBtnJQ = $('#logo-btn');
        var kwJQ = $('#search-keyword');
        var pEle;
        var tmp;
        var idx = 0;
        for (var i=0; i<search_engine_arr.length; i++) {
            tmp = search_engine_arr[i];
            if (tmp.isActive) {
                idx = i;
            }
            pEle = document.createElement('p');
            pEle.className = 'engine-unit';
            pEle.style.backgroundImage = 'url(../'+tmp.thumbPath+')';
            pEle.appendChild(document.createTextNode(tmp.title));
            pEle.setAttribute('idx', i);
            engineListJQ.append(pEle);
        }
        logoBtnJQ.css({'background-image': 'url(../'+search_engine_arr[idx].thumbPath+')'}).attr('seid', search_engine_arr[idx].id);
        // 防止ie6-7报错
        kwJQ[0].setAttribute('placeholder', search_engine_arr[idx].title);
    }

    // 创建8宫格
    function buildGird() {
        var arr = [];
        var space = 28;
        var left, top, w, h, l, t, imgH, pPad;
        var dfEle = document.createDocumentFragment();
        var ele, imgEle, titleEle;
        var opEle, pinBgEle, unpinEle, pinEle, sliderEle, delEle, showEle, tpEle, statusEle;
        var pinStatus;
        var qaJQ = $('#quick-access');
        var dragWidth = window_width - page_nav_width;
        // 算宽高
        w = Math.min(dragWidth*.2, window_height*.3) >> 0;
        w = Math.min(w, 280);
        w = Math.max(w, 130);
        imgH = (w*.77) >> 0;
        pPad = (window_height/70) >> 0;
        h = imgH + 12 + pPad*2;
        // 算左上角定位
        left = (dragWidth - w*4 - space*3) / 2;
        top = (window_height*.8 - h*2 - space) / 2 + 100;
        top = Math.max(top, 100) >> 0;
        // 移除旧有元素
        qaJQ.html('');
        // 布局
        for (var i=0; i<8; i++) {
            l = left + (w+space) * (i%4);
            t = top + (h+space) * ((i/4)>>0);
            for (var j=0; j<grid_arr.length; j++) {
                if (i == grid_arr[j].order) {
                    break;
                }
            }
            if (grid_arr[j]) {
                // 锁定状态
                pinStatus = grid_arr[j].status & 2;
                if (grid_arr[j].thumbPath) {
                    ele = document.createElement('div');
                    ele.id = grid_arr[j].id;
                    ele.className = 'grid';
                    ele.style.left = l + 'px';
                    ele.style.top = t + 'px';
                    dfEle.appendChild(ele);
                    // 格子图片
                    imgEle = document.createElement('img');
                    imgEle.src = grid_arr[j].thumbPath + '?' + (+new Date());
                    imgEle.style.width = w + 'px';
                    imgEle.style.height = imgH + 'px';
                    ele.appendChild(imgEle);
                    // title
                    titleEle = document.createElement('p');
                    titleEle.className = 'title';
                    titleEle.style.width = (w-10) + 'px';
                    titleEle.style.paddingTop = pPad + 'px';
                    titleEle.style.paddingBottom = pPad + 'px';
                    ele.appendChild(titleEle);
                    // title里的锁
                    tpEle = document.createElement('span');
                    tpEle.className = 'title-pin';
                    titleEle.appendChild(tpEle);
                    if (!pinStatus) {
                        tpEle.style.display = 'none';
                    }
                    titleEle.appendChild(document.createTextNode(grid_arr[j].title));
                }
                else {
                    ele = createNoImgGridEle(w, h, l, t, grid_arr[j]);
                    dfEle.appendChild(ele);
                }
                // 新或者推荐状态
                if (grid_arr[j].status & 64) {
                    statusEle = document.createElement('div');
                    statusEle.className = 'new';
                    ele.appendChild(statusEle);
                }
                else if (grid_arr[j].status & 128) {
                    statusEle = document.createElement('div');
                    statusEle.className = 'recommend';
                    ele.appendChild(statusEle);
                }
                // pin/unpin显示层
                showEle = document.createElement('div');
                showEle.className = 'show-status';
                ele.appendChild(showEle);
                // operate层
                opEle = document.createElement('div');
                opEle.className = 'grid-operate';
                ele.appendChild(opEle);
                // pin背景
                pinBgEle = document.createElement('div');
                pinBgEle.className = 'pin-bg';
                opEle.appendChild(pinBgEle);
                // slider
                sliderEle = document.createElement('div');
                sliderEle.className = 'pin-slider';
                sliderEle.style.top = '0';
                sliderEle.style.left = (pinStatus ? 18 : 0) + 'px';
                pinBgEle.appendChild(sliderEle);
                // 解锁
                unpinEle = document.createElement('div');
                unpinEle.className = 'unpin';
                pinBgEle.appendChild(unpinEle);
                // 锁
                pinEle = document.createElement('div');
                pinEle.className = 'pin';
                pinBgEle.appendChild(pinEle);
                // 删除
                delEle = document.createElement('div');
                delEle.className = 'grid-del';
                opEle.appendChild(delEle);
                // 同时在数据里设置下宽高位置，方便以后查询
                grid_arr[j].w = w;
                grid_arr[j].h = h;
                grid_arr[j].l = l;
                grid_arr[j].t = t;
            }
            // 空格子
            else {
                dfEle.appendChild(createBlankGridEle(w, h, l, t));
            }
        }
        qaJQ.append(dfEle);
    }

    function buildSearchData(list, kw) {
        var searchDataEle = document.getElementById('search-data');
        var pEle;
        var reg = new RegExp('^'+kw, 'i');
        var sEle;
        searchDataEle.innerHTML = '';
        for (var i=0; i<list.length && i<10; i++) {
            pEle = document.createElement('p');
            pEle.className = 'search-unit';
            if (reg.test(list[i])) {
                pEle.appendChild(document.createTextNode(kw));
                sEle = document.createElement('strong');
                sEle.appendChild(document.createTextNode(list[i].replace(reg, '')));
                pEle.appendChild(sEle);
            }
            else {
                pEle.appendChild(document.createTextNode(list[i]));
            }
            searchDataEle.appendChild(pEle);
        }
    }

    // 拖拽中释放后的操作
    function dropGrid(id) {
        var gridJQ = $('#'+id);
        for (var i=0; i<grid_arr.length; i++) {
            if (grid_arr[i].id == id) {
                $('#'+id).animate({
                    left: grid_arr[i].l,
                    top: grid_arr[i].t
                }, 200, function () {
                    gridJQ.removeClass('drag');
                    is_drag = false;
                });
                break;
            }
        }
        // 调用api
        QA.api.dragUrl(+id, grid_arr);
    }

    // 检查grid位置，符合则移动
    function checkGridForMove(id, x, y) {
        var sign;
        var sIdx, tIdx, idx;
        var tmp;
        for (var i=0; i<grid_arr.length; i++) {
            tmp = grid_arr[i];
            // 锁定的跳过
            if (tmp.status & 2) {
                continue;
            }
            if (tmp.id!=id) {
                if (x>tmp.l && x<tmp.l+tmp.w && y>tmp.t && y<tmp.t+tmp.h) {
                    tIdx = i;
                }
            }
            else {
                sIdx = i;
            }
        }
        if (sIdx!=undefined && tIdx!=undefined) {
            is_valid_drag = true;
            // 判断是+/-操作
            if (tIdx > sIdx) {
                sign = 1;
            }
            else {
                sign = 0;
            }
            // 复制sIdx位置的内容
            idx = sIdx;
            tmp = {};
            tmp.id = grid_arr[idx].id;
            tmp.url = grid_arr[idx].url;
            tmp.title = grid_arr[idx].title;
            tmp.status = grid_arr[idx].status;
            tmp.thumbPath = grid_arr[idx].thumbPath;
            tmp.thumbTimestamp = grid_arr[idx].thumbTimestamp;
            tmp.order = grid_arr[idx].order;
            tmp.w = grid_arr[idx].w;
            tmp.h = grid_arr[idx].h;
            tmp.l = grid_arr[idx].l;
            tmp.t = grid_arr[idx].t;
            // idx指向下一个
            sign ? idx++ : idx--;
            // 遍历移动位置
            while (sIdx != tIdx) {
                // 非锁定
                if (!(grid_arr[idx].status&2)) {
                    // copy内容
                    grid_arr[sIdx].id = grid_arr[idx].id;
                    grid_arr[sIdx].url = grid_arr[idx].url;
                    grid_arr[sIdx].title = grid_arr[idx].title;
                    grid_arr[sIdx].status = grid_arr[idx].status;
                    grid_arr[sIdx].thumbPath = grid_arr[idx].thumbPath;
                    grid_arr[sIdx].thumbTimestamp = grid_arr[idx].thumbTimestamp;
                    $('#'+grid_arr[sIdx].id).animate({
                        left: grid_arr[sIdx].l,
                        top: grid_arr[sIdx].t
                    }, 200);
                    // 改变指针
                    tmp.l = grid_arr[idx].l;
                    tmp.t = grid_arr[idx].t;
                    tmp.order = grid_arr[idx].order;
                    sIdx = idx;
                }
                sign ? idx++ : idx--;
            }
            grid_arr[tIdx] = tmp;
        }
    }

    /*
     * 上锁/解锁
     * ele: 上锁/解锁元素
     */
    function pinToggleGrid(ele, pin) {
        var gridJQ = $(ele);
        var sliderJQ = gridJQ.find('.pin-slider');
        var showJQ = gridJQ.find('.show-status');
        var titlePinJQ = gridJQ.find('.title-pin');
        var l = parseInt(sliderJQ[0].style.left) ? 0 : 18;
        sliderJQ.animate({left: l}, 200);
        // 上锁
        if (l) {
            showJQ.css({'background-image': 'url(./img/grid/quicklink_toast_locked.png)'});
            titlePinJQ.fadeIn();
        }
        // 解锁
        else {
            showJQ.css({'background-image': 'url(./img/grid/quicklink_toast_unlocked.png)'});
            titlePinJQ.fadeOut();
        }
        // 锁状态的显示与隐藏
        showJQ.fadeIn();
        setTimeout(function () {
            showJQ.fadeOut();
        }, 500);
        // 修改内存数组，同时调用底层接口
        for (var i=0; i<grid_arr.length; i++) {
            if (grid_arr[i].id == +gridJQ.attr('id')) {
                grid_arr[i].status = l ? (grid_arr[i].status|2) : (grid_arr[i].status&253);
                // 调用api
                QA.api.pinUrl(grid_arr[i].id, l ? 1 : 0);
            }
        }
    }

    function deleteGrid(ele) {
        var sIdx, idx;
        var gridJQ = $(ele);
        for (var i=0; i<grid_arr.length; i++) {
            if (grid_arr[i].id == gridJQ.attr('id')) {
                sIdx = i;
                idx = i + 1;
                break;
            }
        }
        // 调用api
        QA.api.deleteUrl(grid_arr[sIdx].id);
        // 页面操作
        gridJQ.remove();
        // 后面的前移, 锁定的不动
        while (idx < grid_arr.length) {
            if (!(grid_arr[idx].status&2)) {
                grid_arr[sIdx].id = grid_arr[idx].id;
                grid_arr[sIdx].url = grid_arr[idx].url;
                grid_arr[sIdx].title = grid_arr[idx].title;
                grid_arr[sIdx].status = grid_arr[idx].status;
                grid_arr[sIdx].thumbPath = grid_arr[idx].thumbPath;
                grid_arr[sIdx].thumbTimestamp = grid_arr[idx].thumbTimestamp;
                $('#'+grid_arr[sIdx].id).animate({
                    left: grid_arr[sIdx].l,
                    top: grid_arr[sIdx].t
                }, 200);
                sIdx = idx;
            }
            idx++;
        }
        // 补空格子
        $('#quick-access').append(createBlankGridEle(grid_arr[sIdx].w, grid_arr[sIdx].h, grid_arr[sIdx].l, grid_arr[sIdx].t));
        // 刷新数组
        grid_arr.splice(sIdx, 1);
    }

    function createNoImgGridEle(w, h, l, t, grid) {
        var ele = document.createElement('div');
        var spanEle = document.createElement('span');
        spanEle.className = 'blank-span';
        spanEle.style.width = (w-20) + 'px';
        spanEle.style.height = '48px';
        spanEle.style.marginLeft = (-w/2+10) + 'px';
        spanEle.style.marginTop = '-24px';
        spanEle.appendChild(document.createTextNode(grid.title));
        spanEle.appendChild(document.createElement('br'));
        spanEle.appendChild(document.createElement('br'));
        spanEle.appendChild(document.createTextNode(grid.url));
        ele.appendChild(spanEle);
        ele.id = grid.id;
        ele.className = 'grid';
        ele.style.width = w + 'px';
        ele.style.height = h + 'px';
        ele.style.left = l + 'px';
        ele.style.top = t + 'px';
        return ele;
    }

    function createBlankGridEle(w, h, l, t) {
        var ele = document.createElement('div');
        var spanEle = document.createElement('span');
        spanEle.className = 'blank-span';
        spanEle.style.width = (w-20) + 'px';
        spanEle.style.marginLeft = (-w/2+10) + 'px';
        spanEle.appendChild(document.createTextNode('经常访问的网站，会自动出现在这里'));
        ele.appendChild(spanEle);
        ele.className = 'blank';
        ele.style.width = w + 'px';
        ele.style.height = h + 'px';
        ele.style.left = l + 'px';
        ele.style.top = t + 'px';
        return ele;
    }

    function setSearchEngine(idx) {
        var engineListJQ = $('#engine-list');
        var searchKWJQ = $('#search-keyword');
        var logoBtnJQ = $('#logo-btn');
        logoBtnJQ.css({'background-image': 'url(../'+search_engine_arr[idx].thumbPath+')'}).attr('seid', search_engine_arr[idx].id);
        searchKWJQ.attr('placeholder', search_engine_arr[idx].title);
        // 调用api
        QA.api.setSearchEngine(search_engine_arr[idx].id);
    }

    function toggleEngineList(e) {
        var searchDataJQ = $('#search-data');
        var engineListJQ = $('#engine-list');
        searchDataJQ.hide();
        engineListJQ.toggle();
        e.stopPropagation();
    }

    function infoMenuGoUp(menuJQ, infoDivJQ) {
        var rect = infoDivJQ[0].getBoundingClientRect();
        var fixedNum = 0;
        if (infoDivJQ.hasClass('video')) {
            fixedNum = 32;
        }
        menuJQ.html(infoDivJQ[0].outerHTML).css({
            top: 0,
            left: rect.left - page_nav_width + fixedNum,
            height: window_height
        }).fadeIn().scrollTop(0);
        return menuJQ;
    }

    function buildInfoPage() {
        var infoContentJQ = $('#info-content');
        var dfEle = document.createDocumentFragment();
        var infoEle, tmpEle, tmpC1Ele, tmpC2Ele, tmpC3Ele;
        var tmp;
        infoContentJQ.html('');

        // 创建video元素
        infoEle = document.createElement('div');
        infoEle.className = 'info video';
        // 创建title
        tmpEle = document.createElement('p');
        tmpEle.className = 'info-title it1';
        tmpEle.appendChild(document.createTextNode('热门视频'));
        infoEle.appendChild(tmpEle);
        // 创建轮询区域
        tmpEle = document.createElement('div');
        tmpEle.className = 'video-pic';
        for (var i=0; i<info_data.video.vBanners.length; i++) {
            tmp = info_data.video.vBanners[i];
            if (i == 0) {
                // iType为3
                if (tmp.iType == 3) {
                    if (tmp.iIsNotEnd) {
                        tmpEle.setAttribute('vurl', tmp.vUrl[0].sUrl);
                    }
                    else {
                        tmpEle.setAttribute('vurl', tmp.vUrl[1].sUrl);
                    }
                }
                else {
                    tmpEle.setAttribute('vid', tmp.lVideoId);
                }
            }
            tmpC1Ele = document.createElement('img');
            tmpC1Ele.name = 'video-pic-' + i;
            tmpC1Ele.src =  tmp.sPicUrl;
            tmpC1Ele.style.height = '191px';
            if (i != 0) {
                tmpC1Ele.style.display = 'none';
            }
            tmpEle.appendChild(tmpC1Ele);
        }
        tmpC1Ele = document.createElement('div');
        tmpC1Ele.className = 'video-title';
        for (var i=info_data.video.vBanners.length-1; i>-1; i--) {
            tmp = info_data.video.vBanners[i];
            if (i == 0) {
                tmpC2Ele = document.createElement('span');
                tmpC2Ele.className = 'video-title-text';
                tmpC2Ele.appendChild(document.createTextNode(tmp.sVideoName));
                tmpC1Ele.appendChild(tmpC2Ele);
            }
            tmpC2Ele = document.createElement('span');
            tmpC2Ele.className = 'video-title-icon';
            // iType为3
            if (tmp.iType == 3) {
                if (tmp.iIsNotEnd) {
                    tmpC2Ele.setAttribute('video-url', tmp.vUrl[0].sUrl);
                }
                else {
                    tmpC2Ele.setAttribute('video-url', tmp.vUrl[1].sUrl);
                }
            }
            else {
                tmpC2Ele.setAttribute('video-id', tmp.lVideoId);
            }
            tmpC2Ele.setAttribute('video-idx', i);
            tmpC2Ele.setAttribute('video-name', tmp.sVideoName);
            if (i == 0) {
                tmpC2Ele.className += ' current-icon';
            }
            tmpC1Ele.appendChild(tmpC2Ele);
        }
        tmpEle.appendChild(tmpC1Ele);
        infoEle.appendChild(tmpEle);
        // 排行榜前3
        tmpEle = document.createElement('div');
        tmpEle.className = 'video-show';
        for (var i=0; i<info_data.video.stVideoGroup.length; i++) {
            tmp = info_data.video.stVideoGroup[i];
            tmpC1Ele = document.createElement('div');
            tmpC1Ele.className = 'video-category';
            tmpC2Ele = document.createElement('p');
            tmpC2Ele.className = 'video-category-title vct' + (i+1);
            tmpC2Ele.appendChild(document.createTextNode(tmp.sGroupName));
            tmpC1Ele.appendChild(tmpC2Ele);
            for (var j=0; j<tmp.vVideoData.length&&j<3; j++) {
                tmpC2Ele = document.createElement('p');
                // iType为3
                if (tmp.vVideoData[j].iType == 3) {
                    if (tmp.vVideoData[j].iIsNotEnd) {
                        tmpC2Ele.setAttribute('vurl', tmp.vVideoData[j].vUrl[0].sUrl);
                    }
                    else {
                        tmpC2Ele.setAttribute('vurl', tmp.vVideoData[j].vUrl[1].sUrl);
                    }
                }
                else {
                    tmpC2Ele.setAttribute('vid', tmp.vVideoData[j].lVideoId);
                }
                tmpC3Ele = document.createElement('span');
                tmpC3Ele.className = 'num top' + (i+1);
                tmpC3Ele.appendChild(document.createTextNode(j+1));
                tmpC2Ele.appendChild(tmpC3Ele);
                tmpC2Ele.appendChild(document.createTextNode(tmp.vVideoData[j].sVideoName));
                tmpC2Ele.setAttribute('title', tmp.vVideoData[j].sVideoName);
                tmpC1Ele.appendChild(tmpC2Ele);
            }
            tmpEle.appendChild(tmpC1Ele);
        }
        infoEle.appendChild(tmpEle);
        // 更多
        tmpEle = document.createElement('div');
        tmpEle.className = 'info-more';
        tmpEle.appendChild(document.createTextNode('查看更多'));
        infoEle.appendChild(tmpEle);
        // 隐藏的排行榜
        tmpEle = document.createElement('div');
        tmpEle.className = 'video-hide';
        for (var i=0; i<info_data.video.stVideoGroup.length; i++) {
            tmp = info_data.video.stVideoGroup[i];
            tmpC1Ele = document.createElement('div');
            tmpC1Ele.className = 'video-category';
            for (var j=3; j<tmp.vVideoData.length&&j<10; j++) {
                tmpC2Ele = document.createElement('p');
                // iType为3
                if (tmp.vVideoData[j].iType == 3) {
                    if (tmp.vVideoData[j].iIsNotEnd) {
                        tmpC2Ele.setAttribute('vurl', tmp.vVideoData[j].vUrl[0].sUrl);
                    }
                    else {
                        tmpC2Ele.setAttribute('vurl', tmp.vVideoData[j].vUrl[1].sUrl);
                    }
                }
                else {
                    tmpC2Ele.setAttribute('vid', tmp.vVideoData[j].lVideoId);
                }
                tmpC3Ele = document.createElement('span');
                tmpC3Ele.className = 'num';
                tmpC3Ele.appendChild(document.createTextNode(j+1));
                tmpC2Ele.appendChild(tmpC3Ele);
                tmpC2Ele.appendChild(document.createTextNode(tmp.vVideoData[j].sVideoName));
                tmpC2Ele.setAttribute('title', tmp.vVideoData[j].sVideoName);
                tmpC1Ele.appendChild(tmpC2Ele);
            }
            tmpEle.appendChild(tmpC1Ele);
        }
        infoEle.appendChild(tmpEle);
        dfEle.appendChild(infoEle);

        // 创建news元素
        for (var i=0; i<info_data.news.length; i++) {
            infoEle = document.createElement('div');
            infoEle.className = 'info news';
            tmpEle = document.createElement('p');
            tmpEle.className = 'info-title it' + (i+2);
            tmpEle.appendChild(document.createTextNode(info_data.news[i].sCname));
            infoEle.appendChild(tmpEle);
            // 第一个大图news
            if (info_data.news[i].vSummary[0]) {
                tmp = info_data.news[i].vSummary[0];
                tmpEle = document.createElement('div');
                tmpEle.className = 'news-pic';
                tmpEle.setAttribute('cid', info_data.news[i].sCid);
                tmpEle.setAttribute('aid', tmp.iId);
                tmpC1Ele = document.createElement('img');
                if (tmp.iPicWidth && tmp.iPicHeight) {
                    if (287*tmp.iPicHeight/tmp.iPicWidth > 191) {
                        tmpC1Ele.src = tmp.sImageUrl;
                        tmpC1Ele.style.width = '287px';
                    }
                    else {
                        tmpC1Ele.src = tmp.sImageUrl;
                        tmpC1Ele.style.height = '191px';
                    }
                }
                tmpEle.appendChild(tmpC1Ele);
                tmpC1Ele = document.createElement('span');
                tmpC1Ele.className = 'news-title-text';
                tmpC1Ele.appendChild(document.createTextNode(tmp.sTitle));
                tmpEle.appendChild(tmpC1Ele);
                infoEle.appendChild(tmpEle);
            }
            // 头3个小图
            tmpEle = document.createElement('div');
            tmpEle.className = 'news-show';
            for (var j=1; j<info_data.news[i].vSummary.length&&j<4; j++) {
                tmp = info_data.news[i].vSummary[j];
                tmpC1Ele = document.createElement('div');
                tmpC1Ele.className = 'news-unit';
                tmpC1Ele.setAttribute('cid', info_data.news[i].sCid);
                tmpC1Ele.setAttribute('aid', tmp.iId);
                tmpC1Ele.setAttribute('title', tmp.sTitle);
                tmpC2Ele = document.createElement('div');
                tmpC2Ele.className = 'news-pic-small';
                if (tmp.iPicWidth && tmp.iPicHeight) {
                    tmpC3Ele = document.createElement('img');
                    if (69*tmp.iPicHeight/tmp.iPicWidth > 47) {
                        tmpC3Ele.src = img_cut_url+encodeURIComponent(tmp.sImageUrl)+'&w=69';
                    }
                    else {
                        tmpC3Ele.src = img_cut_url+encodeURIComponent(tmp.sImageUrl)+'&h=47';
                    }
                    tmpC2Ele.appendChild(tmpC3Ele);
                }
                tmpC1Ele.appendChild(tmpC2Ele);
                tmpC2Ele = document.createElement('span');
                tmpC2Ele.className = 'news-title-small';
                tmpC2Ele.appendChild(document.createTextNode(tmp.sTitle));
                tmpC1Ele.appendChild(tmpC2Ele);
                tmpEle.appendChild(tmpC1Ele);
            }
            infoEle.appendChild(tmpEle);
            // 更多
            tmpEle = document.createElement('div');
            tmpEle.className = 'info-more';
            tmpEle.appendChild(document.createTextNode('查看更多'));
            infoEle.appendChild(tmpEle);
            // 后面的隐藏
            tmpEle = document.createElement('div');
            tmpEle.className = 'news-hide';
            for (var j=4; j<info_data.news[i].vSummary.length; j++) {
                tmp = info_data.news[i].vSummary[j];
                tmpC1Ele = document.createElement('div');
                tmpC1Ele.className = 'news-unit';
                tmpC1Ele.setAttribute('cid', info_data.news[i].sCid);
                tmpC1Ele.setAttribute('aid', tmp.iId);
                tmpC1Ele.setAttribute('title', tmp.sTitle);
                tmpC2Ele = document.createElement('div');
                tmpC2Ele.className = 'news-pic-small';
                if (tmp.iPicWidth && tmp.iPicHeight) {
                    tmpC3Ele = document.createElement('img');
                    if (69*tmp.iPicHeight/tmp.iPicWidth > 47) {
                        tmpC3Ele.src = img_cut_url+encodeURIComponent(tmp.sImageUrl)+'&w=69';
                    }
                    else {
                        tmpC3Ele.src = img_cut_url+encodeURIComponent(tmp.sImageUrl)+'&h=47';
                    }
                    tmpC2Ele.appendChild(tmpC3Ele);
                }
                tmpC1Ele.appendChild(tmpC2Ele);
                tmpC2Ele = document.createElement('span');
                tmpC2Ele.className = 'news-title-small';
                tmpC2Ele.appendChild(document.createTextNode(tmp.sTitle));
                tmpC1Ele.appendChild(tmpC2Ele);
                tmpEle.appendChild(tmpC1Ele);
            }
            infoEle.appendChild(tmpEle);

            dfEle.appendChild(infoEle);
        }


        dfEle.appendChild(infoEle);
        infoContentJQ.append(dfEle).find('> .info').height((window_height*.9-90)>>0);
    }

    function buildNewsDetail(data) {
        var detailJQ = $('#info-detail');
        var dcJQ = $('#info-detail-content');
        var dfEle = document.createDocumentFragment();
        var tmpEle, tmpC1Ele;
        // 重新init
        detailJQ.scrollTop(0);
        dcJQ.removeClass().addClass('info-detail-news');
        // 标题
        tmpEle = document.createElement('h2');
        tmpEle.appendChild(document.createTextNode(data.sTitle));
        dfEle.appendChild(tmpEle);
        // 时间出处
        tmpEle = document.createElement('p');
        tmpEle.className = 'news-subtitle';
        tmpEle.appendChild(document.createTextNode(data.sTime));
        if (data.sFrom) {
            tmpC1Ele = document.createElement('a');
            tmpC1Ele.href = data.sSourcePageUrl;
            tmpC1Ele.target = '_blank';
            tmpC1Ele.className = 'news-source';
            tmpC1Ele.appendChild(document.createTextNode(data.sFrom));
            tmpEle.appendChild(tmpC1Ele);
        }
        dfEle.appendChild(tmpEle);
        // 正文
        tmpEle = document.createElement('div');
        tmpEle.innerHTML = data.sText;
        dfEle.appendChild(tmpEle);
        dcJQ.append(dfEle).fadeIn(400);
    }

    function buildVideoDetail(data) {
        var detailJQ = $('#info-detail');
        var dcJQ = $('#info-detail-content');
        var dfEle = document.createDocumentFragment();
        var tmp, datetime;
        var tmpEle, tmpC1Ele, tmpC2Ele, tmpC3Ele, tmpC4Ele;
        // 重新init
        detailJQ.scrollTop(0);
        dcJQ.removeClass().addClass('info-detail-video');

        // 概括区域
        tmpEle = document.createElement('div');
        tmpEle.className = 'detail-video-summary';
        // 左边图片
        tmpC1Ele = document.createElement('div');
        tmpC1Ele.className = 'detail-video-pic';
        tmpC2Ele = document.createElement('img');
        tmpC2Ele.src = data.sPicUrl;
        tmpC2Ele.style.width = '144px';
        tmpC1Ele.appendChild(tmpC2Ele);
        tmpEle.appendChild(tmpC1Ele);
        // 右边文字
        tmpC1Ele = document.createElement('h3');
        tmpC1Ele.appendChild(document.createTextNode(data.sVideoName));
        tmpEle.appendChild(tmpC1Ele);
        if (data.iType == 0) {
            tmpC1Ele = document.createElement('p');
            tmpC1Ele.className = 'detail-video-score';
            tmpC1Ele.appendChild(document.createTextNode(data.fScore+'分'));
            tmpEle.appendChild(tmpC1Ele);
        }
        else {
            tmpC1Ele  = document.createElement('p');
            tmpC1Ele.appendChild(document.createTextNode('更新至'));
            tmpC2Ele = document.createElement('span');
            tmpC2Ele.id = 'video-detail-update';
            tmpC2Ele.appendChild(document.createTextNode(data.vUrl[0][0] ? data.vUrl[0][0].sSetNum : ' '));
            tmpC1Ele.appendChild(tmpC2Ele);
            if (data.iType == 1) {
                tmpC1Ele.appendChild(document.createTextNode('集'));
            }
            else {
                tmpC1Ele.appendChild(document.createTextNode('期'));
            }
            tmpEle.appendChild(tmpC1Ele);
        }
        if (data.iType == 2) {
            tmpC1Ele = document.createElement('p');
            tmpC1Ele.appendChild(document.createTextNode('电视台：'+data.sTV));
            tmpEle.appendChild(tmpC1Ele);
            tmpC1Ele = document.createElement('p');
            tmpC1Ele.appendChild(document.createTextNode('主持人：'+data.sDirector));
            tmpEle.appendChild(tmpC1Ele);
        }
        else {
            tmpC1Ele = document.createElement('p');
            tmpC1Ele.appendChild(document.createTextNode('导演：'+data.sDirector));
            tmpEle.appendChild(tmpC1Ele);
            tmpC1Ele = document.createElement('p');
            tmpC1Ele.appendChild(document.createTextNode('主演：'+data.sActor));
            tmpEle.appendChild(tmpC1Ele);
        }
        tmpC1Ele = document.createElement('p');
        tmpC1Ele.appendChild(document.createTextNode('来源：'));
        tmpC2Ele = document.createElement('span');
        tmpC2Ele.id = 'video-src-logo';
        tmpC2Ele.className = 'video-src-logo-' + getSrcLogoIdx(data.sSrc[0]);
        tmpC1Ele.appendChild(tmpC2Ele);
        tmpC2Ele = document.createElement('select');
        tmpC2Ele.id = 'change-video-src';
        for (var i=0; i<data.sSrc.length; i++) {
            tmpC3Ele = document.createElement('option');
            tmpC3Ele.value = data.vUrl[i][0] ? data.vUrl[i][0].sUrl : '';
            tmpC3Ele.setAttribute('idx', getSrcLogoIdx(data.sSrc[i]));
            tmpC3Ele.appendChild(document.createTextNode(data.sSrc[i]));
            tmpC2Ele.appendChild(tmpC3Ele);
        }
        tmpC1Ele.appendChild(tmpC2Ele);
        tmpEle.appendChild(tmpC1Ele);
        // 播放按钮
        tmpC1Ele = document.createElement('p');
        tmpC1Ele.className = 'detail-video-play';
        tmpC2Ele = document.createElement('a');
        tmpC2Ele.id = 'play-video-src';
        tmpC2Ele.target = '_blank';
        tmpC2Ele.href = data.vUrl[0][0].sUrl;
        tmpC2Ele.appendChild(document.createTextNode(' '));
        tmpC1Ele.appendChild(tmpC2Ele);
        tmpEle.appendChild(tmpC1Ele);
        dfEle.appendChild(tmpEle);

        // 内容介绍/剧集列表/豆瓣影评
        tmpEle =document.createElement('div');
        tmpEle.className = 'detail-video-content';
        tmpEle.style.minHeight = window_height-280 + 'px';
        // 切换区域
        tmpC1Ele = document.createElement('div');
        tmpC1Ele.className = 'detail-video-toggle';
        tmpC2Ele = document.createElement('span');
        tmpC2Ele.appendChild(document.createTextNode('内容简介'));
        tmpC2Ele.setAttribute('val', 'brief');
        tmpC2Ele.className = 'current';
        tmpC1Ele.appendChild(tmpC2Ele);
        tmpC2Ele = document.createElement('span');
        if (data.iType == 0) {
            tmpC2Ele.appendChild(document.createTextNode('豆瓣影评'));
            tmpC2Ele.setAttribute('val', 'comment');
        }
        else {
            tmpC2Ele.appendChild(document.createTextNode('剧集列表'));
            tmpC2Ele.setAttribute('val', 'episode');
        }
        tmpC1Ele.appendChild(tmpC2Ele);
        tmpEle.appendChild(tmpC1Ele);
        // 内容介绍
        tmpC1Ele = document.createElement('div');
        tmpC1Ele.className = 'detail-video-brief';
        tmpC1Ele.appendChild(document.createTextNode(data.sBrief));
        tmpEle.appendChild(tmpC1Ele);
        // 豆瓣影评
        tmpC1Ele = document.createElement('div');
        tmpC1Ele.className = 'detail-video-comment';
        for (var i=0; i<data.vDoubanComment.length; i++) {
            tmp = data.vDoubanComment[i];
            tmpC2Ele = document.createElement('div');
            tmpC2Ele.className = 'detail-video-comment-unit';
            // title
            tmpC3Ele = document.createElement('p');
            tmpC3Ele.className = 'detail-video-comment-title';
            tmpC3Ele.appendChild(document.createTextNode(tmp.sTitle));
            tmpC2Ele.appendChild(tmpC3Ele);
            // 评分
            tmpC3Ele = document.createElement('p');
            tmpC3Ele.className = 'detail-video-comment-score';
            tmpC3Ele.appendChild(document.createTextNode(tmp.fScore));
            tmpC2Ele.appendChild(tmpC3Ele);
            // 日期
            datetime = new Date(tmp.lCommentTime);
            tmpC3Ele = document.createElement('p');
            tmpC3Ele.className = 'detail-video-comment-date';
            tmpC3Ele.appendChild(document.createTextNode(datetime.getFullYear()+'-'+(datetime.getMonth()+1)+'-'+datetime.getDate()));
            tmpC2Ele.appendChild(tmpC3Ele);
            // 评论内容
            tmpC3Ele = document.createElement('p');
            tmpC3Ele.className = 'detail-video-comment-content';
            tmpC3Ele.appendChild(document.createTextNode(tmp.sBrief));
            tmpC4Ele = document.createElement('a');
            tmpC4Ele.target = '_blank';
            tmpC4Ele.href = tmp.sUrl;
            tmpC4Ele.appendChild(document.createTextNode('更多>>'));
            tmpC3Ele.appendChild(tmpC4Ele);
            tmpC2Ele.appendChild(tmpC3Ele);

            tmpC1Ele.appendChild(tmpC2Ele);
        }
        tmpEle.appendChild(tmpC1Ele);
        // 剧集列表
        tmpEle.appendChild(createEpisodeListEle(data.iType, data.vUrl[0]));

        dfEle.appendChild(tmpEle);
        dcJQ.append(dfEle).fadeIn(400);
    }

    function createEpisodeListEle(type, list) {
        var tmpEle, tmpC1Ele;
        tmpEle = document.createElement('div');
        tmpEle.className = 'detail-video-episode';
        if (type == 1) {
            for (var i=list.length-1; i>-1; i--) {
                tmpC1Ele = document.createElement('a');
                tmpC1Ele.className = 'video-tv-unit';
                tmpC1Ele.target = '_blank';
                tmpC1Ele.href = list[i].sUrl;
                tmpC1Ele.appendChild(document.createTextNode(list[i].sSetNum));
                tmpEle.appendChild(tmpC1Ele);
            }
        }
        else {
            for (var i=0; i<list.length; i++) {
                tmpC1Ele = document.createElement('a');
                if (i%2 == 1) {
                    tmpC1Ele.className = 'video-vs-unit vs-nmr';
                }
                else {
                    tmpC1Ele.className = 'video-vs-unit';
                }
                tmpC1Ele.target = '_blank';
                tmpC1Ele.href = list[i].sUrl;
                tmpC1Ele.title = list[i].sBrief;
                tmpC1Ele.appendChild(document.createTextNode(list[i].sBrief));
                tmpEle.appendChild(tmpC1Ele);
            }
        }
        return tmpEle;
    }

    function getSrcLogoIdx(str) {
        var idx = 0;
        switch(str) {
        case '搜狐':
            idx = 1;
            break;
        case '爱奇艺':
            idx = 2;
            break;
        case '腾讯视频':
            idx = 3;
            break;
        case '乐视':
            idx = 4;
            break;
        case '优酷':
            idx = 5;
            break;
        case '土豆':
            idx = 6;
            break;
        case '风行网':
            idx = 7;
            break;
        case '电影网':
            idx = 8;
            break;
        case 'PPTV':
            idx = 9;
            break;
        case '迅雷看看':
            idx = 10;
            break;
        case 'PPS':
            idx = 11;
            break;
        case '酷6':
            idx = 12;
            break;
        case '新浪':
            idx = 13;
            break;
        case '快播':
            idx = 14;
            break;
        case 'CNTV':
            idx = 15;
            break;
        case '56':
            idx = 16;
            break;
        }
        return idx;
    }

    W.QA = W.QA || {};
    W.QA.business = {
        buildEngineList: buildEngineList,
        buildGird: buildGird,
        buildSearchData: buildSearchData,
        dropGrid: dropGrid,
        checkGridForMove: checkGridForMove,
        pinToggleGrid: pinToggleGrid,
        deleteGrid: deleteGrid,
        setSearchEngine: setSearchEngine,
        toggleEngineList: toggleEngineList,
        infoMenuGoUp: infoMenuGoUp,
        /*资讯页分割线*/
        buildInfoPage: buildInfoPage,
        buildNewsDetail: buildNewsDetail,
        buildVideoDetail: buildVideoDetail,
        createEpisodeListEle: createEpisodeListEle
    };

}(window));