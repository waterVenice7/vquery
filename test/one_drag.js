$("extend").extend('drag', function (bSetNew,sClassName,dragStart,dragMove,dragEnd){
	//20150404  update log 增加了drag方法，可以实现自身拖拽还有虚幻拖拽
	//bSetNew =true 代表将会创建一个新的div,false将支持原来div的拖拽
	var i=0;	
	for(i=0;i<this.elements.length;i++)
	{
		drag(this.elements[i],bSetNew,sClassName,dragStart,dragMove,dragEnd);
	}
	function addElements(originObj,sClassName)
	{

		var moveObj=originObj.cloneNode(true);
		moveObj.className=sClassName;
		document.body.appendChild(moveObj);
		return moveObj;
	}
	function drag(originObj,bSetNew,sClassName,dragStart,dragMove,dragEnd)
	{
		originObj.onmousedown=function (ev)
		{	//1 确定拖拽点，没有这一步将无法实现第二步的move
			var oEvent=ev||event;
			$(originObj).absolute();
			var disX=oEvent.offsetX;

			
			var disY=oEvent.offsetY;

			if(bSetNew)
			{
				//创建新的元素，支持虚幻拖拽
				var moveObj=addElements(originObj,sClassName);
			}
			if(moveObj)
			{	
				//给虚幻元素添加自定义样式

				
				//支持h5 drag
			
				if(dragStart)
				{
					dragStart.call(moveObj);
				}
			}

			document.onmousemove=function (ev)
			{

				var oEvent=ev||event;
				//支持h5 drag

				if(dragMove)
				{
					dragMove.call(originObj);
				}
				//默认支持自身拖拽，如果有虚幻元素，改变为虚幻元素
				var	obj=originObj;
				if(moveObj)
				{	
					obj=moveObj;
				}
				obj.style.left=oEvent.clientX-disX+'px';
				obj.style.top=oEvent.clientY-disY+'px';


			};
			
			document.onmouseup=function ()
			{
				//删除虚幻元素，当然了也可以display:none
				if(moveObj)
				{

					$('body').get(0).removeChild(moveObj);
				}
				//支持h5 drag
				if(dragEnd)
				{
					dragEnd.call(originObj);
				}
				document.onmousemove=null;
				document.onmouseup=null;
			};
		};
	}
});