function getByClass(oParent,sClass)
{
    var result=[];
    var aEle=oParent.getElementsByTagName('*');
	var sClass1='\\b'+sClass+'\\b';
	for(var i=0;i<aEle.length;i++)
	{
		if(aEle[i].className.search(sClass1)!=-1)
		{
			result.push(aEle[i]);
		}
	}
    return result;
}
function selectElements(aPrimary,aKeyArr,result,iStart)
{	
    //4 strict key words
    for(var k=iStart;k<aKeyArr.length;k++)
    {           
   	 	  aKeyArr[k]='\\b'+aKeyArr[k]+'\\b';
    }
    //5 遍历得到所要的事物
    for(var i=0;i<aPrimary.length;i++)
    {    
     	  aPrimary[i].verify=true;       	
   	 	  for(var j=iStart;j<aKeyArr.length;j++)
   	 	  {
   	 		    if(aPrimary[i].className.search(aKeyArr[j])==-1)
   	 		    {
            	 aPrimary[i].verify=false;
   	 		    }
   	    }       
    }
    //6  根据verify  push到我们想要的数组中去
    for(var i=0;i<aPrimary.length;i++)
    {    
    	  if(aPrimary[i].verify==true)
        {
     		    result.push(aPrimary[i]);
        }       
    }
}
function first(vArg,oParent)
{  
    var result=[];
    //为了解决父级限制问题，因为采用document不太可信
    if(!Boolean(oParent))
    {
    	  oParent=document;
    }
    switch(vArg.charAt(0))
    {
       	case '#':
           	var aEle=document.getElementById(vArg.substring(1));
           	result.push(aEle);
       	break;
       	case '.':     
       	    //1 slice    
            var aEle2=vArg.substring(1);
            //2  key words
            var aKeyArr=aEle2.split('.');          
            //3 use the getByClass get the primary arr
            if(oParent!=document)
            {
            	//进行了后代选择
                for(var x=0;x<oParent.length;x++)
                {
                	  var aPrimary=getByClass(oParent[x],aKeyArr[0]);
                	  selectElements(aPrimary,aKeyArr,result,0);	            	
                }           
            }
            else
            {
            	  var aPrimary=getByClass(oParent,aKeyArr[0]);
            	  selectElements(aPrimary,aKeyArr,result,0);
            }
       	break;
        default:
            //2  key words
            var aKeyArr=vArg.split('.');            
            //3 use the getByClass get the primary arr
            if(oParent!=document)
            {
        		    for(var y=0;y<oParent.length;y++)
        		    {
        			     var aPrimary=oParent[y].getElementsByTagName(aKeyArr[0]);
        			     selectElements(aPrimary,aKeyArr,result,1);       			
        		    }
            }
            else
            {
            	 //document
        		    var aPrimary=oParent.getElementsByTagName(aKeyArr[0]);
        		    selectElements(aPrimary,aKeyArr,result,1); 
            }           
        break;
    }
    return result;
}
function final(vArg)
{
	var splitPattern=/\s+/g;
	//1 确定子父级
	var aPrimary=vArg.split(splitPattern);
	//2 建立新的数组，保存每个父级
	var aParentNode=[];
	//3 调用first函数进行分割查找，利用aParentNode代替document，减少遍历次数
	for(var i=0;i<aPrimary.length;i++)
	{
      if(i==0)
      {
  		 	  aParentNode[i]=first(aPrimary[i]);
      }
      else
      {
       	  var aTem=first(aPrimary[i],aParentNode[i-1]);
       		aParentNode[i]=aTem;
      }
	}
	return aParentNode[aPrimary.length-1];
}