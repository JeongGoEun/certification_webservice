var userJmcd=null;
var userQualgbCd=null;
var userQualgbCd2=null;
var userFee=false;
var userMajor=false;
var userInfo=false;
var userDate=false;
var userQualVal=null;	//사용자 선택 자격

$(window).load(readyFunc);

function readyFunc(){
	$('.checkBlock').wrap('<div class="new"/>');
	$('.container2','container3').wrap('<div class="new"/>');
	$('#jmCd').hide();$('#qualgbCd').hide();$('#qualgbCd2').hide();$('#fee').hide();$('#major').hide();$('#info').hide();$('#date').hide();
	$('#two').hide(); 	$('#three').hide(); 	$('#four').hide(); 	$('#five').hide(); 	$('#six').hide(); 	$('#seven').hide(); $('#eight').hide(); 
	$('#txtDate').hide(); $('#select_box').hide(); $('#select_box2').hide();

	//resultReady()	//result에 나타낼 것
	
	var select = $("select#color");	/*select box seleted then change text on title*/
    select.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
        });
    $.ajax({	//셀렉트 박스 파싱
					url: "http://openapi.q-net.or.kr/api/service/rest/InquiryListNationalQualifcationSVC/getList?serviceKey=%2BqLCp6r5bODj79ZkQMlEt51l5GEo8RdKC%2B2pKlDPiAS89%2FfS69Yh1R6UXo6bwsZmBlrqqX1nNdHQZHeFIQWq6w%3D%3D",					
					type: 'GET',
					dataType: "xml",
					cache    : false,
   					async     : true,
   					crossOrigin: true,
					crossDomain:true,
					success: success,
    		   		 error:function(xml,status,error){
        	 		   alert("다시 시도해주세요.\n" + "code:"+xml.status+"\n"+"message:"+xml.responseText+"\n"+"error:"+error)}
	});

}
function success(xml) {	//성공 했을 때
			var myXml=xml.responseText;	//xml문서 얻어옴
			var oblCodeArr=new Array();	//중복 확인 배열
			var count=0;	//배열 확인 count
			var check;
				$(myXml).find('item').each(function(){  // xml 문서 item 기준으로 분리후 반복
					check=0;	//초기화
					var oblValue=$(this).find("obligFldNm").text();	//대직무 이름
					var oblCode=$(this).find("obligFldCd").text();	//대직무 코드		
						if(count==0){	//처음이라면 그냥 넣음	
						check=0;
						count++;
					}
					else{
						for(var i=0;i<oblCodeArr.length;i++){	//배열 하나씩 검사 
							if(oblCodeArr[i]==oblCode){	//중복 되는 것이 있으면
								check=1;	//체크=1
								}
						}
					}
					if(check==0){	//중복 되는 것 없으면
						$("#obligFld").append("<option value='"+oblCode+"'>"+oblValue+"</option>")
						oblCodeArr.push(oblCode);
					}
				}
				);
      }
