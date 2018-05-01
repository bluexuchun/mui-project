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

//拖动过程中的判断位置 如果在有图标的位置前与后需要做的操作
function changePos(finallX,finallY,windowWidth,windowHeight,itemWidth,itemHeight,orid,imgWidth,imgHeight){
	//计算出跨度领域 (windowWidth/4 /4)
	var message,
		rangeOx,
		rangeOfx,
		rangeFx,
		rangeFfx,
		rangeOy,
		rangeOfy,
		rangeFy,
		rangeFfy;
	var jg = windowWidth/itemWidth;
	var range = windowWidth/16;
	var rangeY = (itemHeight - imgHeight)/2;
	var returninfo = area(finallX,finallY,windowWidth,windowHeight,itemWidth,itemHeight);
	
	//范围是 
	rangeOx = returninfo['col'] * jg + range;
	rangeOfx = returninfo['col'] * jg + range + 15;
	rangeFx = (returninfo['col'] + 1) * jg - range -15;
	rangeFfx = (returninfo['col'] + 1) * jg -15;
	rangeOy = returninfo['row'] * itemHeight;
	rangeOfy = returninfo['row'] * itemHeight + rangeY;
	rangeFy = (returninfo['row']+1) * itemHeight;
	rangeFfy = (returninfo['row']+1) * itemHeight - rangeY;
//
	
//	var returnmsg = {'rangeOx':rangeOx,'rangeOfx':rangeOfx,'rangeFx':rangeFx,'rangeOy':rangeOy,'rangeOfy':rangeOfy,'rangeFy':rangeFy,'rangeFfy':rangeFfy,'finallY':finallY,'rangeFfx':rangeFfx,'jg':jg,'windowWidth':windowWidth,'range':range};
//	return returnmsg;
//	
	var 	dataid = returninfo['col'] + returninfo['row'] * itemWidth;
	var _this = $('.collect-item').eq(dataid);
	var _thisimg = _this.find('.collect-gimg');
	var _thisbox = _this.find('.collect-gbox');
	//判断拖动的id 与目标的id不同
	if(orid != dataid){
		if($('.collect-item').eq(dataid).length == 1){
			if(finallX > rangeOx && finallX <= rangeOfx){
//			message = 'col:'+returninfo['col']+'row:'+returninfo['row']+'向后移'+'范围是'+rangeOx+'~'+rangeOfx+'finallX:'+finallX;
				if(_this.find('.collect-img').attr('data-status') == 'open'){
					_thisimg.animate({
						'width':'100%',
						'height':'100%'
					});
					_thisbox.css({
						'display':'none'
					});
					_this.find('.collect-img').attr('data-status','close');
				}
				
				for (var i = dataid; i < orid; i++) {
					var nowid = Number(i) + 1;
					$('.collect-item').eq(i).css({
						'left':(nowid % itemWidth) * 25 + '%',
						'top':Math.floor(nowid / 4) *120 + 'px'
					});
				}

				
			}else if(finallX >= rangeFx && finallX < rangeFfx){
	//			message = 'col:'+returninfo['col']+'row:'+returninfo['row']+'向前移'+'范围是'+rangeFx+'~'+rangeFfx+'finallX:'+finallX;
	
				if(_this.find('.collect-img').attr('data-status') == 'open'){
					
					_thisimg.animate({
						'width':'100%',
						'height':'100%'
					});
					_thisbox.css({
						'display':'none'
					});
	//				message = '关闭';
					_this.find('.collect-img').attr('data-status','close');
				}
				
				
				for (var i = Number(orid)+1; i <= dataid; i++) {
					var nowid = Number(i) - 1;
					$('.collect-item').eq(i).css({
						'left':(nowid % itemWidth) * 25 + '%',
						'top':Math.floor(nowid / 4) *120 + 'px'
					});
				}
				
	
			}else if(finallX > rangeOfx && finallX < rangeFx){
				//判断y轴是否超过限制 是的话还原图片 不显示隐藏盖
				if(finallY < rangeOfy || finallY > rangeFfy){
					if(_this.find('.collect-img').attr('data-status') == 'open'){
						_thisimg.animate({
							'width':'100%',
							'height':'100%'
						});
						_thisbox.css({
							'display':'none'
						});
	//					message = '关闭';
						_this.find('.collect-img').attr('data-status','close');
					}
				}else{
					// 显示隐藏盖
					if(false){
						if(_this.find('.collect-img').attr('data-status') == 'close'){
					
							_thisimg.animate({
								'width':'80%',
								'height':'80%'
							});
							_thisbox.css({
								'display':'flex'
							});
	//						message = '打开';
							_this.find('.collect-img').attr('data-status','open'); 
						}
					}
				}
			}
		}else{
			console.log('123');
		}
	}
	return message;
	
}
//判断位置是在哪个块区域中(x左边，有坐标，窗口宽度，窗口高度，块宽度，块高度)
function area(x,y,windowWidth,windowHeight,itemWidth,itemHeight){
	//计算出间隔
	var col,
		row;
	var jg = windowWidth/itemWidth;
	
	//计算col
	if(x >= 0 && x < jg * 1 ){
		col = 0;
	}else if( x >= jg * 1 && x < jg * 2){
		col = 1;
	}else if( x >= jg * 2 && x < jg * 3){
		col = 2;
	}else if( x >= jg * 3 && x < jg * 4){
		col = 3;
	}else{
		col = 0;
	}
	
	//计算row
	row = Math.floor(y/itemHeight) > 0 ? Math.floor(y/itemHeight) : 0;
	var returninfo = {'col':col,'row':row};
	return returninfo;
}
