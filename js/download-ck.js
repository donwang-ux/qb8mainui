function getOBJWH(e){objectW=$("#"+e+"").outerWidth();objectH=$("#"+e+"").outerHeight()}function getDOMXY(e){targetX=$("#"+e+"").offset().left;targetY=$("#"+e+"").offset().top}function getDOMWH(e){targetW=$("#"+e+"").outerWidth();targetH=$("#"+e+"").outerHeight()}function setOBJXY(e,t,n){$("#"+e+"").css("left",t+"px");$("#"+e+"").css("top",n+"px")}var objectW=0,objectH=0,targetX=0,targetY=0,targetW=0,targetH=0;$(function(){function e(){setTimeout(function(){$("#btn_download").css("transition","-webkit-transform 0.5s ease-out,background 2s ease-out, box-shadow 0.5s ease-out");$("#btn_download .btnicon").css("transition","all 0.5s ease-out");$("#btn_download").removeClass("emphasis")},600);setTimeout(function(){$("#btn_download").attr("style","");$("#btn_download .btnicon").attr("style","")},3600)}$("#popup-download-btn").click(function(t){$(this).parents(".popup").hide();getOBJWH("animation-download-icon");getDOMXY("btn_download");getDOMWH("btn_download");setOBJXY("animation-download-icon",t.pageX-objectW/2,t.pageY-objectH/2);$("#animation-download-icon").animate({left:targetX-targetW/2+14,top:targetY-targetH/2+14,width:30,height:30,opacity:0},{duration:800,specialEasing:{left:"easeOutQuad",top:"easeOutBack",width:"easeInQuad",height:"easeInQuad",opacity:"easeInExpo"},complete:function(){$("#animation-download-icon").attr("style","")}});$("#btn_download").css("transition","-webkit-transform 0.3s ease-out,background 0.4s ease-out, box-shadow 0.8s ease-out");$("#btn_download .btnicon").css("transition","all 0.4s ease-out");$("#btn_download").addClass("emphasis",600,e);return!1})});$("#btn_download").click(function(){$("#popup-download").fadeIn(100)});