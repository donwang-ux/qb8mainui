// 全局变量

// 宫格信息
var grid_arr = [
    {
        id: 1,
        url: 'http://www.baidu.com/',
        title: '百度1-用来测试文字的长度，超长的标题啊~~~~~~',
        status: 129,
        thumbPath: '',
        thumbTimestamp: +new Date(),
        order: 0
    }, {
        id: 2,
        url: 'http://www.qq.com/',
        title: 'QQ\u90AE\u7BB1',
        status: 82,
        thumbPath: '',
        thumbTimestamp: +new Date(),
        order: 1
    },{
        id: 3,
        url: 'http://www.baidu.com/',
        title: '百度2',
        status: 1,
        thumbPath: '',
        thumbTimestamp: +new Date(),
        order: 2
    }, {
        id: 4,
        url: 'http://www.qq.com/',
        title: 'qq2',
        status: 2,
        thumbPath: '',
        thumbTimestamp: +new Date(),
        order: 3
    },{
        id: 5,
        url: 'http://www.baidu.com/',
        title: '百度3',
        status: 1,
        thumbPath: '',
        thumbTimestamp: +new Date(),
        order: 4
    }, {
        id: 6,
        url: 'http://www.qq.com/',
        title: 'qq3',
        status: 2,
        thumbPath: '',
        thumbTimestamp: +new Date(),
        order: 5
    },{
        id: 7,
        url: 'http://www.baidu.com/',
        title: '百度4',
        status: 1,
        thumbPath: '',
        thumbTimestamp: +new Date(),
        order: 6
    }
];
// 搜索引擎列表
var search_engine_arr = [
    {
        id: 0,
        title: 'SOSO',
        thumbPath: 'images/searchbar_soso.ico',
        isActive: false
    },
    {
        id: 1,
        title: '百度',
        thumbPath: 'images/searchbar_baidu.ico',
        isActive: true
    },
    {
        id: 2,
        title: 'Google',
        thumbPath: 'images/searchbar_google.ico',
        isActive: false
    },
    {
        id: 3,
        title: 'Bing',
        thumbPath: 'images/searchbar_bing.ico',
        isActive: false
    },
    {
        id: 4,
        title: '搜狗',
        thumbPath: 'images/searchbar_sogou.ico',
        isActive: false
    }
];
var search_engine_idx = 0;
// 资讯页列表数据
var info_data;
// 资讯视频详情
var info_video_detail;
// ie版本
var is_msie = navigator.userAgent.indexOf("MSIE")>-1 ? true : false;
var is_msie_9 = navigator.userAgent.indexOf("MSIE 9.0")>-1 ? true : false;
// 窗体大小
var window_width;
var window_height;
// 导航的width
var page_nav_width = 120;
// 导航idx
var page_idx = 0;
// 是否在drag状态
var is_drag = false;
// 是否是有效drag
var is_valid_drag = false;
// 是否在scroll状态
var is_scroll = false;
// 图片裁剪地址
var img_cut_url = 'http://read.html5.qq.com/image?imageUrl=';