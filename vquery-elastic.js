$("extend").extend('elastic', function (json,fn){
    for(var i=0;i<this.elements.length;i++)
    {
        elastic(this.elements[i], json, fn);

    }

    function elastic(obj, json, fn)
    {

        //for ealsticMove
        
        //对于json进行扩充，补充validate的运动完毕探测条件
        var aTem={};
        for(var i in json){

            if(i!='bStop')
            {
                 aTem[i]=json[i];
                 json[i]={};
                 json[i]['value']=parseInt(aTem[i]);
                 json[i]['validate']=true;
                 json[i]['iSpeed']=0;
            }

        }
        //change the frequency
        if(!arguments[3])
        {
            var fre=30;
        }

        else
        {
            fre=arguments[3];
        } 
        // var bStopcount=0;
        clearInterval(obj.timer);
        // for stop(prototype)
        if(json==false)
        {
            clearInterval(obj.timer);
        }
        else
        {
 
         //main movement
            obj.timer=setInterval(function ()
            {
                json.bStop=true;
                for(var attr in json)
                { 
                    if(attr=="bStop")
                    {
                        break;
                    }
                    // //1.取当前的值
                    var iCur=0;
                    if(attr=='opacity')
                    {
                        iCur=parseInt(parseFloat(vQuery.methodSquare.getStyle(obj,attr)*100));
                    }
                    else
                    {
                        iCur=parseInt(vQuery.methodSquare.getStyle(obj,attr));    
   
                    }       
                    //2.算速度
                    if(attr=='opacity')
                    {
                        json[attr]['iSpeed']+=(json[attr]['value']-iCur)/4;
                        json[attr]['iSpeed']*=0.7;

                        json[attr]['iSpeed']=json[attr]['iSpeed']>0?Math.ceil(json[attr]['iSpeed']):Math.floor(json[attr]['iSpeed']);          
                    }
                    else
                    {
                        // console.log(json);
                        // console.log(attr);
                        // console.log(json[attr]['iSpeed']);
                        json[attr]['iSpeed']+=(json[attr]['value']-iCur)/4;
                        json[attr]['iSpeed']*=0.7;
                        json[attr]['iSpeed']=json[attr]['iSpeed']>0?Math.ceil(json[attr]['iSpeed']):Math.floor(json[attr]['iSpeed']);
                    }
                    //3.检测停止
                    //for chrome bug we proceed with special procedure
                    if(attr=='opacity')
                    {
                        if(Math.abs(json[attr].value-iCur)>=8)
                        {
                            json[attr]['validate']=false;
                        }
                       //20150318 update error(opacity)
                    }
                    else
                    {
                        if(Math.abs(json[attr]['iSpeed'])>=2||Math.abs(json[attr].value-iCur)>5)
                        {
                            // console.log(attr);
                            json[attr]['validate']=false;

                        }                      
                    }
                    // //4 主体
                    if(attr=='opacity')
                    {
                        obj.style.filter='alpha(opacity:'+(iCur+json[attr]['iSpeed'])+')';
                        obj.style.opacity=(iCur+json[attr]['iSpeed'])/100;  
                        //for chrome bug     
                        //terminate 
                        if(Math.abs(json[attr]['value']-iCur)<=8)
                        {
     
                            iCur=json[attr]['value'];
                            obj.style.filter='alpha(opacity:'+(iCur+json[attr]['iSpeed'])+')';
                            obj.style.opacity=(iCur+json[attr]['iSpeed'])/100; 
                            json[attr]['validate']=true;  

                        }       
                    }
                    else
                    { 


                        obj.style[attr]=iCur+json[attr]['iSpeed']+'px';
                        //terminate
                        if(Math.abs(json[attr]['iSpeed'])<=2&&Math.abs(json[attr].value-iCur)<5)
                        {

                               obj.style[attr]=json[attr]['value']+'px';  
                            //    console.log(attr);
                               json[attr]['validate']=true;
                               
                        }

                       
                     }
                }
                //对所有运动进行评估
                //  console.log(bStopcount);
                for(var index in json)
                {
                    if(index=="bStop")
                    {

                         break;
                    }
                    if(json[index]['validate']==false)
                    {
                        // console.log("bStop false");
                        // console.log(bStopcount++);
                        json.bStop=false;
                    }

                }
                // console.log(json.bStop);
                if(json.bStop==true)
                {    
                    // console.log("clearInterval");
                    clearInterval(obj.timer);        
                    //chain move
                    if(fn)
                    {
                        fn();
                    }
                }
            }, fre);
        }
    }
    return this;
});