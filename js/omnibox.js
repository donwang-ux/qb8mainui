(function(){
// for search box
// QBCache QBUtils
var QBCache = {
  storage : window.localStorage,
  set: function(key, value, expires) {
    if (!key || ! value) {
      return false;
    }
    expires = expires || 86400*365*1000; //默认缓存半小时
    var current = new Date().getTime();

    try {
      var wrapped = {
        expires: current + expires,
        rawData: value
      };
      this.storage.set(key, JSON.stringify(wrapped));
    } catch(e) {
      return false;
    }
    return true;
  },
  //expires时间单位:ms
  get: function(key) {
    if (!key || key==="undefined") {
      return null;
    }
    var wrapped;
    try{

      wrapped = this.storage.get(key);

    }catch(e){
      return null;
    }
    if (!wrapped) {
      return null;
    }
    try {
      wrapped = JSON.parse(wrapped);
      if (wrapped && typeof(wrapped) === 'object' && typeof(wrapped.expires) === 'number') {
        if (typeof(wrapped.rawData) !== 'undefined') {
          var current = new Date().getTime();
          if (current <= wrapped.expires) {
            return wrapped.rawData;
          }
        }
      }
    } catch(e) {return null;}
    return null;
  }
};
var QBUtils = {
  trim : function(str){
    if (typeof(str) === 'string') {
      return str.replace(/^\s+/, '').replace(/\s+$/, '');
    } else {
      return '';
    }
  }
};

// smartboxEnginModel.js
/**
 * Created with JetBrains PhpStorm.
 * User: qimingzhang
 * Date: 13-6-24
 * Time: 下午11:34
 * To change this template use File | Settings | File Templates.
 */
var baidu_parse = function(data){
    data = data.s;
    var res = [];
    for (var i = 0; i < data.length; i++) {
        res.push({
            word: data[i],
            hint: '',
            type: ''
        });
    }
    return res;
};

var google_web_parse = function(data){
  var _data = data[1];
  var res  =[];
    for(var i=0;i<_data.length;i++){
        res.push({
            word:_data[i][0],
            hint:0,
            type:0
        });
    }
    return res;
};

var bing_web_parse = function(data){
    var _data = data.AS.Results[0].Suggests;
    var res = [];
    for(var i=0;i<_data.length;i++){
        res.push({
            word:_data[i].Txt.replace(/<strong>/g,'').replace(/<\/strong>/g,''),
            hint:0,
            type:0
        });
    }
    return res;

};

var SmartboxConfiguration = {
    _default:{
        _default:{
            url:"http://suggestion.baidu.com/su?",
            key:"wd",
            jsonp:"cb",
            charset:'gbk',
            parseData:baidu_parse
        }
    },
    web: {
        baidu: {
            url: "http://suggestion.baidu.com/su?",
            key: "wd",
            jsonp:"cb",
            charset:'gbk',
            parseData :baidu_parse

        },
        sogou: {

        },
        google: {
            url: "http://www.google.com.hk/complete/search?",
            key: "q",
            jsonp:"callback",
            params:{
              "hl":"zh-CN",
               "client":"hp"
            },
            parseData:google_web_parse
        },
        bing: {
            url: "http://api.bing.com/qsonhs.aspx?",
            key: "q",
            jsonp:"cb",
            params:{
                "mkt":"zh-CN",
                "type":"cb",
                "o":"a+ds+ds+h+p"
            },
            parseData:bing_web_parse
        },
        // jingle delete soso since 2.4 , go back
        // soso: {
        //     url:"http://www.soso.com/smart.q?",
        //     key:"w",
        //     jsonp:"m",
        //     charset:'gbk',
        //     parseData:function(data){
        //         data = data.split("\n");
        //         res = [];
        //         for (i = 0; i < data.length; i++) {
        //             data[i] = data[i].split("\t");
        //             res.push({
        //                 word: data[i][1],
        //                 hint: data[i][0],
        //                 type: data[i][2]
        //             })
        //         }
        //         return res;
        //     }
        // }
    }
};

SmartboxConfiguration.web.sogou = SmartboxConfiguration._default._default;
//设置每个channel默认提示引擎
SmartboxConfiguration.web._default = SmartboxConfiguration.web.baidu;
var SmartboxEnginModel= function() {
    this.params = {};
    this.engin = '_default';
    this.channel = '_default';
    return this;
};

SmartboxEnginModel.prototype.setParam = function(key, value) {
    this.params[key] = encodeURIComponent(value);
    return this;
};

SmartboxEnginModel.prototype.getParam = function(key, value) {
    return this.params[key];
};

SmartboxEnginModel.prototype.getJSONP = function(){
   var tmp = SmartboxConfiguration[this.channel][this.engin].jsonp || 'callback';
    return tmp;
};
SmartboxEnginModel.prototype.getCharset = function(){
    var tmp = SmartboxConfiguration[this.channel][this.engin].charset || 'utf-8';
    return tmp;
};
SmartboxEnginModel.prototype.getQueryUrl = function(keyword) {

    var engin = this.engin || '_default';
    var channel = this.channel || '_default';
    var urlParams = {};
    var config = SmartboxConfiguration[channel] && SmartboxConfiguration[channel][engin];
   // alert('config:'+config);
    if (!config) {
        return '';
    }

    if(!QBUtils.trim(keyword)){
        return config.home;
    }

    if (typeof(config.url) === 'function') {
        return config.url(keyword);
    }

    //百度地图要求查询关键字必须在？后第一个，原来是放在最后一个的(roy的写法)
    urlParams[config.key || 'w'] = encodeURIComponent(keyword);

    for (var k in config.params) {
        if (typeof(config.params[k]) === 'function') {
            urlParams[k] = config.params[k](keyword);
        } else if (typeof(k) === 'string') {
            urlParams[k] = config.params[k];
        }
    }

    //透传的参数会覆盖默认的参数
    for (k in this.params) {
        urlParams[k] = this.params[k];
    }

    var url = config.url.indexOf('?') === - 1 ? config.url + '?': config.url;
    var temp = [];
    for (k in urlParams) {
        //if (!urlParams[k]) continue;
        temp.push(k + '=' + urlParams[k]);
    }
    return url + temp.join('&');

};

SmartboxEnginModel.prototype.getData = function(keyword,cb_fun,error_fun){
    var engin = this.engin || '_default';
    var channel = this.channel || '_defualt';
    //设置时间戳
    this.setParam('_',Date.parse(new Date()));

    var jsonp_name = this.getJSONP();
    var _url = this.getQueryUrl(keyword);
    var _charset = this.getCharset();
    window.qqnewtab_cb=cb_fun;

    $.ajax({
        'url': _url,
        'dataType': 'jsonp',
        'contentType': 'application/script',
        'jsonp':jsonp_name,
        'jsonpCallback': 'qqnewtab_cb',
        'charset':_charset,
        'timeout': 2000,
        'error':error_fun
    });
};

SmartboxEnginModel.prototype.parseData=function(keyword){

    var engin =  this.engin || '_default';
    var channel = this.channel || '_default';

    return SmartboxConfiguration[channel][engin].parseData(keyword);
};

//记录当前channel，eng
SmartboxEnginModel.prototype.changeSmartbox= function(_channel,_engin){
    this.engin = _engin;
    this.channel = _channel;
};

SmartboxEnginModel.prototype.setDeafultSmartbox = function(){
    if(this.channel=='_default'){
        return false;
    }
    //先设置为本channel的default提示引擎，仍失败时选用全局的default提示引擎
    if(this.engin!=='_default'){
        this.engin='_default';
    }
    else{
        this.channel='_default';
    }
    return true;
};

// smartbox_haoqq.js
function SoSo_SmartBox(target, sCallBack, rChlCallBack){

    var model =this.model = new SmartboxEnginModel();

    var _$=function(a){
        return (typeof(a)=="object")?a:document.getElementById(a);
    }
    var _$c = function (a) {
        return document.createElement(a)
    }
    var _self = this;
    // 搜索框对象
    var _target = _$(target);
    // 搜索框位置信息
    var _rect = {};
    // 智能提示开关
    var _enable = false;
    // 当前选中项索引
    var _index = -1;
    var _items = [];
    // 原始提示数据
    var _data = [];
    // 搜索框上次输入
    var _key = "";
    //用户当次原始输入
    var _Skey = "";
    // 探测计时器
    var _timer = null;
    // 是否当前可见
    var _showing = false;
    var _smartPopId=0;
    // 清除选中项
    var _clearSel = function(){
        for (pos in _items) {
            _items[pos].className = "mouseout";
        }
    };
    var _trim = function(str)
    {
        return (typeof(str)=="string")?(str.replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' )):"";
    }
    var _prevWord =_trim(_target.value);
    //提交搜索
    var _search = function(){
         if(typeof(sCallBack)=="function"){
            sCallBack();
        }
    };
    //关闭smartbox
    var _close = function(){
	//Don//return ;
		//don,用于动画
        $('#poparea').addClass("panelHide");
		$('#poparea').removeClass("panelShow");
        $('#toolbar').removeClass('pop');
        $("#webmask").hide();
		//don end
        _showing = false;
        _index = -1;
        _items = [];
        _data = [];
        _key = "";
        var tipDiv = _$(_smartPopId);
        if (tipDiv && tipDiv != null) {
            tipDiv.parentNode.removeChild(tipDiv);

        }
    };

    var markStrong = function(userInput,keyword) {
        if( keyword.indexOf(userInput) != 0 ){
            return keyword;
        }
        return  userInput + '<strong>' + keyword.substr(userInput.length) + '</strong>';
    };

    // 创建提示框
    var _open = function(){
        // 创建提示框
        var tipDiv = _$c('li');
        tipDiv.id = _smartPopId = 'soso_SmartPop_' + Math.round(Math.random()*100000);
        tipDiv.className = 'soso_SmartPop';
        tipDiv.style.height = ""+_data.length*26+"px";
        $('#toolbar').addClass('pop');


        //don,用于动画
        $('#poparea').show();
        $('#poparea').removeClass("panelHide");
        $('#poparea').addClass("panelShow");
        $("#webmask").show();
        //don end
        // 创建提示项
        $('div.taobaosuggest ul').empty();
        for (var i=0,n=_data.length;i<n;i++) {


            var itemDiv = _$c('div');
            // itemDiv.style.height="26px";
            itemDiv.seq = parseInt(i);
            (function(){// 处理提示项鼠标悬停事件
                var store = itemDiv;
                _self.Event.add(itemDiv, 'mouseover', function(){
                    _clearSel();
                    store.className = "mouseover";
                    _index = store.seq;
                });
            })();
            (function(){// 处理提示项鼠标离开事件
                _self.Event.add(itemDiv, 'mouseout', function(){
                    _clearSel();
                    _index = -1;
                });
            })();
            (function(){// 处理鼠标点击事件
                _self.Event.add(itemDiv, 'click', function(){
                    _prevWord = _Skey = _target.value = _data[_index].word;
                    _search();
                });
            })();
            //创建提示项各区域
            var tipText = _$c('div');
            tipText.innerHTML = markStrong(_target.value,_data[i].word);

            itemDiv.appendChild(tipText);
            tipDiv.appendChild(itemDiv);
            _items.push(itemDiv);
        }
        return tipDiv;
    };

    // 处理键盘导航事件
    var _handleEnterKeyEvent = function(e){

        if (!_showing && (e.keyCode == 38 || e.keyCode == 40)) {
            _enable = true;
            _detect();
        }
        /* even not sugestion stil search
        if (_items.length == 0) {
            return;
        }
        */
        // 处理enter事件, _index == -1表明用户未选中提示词
        if (e.keyCode == 13) {
            _self.Event.stop(e);
            _prevWord = _target.value;
            _search();
        }
    }


    // 处理键盘导航事件
    var _handleKeyEvent = function(e){
        if (!_showing && (e.keyCode == 38 || e.keyCode == 40)) {
            _enable = true;
            _detect();
        }
        if (_items.length == 0) {
            return
        }

        // 处理enter事件, _index == -1表明用户未选中提示词
        if (e.keyCode == 13 && _index != -1) {
            _self.Event.stop(e);
            _prevWord = _target.value;
            _search();
        }


        else
            if (e.keyCode == 38)// 处理up事件
            {
                _self.Event.stop(e);
                _clearSel();
                _index = (_index < 0) ? (_items.length - 1) : (_index - 1);
                if (_index == -1) {
                    _key = _target.value = _Skey;
                }
                else {
                    _items[_index].className = "mouseover";
                    _key = _target.value = _data[_index].word;
                }
            }
            else
                if (e.keyCode == 40)// 处理down事件
                {
                    _self.Event.stop(e);
                    _clearSel();
                    _index = (_index > _items.length - 1) ? 0 : (_index + 1);
                    if (_index == _items.length)
                        _key = _target.value = _Skey;
                    else {
                        _items[_index].className = "mouseover";
                        _key = _target.value = _data[_index].word;
                    }
                }
                else
                    if (e.keyCode == 27)//处理esc
                    {
                        _self.Event.stop(e);
                        _clearSel();
                        _close();
                        _target.value = _Skey;
                        $('#poparea').hide();
                    }
    };

    // 提示框定位
    var _locate = function(elem){
        document.getElementById('poparea').appendChild(elem);
        _showing = true;
    };

    var soso_jpcall_inner =function (data){
        _enable = true;
        _close();
        _Skey = _key = _target.value;
        _data = _parse(data);
        if(_data.length>0){
       // if (_data = _parse(data) ) {
            c = _open();
            _locate(c);
        }
    }
    var jpcall_name="soso_jpcall_"+Math.round(1000000+Math.random()*10000000);
    window[jpcall_name] = function(d){
        try{
            soso_jpcall_inner(d);
        }
        catch(error){
            //TODO:切换到默认提示引擎
            model.setDeafultSmartbox();
        }
       
    }

    //TODO:搜狗&soso音乐callback函数名
    window['sugCls'] ={
        handleContent:soso_jpcall_inner
    };

    window['MusicJsonCallback'] = soso_jpcall_inner;
   

    //var _jsonploader=haoqq.util.jsLoader;

    var err_fun = function(){
        if(!_showing){
            model.setDeafultSmartbox();
        }
      };
    // 抓取提示数据
    var _start = function(){
        soso_global_smartbox_data=[];
        _enable = false;
        //model.getData(_target.value,window[jpcall_name],model.setDeafultSmartbox());
        model.getData(_target.value,window[jpcall_name],err_fun);
/*
        var jcb = jpcall_name+"&_"+Math.random();
*/
    };

    // 解析数据
    var _parse = function(data){
         return model.parseData(data);
    };


    // 探测搜索框
    var _detect = function(){
        if (_timer != null) {
            clearTimeout(_timer);
            _timer = null;
        }
        _timer = setTimeout(function(){
            if (!_enable || _trim(_target.value).length == 0) {
                _close();
                $('#poparea').hide();
            }
            else
            if (rChlCallBack() && _key != _target.value) {
                _start();
            }
            _timer = null;
        }, 300);
    };

    (function(){
        _self.Event.add(_target, 'keypress', function(e){
            _handleEnterKeyEvent(e);
        });
        _self.Event.add(_target, 'keyup', function(e){
            _handleKeyEvent(e);
        });
        /*
        _self.Event.add(_target, 'blur', function(){
            _enable = false;
            _detect();//失去焦点
        });
        */
        _self.Event.add(window, 'resize', function(){
            _enable && _start();// 窗口变化
        });
        // 监听输入框事件
        var _timeoutId;
        var _listen = function(){
            _timeoutId = setTimeout(function(){
                if (_prevWord != _trim(_target.value)) {
                    _prevWord = _trim(_target.value);
                    _enable = true;
                    _detect();
                }
                _timeoutId = setTimeout(arguments.callee, 80);
            }, 80);
        };
        var _unlisten = function(){
            clearTimeout(_timeoutId);
        };
        // 开始监听
        var isClick_ = true;
        //var isFrist_ = true;
        //don&photo,点击搜索栏，将展开。此逻辑同时用于处理展开收起相关的一些交互事件
        $("#omniinput").click(function(e) {

        	if($("#omniinput").hasClass('open') == false) {
        		$("#omniinput").addClass('open');
                isClick_ = true;
        	}
        	//don**如果没有open，且hover超过2秒，则open并取得键盘输入焦点
        	e.stopPropagation();//不会点到document
            if (isClick_) {
                $("#omniinput").select();//don,全选
                isClick_ = false;
            }

        	if($("#omniinput").val() != "" ){
        	 $('#poparea').removeClass("hide");
        	 //alert('has content!');
        	 //don**如果输入框里面有内容，则打一个alert
        	 //don**如果有内容，则发出拉取推荐搜索词的指令
        	}
        	//if (isFrist_) {
        	//	$('#poparea').removeClass("hide");
        	//	isFrist_ = false;
        	//}
        	return false;
        //don end
        });
        _self.Event.add(_target, 'focus', function(){
            _listen();
            _target.setAttribute("placeholder","");
            //don
            if($("#omniinput").hasClass('open') == false) {
            	$("#omniinput").addClass('open');
            	_start();
            	isClick_ = true;
                // comment temp 
            	// if (isFrist_) {
            	// 	$('#poparea').removeClass("hide");
            	// 	isFrist_ = false;
            	// }
            	return false;
            }//don end
            // $('#poparea').removeClass("hide");

        });



        _self.Event.add(_target, 'blur', function(){
            _unlisten();
        });
    })();
};

// 事件对象
SoSo_SmartBox.prototype.Event = {
    // 添加事件
    add: function(element, type, handler){
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else {
            element.attachEvent("on" + type, handler);
        }
    },
    // 清除事件
    remove: function(element, type, handler){
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else {
            element.detachEvent("on" + type, handler);
        }
    },
    // 停止冒泡
    stop: function(ev){
        if (ev.preventDefault) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        else {
            ev.cancelBubble = true;
            ev.returnValue = false;
        }
    }
};

//记录当前channel，eng
SoSo_SmartBox.prototype.changeSmartbox= function(channel,engin){
    this.model.changeSmartbox(channel,engin);

};

// SearchEnginModel.js
var ENGIN_SELECTION_STORAGE_PREFIX = 'channel:';
var channelLastEngin = {
  'web': 'baidu',
};
var st_key = {
  'web':'web2',
};
var SearchConfiguration = {
  web: {
    baidu: {
      home: 'http://www.baidu.com/',
      url: "http://www.baidu.com/s?",
      key: 'wd'
    },
    sogou: {
      home: 'http://www.sogou.com/',
      url: 'http://www.sogou.com/web?',
      key: 'query'
    },
    google: {
      home:'https://www.google.com.hk/',
      url: "http://www.google.com.hk/search?",
      key: 'q'
    },
    bing: {
      home: 'http://cn.bing.com/',
      url: 'http://cn.bing.com/search',
      key: 'q'
    },
    soso: {
      home: 'http://www.soso.com/',
      url: "http://www.soso.com/q?"
    }
  }
};

var SearchEnginModel = function() {
  //QBUtils.makeObservable(this);
  this.params = {};
  var engin;
  this.channel = 'web';
  if(st_key[this.channel]){
    engin = QBCache.get(ENGIN_SELECTION_STORAGE_PREFIX + st_key[this.channel]);
    if (engin) {
      channelLastEngin[this.channel] = engin;
    }
  }
  this.engin = channelLastEngin[this.channel];
  return this;
};

SearchEnginModel.prototype.setEngin = function(engin, options) {
  this.engin = engin;
  if (channelLastEngin[this.channel] != engin) {
    channelLastEngin[this.channel] = engin;
    QBCache.set(ENGIN_SELECTION_STORAGE_PREFIX + st_key[this.channel], engin);
  }
  if (! (options && options.silent)) {
    //this.notify('change_engin', engin);
  }
  return this;
};

SearchEnginModel.prototype.getEginsAll = function(channel){
  return SearchConfiguration[channel] || {};
}

SearchEnginModel.prototype.getEginsNum = function(channel){
  var temp = SearchConfiguration[channel] || {}, num =0 ;
  for(var i in temp){
    ++num;
  }
  return num;
}

SearchEnginModel.prototype.setChannel = function(channel, options) {

  this.channel = channel;
  if(st_key[this.channel]){
    engin = QBCache.get(ENGIN_SELECTION_STORAGE_PREFIX + st_key[this.channel]);
    if (engin) {
      channelLastEngin[channel] = engin;
    }
  }
  this.setEngin(channelLastEngin[channel]);
  if (! (options && options.silent)) {
    this.notify('change_channel', channel);
  }
  return this;
};

SearchEnginModel.prototype.setParam = function(key, value) {
  this.params[key] = encodeURIComponent(value);
  return this;
};

SearchEnginModel.prototype.getParam = function(key, value) {
  return this.params[key];
};

SearchEnginModel.prototype.getEnginNumber = function() {
  if (this.channel === 'web') {
    return 3;
  } else {
    return 1;
  }
};

SearchEnginModel.prototype.getQueryUrl = function(keyword, channel, engin) {

  engin = engin || this.engin || 'soso';
  channel = channel || this.channel || 'web';

  var urlParams = {};
  var config = SearchConfiguration[channel] && SearchConfiguration[channel][engin];

  if (!config) {
    return '';
  }

    if(!QBUtils.trim(keyword)){
        return config.home;
    }

  if (typeof(config.url) === 'function') {
    return config.url(keyword);
  }

  for (var k in config.params) {
    if (typeof(config.params[k]) === 'function') {
      urlParams[k] = config.params[k](keyword);
    } else if (typeof(k) === 'string') {
      urlParams[k] = config.params[k];
    }
  }

  //透传的参数会覆盖默认的参数
  for (k in this.params) {
    urlParams[k] = this.params[k];
  }

  urlParams['ie'] = 'utf-8';
  urlParams[config.key || 'w'] = encodeURIComponent(keyword);

  var url = config.url.indexOf('?') === - 1 ? config.url + '?': config.url;
  var temp = [];
  for (k in urlParams) {
    //if (!urlParams[k]) continue;
    temp.push(k + '=' + urlParams[k]);
  }
  return url + temp.join('&');

};

// SearchView.js
var smartboxView = null;
var doSearch = function() {
  chrome.send("qqnewtab.search.report",[model.engin]);
  var query_key = arguments[0]||$('#omniinput').val();
  window.open(model.getQueryUrl(query_key));
};
var container = null;
var model = new SearchEnginModel();
var enginSelect = null;
var icon_url_prefix="chrome://resources/images/qqnewtab/favicon_search_";
var searchEngineLogo = null;
var logoConfig = {

  baidu: {
    'default': 'baidu',
    'title' : '百度',
    'css':'baidu',
    'icon' : 'baidu'
  },
  sogou: {
    'default': 'sogou',
    'title' : '搜狗',
    'css':'sogou',
    'icon' : 'sogou'
  },
  google: {
    'default': 'google',
    'title' : 'Google',
    'css':'google',
    'icon' : 'google'
  },
  bing: {
    'default': 'bing',
    'icon' : 'bing',
    'css':'bing',
    'title' : 'Bing'
  },
  soso: {
    'default': 'soso',
    'title' : 'SOSO',
    'css':'soso',
    'icon' : 'soso'
  }
};
var initSearchEngine = function() {
    smartboxView = new SoSo_SmartBox(
        $('#omniinput')[0], function() {
            doSearch();
        },  function() {
            return true;
        });;
    container = $('div.omnibox');
    enginSelect = container.find('div.suggestlayerout ul');
    searchEngineLogo = container.find("div.searchChangeBtn").eq(0);
  //   //changeLogo(model.channel, model.engin);
  //   //chrome.send("getSearchEngine");
  //   $('.searchsubmit').click(function(){
  //       doSearch();
  //       $('#omniinput')[0].focus();

  //   });
  //   var t = 0;
  //   $('#searchdropdown').mouseover(function(evt){
  //   	$('#searchdropdown').show();
  //   	clearTimeout(t);
  //   	t = 0;
  //   });
  //   searchEngineLogo.mouseover(function(evt){
  //   	evt.stopPropagation();
  //   	var engin_num = model.getEginsNum(model.channel);
  //   	if(engin_num > 1){
  //   	  showSeachSelect(model.channel);
  //   	}
  //   	clearTimeout(t);
  //   	t = 0;
  //   });
  //   $('#searchdropdown>li').mouseover(function(evt){
  //   	$('#searchdropdown').show();
  //   	clearTimeout(t);
  //   	t = 0;
  //   });
  //   $('#searchdropdown').mouseout(function(evt){
  //   	t = setTimeout(function() {$('#searchdropdown').hide();}, 400);
  //   });
  //   searchEngineLogo.mouseout(function() {t = setTimeout(function() {$('#searchdropdown').hide();}, 400);});
  //   enginSelect.delegate('li','click',function(ev){
  //       var engin = $(this).attr('engin');
  //        if(QBUtils.trim(engin) ==QBUtils.trim(model.engin)){
  //            enginSelect.parent().hide();
  //            return;//don**这里也不要冒泡，不能让搜索栏和下拉收起来
  //       }
  //       chrome.send("setSearchEngine",[engin]);
  //       ev.stopPropagation();
  //   });
  //   $(document).click(function(){
  //   	var aim = $(event.target);
  //       var len = aim.parents("#searchdropdown").length;
  //       if (len){
  //          //console.info("do not hide");
  //          return ;
  //       }
  //       enginSelect.parent().hide();
  //       //don收起搜索栏
  // //      alert('点到document了');
  //       $("#omniinput").removeClass('open');
  //       $('#poparea').addClass("hide");
  //       //don end
  //   });
  //   //$('#omniinput').focus().val();
  //   model.setParam('cid','qb7.zhuye');
};
var changeLogo = function(channel, engin) {
  model.setEngin(engin);
  //console.info(["changeLogo",channel, engin]);
  smartboxView.changeSmartbox(channel,engin);
  var className = '',engin_num = model.getEginsNum(channel),img = searchEngineLogo.find('img');
  if (logoConfig[engin]) {
    var tmp ='<img src="'+icon_url_prefix+logoConfig[engin].icon+'.png" />';
    if(img.length){
        img.remove();
    }
    searchEngineLogo.find("div.searchEngineLogo").prepend(tmp);
    if(engin_num<=1){
        searchEngineLogo.find('span.arrowsdown').addClass("off");
    }
    else{
        searchEngineLogo.find('span.arrowsdown').removeClass("off");
    }
    //enginSelect.parent().hide();
    $("#searchdropdown").hide();
    //$('#omniinput').attr("placeholder",logoConfig[engin].title);
    $('#searchBtn').attr("value",logoConfig[engin].title + '搜索');
    //$('#searchHint').html(logoConfig[engin].title + '搜索');
    $('#searchHint').html('搜索');
  }
};

var showSeachSelect = function(channel){
  var engins = model.getEginsAll(channel);
  var html = "",length=0;
  /*
  <li title="切换为百度搜索" engin="baidu">
        <span class="icon">
          <img width="16" height="16" src="res/favicon_search_baidu.png">
        </span>百度</li>
  */
  for(var i in engins){
    if(logoConfig[i]){
      ++length;
      html += '<li title="切换为'+logoConfig[i]['title']+'搜索" engin="'+i+'"><span class="icon"><img width="16" height="16" src="'+icon_url_prefix+logoConfig[i].icon+'.png" /></span>'+logoConfig[i]['title']+'</li>';
    }
  }
  if(length > 1){
    enginSelect.html(html);
    enginSelect.find("li:first").addClass('fr');
    enginSelect.find("li:last").addClass("ls");
    enginSelect.parent().show();
  }
};

// qq newtab ntp
// cr.define('ntp', function(){
//     var mostVisitedPage=[];
//     function fillData(data){
//       //console.info(data);
//       data = dataClean(data);
//       var closelist = document.querySelectorAll(".close");
//       for (var i=0; i<closelist.length; i++){
//         if (i < data.length){
//             closelist[i].setAttribute("url",data[i].url);
//             closelist[i].removeAttribute("hidden");
//             closelist[i].onclick = function(e){
//                 e.preventDefault();
//                 var target = e.target;
//                 var url = target.getAttribute("url");
//                 if (url){
//                     target.removeAttribute("url");
//                     target.onclick=null;
//                     target.setAttribute("hidden","");
//                     if (typeof target.parentElement != "undefined"){
//                         target.parentElement.href="";
//                     }
//                     chrome.send('blacklistURLFromMostVisited', [url]);
//                 }
//             }
//         }else{
//             closelist[i].removeAttribute("url");
//             closelist[i].onclick = null;
//             closelist[i].setAttribute("hidden","");
//         }
//       }
//       var imglist = document.querySelectorAll(".thumbnail");
//       for (var i = 0; i < imglist.length; i++) {
//         if (i < data.length){
//           imglist[i].src = "chrome://thumb/"+data[i].url;
//           imglist[i].onerror = function(){
//             this.src = "res/thumb_sample.png";
//           };
//         }else{
//           imglist[i].src = "res/empty.png";
//         };
//       };
//       var spanlist = document.querySelectorAll(".title");
//       for (var i = 0; i < spanlist.length ; i++){
//         if (i < data.length){
//           spanlist[i].innerText = data[i].title ;
//         }else{
//           spanlist[i].innerHTML = "&nbsp;" ;
//         };
//       };
//       var linklist = document.querySelectorAll(".contain");
//       for (var i = 0; i < linklist.length; i++){
//         if (i < data.length){
//           linklist[i].classList.remove("empty");
//           linklist[i].href = data[i].url;
//           linklist[i].onclick =(function(ind){
//             return function(){
//                 chrome.send("qqnewtab.boxclick",[ind]);
//             }
//           })(i);
//         }else{
//           linklist[i].classList.add("empty");
//           linklist[i].removeAttribute("href");
//           linklist[i].onclick = null;
//         }
//       };
//     }
//     function dataClean(data){
//         var ret=[];
//         for (var i=0;i<data.length;i++){
//           if (data[i].url == "http://www.google.com/chrome/intl/zh-CN/welcome.html" ||
//               data[i].url == "https://chrome.google.com/webstore?hl=zh-CN"){
//             //console.info(["jingle just ban: ",data[i]]);
//           }else{
//             ret.push(data[i]);
//           }
//         }
//         return ret;
//     }
//     function onLoad() {
//      console.info("ntp works");
//         initSearchEngine();
//         chrome.send("getMostVisited");
//     }
//     function setMostVisitedPages(data, hasBlacklistedUrls) {
//         //console.info(["setMostVisitedPages",data]);
//         mostVisitedPage=data;
//         fillData(mostVisitedPage);
//     }
//     return {
//         onLoad: onLoad,
//         setMostVisitedPages: setMostVisitedPages,
//         changeEngine: changeLogo
//     };
// });
initSearchEngine();
//document.addEventListener('DOMContentLoaded', ntp.onLoad);
})();

//don&photo,点击搜索栏，将展开。此逻辑同时用于处理展开收起相关的一些交互事件
//$( document ).on("click", "#omniinput", function() {
//	if($(this).hasClass('open') == false) {
//		$(this).addClass('open');
//	}
//});

//end

//#blade#huiyang#add for 2014 worldcup {
// (function(){
//     var flags = ['brazil','england','france','germany','italy','netherlands','portugal','spain','agentina'];
//     var selectedCountry = "brazil";
//     var pref = "qq.settings.worldcup_selected_country";
//     function initFlagList(){
//         flags.forEach(function(flag){
//             var flagli = document.createElement("li");
//             flagli.classList.add("flag");
//             flagli.classList.add(flag + "-flag");
//             flagli.setAttribute("country",flag);
//             $("#worldcup-flag-list").append(flagli);
//         });

//         $("#worldcup-switch-btn").on("mouseover",function(e){
//             $("#worldcup-flag-panel").show();
//             console.log("flag list show");
//             e.preventDefault();
//             e.stopPropagation();
//         });

//         $("#worldcup-flag-list").on("mouseover",function(e){
//             e.preventDefault();
//             e.stopPropagation();
//         });

//         $(document).on("mouseover",function(e){
//             if($("#worldcup-flag-panel").css("display") != 'none'){
//                 $("#worldcup-flag-panel").hide();
//                 console.log("flag list hide");

//                 switchCountry(selectedCountry);
//             }
//         })

//         $(".flag").on("mouseover",function(e){
//             e.preventDefault();
//             e.stopPropagation();
//         });

//         $(".flag").on("click",function(e){
//             selectedCountry = $(e.target).attr("country");
//             chrome.send("setStringPref",[pref,$(e.target).attr("country")]);

//             $(".flag").removeClass("selected");
//             $(e.target).addClass("selected");
//             e.preventDefault();
//             e.stopPropagation();
//         });

//         chrome.send("fetchPrefs",["fetchPrefsCallback",pref]);
//         chrome.send("observePrefs",["observePrefsCallback",pref]);

//     }

//     function fetchPrefsCallback(dict){
//         var value = getPrefValue(dict,pref);
//         if(value != "") selectedCountry = value;

//         $(".flag").removeClass("selected");
//         $("." + selectedCountry + "-flag").addClass("selected");
//         switchCountry(selectedCountry);
//     }

//     function observePrefsCallback(dict){
//         if(dict[0] != pref) return;
//         selectedCountry = dict[1].value;
//         switchCountry(selectedCountry);
//     }

//     function getPrefValue(dict,pref){
//         var names = pref.split(".");
//         var value = dict;
//         names.forEach(function(name,index){
//           if(value.hasOwnProperty(name)){
//             value = value[name];
//           }
//         });
//         return value.value;
//     }

//     function switchCountry(country){
//         flags.forEach(function(flag){
//             $(".wrapper").removeClass(flag);
//         });
//         if(!$(".wrapper").hasClass("worldcup")){
//             $(".wrapper").addClass("worldcup")
//         }
//         $(".wrapper").addClass(country);
//     }

//     document.addEventListener('DOMContentLoaded',initFlagList);

//     window.fetchPrefsCallback = fetchPrefsCallback;
//     window.observePrefsCallback = observePrefsCallback;
// })();
//#blade#huiyang#add for 2014 worldcup }
