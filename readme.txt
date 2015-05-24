//首先还是声明一下，这个库是为了练习，不是为了引用
                          是为了架构，不是为了细节，
evaluation:
所以如果有架构方面的建议，可以共同学习
模块化，降低耦合，命名空间的冲突解决，是前段时间的学习重点，所以也是解决重点
性能方面我不敢说，但是兼容性还是非常不错的

所以下一个阶段将会引用其他库的性能经验，相信对于基础还可以的我，还是挺简单的。
focus:
本人目前也只是在学习阶段，欢迎指教

focus2:
Everything will flow,technology is only the beginning
//1
$()
$('div')
$('#div1')
$('.box')
$('div.box1.box2......');
$('.pox1.pox2............')
$('#div1 .pox2.pox3.pox4 .box2.box3.box4');
$('div[name=“jason”]');
//总结支持id,class,tagname,以及多个class,tagname与class复合形式，支持后代选择器
//支持属性选择器
//2
click
same as jquery

//3
hover
same as jquery

//4
animate(json,fn)


For instance:
animate({'width':'500px,'opacity':70,'top':'30px'},function(){alert('ok');})
//注意top,left运动的前提是本身有pos:rea或者pos:abs

//5
show
same as jquery
//6
hide
same as jquery
//7
fadeIn
same as jquery
//8
fadeOut
same as jquery
//9
slideUp
same as jquery
//10
slideDown
same as jquery
//11
css
same as jquery
//12
attr
same as jquery
//13
toggle
For instance:
$('#div1').toggle(fn1,fn2,fn3);
//三个函数会在点击div的时候依次执行


///////////////////////dom节点
//14
eq()
same as jquery

//15
find()
same as jquery

////////
16
index()
same as jquery

//17
bind()
For instance:
$('#div1').bind('click',fn);
//attention: 不要加hover那是我封的，不是系统自带的
//18
each
//遍历dom节点
For instance:$('div').each(function(index,value){

   $(this).click(function{
     alert(index);
   });
})

//19
$.each()
//遍历数组
For instance:$.each(arr1,function(index,value){

   alert(index);
});

//20
onscroll()
For instance:
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
//fn2,fn3使用效果跟第一个相同，传入的第一个参数代表鼠标向下滚动

//21
stop()
For instance:
$('#div1').stop();
//可以把正在进行的动作停止
//22
$('#div1').text();
//same as jquery
//不支持多个元素的获取还有修改
//23
$('#div1').html();
//same as jquery
//不支持多个元素的获取还有修改
//24
$('#input1').val();
//same as jquery
//不支持多个元素的获取还有修改
//25
$('#div1').append();
//same as jquery
//不支持多个元素的获取还有修改
//26
$('#div1').prepend();
//same as jquery
//不支持多个元素的获取还有修改
//27
$('#div1').remove();
//same as jquery
//不支持多个元素的获取还有修改
//28
$('#div1').empty();
//same as jquery
//不支持多个元素的获取还有修改
//29
$('#div1').width();
//same as jquery
//30
$('#div1').height();
//same as jquery
//31
$('#div1').innerHeight();
//32
$('#div1').innerWidth;
//33
$('#div1').outerWidth;
//34
$('#div1').outerHeight();
//35
$('#div1').parent();
//36
$('#div1').parents();
//37
$('#div1').parentsUntil('body');
//38
$('#div1').children('ss');
//39
$.ajax('get','2.php','x=123&y=456',function(result)
{
    console.log(result);
});
//40
aboslute
$('div').absolute;
可以更改非绝对定位为绝对定位，满足运动的先期条件，
较少重排
//41
siblings
same as jquery







