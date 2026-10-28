/** 
	* @ Auth : 금정
	* @ Date : 2010. 10. 06
	* @ Email : snow2505@naver.com
**/

//rollover
jQuery(document).ready(function() {
	var imgover = jQuery(".imgover").size();
	var imgoveron = jQuery(".imgoveron").size();
	
	if(imgover != 0) {
		jQuery(".imgover").mouseover(function() {
			var overimg = jQuery(this).find(">img")[0];
			
			//예외처리 (이미 on 되어있는 이미지 제외)
			var Dns;
			Dns = overimg.src;
			Dns = Dns.split("_on");
			Dns = Dns[1];
			if(Dns != ".gif") {
				overimg.src = overimg.src.replace(".gif", "_on.gif");
			}
		});
		jQuery(".imgover").mouseout(function() {
			var overimg = jQuery(this).find(">img")[0];
			overimg.src = overimg.src.replace("_on.gif", ".gif");
		});
		jQuery(".imgover").focus(function() {
			var overimg = jQuery(this).find(">img")[0];
			overimg.src = overimg.src.replace(".gif", "_on.gif");
			overimg.src = overimg.src.replace("_on_on.gif", "_on.gif");
		});
		jQuery(".imgover").blur(function() {
			var overimg = jQuery(this).find(">img")[0];
			overimg.src = overimg.src.replace("_on.gif", ".gif");
		})
	}
	if(imgoveron != 0) {
		var overonimg = jQuery(".imgoveron").find(">img")[0];
		overonimg.src = overonimg.src.replace(".gif", "_on.gif");
	}
});

//select box
function goSelectUrl(num){
	obj = document.getElementById(num);
	if(obj.value == '' || obj.value == 'total'){
	}else{
		window.open(obj.value);
		//location.href = obj.value;
	}
}

//notice
var old_tab = 1;
function mainNotice(tab){	
	//초기설정
	jQuery(".tabnotice > ul > li").css("float", "left");
	jQuery(".tabcon").css("position", "absolute");
	jQuery(".tabcon").css("display", "none");
	jQuery(".tabmore").css("position", "absolute");
	jQuery(".tabmore").css("display", "none");
	
	var old_img = jQuery(".main_notice"+old_tab);
	var old_content = jQuery(".tabcon"+old_tab);
	var old_more = jQuery(".tabmore"+old_tab);
	
	var new_img = jQuery(".main_notice"+tab);
	var new_content = jQuery(".tabcon"+tab);
	var new_more = jQuery(".tabmore"+tab);
	
	jQuery(old_img)[0].src = jQuery(old_img)[0].src.replace("_on.gif", ".gif");
	jQuery(old_content).hide();
	jQuery(old_more).hide();
	
	jQuery(new_img)[0].src = jQuery(new_img)[0].src.replace(".gif", "_on.gif");
	jQuery(new_content).show();
	jQuery(new_more).show();

	old_tab = tab;
}






