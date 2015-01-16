var objectW = 0;
var objectH = 0;
var targetX = 0;
var targetY = 0;
var targetW = 0;
var targetH = 0;

function getOBJWH(object){
	objectW = $('#'+object+'').outerWidth();
	objectH = $('#'+object+'').outerHeight();
}

function getDOMXY(target){
	targetX = $('#'+target+'').offset().left;
	targetY = $('#'+target+'').offset().top;
}

function getDOMWH(target){
	targetW = $('#'+target+'').outerWidth();
	targetH = $('#'+target+'').outerHeight();
}

function setOBJXY(object,objectX,objectY){
	$('#'+object+'').css("left",objectX+"px");
	$('#'+object+'').css("top",objectY+"px");
}
$(function(){
	$('#popup-download-btn').click(function(e){
		$(this).parents('.popup').hide();
		getOBJWH('animation-download-icon');
		getDOMXY('btn_download');
		getDOMWH('btn_download');
		setOBJXY('animation-download-icon',e.pageX - objectW / 2,e.pageY - objectH / 2);
		$("#animation-download-icon").animate({
			left: targetX - targetW / 2 + 14,
			top: targetY - targetH / 2 + 14,
			width: 30,
			height: 30,
			opacity: 0
		},{
			duration: 1000,
			specialEasing: {
				left: "easeOutQuad",
				top: "easeOutBack",
				width: "easeInQuad",
				height: "easeInQuad",
				opacity: "easeInExpo"
			},complete: function(){
				$("#animation-download-icon").attr("style","");
			}
		});
		$("#btn_download").css("transition","-webkit-transform 0.3s ease-out,background 0.4s ease-out, box-shadow 0.8s ease-out");
		$("#btn_download .btnicon").css("transition","all 0.4s ease-out");
		$("#btn_download").addClass('emphasis',800,callback);
		return false;
	});
	function callback() {
		setTimeout(function(){
			$("#btn_download").css("transition","-webkit-transform 0.5s ease-out,background 2s ease-out, box-shadow 0.5s ease-out");
			$("#btn_download .btnicon").css("transition","all 0.5s ease-out");
			$("#btn_download").removeClass('emphasis');
		}, 1400);
		setTimeout(function(){
			$("#btn_download").attr("style","");
			$("#btn_download .btnicon").attr("style","");
		}, 3800);
	}
});


$('#btn_download').click(function(){
	$('#popup-download').fadeIn(100);
});


