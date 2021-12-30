var Main = (function(){
  
	var $letterMotion = $(".letter_motion"),
		$mainNaviLis = $(".main_navi ul li"),
		$offerBox = $(".special_offer"),
		$roomBox = $(".section.room"),
		$diningBox = $(".section.dining"),
		$bgBoxs = $(".bg_motion .bg_box div"),
		$guide = $(".main .guide"),

		isFirstInMotionLock = true,
		mainRollingCount = 0,
		prevBgBox = null,
		prevOfferBox = null,
		changeTimer = null,
		changeTimer2 = null,
		mouseOutTimer = null,
		offerMouseOutTimer = null,
		letterBoxLen = $letterMotion.find("div").size(),
		guideStrArr = [
			"더 플라자로 오시는 길을 안내해드립니다.",
			"더 플라자 주변의 관광지를 소개합니다.",
			"특급호텔 전문가들이 선정한 유니크한<br> 상품을 소개합니다."
		];
	var roomImgCount = 1,
		roomPrevIdx = 0,
		diningImgCount = 1,
		diningPrevIdx = 0;
		//lang = location.href.replace(/^http.+(\/[a-z]{2})\/.*$/gi, "$1");

	var offerLoopCount = 0,
		offerLoopTimer = null;

	var categoryListObjData = {},
		offerPageCount = 0,
		offerPageTotalLen = 0,
		offerCurrentType = "all",
		categoryListCopys = {room:"객실 패키지", dine:"다이닝 프로모션", wedding:"웨딩 & 연회"};

	
	function init(){
		getOfferList();
		addEvents();
		setBtns();
		setMainPopup();

		setTimeout(function(){
			$(".main_wrap").addClass("active");
			inMotion();
		}, 300);
	}

	function getOfferList() {
		$.ajax({
			
			dataType: "jsonp",
			method	: "post",
			data	: {
				perPage	: 50
			},
			success	: function( resp ) {
				sortList(resp);
				createList("all");
			}
		});
	}

	function setCookie(cname, value, expire) {
		var todayValue = new Date();
		// 오늘 날짜를 변수에 저장

		todayValue.setDate(todayValue.getDate() + expire);
		document.cookie = cname + "=" + encodeURI(value) + "; expires=" + todayValue.toGMTString() + "; path=/;";
	}

	function getCookie(name) {
		var cookieName = name + "=";
		var x = 0;
		while ( x <= document.cookie.length ) {
			var y = (x+cookieName.length);
			if ( document.cookie.substring( x, y ) == cookieName) {
				if ((lastChrCookie=document.cookie.indexOf(";", y)) == -1)
					lastChrCookie = document.cookie.length;
				return decodeURI(document.cookie.substring(y, lastChrCookie));
			}
			x = document.cookie.indexOf(" ", x ) + 1;
			if ( x == 0 )
				break;
		}
		return "";
	}

	function setMainPopup() {
		$.ajax({
			
			dataType: "jsonp",
			method	: "post",
			success	: function( resp ) {
				if( resp && resp.arr ) {
					var arr = resp.arr;

					$("#wrap").append('<div class="info_alert"></div>');

					


				}
			}
		});
	}


	function offerLoopStart(){
		offerLoopTimer = setTimeout(function(){
			var listLen = $(".offer_box_container .right ul li").size();

			if(offerLoopCount == listLen-1) offerLoopCount = 0;
			else offerLoopCount++;

			$(".offer_box_container .right ul li").eq(offerLoopCount).trigger("mouseenter");

			offerLoopStart();
		}, 2000)

		//listLen
	}



	/**
	 * ADD EVENT LISTENERS
	* */
	function addEvents(){
		scrolling();
		$(window).scroll(scrolling);

		
	}



	function scrolling(){
		var wt = $(window).scrollTop(),
			wh = $(window).height()

		
	}

	function setBtns(){
		var btnFloating = $("#contents .main .floating a"),
			infoBox = $guide.find(".info");
	}

	function inMotion(){
		var mainNaviSpans = $mainNaviLis.find("span");
		TweenMax.to($mainNaviLis, 0.3, {delay:0.6, alpha:1, ease:Cubic.easeOut});
		TweenMax.to(mainNaviSpans, 1, {delay:2, y:0, alpha:1, ease:Cubic.easeOut});
		setTimeout(function(){isFirstInMotionLock = false;}, 2000);

		titleChange(0);
	}
//글자변경되는 부분
	function titleChange(_idx, _type){
      
		var letterBoxs = $letterMotion.find("div"),
			currentBox = letterBoxs.eq(_idx),
			currentBoxSpan = currentBox.find("span"),
			sliceStr, sliceArr, spanLens = currentBoxSpan.size(), isCreateSpan = (currentBoxSpan.size() == 0);

		if(spanLens == 0){
			sliceStr = currentBox.html();
			sliceArr = sliceStr.split("");
			spanLens = sliceArr.length;
		}

		if(_type != "leave"){
			letterBoxs.find("span").removeClass("active");
			letterBoxs.removeClass("active");
			currentBox.addClass("active");
			$bgBoxs.removeClass("on").removeClass("prev");
			$bgBoxs.eq(_idx).addClass("on");
			if(prevBgBox) prevBgBox.addClass("prev");
			if(isCreateSpan) currentBox.empty();

			for(var i = 0, len = spanLens; i < len; ++i){
				if(isCreateSpan) {
					var appendStr = sliceArr[i];
					if(appendStr == " ") {
						appendStr = "&nbsp;";
						currentBox.append("<span class='nbsp'>"+appendStr+"</span>");
					}else{
						currentBox.append("<span>"+appendStr+"</span>");
					}
				}

				if(i%2) currentBox.find("span").eq(i).addClass("top");
				else currentBox.find("span").eq(i).addClass("bottom");
			}
		}

		$mainNaviLis.removeClass("on").removeClass("progress");
		$mainNaviLis.eq(_idx).addClass("on").addClass("progress");

		if(_type == "over") currentBox.find("span").removeClass("top").removeClass("bottom").addClass("active");

		clearTimeout(changeTimer);
		clearTimeout(changeTimer2);
		changeTimer = setTimeout(function(){ currentBox.find("span").removeClass("top").removeClass("bottom").addClass("active");}, 1000);
		changeTimer2 = setTimeout(function(){
			if(mainRollingCount == letterBoxLen-1) mainRollingCount= 0;
			else mainRollingCount++;
			titleChange(mainRollingCount);
		}, 7000);

		prevBgBox = $bgBoxs.eq(_idx);
	}

	function offerMenuControl(_idx){
		var leftDivs = $offerBox.find(".left div"),
			rightLis = $offerBox.find(".right li"),
			currentObj = leftDivs.eq(_idx),
			currentLi = rightLis.eq(_idx);

		rightLis.removeClass("active");
		leftDivs.removeClass("on").removeClass("prev");

		if(prevOfferBox) prevOfferBox.addClass("prev");

		currentObj.addClass("on");
		currentLi.addClass("active")

		prevOfferBox = currentObj;
	}

	

	

	return {
		init:init,
		closePopupNotToday : function(_i, seq){
			setCookie( seq, "end" , 1);
			//win.close();
			$(".info_alert"+_i).hide();
		},
		closePopup : function(_i){
			$(".info_alert"+_i).hide();
		}
	}
})();

$(function(){
	Main.init();
})