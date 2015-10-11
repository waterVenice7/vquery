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
       'finalSelector':function(){

       },
        'firstSelector':function(sMixinSelector,parentNode){
            return  firstselector.process(sMixinSelector,parentNode);
        }
    };
    /*初始化*/
    (function(){
        if(document.querySelectorAll)
        {
          
            a['finalSelector']=function(sMixinSelector,parentNode){
                return parentNode.querySelectorAll(sMixinSelector);
            };
        }
        else
        {
            a['finalSelector']=function(sMixinSelector,parentNode)
            {
                return finalSelector(sMixinSelector,parentNode);
            }
        }
    })();
    /*一次选取接口*/  
    function finalSelector(sSelector,oParent)
    {
       return (function(){
            var splitPattern=/\s+/g;
            //1 make sure we will get the critical words
            var aPrimary=sSelector.split(splitPattern);
            //2 the paramater is establised for saving the selected parentNode 
            var aParentNode=[];
            var len=aPrimary.length;
            var  i=0;
            while(i<len)
            {
                if(i==0)
                {

                     aParentNode[i]=firstSelector.process(aPrimary[i],oParent);
                }
                else
                {
                     var aTem=firstSelector.process(aPrimary[i],aParentNode[i-1]);  
                     aParentNode[i]=aTem;
                }
                i++;
            }
            return aParentNode[aPrimary.length-1];      
        })();      
    }     

    /*二级选取接口*/

    var firstSelector=(function(){
        function process(vArg,oParent0)
        {  
            var result=[];
            // if we can't get the oParent paramater we will proceed with the document dom     
            oParent=oParent0||document;  
            if(firstSelectorJudge.hashSelector.hasOwnProperty(vArg.charAt(0)))
            {
                firstSelectorJudge.hashSelector[vArg.charAt(0)](vArg,oParent,result);
            }
            else
            {
              
                firstSelectorJudge.firstExtra(vArg,oParent,result);
            }        
            return result;
        }
        var firstSelectorJudge={
            "hashSelector":{
                '#':function(oParent,vArg,result)
                    {
                            var aEle=oParent.getElementById(vArg.substring(1));
                            result.push(aEle);
                    },
                ".":function(vArg,oParent,result)
                    {
                            /*  several class 改进*/
                          
                            severalClass.process(vArg,oParent,result);
                    }

            },
            "firstExtra":function(vArg,oParent,result){
                var sAttrPattern=/[\[].+]/;
                if(!Boolean(sAttr=vArg.match(sAttrPattern))){
                    //1 attribute selector 
                    /*tagClass 改进*/
                    tagClass.process(vArg,oParent,result);                   
                }  
                else{    
                    /* selectAttr 改进*/              
                    selectAttr.process(sAttr,vArg,oParent,result);
                   
                }  
            }

        };
        return {
            'process':process
        };
    })();
    /*三级处理接口*/
    /*several Class*/
    var severalClass=(function()
    {

            function process(vArg,oParent,result)
            {
                //1 slice 
        
                var aEle2=vArg.substring(1);

                //2  key words
                var aKeyArr=aEle2.split('.');
                /*one  class return */  
                if(aKeyArr.length==1)
                {
                    result=vQuery.methodSquare.getByClass(oParent,aKeyArr[0]); 
                    return ;

                }        
                //3 use the vQuery.methodSquare.getByClass get the primary arr 
                var aPrimary=null;
                if(oParent!=document)
                {

                   var x=oParent.length;           
                   while(x--)
                   {
                        aPrimary=vQuery.methodSquare.getByClass(oParent[x],aKeyArr[0]);
                        /*focus*/
                        result=process.select(aPrimary,aKeyArr,result);              
                    }           
                }
                else
                {

                    aPrimary=vQuery.methodSquare.getByClass(oParent,aKeyArr[0]); 
                    result=process.select(aPrimary,aKeyArr,result); 
                }
            }
           process.select=function(aPrimary,aKeyArr0,result)
            { 
                
                
                var k=0;
                var len1=aKeyArr0.length;
                var i=0;
                var j;
                
                var len2=aPrimary.length;
                var aKeyArr=[].concat(aKeyArr0);
                for(;k<len1;k++)
                {           
                    aKeyArr[k]=new RegExp(' ' + aKeyArr[k] + ' ', 'i');
                }
                for(;i<len2;i++)
                {      
                    aPrimary[i].verify=true;   
                    j=0;     
                    for(;j<len1;j++)
                    {

                        (!(aKeyArr[j].test(' ' + aPrimary[i].className + ' ')))&&(aPrimary[i].verify=false);
             
                        
                    }   
                      
                }
                while(len2--)
                {    
                   (aPrimary[len2].verify==true)&&process.addElement(aPrimary[len2],result);
                }
                return result;
                     
            }
            process.addElement=function(aPrimary,result)
            {
                result.push(aPrimary);
                aPrimary.removeAttribute('verify');
            }
            return {
                "process":function(vArg,oParent,result){
                    process(vArg,oParent,result);
                }
            }
    })();
    /*tagClass*/
    var tagClass=(function()
    {
            process.addElement=function (aPrimary,result)
            {
                result.push(aPrimary);
                aPrimary.removeAttribute('verify');
            }
           

            function process(vArg,oParent,result)
            {

                //2  key words
                var aKeyArr=vArg.split('.'); 
                //3 use the vQuery.methodSquare.getByClass get the primary arr
                if(oParent!=document)
                {
                   
                    var y=oParent.length,
                        i=0,
                        aPrimary=null;

                    while(i<y)
                    {

                       result=process.select(aKeyArr,oParent[i],result);                  
                       i++;    
                    }
                }
                else
                {         
                    result=process.select(aKeyArr,oParent,result);
                    
                }
              
            }
            process.select=function (aKeyArr0,oParent,result)
            {
              
                if(aKeyArr0.length==1)
                {
                    result=document.getElementsByTagName(aKeyArr0[0]);
                    return result;
                }
              
                var aPrimary=vQuery.methodSquare.getByClass(oParent,aKeyArr0[1]);
               
                var aKeyArr=[].concat(aKeyArr0);
                
                for(var k=1,len=aKeyArr.length;k<len;k++)
                {           
                    aKeyArr[k]=" "+aKeyArr[k]+" ";
                }
                var len2=aPrimary.length;
                var l=0;
                 
                if(aKeyArr.length!=2)
                {
                    var m;
                    for(;l<len2;l++)
                    {
                        aPrimary[l].verify=true; 
                        m=2;
                        for(;m<len;m++)
                        {
                             
                             (((' ' + aPrimary[l].className + ' ').search(aKeyArr[m])==-1))&&(aPrimary[l].verify=false);


                        }
                        if(aPrimary[l].nodeName.toLowerCase()!=aKeyArr[0])
                        {
                            aPrimary[l].verify=false;
                        }
                        (aPrimary[l].verify==true)&&this.addElement(aPrimary[l],result);
                       
                    }
                    

                }
                else
                {   
                    //  nodeType 遍历即可                  
                    for(;l<len2;l++)
                    {
                        aPrimary[l].verify=true; 
                        if(aPrimary[l].nodeName.toLowerCase()!=aKeyArr[0])
                        {
                            aPrimary[l].verify=false;
                        }
                        (aPrimary[l].verify==true)&&this.addElement(aPrimary[l],result);
                       
                    }
                }

                return result;
            }
        return {
            "process":process
        };

    })();
    /*attr*/
    var selectAttr=(function()
    {
            process.part=function (oParent,aPri,aAttr,result,sQuote)
            {

                var aOriEle=oParent.getElementsByTagName(aPri[0]);   
                var len=aOriEle.length;    
                aAttr[0]=aAttr[0].replace(sQuote,'');                          
                if(aAttr.length==1)
                {
                           
                    while(len--)
                    {
                        (aOriEle[len].getAttribute(aAttr[0])!=null)&&result.push(aOriEle[len]);   
                    }
                }
                else  if(aAttr.length>1){       
                    aAttr[1]=aAttr[1].replace(sQuote,'');
                    while(len--)
                    {
                        ((aOriEle[len].getAttribute(aAttr[0])!=null)&&
                            (aOriEle[len].getAttribute(aAttr[0]))==aAttr[1]
                            )&&result.push(aOriEle[len]);         
                    }               
                }
            }
            function process(sAttr,vArg,oParent,result)
            {
                sAttr[0]=sAttr[0].replace('[','');
                sAttr[0]=sAttr[0].replace(']','');
                var aAttr=sAttr[0].split('='),
                            aPri=vArg.split('['),
                            i=0
                            sQuote=/'|"+/g;
                if(oParent instanceof Array)
                {
                    i=oParent.length;

                    while(i--)
                    {
                       
                        process.part(oParent[i],aPri,aAttr,result,sQuote); 
                    }       
                }
                else
                {
                    process.part(oParent,aPri,aAttr,result,sQuote);
                }
                
                
            }
            return {
                "process":process
            }
    })();

    return a;
})();
vQuery.hashTable={
    'string':function(vArg,elements)
    {
         vArg=vArg.replace(/^\s+|\s+$/g,'');
         this.elements=vQuery.mainSelector.finalSelector(vArg,document); //1
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
      for(var i=0;i<this.elements.length;i++)
      {  
            vQuery.methodSquare.myAddEvent(this.elements[i],'click',fn);
      }
    return this;
}
vQuery.prototype.mousemove=function(fn)
{
    for(var i=0;i<this.elements.length;i++)
    {  
        vQuery.methodSquare.myAddEvent(this.elements[i],'mousemove',fn);
    }
    return this;
}
vQuery.prototype.animate=function(json,fn)
{   
    for(var i=0;i<this.elements.length;i++)
    { 
        vQuery.methodSquare.startMove(this.elements[i],json,fn);
    } 
    return this;
}
vQuery.prototype.absolute=function()
{   

    for(var i=0;i<this.elements.length;i++)
    { 
        vQuery.methodSquare.absolute(this.elements[i]);
    } 
     for(var i=0;i<this.elements.length;i++)
    { 
        vQuery.methodSquare.absoluteExtra(this.elements[i]);
    } 
    return this;
}
vQuery.prototype.show=function()
{
      for(var i=0;i<this.elements.length;i++)
      {
            this.elements[i].style.display='block';
    }
    return this;
}
vQuery.prototype.hide=function()
{
      for(var i=0;i<this.elements.length;i++)
      {
        this.elements[i].style.display='none';
      }
    return this;
}
vQuery.prototype.fadeOut=function()
{
    for(var i=0;i<this.elements.length;i++)
    {
        vQuery.methodSquare.startMove(this.elements[i],{'opacity':0},function(){},80);         
    }
    for(var i=0;i<this.elements.length;i++)
    {
        this.elements[i].style.display='none';
    }
    return this;
}
vQuery.prototype.fadeIn=function()
{  
    for(var i=0;i<this.elements.length;i++)
    {
        this.elements[i].style.display='block';
    }
    for(var i=0;i<this.elements.length;i++)
    {
        vQuery.methodSquare.startMove(this.elements[i],{'opacity':100},function(){},80); 
    
    }
    return this;
}
vQuery.prototype.slideUp=function()
{
    var bSLow=arguments[0];  
    if(bSLow=='slow')
    {
        var fre=100;
    }  
    for(var i=0;i<this.elements.length;i++)
    {
        vQuery.aSlideDom.push(this.elements[i]);
        vQuery.aSlideHeight.push(parseInt(vQuery.methodSquare.getStyle(this.elements[i],'height')));
        vQuery.methodSquare.startMove(this.elements[i],{'height':0},function(){},fre); 
        this.elements[i].style.diplay='none';
    }
}
vQuery.prototype.slideDown=function()
{
    var bSLow=arguments[0];
    if(bSLow)
    {
        var fre=100;
    }
    var target;   
    for(var i=0;i<this.elements.length;i++)
    {       
        this.elements[i].style.diplay='block';
        for(var j=0;j<vQuery.aSlideDom.length;j++)
        {          
            if(vQuery.aSlideDom[j]==this.elements[i])
            {
                target=vQuery.aSlideHeight[j];
            }
        }
        vQuery.methodSquare.startMove(this.elements[i],{'height':target},function(){},fre);       
    }
}
vQuery.prototype.hover=function(fn1,fn2)
{
      for(var i=0;i<this.elements.length;i++)
      {
            vQuery.methodSquare.myAddEvent(this.elements[i],'mouseover',fn1);
            if(fn2)
            {
                vQuery.methodSquare.myAddEvent(this.elements[i],'mouseout',fn2);
            }
            
      }
    return this;
}
vQuery.prototype.css=function(attr,value)
{
    if(arguments.length==2)
    {
        for(var i=0;i<this.elements.length;i++)
        {
            if(attr=='opacity')
            {
                this.elements[i].style['opacity']=value;
                this.elements[i].style['filter']="alpha(opacity:"+value*100+")";

            } 
            else{
                this.elements[i].style[attr]=value;
            }
        }
    }
    else
    {
        if(typeof attr=='string')
        {
            var result=[];
            for(var i=0;i<this.elements.length;i++)
            {
                result.push(vQuery.methodSquare.getStyle(this.elements[i],attr));
            }
            return result;
        }
        else
        {      
            for(var i=0;i<this.elements.length;i++)
            {
                var k='';
                for(k in attr)
                {      
                    if(k=='opacity')
                    {
                        this.elements[i].style['opacity']=attr[k];
                        this.elements[i].style['filter']="alpha(opacity:"+attr[k]*100+")";

                    } 
                    else{
                        this.elements[i].style[k]=attr[k];
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
        for(var i=0;i<this.elements.length;i++)
        {
            if(attr=='class')
            {
                this.elements[i].className=value;

            }
            else
            {
                this.elements[i].setAttribute(attr,value);
            }
            
        }
    }
    else
    {
        var result=[];
        for(var i=0;i<this.elements.length;i++)
        {

            if(attr=='class')
            {
                result.push(this.elements[i]['className']);
            }
            else
            {
                 result.push(this.elements[i].getAttribute(attr));
            }          
        }
        return result;
    }
    return this;
}
vQuery.prototype.addClass=function(sClass)
{

    for(var i=0;i<this.elements.length;i++)
    {
        this.elements[i].className+=+'  '+sClass;

    }
    return this;
}
vQuery.prototype.removeClass=function(sClass)
{
    for(var i=0;i<this.elements.length;i++)
    {
        this.elements[i].className.replace(sClass,'');          
    }
    return this;
}
vQuery.prototype.toggle=function()
{

    var _arguments=[].slice.call(arguments,0);
        
    for(var i=0;i<this.elements.length;i++)
    {
        addClick(this.elements[i]);
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
    result.push.apply(result,vQuery.mainSelector.finalSelector(vArg,this.elements));//1
    return $(result);  
}
vQuery.prototype.index=function()
{
    return vQuery.methodSquare.getIndex(this.elements[0]);
}
vQuery.prototype.bind=function(event,fn)
{
    for(var i=0;i<this.elements.length;i++)
    {
        vQuery.methodSquare.myAddEvent(this.elements[i],event,fn);
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
    for(var i=0;i<this.elements.length;i++)
    {
    	 vQuery.methodSquare.myRemoveEvent(this.elements[i],event,fn);
    }
}
vQuery.prototype.extend=function(method,fn)
{
  
     vQuery.prototype[method]=fn;
};
vQuery.prototype.each=function(fn)
{
    for(var i=0;i<this.elements.length;i++)
    {
        fn.call(this.elements[i],i,this.elements[i]);
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
    var aDown=new Array(this.elements.length);
    var _this=this.elements;
    for(var i=0;i<this.elements.length;i++)
    {
        aDown[i]=true; 
        vQuery.methodSquare.myAddEvent(this.elements[i], 'mousewheel', getNum(i));
        vQuery.methodSquare.myAddEvent(this.elements[i], 'DOMMouseScroll', getNum(i));
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
    for(var i=0;i<this.elements.length;i++)
    {
        vQuery.methodSquare.startMove(this.elements[i],false);
    }
    return this;
}
vQuery.prototype.get=function()
{
    if(arguments[0]===undefined){
        var result=[];
        for(var i=0;i<this.elements.length;i++)
        {   
            result.push(this.elements[i]);
        }
        return result;
    }
    else if(arguments[0]==0)
    {
        return this.elements[0];
    }
}

vQuery.prototype.text=function()
{
    if(arguments.length==0)
    {
        var sText='';
        var aChild=this.elements[0].childNodes;
        for(var j=0;j<aChild.length;j++)
        {
            if(aChild[j].nodeType==3)
            {
                sText+=aChild[j].nodeValue;
            }
            else  if(aChild[j].nodeType==1)
            {
                sText+=aChild[j].innerHTML;
            }
        }
        return sText;
    }
    else
    {
        var aChild=this.elements[0].childNodes;
        for(var j=0;j<aChild.length;j++)
        {
            if(aChild[j].nodeType==3)
            { 
               aChild[j].nodeValue=arguments[0];
            }
            else  if(aChild[j].nodeType==1)
            {
                aChild[j].innerHTML=arguments[0];
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
    var result=parseInt(vQuery.methodSquare.getStyle(this.elements[0],'width'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingLeft'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingRight'));
    return  result;
}
vQuery.prototype.innerHeight=function()
{
   
    var result=parseInt(vQuery.methodSquare.getStyle(this.elements[0],'height'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingTop'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingBottom'));
    return  result;
}

vQuery.prototype.outerWidth=function()
{
    var result=parseInt(vQuery.methodSquare.getStyle(this.elements[0],'width'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingLeft'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingRight'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'marginLeft'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'marginRight'));
    return  result;
}

vQuery.prototype.outerHeight=function()
{
   
    var result=parseInt(vQuery.methodSquare.getStyle(this.elements[0],'height'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingTop'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingBottom'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'marginTop'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'marginBottom'));
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
       
        for(var i=0;i<aChild.length;i++)
        {
            if(aChild[i].className==sClass)
            {
                result.push(aChild[i]);
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
                                aResult=[];
                    for(;i<aOri.length;i++)
                    {
                        if(aOri[i]==_this.elements[0]){
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
                    return $(vQuery.mainSelector.firstSelector(sPattern,[oParent]));
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