//TextMenu
var old_sel = ""; //이전 선택메뉴의 서브메뉴
var old_sel2 = "";
var old_img = ""; //이전 선택메뉴의 이미지
function topMenu4(num) {
	jQuery("#tm > li > ul").slideUp(0);
	//jQuery("#menuList li:first-child a").addClass('_on');
	//jQuery("#menuList > li > a").addClass('_on');
	//jQuery("#menuList > li > ul > a").addClass('');
	

	
	if(num != null) { //처음 선택된 메뉴
		if( jQuery(".submenu0"+num).size() != 0 ) { //자식이 있을때만 실행
			old_sel2 = jQuery(".submenu0"+num);
		//	jQuery(".submenu0"+num).parent().find("a").css('color','#8bcef6');
		//	jQuery(".submenu0"+num).find("a").css('color','#fff');
			jQuery(".submenu0"+num).parent().find("a").addClass('_on');
			jQuery(".submenu0"+num).find("a").removeClass('_on');
		//	old_img = jQuery(".submenu"+num).parent().find("img")[0];
			old_sel2.show();
			
			//old_img.src = old_img.src.replace(".gif", "_on.gif");
		} else { //자식이 없을때만 실행
		//	old_img = jQuery("#tm > li").eq(num-1).find("img")[0];
			//old_img.src = old_img.src.replace(".gif", "_on.gif");
			old_sel2 = jQuery(".submenu00"); //if(!old_sel) 회피용
		}
	}

 
	
	jQuery("#tm > li > a").mouseenter(function() {
		var sel = jQuery(this).parent().find(">ul"); //현재 선택메뉴의 서브메뉴
		//var sel_on = jQuery(this).toggleClass('_on');
		//var sel_on = jQuery(this).addClass('_on'); // 현재 선택메뉴 class 생성
		//var oneimg = jQuery(this).find(">img")[0]; //현재 선택메뉴의 이미지
		
		if(!old_sel2) { //old_sel 이 값이 없을때(아무것도 선택되지 않은 초기값을 위해)


		} else { //old_sel 이 값이 있을때
			old_sel2.hide();
			old_sel2.parent().find("a").removeClass('_on');
			old_sel2.find("a").removeClass('_son');
		//	sel.parent().find("a").removeClass('')
		//	sel_on.removeClass('_on');
			
			//old_sel2.delay(300).hide('slow');
			//old_img.src = old_img.src.replace("_on.gif", ".gif");
		}
		
		if(sel.size() != 0){ //자식이 있을때만 실행
			//sel.show('slow');
			jQuery(".tm_box > div.subBg").slideDown('fast');
			sel.fadeIn(300);
			jQuery(this).addClass('_on');
			//sel.parent().find("a").addClass('_on');
			//sel.find("a").removeClass('_on');

		}
		//oneimg.src = oneimg.src.replace(".gif", "_on.gif");
		
		old_sel2 = sel;
		//old_img = sel_on;
		return false;
	});
	jQuery("#tm > li > ul").mouseleave(function() {
		jQuery("#tm > li > ul").fadeOut(0);
		jQuery(".tm_box > div.subBg").slideUp('fast');
		return false;
	});
	jQuery(".tm_box > div.subBg").mouseleave(function() {
		jQuery("#tm > li > ul").fadeOut(0);
		jQuery(".tm_box > div.subBg").slideUp('fast');
		return false;
	});
	jQuery("#tm").mouseleave(function() {
		jQuery("#tm > li > ul").fadeOut(0);
		jQuery(".tm_box > div.subBg").slideUp('fast');
	});
	
}



//topmenu1
var old_sel = ""; //이전 선택메뉴의 서브메뉴
var old_img = ""; //이전 선택메뉴의 이미지
function topMenu1(num) {
	jQuery("#tm > li > ul").hide();
	
	if(num != null) { //처음 선택된 메뉴
		if( jQuery(".submenu"+num).size() != 0 ) { //자식이 있을때만 실행
			old_sel = jQuery(".submenu"+num);
			old_img = jQuery(".submenu"+num).parent().find("img")[0];
			old_sel.show();
			old_img.src = old_img.src.replace(".gif", "_on.gif");
		} else { //자식이 없을때만 실행
			old_img = jQuery("#tm > li").eq(num-1).find("img")[0];
			old_img.src = old_img.src.replace(".gif", "_on.gif");
			old_sel = jQuery(".submenu0"); //if(!old_sel) 회피용
		}
	}
	
	jQuery("#tm > li > a").mouseover(function() {
		var sel = jQuery(this).parent().find(">ul"); //현재 선택메뉴의 서브메뉴
		var oneimg = jQuery(this).find(">img")[0]; //현재 선택메뉴의 이미지
		
		if(!old_sel) { //old_sel 이 값이 없을때(아무것도 선택되지 않은 초기값을 위해)

		} else { //old_sel 이 값이 있을때
			old_sel.hide();
			old_img.src = old_img.src.replace("_on.gif", ".gif");
		}
		
		if(sel.size() != 0){ //자식이 있을때만 실행
			sel.show();
		}
		oneimg.src = oneimg.src.replace(".gif", "_on.gif");
		
		old_sel = sel;
		old_img = oneimg;
		return false;
	});
	
	jQuery("#tm > li > a").focus(function() {
		var sel = jQuery(this).parent().find(">ul");
		var oneimg = jQuery(this).find(">img")[0];
		
		if(!old_sel) {

		} else {
			old_sel.hide();
			old_img.src = old_img.src.replace("_on.gif", ".gif");
		}
		
		if(sel.size() != 0){
			sel.show();
		}
		oneimg.src = oneimg.src.replace(".gif", "_on.gif");
		
		old_sel = sel;
		old_img = oneimg;
		return false;
	});
}



