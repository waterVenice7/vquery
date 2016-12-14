
update log
#20150525

更新属性选择器在ie低版本下的兼容性
选择器体系进一步降低耦合，增强代码的可读性与可维护性
缺点：
随着代码量越来越多，命名空间越来越乱
展望：
将不再对ie低版本进行兼容，原因在于ie低版本即将被淘汰，过多的兼容带来了不必要的操作，
从而导致了无法对dom编程进行进一步的改进


#20150530
《1》对if else 进行更改，引入哈弗曼编码的思想，频率高的优先放在前面
《2》缩写if  else  大量采用三目，&&,||
《3》大量缓存length 缓存dom集合
《4》cssText  更改style.top,style.left
《5》while大量替代for遍历
《6》引入hashTable  解决switch  大范围判断问题（其实此时并没有大范围判断，不过不会减慢速度，也算为以后的应用打下基础，嘿嘿）
《7》 addEventListener 采用了高性能javascript的延迟加载技术，也就是一次重写，到处运行，
  此后将不再需要判断
       当然，也可以采用jquery的做法，脚本预加载
遇到的
问题1：
更改的过程中变量命名冲突以及混乱成为非常大的问题，
必须要想到一个合理的解决办法；
问题2：
bStop=false  在&&中要加()
问题3：
主体选择器要偷偷运行一次(finalSelector)
问题3：
有些时候遍历强调顺序，注意

成果：
在ie7测试过程，选取一个深度为509的节点，jquery用了21ms,引入高性能javascript后one.js用了
26ms,以往的版本用了40ms，可以说是性能提升了33%，


#20150531
《1》
主要针对getByClass，selectElements进行更新，引入严格模式，对于ie7下的深度590节点的测试，severalClass
的选取速度已经超越jquery,jquery 用时20 ，one.js 用时9
测试文件 请查看 test/one test/the most complex selector
缺点：作用链调用过于频繁，将会引入json制表减少作用域调用
缺点2：对于大量引用全局变量的情况，将引入局部变量+dom集合缓存技术（也就是零全局变量模式）
缺点3：命名冲突仍旧要解决，预计采用零全局变量的模式》module模式》单全局变量模式

#20150531 
<1>
tagClass severalClass 
修复bug
测试文件 请查看 test/one test/the most complex selector
优点：tagClass severalClass （没有测试后代）
  选取时间是jquery一半
  深度590节点，jquery 20 one.js 9
  原因：初级数组建立在Class上面
总结：性能优化暂时停止，有点累了
缺点仍旧是上面三个

#20150601
<1>
首先祝福各位儿童节快乐，

今天
《1》修复了选择器的bug,对,是tagClass,severalClass,
《2》同时对主体选择器的模块进行了进一步划分，
《3》再次引入module模式，解决了tagClass,attr,severalClass的耦合问题
缺点：仍然不能完美满足所有选择情况，但是呢，我不会再次兼容ie低版本了，
    因为我要学习移动端了，移动端的浪潮将会彻底淹没ie6,7
 缺点2:耦合仍旧很强，我发现我的架构能力也不怎么样
 优点：选取速度不用说了，tagClass,severalClass已经超越jquery(ie7)
    具体请看
    work/one test/selector/speedTest/tagClass
    work/one test/selector/speedTest/severalClass
       大概是jquery选取时间的1/4到1/3之间
       
 #20151001
 update:更新名字为vquery，并且将会引入ieDog类sizzle的选择器

 #20151007
  update:增加delegate方法


#20151009
 update:增加promise-defer



 #20151011
 update:
 $.ajax()支持jsonp


#20151015
update:
《1》this.elements.length=>改写
     this.elements缓存
     主体选择器采用querySelectorAll,不再支持ie6,7
《2》提供分支版本vquery-2=>不再支持ie6,7
      
