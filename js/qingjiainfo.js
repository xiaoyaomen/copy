// 失去焦点时检测
weui.form.checkIfBlur('#form');


function getDate(strDate) {
	var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
	 function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
	return date;
}


var sparr=[{
            label: '未审批',
            value: '未审批'
        }, {
            label: '同意',
            value: '同意'
        }, {
            label: '拒绝',
            value: '拒绝'
        }];

		
		

document.querySelector('#daoyuan').addEventListener('click', function () {
	weui.picker(sparr, {
		onConfirm: function (result) {
			//document.querySelector('#daoyuan').value = result;
			location.href="shenpi.asp?t=0&r="+result+"&qjid="+document.querySelector('#qingjiaid').value;
		},
		title: ''
	});
});
//修改返校日期
document.querySelector('#fxsj').addEventListener('click', function () {
	var d2 = new Date();
	weui.datePicker({
		start: document.querySelector('#cxsj').value,
		end: d2.getFullYear(),
		onConfirm: function (result) {
			//document.querySelector('#fxsj').value = result[0]+"-"+result[1]+"-"+result[2];
			location.href="yanqi.asp?qjid="+document.querySelector('#qingjiaid').value+"&fxsj="+result[0]+"-"+result[1]+"-"+result[2];
		},
		title: ''
	});
});



document.querySelector('#fxdy').addEventListener('click', function () {
	weui.picker(sparr, {
		onConfirm: function (result) {
			//document.querySelector('#shuji').value = result;
			if(document.querySelector('#xcgj').value=="" && result=="同意"){
				alert("学生还未提交行程轨迹！");
				return;
			}
			location.href="shenpi.asp?t=2&r="+result+"&qjid="+document.querySelector('#qingjiaid').value;
		},
		title: ''
	});
});

//生成出校通行证
document.querySelector('#cxtxz').addEventListener('click', function () {	
	var d = new Date();
	if(document.querySelector('#daoyuan').value!="同意"){
		alert("未通过审批！最近三日内可能存在未填报疫情通情况，请联系辅导员说明情况！");
	}
	else if(document.querySelector('#sjcxsj').value!=""){
		alert("已出校，通行证只能生成一次！如需出校，请重新提交出入校申请，如果无法提交申请，请按提示操作！");
	}
	else if(document.querySelector('#sjfxsj').value!=""){
		alert("此次申请已返校！如需出校，请重新提交出入校申请，如果无法提交申请，请按提示操作！");
	}
	else if((getDate(document.querySelector('#cxsj').value)>getDate(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate())) || (getDate(document.querySelector('#fxsj').value)<getDate(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()))){
		
		alert("当日不再申请出校日期和返校日期范围内！如需出校，请重新提交出入校申请，如果无法提交申请，请按提示操作！");
	}
	else{
		if(confirm("出校通行证只能生成一次,且2分钟内有效，请及时出校！如未及时出校需重新提交出校申请！")){
			location.href="getpass.asp?qjid="+document.querySelector('#qingjiaid').value;
		}
	}
});


//生成返校通行证
document.querySelector('#fxtxz').addEventListener('click', function () {
	var d = new Date();
	if(document.querySelector('#sjcxsj').value==""){
		alert("尚未出校，如果已出校，请先生成出校通行证，如果生成不成功，请按提示操作！");
	}
	else if(document.querySelector('#xcgj').value==""){
		alert("请先填写行程轨迹，并点击右下角按钮提交！如果无法提交行程，请联系导员将返校审批情况修改为未审批！");
	}
	else if(document.querySelector('#fxdy').value!="同意"){
		alert("填写行程轨迹后请点击右下角按钮提交，如果提交后还无法生成请联系导员进行返校审批！");
	}
	else if(document.querySelector('#sjfxsj').value!=""){
		alert("已返校，返校通行证只能生成一次，如需返校请重新提交出入校申请！");
	}
	else if(getDate(document.querySelector('#fxsj').value)<getDate(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate())){
		alert("已过申请返校日期，请延期，操作方法：当前页面，点击[申请返校日期]，选择今日日期后确定！");
	}
	else{
		if(confirm("返校通行证只能生成一次,且2分钟内有效，请及时入校！如未及时入校需重新提交出校申请！")){
			location.href="getfxpass.asp?qjid="+document.querySelector('#qingjiaid').value;
		}
	}
});


//填写行程轨迹
document.querySelector('#tjxc').addEventListener('click', function () {
	if(document.querySelector('#sjcxsj').value==""){
		alert("请在出校后返校前填写行程轨迹，如果已经出校，请先生成出校通行证，然后再提交行程；如果已过申请返校日期，请延期，操作方法：当前页面，点击[申请返校日期]，选择今日日期后确定！")
	}
	else{
		weui.form.validate('#form', function (error) {
			console.log(error);
			if (!error) {
				var loading = weui.loading('提交中...');
				setTimeout(function () {
					loading.hide();
					document.querySelector('#sub_form').action="xcgj_do.asp";
					document.querySelector('#sub_form').method="post";
					document.querySelector('#sub_form').submit();
				}, 1000);	
			}
		});
	}
});