var old_sel = ""; //이전 선택메뉴의 서브메뉴
var old_img = ""; //이전 선택메뉴의 이미지
function topMenu1_a(num) {
	jQuery("#tm > li > ul").hide();
	
	if(num != null) { //처음 선택된 메뉴
		if( jQuery(".submenu"+num).size() != 0 ) { //자식이 있을때만 실행
			old_sel = jQuery(".submenu"+num);
			old_img = jQuery(".submenu"+num).parent().find("img")[0];
			old_sel.show();
			//old_img.src = old_img.src.replace(".gif", "_on.gif");
			old_img.src = old_img.src.replace(".gif", ".gif");
		} else { //자식이 없을때만 실행
			old_img = jQuery("#tm > li").eq(num-1).find("img")[0];
			old_img.src = old_img.src.replace(".gif", ".gif");
			old_sel = jQuery(".submenu0"); //if(!old_sel) 회피용
		}
	}
	
	jQuery("#tm > li > a").mouseover(function() {
		var sel = jQuery(this).parent().find(">ul"); //현재 선택메뉴의 서브메뉴
		var oneimg = jQuery(this).find(">img")[0]; //현재 선택메뉴의 이미지
		
		if(!old_sel) { //old_sel 이 값이 없을때(아무것도 선택되지 않은 초기값을 위해)

		} else { //old_sel 이 값이 있을때
			old_sel.hide();
			old_img.src = old_img.src.replace(".gif", ".gif");
		}
		
		if(sel.size() != 0){ //자식이 있을때만 실행
			sel.show();
		}
		oneimg.src = oneimg.src.replace(".gif", ".gif");
		
		old_sel = sel;
		old_img = oneimg;
		return false;
	});
	
	jQuery("#tm > li > a").focus(function() { //alert();
		var sel = jQuery(this).parent().find(">ul");
		var oneimg = jQuery(this).find(">img")[0];
		
		if(!old_sel) {

		} else {
			old_sel.hide();
			old_img.src = old_img.src.replace(".gif", ".gif");
		}
		
		if(sel.size() != 0){
			sel.show();
		}
		oneimg.src = oneimg.src.replace(".gif", ".gif");
		
		old_sel = sel;
		old_img = oneimg;
		return false;
	});
}



var current_mainmenu_img_src = "";
function topMenu1_aa(num) {
	
	if (num != null) { //처음 선택된 메뉴
		var menu_num = jQuery("#tm > li").size();
		//alert(jQuery("#tm").find(">li>a").html());
		var cur_li = jQuery("#tm>li");
		for (var i=0; i<menu_num; i++) {
			
			if ((num-1)==i) {
				//alert(cur_li.find(">a>img")[0].src);
				//current_mainmenu_img_src = cur_li.find(">a>img")[0].src;
				//jQuery("#tm > li")[i].find(">img").src = jQuery("#tm > li")[0].find(">img").src.replace(".gif", "_on.gif");
				cur_li.find(">a>img")[0].src = cur_li.find(">a>img")[0].src.replace(".gif", "_on.gif");
				
				current_mainmenu_img_src = cur_li.find(">a>img")[0].src;
				break;
			}
			
			cur_li = cur_li.next();
		}
	}
	
	
	jQuery("#tm > li > a").hover(
		function() { //마우스를 topnav에 오버시
			
			cur_mainmenu = jQuery(this).find(">img")[0];
			//alert(jQuery(this).find(">img")[0].src.match("_on"));
			if ( jQuery(this).find(">img")[0].src.match("_on")==null) {
				jQuery(this).find(">img")[0].src = jQuery(this).find(">img")[0].src.replace(".gif", "_on.gif");
			}
			
			jQuery(this).parent().find(">ul").slideDown('normal').show(); //subnav가 내려옴.
			
			var is_hover = false;
			jQuery(this).parent().hover(
				function() { 
					//alert('inner_hover');
					is_hover=true;
					if ( jQuery(this).find(">a>img")[0].src.match("_on")==null ) {
						jQuery(this).find(">a>img")[0].src = jQuery(this).find(">a>img")[0].src.replace(".gif", "_on.gif");
					}
				}, 
				function(){ 
					//alert('inner_hover_out');
					if (is_hover)  is_hover=false;
					jQuery(this).parent().find("ul").slideUp('fast'); //subnav에서 마우스 벗어났을 시 원위치시킴 
					if ( jQuery(this).find(">a>img")[0].src.match("_on")=="_on" && current_mainmenu_img_src!=jQuery(this).find(">a>img")[0].src) {
						jQuery(this).find(">a>img")[0].src = jQuery(this).find(">a>img")[0].src.replace("_on.gif", ".gif");
					}
				}
			);  
		},
		function() { //마우스를 topnav에 오버시
			if (is_hover==false)
				if ( jQuery(this).find(">img")[0].src.match("_on")=="_on" && current_mainmenu_img_src!=jQuery(this).find(">img")[0].src) {
					jQuery(this).find(">img")[0].src = jQuery(this).find(">img")[0].src.replace("_on.gif", ".gif");
				}
		}
	
	);
	

}

