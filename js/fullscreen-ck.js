// Find the right method, call on correct element
function launchFullscreen(e){e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.msRequestFullscreen&&e.msRequestFullscreen()}function exitFullscreen(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()}function dumpFullscreen(){console.log("document.fullscreenElement is: ",document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement);console.log("document.fullscreenEnabled is: ",document.fullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled||document.msFullscreenEnabled)}document.addEventListener("fullscreenchange",function(e){console.log("fullscreenchange event! ",e)});document.addEventListener("mozfullscreenchange",function(e){console.log("mozfullscreenchange event! ",e)});document.addEventListener("webkitfullscreenchange",function(e){console.log("webkitfullscreenchange event! ",e)});document.addEventListener("msfullscreenchange",function(e){console.log("msfullscreenchange event! ",e)});$("#fullScreenBtn").click(function(){launchFullScreen(document.documentElement)});var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement,fullscreenEnabled=document.fullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled;