// prominent joker 
//This library  focused on addressing compatibility issues  primarily, 
//so IE6,7,8 haven't  problems

//20150330 update log  
//completed iterations for find,attr updated compatibility operating smoothly
////20150401 update addClass removeClass method
//20150402 update log 
// Added filter in CSS (IE8 and below) setting, but if you want to
// Gets the filter (IE8 and below), you need to set up a opacity:filter/100 then obtained by opacity
// Because it is not necessary, forgive me for being lazy
//20150402 update log 
//Increases the absolute method, used to facilitate the movement of action
//20150404  update log 
//Added drag plug-in, can realize their own drag there unreal drag
//20150404  update log 
//Trying to update the position,offset method successfully updated
//20150502  update log 
//Update animate JSON filter
//20150508  update  log
/*
All built-in methods use the module pattern , 
easy to maintain mainSelector module, 
greatly reduce naming conflicts
*/
/*

support    simple attribute selectors
This is, of course, compatible with IE6,7
Otherwise I would not have got so tired

*/
/*
  support the single element which can get its siblings

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
                obj.addEventListener(event,function(ev)
                {
                    // console.log(fn);
                    ev=ev||window.event;  
                    cancle&&ev.stopPropagation();               
                    (fn.call(obj)==false)&&ev.preventDefault();
                },false);
            }         
        }
        else
        {   
           var  myAddEvent=function(obj,event,fn,cancle)
           {
                obj.attachEvent('on'+event,function(ev)
                {
                    ev=ev||window.event;
                    cancle&&(ev.cancelBubble=true);
                    //ie       
                    if(fn.call(obj)==false)
                    {
                        return false;           
                    }
                });  
           }
        }
    }
    function myRemoveEvent(obj,event,fn,cancle)
    {
        if(obj.removeEventListener)
        {     
            //引入高性能javascript  减少重复性判断
            var myRemoveEvent=function(obj,event,fn,cancle)
            {
                obj.removeEventListener(event,function(ev)
                {
                    // console.log(fn);
                    ev=ev||window.event;  
                    cancle&&ev.stopPropagation();               
                    (fn.call(obj)==false)&&ev.preventDefault();
                },false);
            }         
        }
        else
        {   
           var  myRemoveEvent=function(obj,event,fn,cancle)
           {
                obj.detachEvent('on'+event,function(ev)
                {
                    ev=ev||window.event;
                    cancle&&(ev.cancelBubble=true);
                    //ie       
                    if(fn.call(obj)==false)
                    {
                        return false;
                    }
                                
                });  
           }
        }
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
                    //chain move
                    fn&&fn();
                }
            }, fre);
        }
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
        'myAddEvent':function(obj,event,fn){
            myAddEvent(obj,event,fn);
        },
        'myRemoveEvent':function(obj,event,fn){
            myRemoveEvent(obj,event,fn);
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
        }
    }
})();

vQuery.mainSelector=(function(){
    
    //vQuery.mainSelector
    /*  外部接口*/
     var a={
       'finalSelector':function(){

       },
        'firstSelector':function(sMixinSelector,parentNode){
            return  firstSelector(sMixinSelector,parentNode);
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
    /*  用于处理后代选择器分割后的情况，对字符串进行二级判断*/
     var hashSelector={
        '#':function(oParent,vArg,result)
            {
                    var aEle=oParent.getElementById(vArg.substring(1));
                    result.push(aEle);
            },
        ".":function(vArg,oParent,result)
            {
                    severalClass(vArg,oParent,result);
            }


    };
   
   
    
    function selectAttrPart(oParent,aPri,aAttr,result,sQuote)
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
    function selectAttr(sAttr,vArg,oParent,result)
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
                selectAttrPart(oParent[i],aPri,aAttr,result,sQuote); 
            }       
        }
        else
        {
            selectAttrPart(oParent,aPri,aAttr,result,sQuote);
        }
        
        
    }
     function addElement(aPrimary,result)
    {
        result.push(aPrimary);
        aPrimary.removeAttribute('verify');
    }
    function tagClass(vArg,oParent,result)
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
                /*focus*/
               result=tagClassSelect(aKeyArr,oParent,result);
              
               i++;    
            }
        }
        else
        {
            /*focus*/
            result=tagClassSelect(aKeyArr,oParent,result);
            
        }
      
    }
    function tagClassSelect(aKeyArr,oParent,result)
    {
        /*k len*/
        var aPrimary=vQuery.methodSquare.getByClass(oParent,aKeyArr[1]);
        for(var k=1,len=aKeyArr.length;k<len;k++)
        {           
            aKeyArr[k]=new RegExp(' ' + aKeyArr[k] + ' ', 'i');
        }
        /* len2 l m*/
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
                     
                     (!(aKeyArr[m].test(' ' + aPrimary[l].className + ' ')))&&(aPrimary[l].verify=false);

                }
                if(aPrimary[l].nodeName.toLowerCase()!=aKeyArr[0])
                {
                    aPrimary[l].verify=false;
                }
                (aPrimary[l].verify==true)&&addElement(aPrimary[l],result);
               
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
                (aPrimary[l].verify==true)&&addElement(aPrimary[l],result);
               
            }
        }

        return result;
    }
    function severalClass(vArg,oParent,result)
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
                result=severalClassSelect(aPrimary,aKeyArr,result);              
            }           
        }
        else
        {

            aPrimary=vQuery.methodSquare.getByClass(oParent,aKeyArr[0]); 

            /*focus*/
          
            result=severalClassSelect(aPrimary,aKeyArr,result); 
        }
    }
    function severalClassSelect(aPrimary,aKeyArr,result)
    { 
        
        
        var k=0;
        var len1=aKeyArr.length;
        var i=0;
        var j;
        
        var len2=aPrimary.length;

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
           (aPrimary[len2].verify==true)&&addElement(aPrimary[len2],result);
        }
        return result;
             
    }
   
    function firstSelector(vArg,oParent0)
    {  
        var result=[];

        // if we can't get the oParent paramater we will proceed with the document dom     
        oParent=oParent0||document;  
        if(hashSelector.hasOwnProperty(vArg.charAt(0)))
        {
            hashSelector[vArg.charAt(0)](vArg,oParent,result);
        }
        else
        {
          
            firstExtra(vArg,oParent,result);
        }        
        return result;
    }
    function firstExtra(vArg,oParent,result)
    {
        var sAttrPattern=/[\[].+]/;
        if(!Boolean(sAttr=vArg.match(sAttrPattern))){
            //1 attribute selector 
           
            tagClass(vArg,oParent,result);                   
        }  
        else{                  
            selectAttr(sAttr,vArg,oParent,result);
           
        }  
    }
      
    function finalSelector(sSelector,oParent)
    {
       return (function(){
            var splitPattern=/\s+/g;
            //1 make sure we will get the critical words
            var aPrimary=sSelector.split(splitPattern);
            //alert(aPrimary instanceof Array);
            //2 the paramater is establised for saving the selected parentNode 
            var aParentNode=[];
            //we will use the firstSelector function for split,and proceed with the aParentNode to decline the
            //time
            var len=aPrimary.length;
            var  i=0;
            while(i<len)
            {
                if(i==0)
                {
                     aParentNode[i]=firstSelector(aPrimary[i],oParent);
                }
                else
                {
                     var aTem=firstSelector(aPrimary[i],aParentNode[i-1]);  
                     aParentNode[i]=aTem;
                }
                i++;
            }
            return aParentNode[aPrimary.length-1];      
        })();      
    }     
    return a;
})();
//LayoutTransform is mainly used for layout is converted to an absolute, 
//for sports action

//layoutTransform  is over
//vQuery.methodSquare.startMove

//vQuery.methodSquare.startMove  over
//vquery 
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
            //alert(vArg.length);       
            this.elements.push(vArg);
        }
    }
}
function vQuery(vArg){
    this.elements=[];   
    var a=(typeof vArg);///yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
    if(vQuery.hashTable.hasOwnProperty(a))
    {
        vQuery.hashTable[a].call(this,vArg);
    }
    this.length=this.elements.length;
    //write (this.length) here isn't a standard method ,
    //but if we don't do in this way
    //we will find the length that equals to zero
}
//vquery over
//$()
function $(vArg)
{
    return new vQuery(vArg);
}
//$() over
//click
vQuery.prototype.click=function(fn)
{
      for(var i=0;i<this.elements.length;i++)
      {  
            vQuery.methodSquare.myAddEvent(this.elements[i],'click',fn);
      }
    return this;
}
//mousemove
vQuery.prototype.mousemove=function(fn)
{
    for(var i=0;i<this.elements.length;i++)
    {  
        vQuery.methodSquare.myAddEvent(this.elements[i],'mousemove',fn);
    }
    return this;
}
//click over
//animate
vQuery.prototype.animate=function(json,fn)
{   
    for(var i=0;i<this.elements.length;i++)
    { 
        vQuery.methodSquare.startMove(this.elements[i],json,fn);
    } 
    return this;
}
//animate over
//absolute
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
//absolute over
//show
vQuery.prototype.show=function()
{
      for(var i=0;i<this.elements.length;i++)
      {
            this.elements[i].style.display='block';
    }
    return this;
}
//show over
//hide 
vQuery.prototype.hide=function()
{
      for(var i=0;i<this.elements.length;i++)
      {
        this.elements[i].style.display='none';
      }
    return this;
}
//hide over
//fadeOut
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
//fadeIn
vQuery.prototype.fadeIn=function()
{    //20150318 update fadeIn fadeOut add the show hide action 
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
//over
//slideUp
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
//over
//slideDown
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
//over
//hover 
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
//hover over
// css
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
       //If it is a string, the original unchanged, 
       //if it is object,for to loop through adding
        if(typeof attr=='string')
        {
            var result=[];
            for(var i=0;i<this.elements.length;i++)
            {
                result.push(vQuery.methodSquare.getStyle(this.elements[i],attr));
                //Unfortunately we are not allowed to access filter 
                //(IE8 and below to set opacity and opacity To get the transparency)
            }
            return result;
        }
        else
        {      
            for(var i=0;i<this.elements.length;i++)
            {
                //loop the json
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
//css over
//get attribute
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
        //get attribute
        var result=[];
        //Taking into account the multiple properties of the element gets, 
        //in fact, not necessary
        for(var i=0;i<this.elements.length;i++)
        {
            //Taking into account the compatibility of the class
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
//get attribute over 
//20150401 update addClass removeClass
//addClass
vQuery.prototype.addClass=function(sClass)
{

    for(var i=0;i<this.elements.length;i++)
    {
        this.elements[i].className+=+'  '+sClass;

    }
    return this;
}
//addClass over
//removeClass 
vQuery.prototype.removeClass=function(sClass)
{
    for(var i=0;i<this.elements.length;i++)
    {
        this.elements[i].className.replace(sClass,'');          
    }
    return this;
}

//removeClass over
//single dom attach several event
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
//click attach several events over 
//based by the index ,we will find the element
vQuery.prototype.eq=function(n)
{
  return $(this.elements[n]);
};
//eq  over 
// Find consistent  child nodes
vQuery.prototype.find=function(vArg)
{
 
    var result=[];
    result.push.apply(result,vQuery.mainSelector.finalSelector(vArg,this.elements));//1
    return $(result);  
}
//Finding child nodes is complete
//Determine the location of a bunch of DOM nodes
vQuery.prototype.index=function()
{
    return vQuery.methodSquare.getIndex(this.elements[0]);
}
//index  is over 
//attachEvent
vQuery.prototype.bind=function(event,fn)
{
    for(var i=0;i<this.elements.length;i++)
    {
        vQuery.methodSquare.myAddEvent(this.elements[i],event,fn);
    }
}
//attachEvent over 
//detachEvent 
vQuery.prototype.off=function(event,fn)
{
    for(var i=0;i<this.elements.length;i++)
    {
        vQuery.methodSquare.myRemoveEvent(this.elements[i],event,fn);
    }
}
//detachEvent Over
//initiate the extend part
// open Plug-in 
vQuery.prototype.extend=function(method,fn)
{
  
     vQuery.prototype[method]=fn;
};
//plug-in over
//loop the dom elements
vQuery.prototype.each=function(fn)
{
    //var result=[];
    for(var i=0;i<this.elements.length;i++)
    {
        fn.call(this.elements[i],i,this.elements[i]);
    }
}

//traverse the array
$.each=function(arr,fn)
{
    for(var i=0;i<arr.length;i++)
    {
        fn(i,arr[i]);
    }
}
//traverse the array over 
//onscroll 
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
                // alert(aDown[index]);
                //检测添加是否成功
                //开始主体操作函数（）
                function main()
                {
                  //2015,3,16更新
                   _arguments[index].call(_this[index],aDown[index]);
                };
                main();
                //阻止默认行为
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
//return aDown;
//scroll over 
//stop the animate 
vQuery.prototype.stop=function()
{
    for(var i=0;i<this.elements.length;i++)
    {
        vQuery.methodSquare.startMove(this.elements[i],false);
    }
    return this;
}
// get the dom 
vQuery.prototype.get=function()
{
    //1  don't transport the parameter
    if(arguments[0]===undefined){
        var result=[];
        for(var i=0;i<this.elements.length;i++)
        {   
            result.push(this.elements[i]);
        }
        return result;
    }
    //2 get the parameter 0 
    else if(arguments[0]==0)
    {
        return this.elements[0];
    }
}
/*
20150330-based modular segmentation, jQuery HTML
20150331 is expected to support    more than one element
From here we tacitly support   s only a single element
*/
//1 text()  single element
vQuery.prototype.text=function()
{
    if(arguments.length==0)
    {
        //get text
        var sText='';
        var aChild=this.elements[0].childNodes;
        for(var j=0;j<aChild.length;j++)
        {
            if(aChild[j].nodeType==3)
            {
                //textNode
                sText+=aChild[j].nodeValue;

            }
            else  if(aChild[j].nodeType==1)
            {

                //tagNode 
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
                //textnode 
               aChild[j].nodeValue=arguments[0];

            }
            else  if(aChild[j].nodeType==1)
            {

                //tagNode 
                aChild[j].innerHTML=arguments[0];
            }
        }
    } 
    return this;
}
//2 html  single element
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
}
//3 val  single element
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
}
//append  single element
vQuery.prototype.append=function()
{
   
    this.elements[0].innerHTML+=arguments[0]; 
    return this;
}
//prepend  single element
vQuery.prototype.prepend=function()
{
   
    this.elements[0].innerHTML=arguments[0]+this.elements[0].innerHTML;
    return this;
}
//remove  single element
vQuery.prototype.remove=function()
{
   
    var oParent=this.elements[0].parentNode;
    oParent.removeChild(this.elements[0]);
    return this;
}


//empty  single element
vQuery.prototype.empty=function()
{
   
    this.elements[0].innerHTML='';
    return this;
}
//width height  support    single element
vQuery.prototype.width=function()
{
   
    return  parseInt(vQuery.methodSquare.getStyle(this.elements[0],'width'));
}
vQuery.prototype.height=function()
{
   
    return  parseInt(vQuery.methodSquare.getStyle(this.elements[0],'height'));
}

//innerWidth innerHeight  support    single element
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
//   support   single element
vQuery.prototype.outerWidth=function()
{
    var result=parseInt(vQuery.methodSquare.getStyle(this.elements[0],'width'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingLeft'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingRight'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'marginLeft'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'marginRight'));
    return  result;
}
//single element
vQuery.prototype.outerHeight=function()
{
   
    var result=parseInt(vQuery.methodSquare.getStyle(this.elements[0],'height'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingTop'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'paddingBottom'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'marginTop'))
    +parseInt(vQuery.methodSquare.getStyle(this.elements[0],'marginBottom'));
    return  result;
};
//vquery position update 20150404
vQuery.prototype.offset=function()
{
    //1 Actions do not support multiple elements, 
    //so for a single element, and only returns the last operation
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

//position update over

//vquery offset update
vQuery.prototype.position=function()
{
     //1 Actions do not support multiple elements, 
    //so for a single element, and only returns the last operation
    var obj=this.elements[0];
    var oPos={'x':0,'y':0};
    oPos.x+=obj.offsetLeft;
    oPos.y+=obj.offsetTop; 
    return oPos;
}

//offset update over


//vquery loop 
//parent  support   single element 
vQuery.prototype.parent=function()
{
    return $(this.elements[0].parentNode);
  
};
//parents  support   single element
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
//parentsUntil  support   single element
vQuery.prototype.parentsUntil=function(oUntil)
{
    //get ParentNode until the oUntil parameter 
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
//children  single element
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
//siblings  support the single  element
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
    else if(typeof sPattern=='string'){
       return   (function(){
                    var oParent=_this.elements[0].parentNode;
                    return $(vQuery.mainSelector.firstSelector(sPattern,[oParent]));
                })();      
    }
}
// Temporary absence of the sibling, f
//forgive me, 11 o'clock at night I can't going on 
//ajax
$.ajax=function(method, url, data, success)
{
   //support   jquery  ajax
   var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    if (method == 'get' && data) {
        url += '?' + data;
    }
    
    xhr.open(method,url,true);
    if (method == 'get') {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    
    xhr.onreadystatechange = function() {
        
        if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
                success && success(xhr.responseText);
            } else {
                alert('出错了,Err：' + xhr.status);
            }
        }
        
    }

};














