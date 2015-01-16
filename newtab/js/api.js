
(function(W) {

    var switchSign = true;
    var homepage = {};
    var tabs = {};
    var searchEngine = {};
    try {
        homepage = window.external.extension.homepage;
        tabs = window.external.extension.tabs;
        searchEngine = window.external.extension.searchEngine;
        switchSign = false;
    }
    catch (e) {}

    /*
     * 锁定、解锁页面
     * gridId: 对应格子的id
     * pin: false – 解锁，true – 锁定
     */
    function pinUrl(gridId, pin) {
        if (switchSign) {
            return;
        }
        homepage.pinUrl(parseInt(gridId), pin ? true : false);

        if (pin) {
            dataReport(12002);
        }
        else {
            dataReport(12001);
        }
    }

    /*
     * 删除页面
     * gridId: 对应格子的id
     */
    function deleteUrl(gridId) {
        if (switchSign) {
            return;
        }
        homepage.deleteUrl(parseInt(gridId));

        dataReport(12003);
    }

    /*
     * 拖动页面
     * gridId: 对应格子的id
     * data: 前八个格子的数组数据
     */
    function dragUrl(gridId, data) {
        if (switchSign) {
            return;
        }
        if (is_valid_drag && Object.prototype.toString.call(data) == '[object Array]') {
            homepage.dragUrl(parseInt(gridId), grid_arr);
            is_valid_drag = false;

            dataReport(12004);
        }
    }

    /*
     * 打开一个网页
     * obj: 可能为数字或url
     */
    function openUrl(obj) {
        var gridId;
        if (switchSign) {
            return;
        }
        if (isNaN(obj)) {
            tabs.create({url: obj, blank: true});
            return;
        }
        gridId = +obj;
        for (var i=0; i<grid_arr.length; i++) {
            if (gridId == grid_arr[i].id) {
                tabs.create({url: grid_arr[i].url, blank: false});
                dataReport(12006 + grid_arr[i].order);
                break;
            }
        }
    }

    /*
     * 获取所有页面数据
     * callback: 回调方法, 其参数为20个格子的数组数据
     *
     * 下面是数组里一个json的字段说明
     * id(integer)：页面的id，标识符
     * url(string)：网址
     * title(string)：名称
     * status(integer) ：可以是以下值的合集，0x01 – normal，0x02 – pin，0x04 – insert, 0x08 – delete, 0x10 – hide, 0x20 – show, 0x40 – new, 0x80 – recommend。传递数据的时候，会剔除状态为delete和hide的数据。
     * thumbPath(string)：页面缩略图的路径
     * thumbTimestamp：页面缩略图的时间戳
     * order: 下标索引从0开始
     */
    function getData(callback) {
        if (switchSign) {
            return;
        }
        homepage.getData(callback);
    }

    function addDataChangeListener(callback) {
        if (switchSign) {
            return;
        }
        homepage.onDataChanged.addListener(callback);
    }

    function isVariation(arr) {
// console.log('开始判断');
        if (arr.length != grid_arr.length) {
// console.log('length');
                return true;
        }
        for (var i=0; i<arr.length && i<8; i++) {
            if (grid_arr[i].id != arr[i].id) {
// console.log('id');
                return true;
            }
            else if (grid_arr[i].status!=arr[i].status && Math.abs(grid_arr[i].status-arr[i].status)!=1) {
// console.log('status');
                return true;
            }
            else if (grid_arr[i].url != arr[i].url) {
// console.log('url');
                return true;
            }
            else if (grid_arr[i].thumbTimestamp != arr[i].thumbTimestamp) {
// console.log('thumbTimestamp');
                return true;
            }
        }
        return false;
    }

    function copyData(arr) {
        grid_arr = [];
        for (var i=0; i<arr.length&&i<8; i++) {
            if (!arr[i]) {
                grid_arr.splice(i, grid_arr.length-i);
                break;
            }
            else if (arr[i].status&8 || arr[i].status&16) {
                continue;
            }
            grid_arr.push(arr[i]);
        }
    }

    /*
     * 数据上报
     * 12001 解锁按钮点击次数
     * 12002 锁定按钮点击次数
     * 12003 删除按钮点击次数
     * 12004 拖拽格子次数（执行有效拖拽次数）
     * 12006 点击第一个格子的次数
     * 12007 点击第二个格子的次数
     * 12008 点击第三个格子的次数
     * 12009 点击第四个格子的次数
     * 12010 点击第五个格子的次数
     * 12011 点击第六个格子的次数
     * 12012 点击第七个格子的次数
     * 12013 点击第八个格子的次数
     */
    function dataReport(type) {
        var code = 0;
        if (switchSign) {
            return;
        }
        switch (type) {
        case 'unpin':
            code = 12001;
            break;
        case 'pin':
            code = 12002;
            break;
        case 'delete':
            code = 12003;
            break;
        case 'drag':
            code = 12004;
            break;
        case 'click1':
            code = 12006;
            break;
        case 'click2':
            code = 12007;
            break;
        case 'click3':
            code = 12008;
            break;
        case 'click4':
            code = 12009;
            break;
        case 'click5':
            code = 12010;
            break;
        case 'click6':
            code = 12011;
            break;
        case 'click7':
            code = 12012;
            break;
        case 'click8':
            code = 12013;
            break;
        }
        if (code) {
            homepage.dataReport(code);
        }
    }

    /*
     * 获取搜索引擎列表
     * callback: 回调方法
     *
     * 下面是数组里一个json的字段说明
     * id(integer)：标识符
     * title(string)：名称
     * thumbPath(string)：图的路径
     * isActive(boolean): 是否激活
     */
    function getSearchEngineList(callback) {
        if (switchSign) {
            callback([]);
            return;
        }
        searchEngine.getList(callback);
    }

    // 回调参数id 为搜索引擎的id
    function addSearchEngineChangeListener(callback) {
        if (switchSign) {
            return;
        }
        searchEngine.onChanged.addListener(callback);
    }

    /*
     * 设置搜索引擎
     * id：搜索引擎id
     */
    function setSearchEngine(seId) {
        if (switchSign) {
            return;
        }
        searchEngine.set(seId);
    }

    /*
     * seId searchEngineId (integer)
     * text (string)
     * source (integer) : 0 - input box, 1 - drop list
     */
    function searchText(seId, text, source) {
        if (switchSign) {
            return;
        }
        text = text ? $.trim(text.toLocaleLowerCase()) : '';
        source = +source ? 'droplist' : 'inputbox';
        searchEngine.searchText(text, parseInt(seId), source);
    }

    function convertGridArr(arr) {
        var tmpArr = [];
        for (var i=0; i<arr.length; i++) {
            tmpArr.push(arr[i]);
        }
        arr = tmpArr;
        // 排序
        arr = arr.sort(function (a, b) {
            if (a.order < b.order) {
                return -1;
            }
            else if (a.order == b.order) {
                return 0;
            }
            else {
                return 1;
            }
        });
        return arr;
    }

    function getInfoData(callback) {
        var url = 'http://qbinfocenter.adm0309.3g.qq.com/getStartPage';
        $.support.cors = true;
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                info_data = data;
                callback();
            },
            error: function (xhr, textStatus, errorStr) {
            }
        });
    }

    function getNewsData(cid, aid, callback) {
        var url = 'http://qbinfocenter.adm0309.3g.qq.com/getNewsContent?cid='+cid+'&aid='+aid;
        $.support.cors = true;
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                callback(data);
            },
            error: function (xhr, textStatus, errorStr) {
            }
        });
    }

    function getVideoData(vid, callback) {
        var url = 'http://qbinfocenter.adm0309.3g.qq.com/getVideoInfo?vid='+vid;
        $.support.cors = true;
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                info_video_detail = data;
                callback(data);
            },
            error: function (xhr, textStatus, errorStr) {
            }
        });
    }

    W.QA = W.QA || {};
	W.QA.api = {
        pinUrl: pinUrl,
        deleteUrl: deleteUrl,
        dragUrl: dragUrl,
        openUrl: openUrl,
        getData: getData,
        addDataChangeListener: addDataChangeListener,
        isVariation: isVariation,
        copyData: copyData,
        getSearchEngineList: getSearchEngineList,
        addSearchEngineChangeListener: addSearchEngineChangeListener,
        setSearchEngine: setSearchEngine,
        searchText: searchText,
        convertGridArr: convertGridArr,
        /*资讯页分割线*/
        getInfoData: getInfoData,
        getNewsData: getNewsData,
        getVideoData: getVideoData
	};

})(window);