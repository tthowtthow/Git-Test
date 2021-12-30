var lang= location.href.replace(/^http.+(\/[a-z]{2})\/.*$/gi, "$1");



$(function(){
	$(".top_li").mouseover(function(){
		
		$(this).addClass("top_li_over");
		$(this).addClass("top_li_on");
	});
	$(".top_li"). mouseleave(function(){
		$(".top_li").removeClass("top_li_over");
		$(".top_li").removeClass("top_li_on");
	});
 	$("#top_ul").mouseenter(function(){
 		
 	});
 	
    //tracking btns
    function inMotion(){
        var titleBox = $(".section_top .top_title");
        if(titleBox.length < 1) return;

        //if(location.href.indexOf("room") > -1 || location.href.indexOf("dining") > -1 || location.href.indexOf("meeting_and_wedding") > -1 || location.href.indexOf("facility") > -1){
        if(location.href.indexOf("room") > -1 || location.href.indexOf("dining") > -1 || location.href.indexOf("meeting_and_wedding") > -1 || location.href.indexOf("facility") > -1){
            var titleStr = titleBox.html();
            titleStr = titleStr.replace("&amp;", "&");
            var sliceArr = titleStr.split("");
            var spanLens = sliceArr.length;

            if(titleBox.find("img").length > 0){
                titleBox.find("img").addClass("active");
            }else{
                titleBox.empty();

                for(var i = 0, len = spanLens; i < len; ++i){
                    var appendStr = sliceArr[i];
                    if(appendStr == " ") appendStr = "&nbsp;";
                    titleBox.append("<span>"+appendStr+"</span>");

                    if(i%2) titleBox.find("span").eq(i).addClass("top");
                    else titleBox.find("span").eq(i).addClass("bottom");
                }

                setTimeout(function(){ titleBox.find("span").removeClass("top").removeClass("bottom").addClass("active");}, 500);
            }
        }
    }

   inMotion();
})

//::여기서부터 공통작업되는 스크립트 작성

//메인페이지 공지사항, 커뮤니티 게시판 스크립트
$(function() {
    $(".sub_pop1").css({"background":"#404688", "color":"#fff", "font-weight":"900"});
    $("#menu1").on('click',function(){
        $("#sub_pa_pop_1").show();
        $("#sub_pa_pop_2").hide();
        $(".sub_pop1").css({"background":"#404688", "color":"#fff", "font-weight":"900"});
        $(".sub_pop2").css({"background":"#fff", "color":"#333", "font-weight":"500"});
    });
    
    $("#menu2").on('click',function(){
        $("#sub_pa_pop_2").show();
        $("#sub_pa_pop_1").hide();
        $(".sub_pop2").css({"background":"#404688", "color":"#fff", "font-weight":"900"});
        $(".sub_pop1").css({"background":"#fff", "color":"#333", "font-weight":"500"});
    });
})

/*json 형식 변환 object*/
jQuery.fn.serializeObject = function() {
var obj = null;
 try {
     if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) {
         var arr = this.serializeArray();
         if(arr){
         	obj = {};
         	jQuery.each(arr, function() {
         		obj[this.name] = this.value;
         	});
         }
     }
 }catch(e) {
    	alert(e.message);
 }finally {}
 	return obj;

 };

//총학생회

