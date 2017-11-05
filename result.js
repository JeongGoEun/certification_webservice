var userJmcd;
var userQualgbCd;
var userQualgbCd2;
var userFee;
var userMajor;
var userInfo;
var userDate;
var userQualVal;

$(document).ready(loadFunc);

function loadFunc(){

	$('#jmCd').hide();
	$('#qualgbCd').hide();
	$('#qualgbCd2').hide();
	$('#fee').hide();
	$('#major').hide();
	$('#info').hide();
	$('#date').hide();

	var temp = location.href.split("?");
	data=temp[1].split(":");

	userJmcd = data[0];		//데이터 할당
	userQualgbCd=data[1];
	userQualgbCd2=data[2];
	userFee=data[3];
	userMajor=data[4];
	userInfo=data[5];
	userDate=data[6];
	userQualVal=data[7];
	resultReady();
}


function resultReady(){	
	$.blockUI({ message: '<h1><img src="img/clock.gif" /> Just a moment...</h1>' });
	setTimeout($.unblockUI, 3000); 

	if(userJmcd!=null){	//자격증 선택
		$('#jmCd').show();
		jmcdFunc();
	}
	else{
		$('#jmCd').hide();
	}

	if(userQualgbCd=="null"){//기술자격 선택
		$('#qualgbCd').hide();//alert("dfasdf");		
	}
	else{
		$('#qualgbCd').show();
			qualFunc();
	}

	/*if(userQualgbCd2=="null"){//기술자격 선택
		$('#qualgbCd2').hide();//alert("dfasdf");		
	}
	else{
		$('#qualgbCd2').show();//alert("dfasdf");
			qualFunc();
	}*/

	if(userFee=="true"){	//응시 수수료 선택
		$('#fee').show();
		feeFunc();
	}
	else{
		$('#fee').hide();
	}

	if(userMajor=="true"){	//관련 학과 선택
		$('#major').show();
	}
	else{
		$('#major').hide();
	}

	if(userInfo=="true"){//취득 방법
		$('#info').show();
	}
	else{
		$('#info').hide();
	}
	
	if(userDate=="true"){//응시 날짜 선택
		$('#date').show();
		dateFunc();
	}
	else{
		$('#date').hide();
	}
	

}

function jmcdFunc(){	//자격증 종목 가져오는 함수
	var jmcdTxt=document.getElementById("jmCd");	//자격증 이름 나타내는 항목 가져옴

	$.ajax({	//셀렉트 박스 파싱
					url: "http://openapi.q-net.or.kr/api/service/rest/InquiryInformationTradeNTQSVC/getList?serviceKey=%2BqLCp6r5bODj79ZkQMlEt51l5GEo8RdKC%2B2pKlDPiAS89%2FfS69Yh1R6UXo6bwsZmBlrqqX1nNdHQZHeFIQWq6w%3D%3D&jmCd="+userJmcd,					
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
				var myXml=xml.responseText;	//xml문서 얻어옴
				var check=0;	//초기화

					$(myXml).find('item').each(function(){  // xml 문서 item 기준으로 분리후 반복						
						var jmValue=$(this).find("jmFldNm").text();	//자격증 이름
						if(check==0){//자격증 이름 추가
							$("#jmCd").append(jmValue);
						}
						if(userMajor=="true"&&check==0){
							var infoText=$(this).find("contents").text();	//자격증 취득방법
							$("#major").append(infoText);
						}
						if(userInfo=="true"&&check==2){	//자격증 취득방법 뽑아오기
							var infoValue=$(this).find("contents").text();	//자격증 취득방법

							if(check==2){//자격증 이름 추가
								$("#info").append(infoValue+"\n");
							}
						}
						check++;
					});
				}
				
}
function qualFunc(){	//국가 자격 조회

	if(userQualgbCd!=null){	//기술자격과 전문자격 둘 다 선택했을 때
		if(userQualgbCd=="T")
			$("#qualgbCd").append("기술자격 입니다.");
		else
			$("#qualgbCd2").append("전문자격 입니다..");
		
	}
}
function feeFunc(){	//수수료 조회

	$.ajax({	//셀렉트 박스 파싱
					url: "http://openapi.q-net.or.kr/api/service/rest/InquiryTestInformationNTQSVC/getFeeList?jmCd="+userJmcd+"&serviceKey=%2BqLCp6r5bODj79ZkQMlEt51l5GEo8RdKC%2B2pKlDPiAS89%2FfS69Yh1R6UXo6bwsZmBlrqqX1nNdHQZHeFIQWq6w%3D%3D",					
					type: 'GET',
					dataType: "xml",
					cache    : false,
   					async     : true,
   					crossOrigin: true,
					crossDomain:true,
					success: success2,
    		   		 error:function(xml,status,error){
        	 		   alert("다시 시도해주세요.\n" + "code:"+xml.status+"\n"+"message:"+xml.responseText+"\n"+"error:"+error)}
	});
	function success2(xml) {	//성공 했을 때

				var myXml=xml.responseText;	//xml문서 얻어옴

					//$(myXml).find('item').each(function(){  // xml 문서 item 기준으로 분리후 반복						
						var feeValue=$(myXml).find("contents").text();	//자격증 취득방법
						$("#fee").append(feeValue);

					//});
	}
}
function dateFunc(){
	$.ajax({	//셀렉트 박스 파싱
					url: "http://openapi.q-net.or.kr/api/service/rest/InquiryTestInformationNTQSVC/getJMList?jmCd="+userJmcd+"&serviceKey=%2BqLCp6r5bODj79ZkQMlEt51l5GEo8RdKC%2B2pKlDPiAS89%2FfS69Yh1R6UXo6bwsZmBlrqqX1nNdHQZHeFIQWq6w%3D%3D",					
					type: 'GET',
					dataType: "xml",
					cache    : false,
   					async     : true,
   					crossOrigin: true,
					crossDomain:true,
					success: success2,
    		   		 error:function(xml,status,error){
        	 		   alert("다시 시도해주세요.\n" + "code:"+xml.status+"\n"+"message:"+xml.responseText+"\n"+"error:"+error)}
	});
	function success2(xml) {	//성공 했을 때
			var table = document.getElementById("table1");

			var myXml=xml.responseText;	//xml문서 얻어옴

					$(myXml).find('item').each(function(){  // xml 문서 item 기준으로 분리후 반복			
						var rowlen = table.rows.length;
						//var row = table.insertRow();		// IE와 Chrome 동작을 달리함.
						var row = table.insertRow(rowlen);	// HTML에서의 권장 표준 문법			
						var impPlan=$(this).find("implPlanNm").text();	//필기시험 시작,합격자발표
						var docStart=$(this).find("docExamStartDt").text();	//필기시험 시작,합격자발표
						var docPass=$(this).find("docPassDt").text();
						var pracStart=$(this).find("pracExamStartDt").text();	//실기시험 시작, 합격자 발표
						var pracPass=$(this).find("pracPassStartDt").text();

						row.insertCell(0).innerHTML = impPlan;
						row.insertCell(1).innerHTML = docStart;
						row.insertCell(2).innerHTML = docPass;
						row.insertCell(3).innerHTML = pracStart;
						row.insertCell(4).innerHTML = pracPass;
						
					});
					
	}

}
function backHtml(){	//back버튼 눌렀을 때
	history.go(-2);
}
function closeHtml(){	//닫기 버튼 눌렀을 때
	window.open('about:blank','_self').self.close();
}
function test(){
	//alert("hhh");
}