//topmenu2
var oldold_sel = ""; //이전 선택메뉴의 서브메뉴
var oldold_img = ""; //이전 선택메뉴의 이미지
var auto = true; //fade 진행중일때 false, fade 진행상태가 아닐때 true
function topMenu2(num) {
	jQuery("#tm > li > ul").hide();
	
	if(num != null) { //처음 선택된 메뉴	
		if( jQuery(".submenu"+num).size() != 0 ) { //자식이 있을때만 실행
			oldold_sel = jQuery(".submenu"+num);
			oldold_img = jQuery(".submenu"+num).parent().find("img")[0];
			oldold_sel.show();
			oldold_img.src = oldold_img.src.replace(".gif", "_on.gif");
		} else { //자식이 없을때만 실행
			oldold_img = jQuery("#tm > li").eq(num-1).find("img")[0];
			oldold_img.src = oldold_img.src.replace(".gif", "_on.gif");
			oldold_sel = jQuery(".submenu0"); //if(!old_sel) 회피용
		}
	}
	
	jQuery("#tm > li > a").mouseover(function() {
		var sel = jQuery(this).parent().find(">ul"); //현재 선택메뉴의 서브메뉴
		var oneimg = jQuery(this).find(">img")[0]; //현재 선택메뉴의 이미지
		
		var boxposition = jQuery(this).parent(); //모션박스 위치
		var boxw = jQuery(this).width(); //모션박스 가로크기
		var boxh = jQuery(this).height(); //모션박스 세로크기
		var boxsrc = oneimg.src.replace(".gif", "_on.gif"); //모션박스안에 담길 이미지
		
		if(!oldold_sel) { //oldold_sel 이 값이 없을때(아무것도 선택되지 않은 초기값을 위해)
			Motion();
		} else { //oldold_sel 이 값이 있을때
			oldold_sel.hide();

			if(oneimg.src != oldold_img.src) { //현재 오버 된 메뉴와 다른메뉴를 오버했을때
				Motion();
			} else { //현재 오버 된 메뉴와 같은메뉴를 오버했을때
				sel.show();
				oldold_sel = sel;
				oldold_img = oneimg;
				return false;
			}
			oldold_img.src = oldold_img.src.replace("_on.gif", ".gif");
		}
		function Motion() {
			if(auto == true) { //모션 중복 방지
				auto = false;
				//sel.show();
				sel.fadeIn(200);
				jQuery("<div class='motionBox' style='position:absolute;top:0px;width:"+boxw+"px;height:"+boxh+"px;display:none;'><img src='"+boxsrc+"' alt='' /></div>").prependTo(boxposition);  //모션박스 삽입
				jQuery(".motionBox").fadeIn(200, function() {
					oneimg.src = oneimg.src.replace(".gif", "_on.gif");
					jQuery(this).remove(); //모션박스 삭제
					
					oldold_sel = sel;
					oldold_img = oneimg;
					auto = true;
					return false;
				});
			}
		}
	});
	
	jQuery("#tm > li > a").focus(function() {
		var sel = jQuery(this).parent().find(">ul");
		var oneimg = jQuery(this).find(">img")[0];
		
		var boxposition = jQuery(this).parent();
		var boxw = jQuery(this).width();
		var boxh = jQuery(this).height();
		var boxsrc = oneimg.src.replace(".gif", "_on.gif");
		
		if(!oldold_sel) {
			Motion();
		} else {
			oldold_sel.hide();

			if(oneimg.src != oldold_img.src) {
				Motion();
			} else {
				sel.show();
				oldold_sel = sel;
				oldold_img = oneimg;
				return false;
			}
			oldold_img.src = oldold_img.src.replace("_on.gif", ".gif");
		}
		function Motion() {
			if(auto == true) {
				auto = false;
				//sel.show(200);
				sel.fadeIn(200);
				jQuery("<div class='motionBox' style='position:absolute;top:0px;width:"+boxw+"px;height:"+boxh+"px;display:none;'><img src='"+boxsrc+"' alt='' /></div>").prependTo(boxposition);
				jQuery(".motionBox").fadeIn(200, function() {
					oneimg.src = oneimg.src.replace(".gif", "_on.gif");
					jQuery(this).remove();
					
					oldold_sel = sel;
					oldold_img = oneimg;
					auto = true;
					return false;
				});
			}
		}
	});
}

