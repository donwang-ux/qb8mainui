// 搜索封装
(function(W) {

    var jsEleId = 'search-data-js';
    var searchKeyword;

    // function searchKeyword(keyword) {
    //     var url = 'http://suggestion.baidu.com/su?';
    //     var stamp = +new Date();
    //     var jsEle = document.createElement('script');
    //     keyword = $.trim(keyword);
    //     searchKeyword = keyword;
    //     url += 'wd='+encodeURIComponent(keyword)+'&cb=QA.search.getSearchData&_='+(stamp/1000).toFixed()+'000&_'+stamp+'=';
    //     jsEle.id = jsEleId;
    //     jsEle.type = 'text/javascript';
    //     jsEle.charset = 'gbk';
    //     jsEle.src = url;
    //     document.body.appendChild(jsEle);
    // }

    function getSearchData(data) {
        var searchDataEle = document.getElementById('search-data');
        if (data.q != searchKeyword) {
            return;
        }
        if (data.s.length) {
            QA.business.buildSearchData(data.s, data.q);
            searchDataEle.style.display = 'block';
        }
        else {
            searchDataEle.style.display = 'none';
        }
        document.body.removeChild(document.getElementById(jsEleId));
    }

    function searchKeyword(keyword) {
        var url = 'http://api.sugg.sogou.com/su?ie=utf8';
        var jsEle = document.createElement('script');
        keyword = $.trim(keyword.toLocaleLowerCase());
        searchKeyword = keyword;
        url += '&type=web&key='+encodeURIComponent(keyword);
        jsEle.id = jsEleId;
        jsEle.type = 'text/javascript';
        jsEle.charset = 'gbk';
        jsEle.src = url;
        document.body.appendChild(jsEle);
    }

    W.sogou = {};
    W.sogou.sug = function (data) {
        var searchDataEle = document.getElementById('search-data');
        if (data[0] != searchKeyword) {
            return;
        }
        if (data[1].length) {
            QA.business.buildSearchData(data[1], data[0]);
            searchDataEle.style.display = 'block';
        }
        else {
            searchDataEle.style.display = 'none';
        }
        document.body.removeChild(document.getElementById(jsEleId));
    }

    W.QA = W.QA || {};
    W.QA.search = {
        searchKeyword: searchKeyword,
        getSearchData: getSearchData
    };

}(window));