//toolbar布局计算
function toolbarlayout(){var e=$("#toolbar").width(),t=0;$(".btn").each(function(){t+=$(this).outerWidth(!0)});var n=e-t;$("#omnibox").width(n-$("#omnibox").outerWidth(!0)+$("#omnibox").width());var r=0;$(".omnibtn").each(function(){r+=$(this).outerWidth(!0)});$("#omniinput").width($("#omnibox").width()-r)}toolbarlayout();