//topmenu3
var oldoldold_sel = ""; //이전 선택메뉴의 서브메뉴
var oldoldold_img = ""; //이전 선택메뉴의 이미지
var autoauto = true; //fade 진행중일때 false, fade 진행상태가 아닐때 true
function topMenu3(num) {
	jQuery("#tm > li > ul").hide();
	
	if(num != null) { //처음 선택된 메뉴
		if( jQuery(".submenu"+num).size() != 0 ) { //자식이 있을때만 실행
			oldoldold_sel = jQuery(".submenu"+num);
			oldoldold_img = jQuery(".submenu"+num).parent().find("img")[0];

			oldoldold_sel.show();
			oldoldold_img.src = oldoldold_img.src.replace(".gif", "_on.gif");
		} else { //자식이 없을때만 실행
			oldoldold_img = jQuery("#tm > li").eq(num-1).find("img")[0];
			oldoldold_img.src = oldoldold_img.src.replace(".gif", "_on.gif");
			oldoldold_sel = jQuery(".submenu0"); //if(!oldoldold_sel) 회피용
		}
	}
	
	jQuery("#tm > li > a").mouseover(function() {
		var sel = jQuery(this).parent().find(">ul"); //현재 선택메뉴의 서브메뉴
		var oneimg = jQuery(this).find(">img")[0]; //현재 선택메뉴의 이미지
		
		if(!oldoldold_sel) { //oldoldold_sel 이 값이 없을때(아무것도 선택되지 않은 초기값을 위해)

		} else { //oldoldold_sel 이 값이 있을때
			oldoldold_sel.hide();
			oldoldold_img.src = oldoldold_img.src.replace("_on.gif", ".gif");
		}
		
		if(autoauto == true) { //모션 중복 방지
			if(sel.size() != 0){ //자식이 있을때만 실행
				autoauto = false;
				sel.show(100, function() {
					oldoldold_sel = sel;
					oldoldold_img = oneimg;
					autoauto = true;
					return false;
				});
			} else {
				oldoldold_sel = sel;
				oldoldold_img = oneimg;
			}
			oneimg.src = oneimg.src.replace(".gif", "_on.gif");
		}
	});
	jQuery("#tm > li > a").focus(function() {
		var sel = jQuery(this).parent().find(">ul");
		var oneimg = jQuery(this).find(">img")[0];
		
		if(!oldoldold_sel) {

		} else {
			oldoldold_sel.hide();
			oldoldold_img.src = oldoldold_img.src.replace("_on.gif", ".gif");
		}
		
		if(autoauto == true) { //모션 중복 방지
			if(sel.size() != 0){ //자식이 있을때만 실행
				autoauto = false;
				sel.show(100, function() {
					oldoldold_sel = sel;
					oldoldold_img = oneimg;
					autoauto = true;
					return false;
				});
			} else {
				oldoldold_sel = sel;
				oldoldold_img = oneimg;
			}
			oneimg.src = oneimg.src.replace(".gif", "_on.gif");
		}
	});
}





//배너광장
var sam = 1;
var auto = 1;
function mainBanner() {
	var timegap=5000;
	var num = $(".banner_list > li").length;
	
	var id = setInterval(rotation, timegap);
	function rotation() {		
		var yang = $(".banner_list > li:first").clone().appendTo(".banner_list");
		
		$(".banner_list").animate(
			{left:-160},
			{duration:500, complete:function() {
				$(".banner_list > li:first").remove();
				$(".banner_list").css("left", "0");
				//alert($(".banner_list").html());
		}});
	}
	btnstop = function() {
		if(auto == 1) {
			clearInterval(id);
			auto = 0;			
		}
	}
	btnpre = function() {
		clearInterval(id);
		
		if(sam == 1){
			sam = 0;
			var yang = $(".banner_list > li:first").clone().appendTo(".banner_list");
			
			$(".banner_list").animate(
				{left:-160},
				{duration:100, complete:function() {
					$(".banner_list > li:first").remove();
					$(".banner_list").css("left", "0");
					sam = 1;
					//alert($(".banner_list").html());
			}});		
		} else {
			return false;
		}
		mainBanner();
	}
	btnnext = function() {
		clearInterval(id);
		
		if(sam == 1){
			sam = 0;
			$(".banner_list").css("left", "-160");
			var yang = $(".banner_list > li:last").clone().prependTo(".banner_list");
			
			$(".banner_list").animate(
				{left:0},
				{duration:100, complete:function() {
					$(".banner_list > li:last").remove();
					sam = 1;
					//alert($(".banner_list").html());
			}});
		} else {
			return false;
		}
		mainBanner();
	}
}
