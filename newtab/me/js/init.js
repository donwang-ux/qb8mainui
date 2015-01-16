(function(W) {
		

	var containerJQ = $("#me-container");
	var wrapperJQ = $("#me-wrapper");
	var is_scroll = false;
	/*var kw = '';
    var searchInterval;
    var searchResultData = {};  //全局变量
	// ie版本
	var is_msie = navigator.userAgent.indexOf("MSIE")>-1 ? true : false;
	var is_msie_9 = navigator.userAgent.indexOf("MSIE 9.0")>-1 ? true : false;*/

	
	W.buildListPage = function(json){

		var data = json;
		var html="";
		var headJQ = $(".me-head");
		var listJQ = $(".me-list");
		var dfEle = document.createDocumentFragment();


		for(var i=0 ;i<data.length; i++){
			switch(data[i]["name"]){
				case "购物":
					headJQ.eq(i).html("购物");
					headJQ.eq(i).css("color","#ff2750");
				break;
				case "社交":
					headJQ.eq(i).html("社交");
					headJQ.eq(i).css("color","#1462f1");
				break;
				case "兴趣":
					headJQ.eq(i).html("兴趣");
					headJQ.eq(i).css("color","#4fa60a");
				break;
				case "生活":

					headJQ.eq(i).html("生活");
					headJQ.eq(i).css("color","#2caff3");

				break;
			}

			for(var j=0;j<data[i]["content"].length;j++){
				var boxEle = document.createElement("div");     //创建一个listBox
				boxEle.className = "me-listBox"; 
				boxEle.innerHTML = buildWebBox(data[i]["content"][j]);
				dfEle.appendChild(boxEle);
				var listContentJQ = $(boxEle).find(".me-listContent");
				for(var k=0;k<listContentJQ.length;k++){  
					//title框的颜色
					if($(boxEle).find(".me-listSubTitle")[k] != undefined){   
						$(boxEle).find(".me-listSubTitle")[k].style.backgroundColor = data[i]["content"][j]["content"][k]["css"].split("|")[0];
						$(boxEle).find(".me-listContentBg")[k].style.backgroundColor = data[i]["content"][j]["content"][k]["css"].split("|")[1];
					}else{
						if($(boxEle).find(".me-listContentBg")[k] != undefined){  
						$(boxEle).find(".me-listContentBg")[k].style.backgroundColor = data[i]["content"][j]["content"][k]["css"];
						}
					}
					//content框的颜色
					
				}
				
				//最后一个Box底下没有分割线
				if(j == (data[i]["content"].length-1)){   
					boxEle.style.border = "none";
				}			
			}
			listJQ.eq(i).append(dfEle);
			
		}//end of for		
	
		/*var columnJQ = $(".me-column");
		var columnW = columnJQ.eq(0).outerWidth();
	    var columnNum = columnJQ.length;
	    alert(columnW);
	    alert(columnNum);*/
		// containerJQ.css("width",(columnW+60)*columnNum+"px");
		//containerJQ[0].style.width = (columnW+60)*columnNum+"px";
		addEvent();
	}

	function addEvent(){
		
		//所有的链接 都在新窗口打开
		$("a").each(function(index, element) {
	        if(($(element).attr("href") != "")&&($(element).attr("href") != undefined)){
				$(element).bind("click",function(e){
					window.open($(element).attr("href"));
					e.preventDefault();
					// return false;
					})	
			}
	    });
		/*$(".me-listBox").each(function(index, element) {
		
			$(element).bind("click",function(e){
				if(($(e.target).attr("href") != "")&&($(e.target).attr("href") != undefined)){
					window.open($(e.target).attr("href"));
					//e.preventDefault();
					return false;
				}
			})	
    	});*/

	    var searchBtnJQ = $(".me-searchBtn");
	    searchBtnJQ.each(function(index,element){
	    	$(element).bind("click",function(){
	    		var name = $(element).parent().attr("data-name");
	    		var inputValJQ = $("#me-search-"+name).find("input");
	    		switch(name){
		    		case "taobao":
		    			var url = "http://s.taobao.com/search";
		    			var param = "q="+inputValJQ.val();
						window.open(url+"?"+param);
						

		    		break;
		    		case "dianping":
		    			var url = "http://www.dianping.com/search/keyword/2/0_";
		    			var param = inputValJQ.val();
						window.open(url+param);
		    		break;
		    		default:
		    		break;
	    		}
			})
	    });
	}
	//生成单独的一个网站模块
	function buildWebBox(siteData){
		//title
		var titleHtml = "<div class='me-listTitle'>"
						+"<img class='me-webIcon' />"
						+"<a href='"+siteData["title"]["url"]+"' class='me-listTitle-title'>"+siteData["title"]["label"]+"</a>";
		//sub-title
		var subTitleHtml="<span class='me-listTitle-subTitle'>";   
		var subTitleJson = siteData["subtitle"]; 
		for(var j=0;j< subTitleJson.length;j++){
			subTitleHtml += "<a href='"+subTitleJson[j]["url"]+"'>"+subTitleJson[j]["label"]+"</a>"
		};
		subTitleHtml += "</span>";
		titleHtml +=subTitleHtml+"<div class='me-clear'></div></div>";
		//如果有内容快
		var contentJson = siteData["content"];
		if(contentJson){
			for(var m=0 ; m <contentJson.length; m++){
				//内容块title
				var contentHtml = "<table cellspacing=0 cellpadding=0 class='me-listContent'><tr>";
				//判断content部分是否有subTitle
				contentHtml += (contentJson[m]["title"] != "null") ? 
								"<th class='me-listSubTitle'>"+contentJson[m]["title"]+"</th>" :
								"";
				var contentListJson = siteData["content"][m]["list"]; 
				var contentListHtml = "<td class='me-listContentBg'>";
				for(var k=0;k< contentListJson.length;k++){
					
					var listUrl = contentListJson[k]["url"];
					var listLabel = contentListJson[k]["label"];

					switch(contentListJson[k]["listType"]){      //listType
						case "1":
							contentListHtml +="<a href='"+listUrl+"'><p class='me-listType1'>"+listLabel+"</p></a>";
						break;
						case "2":
							listLabel = $.trim(listLabel).length>13 ? ($.trim(listLabel).substr(0,13)+"...") : $.trim(listLabel);

							contentListHtml += "<img  class='me-listType2-pic' src='"+contentListJson[k]["imgurl"]+"' />"
											   +"<a href='"+listUrl+"'><div class='me-listType2-content'><p>"+listLabel+"</p></div></a>";
						break;
						case "3":
							contentListHtml += "<img class='me-listType3-pic' src='"+contentListJson[k]["imgurl"]+"' />"
											   +"<a href='"+listUrl+"'>"
											   +"<div class='me-listType3-content'><p class='me-listType3-title'>"+contentListJson[k]["labelTitle"]+"</p><p>"+listLabel+"</p></div>"
											   +"</a>";
						break;
						case "4":
							contentListHtml +="<a href='"+listUrl+"'><p class='me-listType4'>"+listLabel+"</p></a>";
						break;
						case "5":
							contentListHtml +="<a href='"+listUrl+"'><p class='me-listType5'>"+listLabel+"</p></a>";
						break;
						}//end of switch
				}//end of for
				contentHtml += (contentListHtml+"</td></tr></table></div></div>");
			}//end of for

		}//end of if content			
		else{
			if(siteData["type"] == 1){   //有搜索框
				var name = siteData["name"];
				var contentHtml = "<div class='me-listContent me-search' data-name='"+name+"' id='me-search-"+name+"'>"
								  +"<input /><a class='me-searchBtn'></a></div>";
				/*contentHtml += ("<ul id='me-searchResult-"+name+"' class='me-searchResult'></ul>"
							   +"</div>");*/
			}else{
				var contentHtml = "";
			}
		}
		// var siteHtml = "<div class='me-listBox'>"+titleHtml + contentHtml+"</div>";
		var siteHtml = titleHtml + contentHtml;
		return siteHtml;
	}

	//左右滚动
	containerJQ.on('mousewheel', function (e) {
        var columnJQ;
        var window_width, blankW, columnW, columnNum, totalW;
        var sign, left;
        if (is_scroll) {
            return;
        }
        is_scroll = true;
        window_width = $(window).width();
        blankW = window_width - 200;
        columnJQ = $(".me-column");
        columnW = columnJQ.eq(0).outerWidth();
        columnNum = columnJQ.length;
        totalW = (columnW+60) * columnNum;
        sign = e.originalEvent.wheelDelta > 0 ? 'R' : 'L';
        left = wrapperJQ.css('left');
        left = left == 'auto' ? 0 : parseInt(left);
        if (totalW < blankW) {
            return;
        }
        if (sign == 'L') {
            if (blankW-left < totalW) {
                /*left = left - totalW;
                left = (blankW-left >= totalW) ? (blankW-totalW) : left;*/
                left -=300;
                left = (blankW-left >= totalW) ? (blankW-totalW) : left;
            }
        }
        else {
            if (left < 0) {
                // left = left + totalW;
                left +=300;
                left = left > 0 ? 0 : left;
            }
        }
        wrapperJQ.animate({left: left}, 200, function () {
            is_scroll = false;
        });
    });

    function getSiteData(callback) {

    	/*var jsEle = document.createElement('script');
		var url = 'http://testqbme.qq.com:8080/index.php/qb_me_page_server/server_interface';	
        jsEle.type = 'text/javascript';
        jsEle.charset = 'gbk';
        jsEle.src = url;
        document.body.appendChild(jsEle);*/


        var url = 'http://testqbme.qq.com:8080/index.php/qb_me_page_server/server_interface';
        $.support.cors = true;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            //jsonpCallback:callback,//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名         
            success: function (json) {
            },
            error: function (xhr, textStatus, errorStr) {
            }
        });
    }


    getSiteData(buildListPage);

     // buildListPage(data);

    
	


    /*var searchInputJQ = $(".me-search").find("input");
     // ie6-8用propertychange实现
    if (is_msie && !document.addEventListener) {
        searchInputJQ.on('propertychange', function () {
        	var siteName = $(this).parent().attr("data-name");
            searchKeyword($(this).val(),siteName);
            buildSearchData(searchResultData,siteName);
        });
    }
    // ie9下input和propertychange都有bug，用定时器实现
    else if (is_msie_9) {
        searchInputJQ.on('focus', function () {
            searchInterval = setInterval(function () {
                var siteName = $(this).parent().attr("data-name");
                var keyword = $(this).val();
                if (kw != keyword) {
                    kw = keyword;
                    searchKeyword(kw,siteName);
                    buildSearchData(searchResultData,siteName);
                }
                else {

                }
            }, 100);
        });
        searchInputJQ.on('blur', function () {
            searchInterval = clearInterval(searchInterval);
        });
    }
    // 其他用input
    else {
        searchInputJQ.on('input', function () {
        	var siteName = $(this).parent().attr("data-name");
            searchKeyword($(this).val(),siteName);
            buildSearchData(searchResultData,siteName);
            
        });
    }

    searchInputJQ.on('blur',function(){
    	$(this).parent().find("ul").hide();
    });

	
	function searchKeyword(keyword,siteName){
		var jsEle = document.createElement('script');
		switch(siteName){
			case "taobao":
				var url = 'http://suggest.taobao.com/sug';
        		url += '?code=utf-8&q='+keyword+'&_ksTS=1404211574140_1044&callback=site.sug&k=1&area=c2c&bucketid=14';
			break;
			case "dianping":
				var url = 'http://www.dianping.com/ajax/json/suggest/search';
        		url += '?do=hsc&c=2&s=0&callback=111&q='+keyword;
			break;
		}		
        jsEle.type = 'text/javascript';
        jsEle.charset = 'gbk';
        jsEle.src = url;
        document.body.appendChild(jsEle);
	}

	
	window.site = {};
	site.sug = function(json){  //获取异步数据            
        searchResultData = json; 
    };
*/

   /* function buildSearchData(res,siteName){   	
        var searchResultEle = document.getElementById("me-searchResult-"+siteName);
        searchResultEle.innerHTML = "";
        switch(siteName){
			case "taobao":
				for(var i=0;i<res.result.length;i++)
			    {
			        var liEle = document.createElement('li');
			        liEle.innerHTML = res['result'][i][0];
			        searchResultEle.appendChild(liEle);
			    }
			break;
			case "dianping":
				for(var i=0;i<res.shop.length;i++)
			    {
			        var liEle = document.createElement('li');
			        liEle.innerHTML = res['result'][i].split("|")[0];
			        searchResultEle.appendChild(liEle);
			    }
			break;
		}
        
	    	searchResultEle.style.display = "block";
	    
    }*/
	

})(window)


