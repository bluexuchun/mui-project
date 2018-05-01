//mui打印解决方法
function consoleLog(ary){
	var newObj = JSON.stringify(ary);
	return console.log(newObj);
}

//隐藏页面
function hidePage(targetlists){
	var length = targetlists.length;
	for (var i = 0; i < length; i++) {
		plus.webview.hide(targetlists[i]);
	}
}
//隐藏分类页面
//隐藏子页面
//更新数组 改变样式
function updateArry(lists){
	
}

//获取需要的参数
function getValue(url,value){
	var parmas = url.split('?')[1];
	var value = parmas.split('=')[1]; 
	 return value;
}

