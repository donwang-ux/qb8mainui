var data =[
 	{
 		"name":"shopping",
 		"content":[
			{
				"id":1,  
				"type":1,//有输入框
				"name":"taobao",
				"title":{"label":"淘宝网" , "url":"http://www.taobao.com"},
				"subtitle":[
					{"label":"已买到的宝贝" , "url":"https://login.taobao.com/member/login.jhtml?redirectURL=http%3A%2F%2Ftrade.taobao.com%2Ftrade%2Fitemlist%2Flist_bought_items.htm%3Fspm%3D1.7274553.1997525045.2.qHVynR"},
					{"label":"购物车" , "url":"http://cart.taobao.com/cart.htm"},
					{"label":"天猫" , "url":"http://www.tmall.com/"}
				]
			},
			{
				"id":3,   
				"type":2,
				"name":"meituan",
				"title":{"label":"美团" , "url":"http://www.meituan.com"},
				"subtitle":[
					{"label":"美食" , "url":"http://meituan.com/category/meishi"},
					{"label":"电影" , "url":"http://meituan.com/dianying/all"},
					{"label":"休闲娱乐" , "url":"http://meituan.com/category/xiuxianyule"}
				],
				"content":[
					{
						"title":"今日新单",
						"list":[
							{"listType":1 , "imgurl":"" , "label":"XXXXXXX按时大大XXX啊实打实大的XXXXX阿斯达阿斯达发放三国杀三个XXXXXXX" , "url":"http://bj.meituan.com/category/new"},  //内容块——纯文字列表 样式
							{"listType":1 , "imgurl":"" , "label":"XXXXXXXXXXXXXXXXXXXXXX" , "url":"http://bj.meituan.com/category/new"},
							{"listType":1 , "imgurl":"" , "label":"asdasdasdasdasdasdasdasdasda" , "url":"http://bj.meituan.com/category/new"}
						],
						"css":"#bfecee|#d5f6f7"
					}
				]
			},
			{ 													  //有内容块
				"id":4,
				"type":2,
				"name":"weipinhui" ,
				"title":{"label":"唯品会" , "url":"http://www.vip.com"},
				"subtitle":[
					{"label":"我的订单" , "url":"http://my.vip.com/orders/orders.php"},
					{"label":"爱丽奢" , "url":"http://lux.vip.com/"}
				],
				"content":[
					{
						"title":"特卖推荐",
						"list":[
							{"listType":4 ,"imgurl":"", "label":"舒朗SHOW LONG女装专场爱上大声大声道" , "url":""}, //内容块——文字 两列排列 样式
							{"listType":4 ,"imgurl":"", "label":"舒朗SHOW LONG女装专场" , "url":""},
							{"listType":4 ,"imgurl":"", "label":"舒朗SHOW LONG女装专场" , "url":""}, 
							{"listType":4 ,"imgurl":"", "label":"舒朗SHOW LONG女装专爱上大声大声场" , "url":""}
						],
						"css":"#fad8ee|#fdf1f9"
					}
				]
			},
			{
				"id":2,  
				"type":2,//没有输入框
				"name":"yitao", 
				"title":{"label":"一淘" , "url":"http://www.etao.com"},
				"subtitle":[
					{"label":"我的订单" , "url":"http://i.etao.com/trade/orderlist.html"},
					{"label":"我的收藏" , "url":"http://i.etao.com/favorite/collect_list.html"},
					{"label":"海外正品" , "url":"http://www.etao.com/haitao/index.html"}
				]
			}
			/*{												     //有内容块
				"id":5,
				"type":2,
				"name":"jumeiyoupin" ,
				"title":{"label":"聚美优品" , "url":"http://www.jumei.com"},
				"subtitle":[
					{"label":"我的订单" , "url":"http://www.jumei.com/i/account/login/?redirect=%2Fi%2Forder%2Flist"},
					{"label":"特卖精选" , "url":"http://bj.jumei.com/?from=Home_show_nav_fresh"}
				],
				"content":[
					{
						"title":"特卖推荐",
						"list":[
							{"listType":4 ,"imgurl":"", "label":"舒朗SHOW LONG女装专场" , "url":""}, //内容块——文字 两列排列 样式
							{"listType":4 ,"imgurl":"", "label":"舒朗SHOW LONG女装专场" , "url":""},
							{"listType":4 ,"imgurl":"", "label":"舒朗SHOW LONG女装专场" , "url":""}, 
							{"listType":4 ,"imgurl":"", "label":"舒朗SHOW LONG女装专场" , "url":""}
						] 
					},
				]
			}*/
		]
 	},

	{
		"name":"social",
		"content":[
		{ 													  //有内容块
			"id":4,
			"type":2,
			"name":"QQkongjian" ,
			"title":{"label":"QQ空间" , "url":""},
			"subtitle":[
				{"label":"相册" , "url":""},
				{"label":"好友动态" , "url":""},
				{"label":"与我相关" , "url":""}
			],
			"content":[
				{
					"title":"大家都在看",
					"list":[
						{"listType":2 ,"imgurl":"image/pic.png", "label":"啊实打实大阿打算打大的阿打算打大大大是个阿萨德" , "url":""}, //内容块——图文 横向排列 样式
						{"listType":2 ,"imgurl":"image/pic.png", "label":"更多更好发挥我仍然阿萨德" , "url":""}
					],
					"css":"#f2edda|#f9f6eb"
				}
			]
		},
		{
			"id":3,   
			"type":2,
			"name":"xinlangweibo",
			"title":{"label":"新浪微博" , "url":"http://www.weibo.com"},
			"subtitle":[
				{"label":"提到我的" , "url":""},
				{"label":"评论" , "url":""},
				{"label":"私信" , "url":""}
			],
			"content":[
				{
					"title":"热门话题",
					"list":[
						{"listType":5 , "imgurl":"" , "label":"#怀孕护士遭殴打#" , "url":""},  //内容块——纯文字列表 样式
						{"listType":5 , "imgurl":"" , "label":"#赵又廷高圆圆结婚#" , "url":""},						
						{"listType":5 , "imgurl":"" , "label":"#高考倒计时#" , "url":""},						
						{"listType":5 , "imgurl":"" , "label":"#麦当劳出马卡龙#" , "url":""},						
						{"listType":5 , "imgurl":"" , "label":"#数字拆诗#" , "url":""},						
						{"listType":5 , "imgurl":"" , "label":"#森碟毕业了#" , "url":""}
					],
					"css":"#fbe6e6|#fcf5f5"
				}
			]
		},
		{
			"id":1,  
			"type":2,//无输入框
			"name":"renrenwang",
			"title":{"label":"人人网" , "url":"http://www.renren.com"},
			"subtitle":[
				{"label":"与我相关" , "url":""},
				{"label":"相册" , "url":""},
				{"label":"分享" , "url":""}
			]
		},		
		{												     //有内容块
			"id":5,
			"type":2,
			"name":"baidutieba" ,
			"title":{"label":"百度贴吧" , "url":"http://tieba.baidu.com"},
			"subtitle":[
				{"label":"我的收藏" , "url":""},
				{"label":"我关注的吧" , "url":""}
			]
		}
		/*{
			"id":2,  
			"type":2,//没有输入框
			"name":"douban", 
			"title":{"label":"豆瓣" , "url":"http://www.douban.com"},
			"subtitle":[
				{"label":"电影" , "url":"http://movie.douban.com/"},
				{"label":"小组" , "url":"http://www.douban.com/group/explore"},
				{"label":"豆邮" , "url":"http://www.douban.com/doumail/"},
			],
			"content":[
				{
					"title":"豆瓣正在发生......",
					"list":[
						{"listType":4 , "imgurl":"" , "label":"教你的妹子看世界杯" , "url":""},  //内容块——纯文字列表 样式
						{"listType":4 , "imgurl":"" , "label":"东西海涛，跨国淘便宜" , "url":""},
						{"listType":4 , "imgurl":"" , "label":"高考前一天晚上你做了什么？" , "url":""},
						{"listType":4 , "imgurl":"" , "label":"豆瓣喜剧电影Top250" , "url":""}
					]
				},
			]
		},*/
		]

	},
	{
		"name":"interest",
		"content":[
		{
			"id":3,   
			"type":2,
			"name":"4399",
			"title":{"label":"4399小游戏" , "url":"http://www.4399.com"},
			"subtitle":[
				{"label":"最新最好玩的小游戏" , "url":""},
				{"label":"游戏总排行" , "url":""}
			],
			"content":[
				{
					"title":"今日推荐",
					"list":[
						{"listType":5 , "imgurl":"" , "label":"怀孕护士遭殴打" , "url":""},  //内容块——纯文字列表 样式
						{"listType":5 , "imgurl":"" , "label":"赵又廷高圆圆结婚" , "url":""},						
						{"listType":5 , "imgurl":"" , "label":"高考倒计时" , "url":""},						
						{"listType":5 , "imgurl":"" , "label":"麦当劳出马卡龙" , "url":""},						
						{"listType":5 , "imgurl":"" , "label":"数字拆诗" , "url":""},						
						{"listType":5 , "imgurl":"" , "label":"森碟毕业了" , "url":""}
					],
					"css":"#e0efca|#f3fae9"
				}
			]
		},
		{ 													  //有内容块
			"id":4,
			"type":2,
			"name":"tengxuntiyu" ,
			"title":{"label":"腾讯体育" , "url":""},
			"subtitle":[
				{"label":"视频" , "url":""},
				{"label":"直播" , "url":""}
			],
			"content":[
				{
					"title":"",
					"list":[
						{"listType":2 ,"imgurl":"image/pic.png", "label":"啊实打实大大大大是个阿萨德" , "url":""}, //内容块——图文 横向排列 样式
						{"listType":2 ,"imgurl":"image/pic.png", "label":"更多更好发挥我仍然阿萨德" , "url":""}
					],
					"css":"#f2f6f8"				}
			]
		},
		{												     //有内容块
			"id":5,
			"type":2,
			"name":"baiduyinyue" ,
			"title":{"label":"百度音乐" , "url":""},
			"subtitle":[
				{"label":"歌手" , "url":""},
				{"label":"榜单" , "url":""},
				{"label":"我的音乐盒" , "url":""}
			],
			"content":[
				{
					"title":"",
					"list":[
						{"listType":5 ,"imgurl":"", "label":"最美的问候/品冠是否伸缩缝" , "url":""}, //内容块——图文 纵向排列 样式
						{"listType":5 ,"imgurl":"", "label":"最美问候/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"的问候/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"最美的问/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"最美的问候/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"最美的问候/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"最/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"最问候/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"美的问候/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"美问候/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"的问候/品冠" , "url":""},
						{"listType":5 ,"imgurl":"", "label":"美的问候/品冠" , "url":""}
					],
					"css":"#f8f8fe"
				}
			]
		},
		/*{												     //有内容块
			"id":5,
			"type":2,
			"name":"qidianzhongwenwang" ,
			"title":{"label":"起点中文网" , "url":""},
			"subtitle":[
				{"label":"排行榜" , "url":""},
				{"label":"搜书" , "url":""},
				{"label":"我的书架" , "url":""},
			],
			"content":[
				{
					"title":"热点",
					"list":[
						{"listType":3 ,"imgurl":"", "labelTitle":"我的青春谁做主" , "label":"阿打算打算的的恢复供货瑞特让他玩儿人味儿请问企鹅企鹅去" , "url":""}, //内容块——图文 纵向排列 样式
					]
				},
			]
		},*/
		{ 													  //有内容块
			"id":4,
			"type":2,
			"name":"QQkongjian" ,
			"title":{"label":"Bilibili" , "url":""},
			"subtitle":[
				{"label":"强力推荐" , "url":""},
				{"label":"动画" , "url":""}
			]/*,
			"content":[
				{
					"title":"最热门",
					"list":[
						{"listType":2 ,"imgurl":"image/pic.png", "label":"啊实打实大大大大是个阿萨德" , "url":""}, //内容块——图文 横向排列 样式
						{"listType":2 ,"imgurl":"image/pic.png", "label":"更多更好发挥我仍然阿萨德" , "url":""}
					]
				}
			]*/
		}
		
		]

	},
	{
		"name":"life",
		"content":[
		{
			"id":1,  
			"type":1,//有输入框
			"name":"dazhongdianping",
			"title":{"label":"大众点评" , "url":"http://www.dianping.com"},
			"subtitle":[
				{"label":"美食" , "url":""},
				{"label":"休闲娱乐" , "url":""},
				{"label":"团购" , "url":""}
			]
		},
		/*{
			"id":2,  
			"type":2,//没有输入框
			"name":"yitao", 
			"title":{"label":"口碑网" , "url":""},
			"subtitle":[
				{"label":"我的订单" , "url":""},
				{"label":"我的收藏" , "url":""},
				{"label":"海外特价" , "url":""},
			]
		},*/
		{
			"id":3,   
			"type":2,
			"name":"qunaer",
			"title":{"label":"去哪儿" , "url":""},
			"subtitle":[
				{"label":"机票" , "url":""},
				{"label":"酒店" , "url":""},
				{"label":"团购" , "url":""}
			],
			"content":[
				{
					"title":"今日新单",
					"list":[
						{"listType":1 , "imgurl":"" , "label":"XXXXXXXXXXXXXXXXXXXXXX" , "url":""},  //内容块——纯文字列表 样式
						{"listType":1 , "imgurl":"" , "label":"XXXXXXXXXXXXXXXXXXXXXX" , "url":""}
					],
					"css":"#bfecee|#d5f6f7"
				}
			]
		},
		{ 													  //有内容块
			"id":4,
			"type":2,
			"name":"mafengwo" ,
			"title":{"label":"蚂蜂窝" , "url":""},
			"subtitle":[
				{"label":"蚂蜂窝特价" , "url":""},
				{"label":"目的地" , "url":""}
			],
			"content":[
				{
					"title":"",
					"list":[
						{"listType":2 ,"imgurl":"image/pic.png", "label":"啊实打实大大大大是个阿萨德" , "url":""}, //内容块——图文 横向排列 样式
						{"listType":2 ,"imgurl":"image/pic.png", "label":"更多更好发挥我仍然阿萨德" , "url":""}
					],
					"css":"#f9f6eb"
				}
			]
		},
		{
			"id":2,  
			"type":2,//没有输入框
			"name":"baiduyunpan", 
			"title":{"label":"百度云盘" , "url":""},
			"subtitle":[
				{"label":"网盘" , "url":""},
				{"label":"分享动态" , "url":""},
				{"label":"达人推荐" , "url":""}
			]
		}
		
		]

	}
]
