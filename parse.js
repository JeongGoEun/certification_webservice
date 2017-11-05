$(document).ready(function(){
	$('#beforedata').css('float','left');
	$('#afterdata').css('align','right');
	$('#btn').css('align','center');
		$("#obligFld").append("<option value='10'>값10</option>");
	
	$.ajax({
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
				})
});



function success(xml) {
				var myXml=xml.responseText;	//xml문서 얻어옴
					$(myXml).find('item').each(function(){  // xml 문서 item 기준으로 분리후 반복
					$('#after').append("자격증 : "+ $(this).find("jmFldNm").text()+"\n");
				        var contents = $(this).find("contents").text();
				        var infoGb = $(this).find("infoGb").text(); 
				        var view_text = "●"+infoGb+"\n"+contents +"\n"; 
				        $("#after").append(view_text+"\n\n");  // #id 에 view_text 삽입
					 });
       }
function addOption(var value,var code){
	$("#obligFld").append("<option value='10'>값10</option>");

	var opts=document.getElementById('#obligFld')
	var opt=new Option();
	op.value=code;
	op.text=value;
	opts.append(op);
}