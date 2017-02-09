
##特点
* vquery-1.1 兼容性来说还是非常不错，选取速度在ie7下的表现，对于深度为500多的节点，选取速度是jquery(2014-10版本)的2到3倍
* vquery-2  不再兼容ie6,7
* log 表记录了最近一段时间的成长。

###focus:
* 本人目前也只是在学习阶段，欢迎指教，哦，对了，有兴趣的话可以看一下源码，本人目前还没有借鉴jquery的写法，
主要来说是从《javascript设计模式》，《编写可维护的javascript》,《高性能javascipt》中获得的启示


## api:
###1
* <pre><code> $()
 $('div')
 $('#div1')
 $('.box')
 $('div.box1.box2......');
 $('.pox1.pox2............')
 $('#div1 .pox2.pox3.pox4 .box2.box3.box4');
 $('div[name=“jason”]');</code></pre>
*  总结支持id,class,tagname,以及多个class,tagname与class复合形式，支持后代选择器,支持属性选择器

###2
* <pre><code>$('#div1').click()</code></pre>

###3
* <pre><code>$('#div1').hover()</code></pre>;

### 4
* $('#div1').animate(json,fn)
* <pre><code>$('#div1')animate({'width':'500px,'opacity':70,'top':'30px'},function(){alert('ok');})</code></pre>
*  注意top,left运动的前提是本身有pos:rea或者pos:abs

### 5
* <pre><code>$('#div1').show()</code></pre>

### 6
* <pre><code>$('#div1').hide()</code></pre>

### 7
*  <pre><code>$('#div1').fadeIn()</code></pre>

### 8
*  <pre><code> $('#div1').fadeOut() </code></pre>

### 9
* <pre><code>$('#div1')slideUp()</code></pre>

### 10
* <pre><code>$('#div1').slideDown()
</code></pre>

### 11
* <pre><code>$('#div1').css()</code></pre>

### 12
* <pre><code>* $('#div1').attr()</code></pre>

### 13
* toggle
* For instance:
<pre><code>$('#div1').toggle(fn1,fn2,fn3);</code></pre>
三个函数会在点击div的时候依次执行

### 14
* <pre><code>$('#div1').eq()</code></pre>

### 15
* <pre><code>$('#div1').find()</code></pre>

### 16
 * <pre><code>$('#div1').index()</code></pre>

### 17
* bind()
* For instance:
* <pre><code>
$('#div1').bind('click',fn);
 </code></pre>

### 18
* each
* 遍历dom节点
* For instance:
* 
<pre><code> $('div').each(function(index,value){
   $(this).click(function{
     alert(index);
   });
})
</code></pre>

### 19
* $.each()
* 遍历数组
* For instance:
* <pre><code>$.each(arr1,function(index,value){
    alert(index);
});
</code></pre>

### 20
* onscroll()
* For instance:
*<pre> <code>
    $('div').onscroll(function(bStop){
       if(bStop)
        {
         console.log('mouse down');
        }
        else
       {
         console.log('mouse up');
        }
    },fn2,fn3.....);
</code></pre>
* fn2,fn3使用效果跟第一个相同，传入的第一个参数代表鼠标向下滚动

### 21
* stop()
* For instance:
* <pre><code> $('#div1').stop() </code></pre>;
* 可以把正在进行的动作停止



------------------------------------------------------------------
###### 22 到最后的api不支持多个元素的操作，支持单个元素
***********************************

### 22
* <pre><code> $('#div1').text(); </code></pre>

### 23
* <pre> <code> $('#div1').html();</code></pre>


### 24
* <pre><code> $('#input1').val(); </code></pre>

### 25
* <pre><code> $('#div1').append(); </code></pre>

### 26
* <pre><code> $('#div1').prepend();</code></pre>

### 27
* <pre><code>  $('#div1').remove();</code></pre>

### 28
* <pre><code> $('#div1').empty();<code></pre>


### 29
* <pre><code> $('#div1').width();</code></pre>

### 30
* <pre><code> $('#div1').height();</code></pre>

### 31
* <pre><code>$('#div1').innerHeight();</code></pre>

### 32
* <pre><code> $('#div1').innerWidth;</code></pre>

### 33
* <pre><code> $('#div1').outerWidth;</code></pre>

### 34
* <pre><code>$('#div1').outerHeight();</code></pre>

### 35
* <pre><code>$('#div1').parent();</code></pre>

### 36
* <pre><code>$('#div1').parents();</code></pre>

### 37
* <pre><code> $('#div1').parentsUntil('body');</code></pre>

### 38
* <pre><code>$('#div1').children('p');</code></pre>

### 39
* ajax
* for instance:
* <pre>
<code>
$.ajax('get','2.php','x=123&y=456',function(result)
{
    console.log(result);
});
</code>
</pre>

### 40
* aboslute

* <pre><code>$('div').absolute();</code></pre>
* 可以更改非绝对定位为绝对定位，满足运动的先期条件，
较少重排

### 41
* siblings

### 42
* promise-defer

### 43
* delegate








