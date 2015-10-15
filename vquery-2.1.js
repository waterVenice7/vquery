/*prominent joker 
This library  focused on addressing compatibility issues  primarily, 
so there is no problem in ie6.7,8
*/

/*
All built-in methods use the module pattern , 
easy to maintain mainSelector module, 
greatly reduce naming conflicts
*/
vQuery.aSlideDom=[];
vQuery.aSlideHeight=[];
vQuery.methodSquare=(function(){
    function myAddEvent(obj,event,fn,cancle)
    {
        if(obj.addEventListener)
        {     
            //引入高性能javascript  减少重复性判断
            var myAddEvent=function(obj,event,fn,cancle)
            {

                obj.addEventListener(event,fn,false);
            }  

        }
        else
        {   
           var  myAddEvent=function(obj,event,fn,cancle)
           {
                obj.attachEvent('on'+event,fn);  
               
           }
        }
         myAddEvent(obj,event,fn,cancle);  
    }
    function myRemoveEvent(obj,event,fn,cancle)
    {
        if(obj.removeEventListener)
        {     
        	
            //引入高性能javascript  减少重复性判断
            var myRemoveEvent=function(obj,event,fn,cancle)
            {
            	
            	
                obj.removeEventListener(event,fn
                ,false);
            }         
        }
        else
        {   
           var  myRemoveEvent=function(obj,event,fn,cancle)
           {
           		
                obj.detachEvent('on'+event,fn);  
           }
        }
         myRemoveEvent(obj,event,fn,cancle); 
    }
    
    function getByClass(oParent,sClass)
    {
       
        var result=[],

           aEle=oParent.getElementsByTagName('*'),
           sClass1=new RegExp(' ' + sClass + ' ', 'i'),
           len=aEle.length;
        //20150523 update 
        while(len--)     
        {
        
                (sClass1.test(' ' + aEle[len].className + ' '))&& result.push(aEle[len]);
            
            
        }
        return result;
    }
    function getStyle(obj,attr)
    {
      
       return  obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
    }
    function getIndex(obj)
    {
        var aBrother=obj.parentNode.children;
        var i=0;  
        var len=aBrother.length;
        for(;i<len;i++)
        {
          if(aBrother[i]==obj)
          {
              return i;
          }
        }
    }
    function startMove(obj, json, fn)
    {
      
        fre=arguments[3]||30;
        //Avoid the cumulative timer cause acceleration problems
        clearInterval(obj.timer);
        //filter the json  
        for(var  index in json)
        {
            json[index]=parseInt(json[index]);

        }
        //for stop(prototype)
        if(json===false)
        {
            clearInterval(obj.timer);
        }
        else
        {    
         //main movement
            obj.timer=setInterval(function ()
            {
                var bStop=true;
                
                for(var attr in json)
                { 
                    //1.acquire the current value
                    var iCur=0;
                    if(attr!='opacity')
                    {
                         iCur=parseInt(vQuery.methodSquare.getStyle(obj,attr));   
                       
                    }
                    else
                    {
                         iCur=parseInt(parseFloat(vQuery.methodSquare.getStyle(obj,attr))*100); 
                    }       
                    //2.cal the speed
              
                    var iSpeed=(json[attr]-iCur)/8;          
                    iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);                        
                    //3.observe and confirm  the terminating circumstance 
                    //for chrome bug we proceed with special procedure
                    if(attr!='opacity')
                    {
                        (iCur!=json[attr])&&(bStop=false);
                      
                    }
                    else
                    {
                        if(Math.abs(json[attr]-iCur)>8)
                        {
                            bStop=false;    
                        }
                       //20150318 update error(opacity)
                        else
                        {
                            
                            iCur=json[attr];
                            obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                            obj.style.opacity=(iCur+iSpeed)/100;     
                        }
                    }
                    //4 main change 
                    if(attr!='opacity')
                    {
                        obj.style[attr]=iCur+iSpeed+'px';
                           
                    }
                    else
                    { 
                        obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                        obj.style.opacity=(iCur+iSpeed)/100;  
                    }
                }
                if(bStop)
                {     
                    clearInterval(obj.timer);        
                    fn&&fn();
                }
            }, fre);
        }
    }
    function oHttp(method,url,data,succ,err)
    {
       var xhr = null;
	   var dfd=$.defer();
	   var succRes=null;
	   var errorRes=null;
	    try {
	        xhr = new XMLHttpRequest();
	    } catch (e) {
	        xhr = new ActiveXObject('Microsoft.XMLHTTP');
	    }
	    
	    if (method == 'get' && data) {
	        url += '?' + data;
	    }
	    
	    xhr.open(method,url,true);
	    /*true  代表异步*/
	    if (method == 'get') {
	        xhr.send();
	    } else {
	        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	        xhr.send(data);
	    }
	    
	    xhr.onreadystatechange = function() {
	        
	        if ( xhr.readyState == 4 ) {
	            if ( xhr.status == 200 ) {
	            	succRes=xhr.responseText;
                   /* console.log(succ);
                    console.log(succRes);*/
	            	(typeof succ==="function")&&(succ(succRes))||(dfd.resolve(succRes));
	                
	            } else {
	            	errorRes=xhr.status;
	            	(typeof err==="function")&&(err(errorRes))||(dfd.reject(errorRes));
	            	
	            }
	        }
	        
	    }
	    return dfd.promise;
    }
    function absolute(obj)
    {
        var left=obj.offsetLeft,
            top=obj.offsetTop;  
        obj.cssText="left="+left+"px;top="+top+'px;';
    }
    function absoluteExtra(obj)
    {
        obj.style.margin='0px';
        obj.style.position='absolute';   
    }

    return {
        'myAddEvent':function(obj,event,fn,cancle){
            myAddEvent(obj,event,fn,cancle);
        },
        'myRemoveEvent':function(obj,event,fn,cancle){
            myRemoveEvent(obj,event,fn,cancle);
        },
        'getByClass':function(oParent,sClass){
            return getByClass(oParent,sClass);
        },
        'getStyle':function(obj,attr){
            return  getStyle(obj,attr);
        },
        'getIndex':function(obj){
            return getIndex(obj);
        },
        //  need to be tested
        'startMove':function(obj,json,fn){
            startMove(obj,json,fn);
        },
        'absolute':function(obj){
            absolute(obj);
        },
        'absoluteExtra':function(obj){
            absoluteExtra(obj);
        },
        "oHttp":function(method,url,data,succ,err)
        {
        	return oHttp(method,url,data,succ,err);
        }
    }
})();
/* mainSelector*/
vQuery.mainSelector=(function(){
    
    //vQuery.mainSelector
    /*  外部接口*/
     var a={
       'finalSelector':function(sMixinSelector,parentNode){
       	    var parentNode=parentNode||document;
       		return parentNode.querySelectorAll(sMixinSelector);
       }
    };
    return a;
})();
vQuery.hashTable={
    'string':function(vArg,elements)
    {
         vArg=vArg.replace(/^\s+|\s+$/g,'');
         this.elements=vQuery.mainSelector.finalSelector(vArg,document); 
    },
    'function':function(vArg){
        window.onload=vArg;

    },
    'object':function(vArg,elements){
        // DOM node (EQ,document), DOM-node array
        if(vArg.length)
        {
            this.elements=vArg;
        }
        else
        {
                   
            this.elements.push(vArg);
        }
    }
}
function vQuery(vArg){
    this.elements=[];   
    var a=(typeof vArg);
    if(vQuery.hashTable.hasOwnProperty(a))
    {
        vQuery.hashTable[a].call(this,vArg);
    }
    this.length=this.elements.length;
   
    
}

function $(vArg)
{
    return new vQuery(vArg);
}
vQuery.prototype.click=function(fn)
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {  
    	temp=this.elements[i];
        vQuery.methodSquare.myAddEvent(temp,'click',fn);
    }
    return this;
}
vQuery.prototype.mousemove=function(fn)
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {  

    	temp=this.elements[i];
        vQuery.methodSquare.myAddEvent(temp,'mousemove',fn);
    }
    return this;
}
vQuery.prototype.animate=function(json,fn)
{   
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    { 
        vQuery.methodSquare.startMove(temp,json,fn);
    } 
    return this;
}
vQuery.prototype.absolute=function()
{   

    var temp=null;
    var temp2=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    { 
    	temp=this.elements[i];
        vQuery.methodSquare.absolute(temp);
    } 
     for(var i=0,len=this.elements.length;i<len;i++)
    { 
    	temp2=this.elements[i];
        vQuery.methodSquare.absoluteExtra(temp2);
    } 
    return this;
}
vQuery.prototype.show=function()
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        temp.style.display='block';
    }
    return this;
}
vQuery.prototype.hide=function()
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        temp.style.display='none';
    }
    return this;
}
vQuery.prototype.fadeOut=function()
{
	var temp=null;
	var temp2=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        vQuery.methodSquare.startMove(temp,{'opacity':0},function(){},80);         
    }
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp2=this.elements[i];
        temp2.style.display='none';
    }
    return this;
}
vQuery.prototype.fadeIn=function()
{  
	var temp=null;
	var temp2=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp2=this.elements[i];
        temp2.style.display='block';
    }
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        vQuery.methodSquare.startMove(temp,{'opacity':100},function(){},80); 
    
    }
    return this;
}
vQuery.prototype.slideUp=function()
{
    var bSLow=arguments[0]; 
    var temp=null;
    if(bSLow=='slow')
    {
        var fre=100;
    }  
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        vQuery.aSlideDom.push(temp);
        vQuery.aSlideHeight.push(parseInt(vQuery.methodSquare.getStyle(temp,'height')));
        vQuery.methodSquare.startMove(temp,{'height':0},function(){},fre); 
        temp.style.diplay='none';
    }
}
vQuery.prototype.slideDown=function()
{
    var bSLow=arguments[0];
    var temp=null;
    var temp2=null;
    if(bSLow)
    {
        var fre=100;
    }
    var target;   
    for(var i=0,len=this.elements.length;i<len;i++)
    {    
    	temp=this.elements[i];
        temp.style.diplay='block';
        for(var j=0,len2=vQuery.aSlideDom.length;j<len2;j++)
        {     
         	temp2=vQuery.aSlideDom[j];   
            if(temp2==temp)
            {
                target=temp2;
            }
        }
        vQuery.methodSquare.startMove(temp,{'height':target},function(){},fre);       
    }
}
vQuery.prototype.hover=function(fn1,fn2)
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    		temp=this.elements[i];
            vQuery.methodSquare.myAddEvent(temp,'mouseover',fn1);
            if(typeof fn2==="function")
            {
                vQuery.methodSquare.myAddEvent(temp,'mouseout',fn2);
            }
            
    }
    return this;
}
vQuery.prototype.css=function(attr,value)
{
    if(arguments.length==2)
    {
    	var temp=null;
        for(var i=0,len=this.elements.length;i<len;i++)
        {
        	temp=this.elements[i];
            if(attr=='opacity')
            {
                temp.style['opacity']=value;
                temp.style['filter']="alpha(opacity:"+value*100+")";

            } 
            else{
                temp.style[attr]=value;
            }
        }
    }
    else
    {
    	var temp=null;
    	
        if(typeof attr=='string')
        {
            var result=[];
            for(var i=0,len=this.elements.length;i<len;i++)
            {
            	temp=this.elements[i];
                result.push(vQuery.methodSquare.getStyle(temp,attr));
            }
            return result;
        }
        else
        {     
        	var temp2=null; 
            for(var i=0,len=this.elements.length;i<len;i++)
            {
                var k='';
                temp2=this.elements[i];
                for(k in attr)
                {      
                    if(k=='opacity')
                    {
                        temp2.style['opacity']=attr[k];
                        temp2.style['filter']="alpha(opacity:"+attr[k]*100+")";

                    } 
                    else{
                        temp2.style[k]=attr[k];
                    }
                    
                }        
            }
        }
    }
    return this;
}
vQuery.prototype.attr=function(attr,value)
{
    if(arguments.length==2)
    {
    	var temp=null;
        for(var i=0,len=this.elements.length;i<len;i++)
        {
        	temp=this.elements[i];
            if(attr=='class')
            {
               temp.className=value;

            }
            else
            {
                temp.setAttribute(attr,value);
            }
            
        }
    }
    else
    {
        var result=[];
        var temp2=null;
        for(var i=0,len=this.elements.length;i<len;i++)
        {
        	temp2=this.elements[i];
            if(attr=='class')
            {
                result.push(temp2['className']);
            }
            else
            {
                 result.push(temp2.getAttribute(attr));
            }          
        }
        return result;
    }
    return this;
}
vQuery.prototype.addClass=function(sClass)
{

	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        temp.className+=+'  '+sClass;

    }
    return this;
}
vQuery.prototype.removeClass=function(sClass)
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        temp.className.replace(sClass,'');          
    }
    return this;
}
vQuery.prototype.toggle=function()
{

    var _arguments=[].slice.call(arguments,0);
    var temp=null; 
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        addClick(temp);
    }
    function addClick(obj)
    { 
        var count=0;
        vQuery.methodSquare.myAddEvent(obj,'click',function(){
            _arguments[count++%_arguments.length].call(obj);
        });  

    }
    return this;
}
vQuery.prototype.eq=function(n)
{
  return $(this.elements[n]);
};
vQuery.prototype.find=function(vArg)
{
 
    var result=[];
    result.push.apply(result,vQuery.mainSelector.finalSelector(vArg,this.elements));
    return $(result);  
}
vQuery.prototype.index=function()
{
    return vQuery.methodSquare.getIndex(this.elements[0]);
}
vQuery.prototype.bind=function(event,fn)
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        vQuery.methodSquare.myAddEvent(temp,event,fn);
    }
}
/*delegate*/
vQuery.prototype.delegate=function(type,event,fn){
	var element=this.elements[0];
	$(element).bind(event,function(ev){
		var oEvent=ev||event;
		var target=ev.target||ev.srcElement;
		var arr=[];
		if(target.nodeName.toLowerCase()===type)
		{
			fn.call(target);

		}
	});
}
vQuery.prototype.off=function(event,fn)
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	 temp=this.elements[i];
    	 vQuery.methodSquare.myRemoveEvent(temp,event,fn);
    }
}
vQuery.prototype.extend=function(method,fn)
{
  
     vQuery.prototype[method]=fn;
};
vQuery.prototype.each=function(fn)
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        fn.call(temp,i,temp);
    }
}
$.each=function(arr,fn)
{
    for(var i=0;i<arr.length;i++)
    {
        fn(i,arr[i]);
    }
}
vQuery.prototype.onscroll=function()
{
    var _arguments=arguments;
    var temp=null;
    var aDown=new Array(this.elements.length);
    var _this=this.elements;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
        aDown[i]=true; 
        temp=this.elements[i];
        vQuery.methodSquare.myAddEvent(temp, 'mousewheel', getNum(i));
        vQuery.methodSquare.myAddEvent(temp, 'DOMMouseScroll', getNum(i));
        function getNum(index)
        {
            function onMouseWheel(ev)
            {
                var oEvent=ev||event;
                aDown[index]=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
                function main()
                {
                   _arguments[index].call(_this[index],aDown[index]);
                };
                main();
                if(oEvent.preventDefault)
                {
                    oEvent.preventDefault();
                }                   
                return false;        
            }
            return onMouseWheel;
        }
    }
} 
vQuery.prototype.stop=function()
{
	var temp=null;
    for(var i=0,len=this.elements.length;i<len;i++)
    {
    	temp=this.elements[i];
        vQuery.methodSquare.startMove(temp,false);
    }
    return this;
}
vQuery.prototype.get=function()
{
    if(arguments[0]===undefined){
        var result=[];
        var temp=null;
        for(var i=0;i<this.elements.length;i++)
        {   
        	temp=this.elements[i];
            result.push(temp);
        }
        return result;
    }
    else if(arguments[0]==0)
    {
        return this.elements[0];
    }
    else if((typeof arguemnts[0]==="number")&&(arguments!=0))
    {
    	return this.elements[arguments[0]];
    }
}

vQuery.prototype.text=function()
{
    if(arguments.length==0)
    {
        var sText='';
        var aChild=this.elements[0].childNodes;
        var temp=null;
        for(var j=0,len=aChild.length;j<len;j++)
        {
        	temp=aChild[j];
            if(temp.nodeType==3)
            {
                sText+=temp.nodeValue;
            }
            else  if(temp.nodeType==1)
            {
                sText+=temp.innerHTML;
            }
        }
        return sText;
    }
    else
    {
        var aChild=this.elements[0].childNodes;
        var temp2=null;
        for(var j=0,len=aChild.length;j<len;j++)
        {
        	temp2=aChild[j];
            if(temp2.nodeType==3)
            { 
               temp2.nodeValue=arguments[0];
            }
            else  if(temp2.nodeType==1)
            {
               temp2.innerHTML=arguments[0];
            }
        }
    } 
    return this;
};
vQuery.prototype.html=function()
{

   if(arguments.length==0)
   {
        return this.elements[0].innerHTML;

   }
   else if(arguments[0]!=undefined)
   {

        this.elements[0].innerHTML=arguments[0];
   }
   return this;
};
vQuery.prototype.val=function()
{
   if(arguments.length==0)
   {
        return this.elements[0].value;

   }
   else
   {
        this.elements[0].value=arguments[0];
   }
   return this;
};
vQuery.prototype.append=function()
{
   
    this.elements[0].innerHTML+=arguments[0]; 
    return this;
};
vQuery.prototype.prepend=function()
{
   
    this.elements[0].innerHTML=arguments[0]+this.elements[0].innerHTML;
    return this;
}
vQuery.prototype.remove=function()
{
   
    var oParent=this.elements[0].parentNode;
    oParent.removeChild(this.elements[0]);
    return this;
}
vQuery.prototype.empty=function()
{
   
    this.elements[0].innerHTML='';
    return this;
}

vQuery.prototype.width=function()
{
   
    return  parseInt(vQuery.methodSquare.getStyle(this.elements[0],'width'));
}
vQuery.prototype.height=function()
{
   
    return  parseInt(vQuery.methodSquare.getStyle(this.elements[0],'height'));
}


vQuery.prototype.innerWidth=function()
{
    var result=0;
    var oSave=["width","paddingLeft","paddingRight"];
    for(var index in oSave)
    {
    	result+=parseInt(vQuery.methodSquare.getStyle(this.elements[0],oSave[index]));

    }
    return  result;
}
vQuery.prototype.innerHeight=function()
{
   
    
    var result=0;
    var oSave=["height","paddingTop","paddingBottom"];
    for(var index in oSave)
    {
    	result+=parseInt(vQuery.methodSquare.getStyle(this.elements[0],oSave[index]));

    }
    return  result;
}

vQuery.prototype.outerWidth=function()
{
    
    var result=0;
    var oSave=["width","paddingLeft","paddingRight","marginLeft","marginRight"];
    for(var index in oSave)
    {
    	result+=parseInt(vQuery.methodSquare.getStyle(this.elements[0],oSave[index]));

    }
    return  result;
}

vQuery.prototype.outerHeight=function()
{
    var result=0;
    var oSave=["height","paddingTop","paddingBottom","marginTop","marginBottom"];
    for(var index in oSave)
    {
    	result+=parseInt(vQuery.methodSquare.getStyle(this.elements[0],oSave[index]));

    }
    return  result;
};

vQuery.prototype.offset=function()
{
   
    var obj=this.elements[0];
    var oPos={'left':0,'top':0};
    while(obj!=null)
    {
        oPos.left+=obj.offsetLeft;
        oPos.top+=obj.offsetTop;
        obj=obj.offsetParent;

    }
    return oPos;
}


vQuery.prototype.position=function()
{
    
    var obj=this.elements[0];
    var oPos={'x':0,'y':0};
    oPos.x+=obj.offsetLeft;
    oPos.y+=obj.offsetTop; 
    return oPos;
}




vQuery.prototype.parent=function()
{
    return $(this.elements[0].parentNode);
  
};

vQuery.prototype.parents=function(filter)
{
    var result=[];
    var obj=this.elements[0];
    
    while(obj.nodeName.toLowerCase()!='html')
    {
        if(filter)
        {
            if(obj.parentNode.nodeName==filter)
            {
                result.push(obj.parentNode);
            }

        }
        else
        {
            result.push(obj.parentNode);
        }
        obj=obj.parentNode;

    }
   return $(result);
};

vQuery.prototype.parentsUntil=function(oUntil)
{
 
    var result=[];
    var obj=this.elements[0];

    while(obj.nodeName.toLowerCase()!=oUntil)
    {
        result.push(obj.parentNode);
        obj=obj.parentNode;

    }
    result.pop();
    return $(result);
};

vQuery.prototype.children=function(sClass)
{
   //childNodes
    var aChild=this.elements[0].childNodes;
    if(sClass)
    {
        var result=[];
        var temp=null;
       
        for(var i=0,len=aChild.length;i<len;i++)
        {
        	temp=aChild[i];
            if(temp.className==sClass)
            {
                result.push(temp);
            }

        }
        return $(result);
    }
    else
    {
        return $(aChild);

    }
};

vQuery.prototype.siblings=function(sPattern){
    var _this=this;
    if(sPattern===undefined)
    {
        
        return  (function(){
                    
                    var oParent=_this.elements[0].parentNode,
                                i=0,
                                aOri=oParent.children,
                                aResult=[],
                                temp=null;
                    for(;i<aOri.length;i++)
                    {
                    	temp=aOri[i];
                        if(temp==_this.elements[0]){
                            continue;
                        }
                        else{
                            aResult.push(aOri[i]);
                        }
                    }
                    return $(aResult);
                    
                })();

    }
    else if(typeof sPattern=='string')
    {
       return   (function()
       			{
                    var oParent=_this.elements[0].parentNode;
                    return $(vQuery.mainSelector.finalSelector(sPattern,oParent));//1
                })();      
    }
}

$.ajax=function(s)
{
   
  var dataType=s.dataType||null;
  var method=s.method||null;
  var url=s.url||null;
  var data=s.data||"";
  var succ=s.success||null;
  var err=s.error||null;
  var jsonp=s.jsonp;
  /*确定不需要*/

  function a(method,url,data,succ,err)
  {
  	// console.log(url);
  	 return vQuery.methodSquare.oHttp(method,url,data,succ,err);
  }
  function b(url,data,succ,err,cb)
  {
    console.log("jsonp");
  	var oScript=document.createElement("script");
  	var oBody=document.body||document.documentElement;
  	oScript.src=url+succ;
    console.log(oScript.src);
  	oBody.appendChild(oScript);
    return true;

  }
  // console.log(dataType);
  return (dataType!=="jsonp")&&(a(method,url,data,succ,err))||(b(url,data,succ,err));
 
};
$.defer=function()
{
	var succStack=[];
	var errStack=[];
	var succ=null;
	var error=null;
	var m= 
	{
		"resolve":function(a)
		{
			if(succStack.length!=0)
			{
				for(var i=0,len=succStack.length;i<len;i++)
				{
					if(i==0)
					{
						succ=succStack[0](a);

					}
					else
					{
						succ=succStack[i](succ);
					}

				}
			}

		},
		"reject":function(b){
			if(errStack.length!=0)
			{
				for(var i=0,len=errStack.length;i<len;i++)
				{
					if(i==0)
					{
						error=errStack[0](b);

					}
					else
					{
						error=errStack[i](error);
					}

				}
			}
		},
		"promise":
		{
			"then":function(c1,c2)
			{
				succStack.push(c1);
				errStack.push(c2);

				return m.promise;
			}
		}
	};
	return m;
}