/**************************파싱**************************/	
function getValue(){	//대직무 분야 선택 -> 라벨 변경, 중직무 분야 리스트 채움
	document.getElementById("jmFld").options.length=0; 

	var sel=document.getElementById("obligFld");	//대직무 분야 필드의 선택 값 가져옴

	var selectObl = sel.options[sel.selectedIndex].value;
	$('#select_box label').text(sel.options[sel.selectedIndex].text);

	$.ajax({	//셀렉트 박스 파싱
					url: "http://openapi.q-net.or.kr/api/service/rest/InquiryListNationalQualifcationSVC/getList?serviceKey=%2BqLCp6r5bODj79ZkQMlEt51l5GEo8RdKC%2B2pKlDPiAS89%2FfS69Yh1R6UXo6bwsZmBlrqqX1nNdHQZHeFIQWq6w%3D%3D",					
					type: 'GET',
					dataType: "xml",
					cache    : false,
   					async     : true,
   					crossOrigin: true,
					crossDomain:true,
					success: success,
    		   		 error:function(xml,status,error){
        	 		   alert("다시 시도해주세요.\n" + "code:"+xml.status+"\n"+"message:"+xml.responseText+"\n"+"error:"+error)}
	});
	function success(xml) {	//성공 했을 때
				$.blockUI({ message: '<img src="img/clock.gif" />' });
				setTimeout($.unblockUI, 2000);

				var myXml=xml.responseText;	//xml문서 얻어옴

				var count=0;	//배열 확인 count
				var check;
					$(myXml).find('item').each(function(){  // xml 문서 item 기준으로 분리후 반복
						check=0;	//초기화
						var jmValue=$(this).find("jmFldNm").text();	//자격증 이름
						var jmCode=$(this).find("jmCd").text();	//자격증 코드		
						var oblCode=$(this).find("obligFldCd").text();	//대직무 코드	
						userQualVal=$(this).find("qualgbCd").text();	//자격 코드
						if(oblCode==selectObl)//계열 코드 같으면 셀렉트박스에 추가
							$("#jmFld").append("<option value='"+jmCode+"'>"+jmValue+"</option>");
					}
					);
       }
}

function getName(){	//대직무 분야 선택 -> 라벨 변경, 중직무 분야 리스트 채움 

	var sel=document.getElementById("jmFld");	//자격증 이름 필드의 선택 값 가져옴

	userJmcd = sel.options[sel.selectedIndex].value;	//사용자 선택 자격증 코드 가져오기
	//alert(userJmcd);
	$('#select_box2 label').text(sel.options[sel.selectedIndex].text);

}

function one(checkbox){
	if(checkbox.checked==true){
		$("#select_box").show();
		$('#select_box2').show();
		//$("#jmCd").show();
	}
	else{
		$("#select_box").hide();
		$('#select_box2').hide();
		//$("#jmCd").hide();
	}
}
function two(checkbox){	//기술 자격 종목 선택
	if(checkbox.checked==true){	//선택 됐을 때 T 할당
		$("#two").show();
		//$("#qualgbCd").show();
		userQualgbCd='T';

	}
	else{		//선택 안됐을 때 null 할당
		$("#two").hide();
		//$("#qualgbCd").hide();
		userQualgbCd=null;
	}
	//alert(userQualgbCd);
}
function three(checkbox){	//전문 자격 종목 선택
	if(checkbox.checked==true){	//선택 됐을 때 S할당
		$("#three").show();
		//$('#qualgbCd2').show();
		userQualgbCd2='S';
	}
	else{
		$("#three").hide();
		//$("#qualgbCd2").hide();
		userQualgbCd2=null;
	}
	//alert(userQualgbCd2);
}
function four(checkbox){	//응시 수수료 조회
	if(checkbox.checked==true){
		$("#four").show();
		//$("#fee").show();
		userFee=true;
	}
	else{
		$("#four").hide();
		//$("#fee").hide();
		userFee=false;
	}
	//alert(userFee);
}
function five(checkbox){	//관련 학과 선택
	if(checkbox.checked==true){
		$("#five").show();
		//$("#major").show();
		userMajor=true;
	}
	else{
		$("#five").hide();
		//$("#major").hide();
		userMajor=false;
	}
	//alert(userMajor);
}
function six(checkbox){	//취득 방법
	if(checkbox.checked==true){
		$("#six").show();
		//$("#info").show();
		userInfo=true;

	}
	else{
		$("#six").hide();
		//$("#info").hide();
		userInfo=false;
	}
	//alert(userInfo);
}

function eight(checkbox){	//시험 일정

	if(checkbox.checked==true){
		$('#eight').show();
		$("#txtDate").show();
		userDate=true;
	}
	else{
		$('#eight').hide();
		$("#txtDate").hide();
		userDate=false;
	}
	//alert(userDate);
}
function moveHtml(){
	location.href="result.html?" + userJmcd+":"+userQualgbCd+":"+userQualgbCd2+":"+userFee+":"+userMajor+":"+userInfo+":"+userDate+":"+userQualVal;
}

