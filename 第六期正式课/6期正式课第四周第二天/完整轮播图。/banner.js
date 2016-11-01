
(function(){
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oBox.getElementsByTagName('li');
    var aA=oBox.getElementsByTagName('a');
    var step=0;
   var data=null
    getData()
    function  getData(){
        var xml=new XMLHttpRequest
        xml.open('get','data.txt?='+Math.random(),false);
        xml.onreadystatechange=function(){
            if(xml.readyState===4&&/^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText)
            }
        }
        xml.send();
    }
    bind()
function bind(){
    var  str1="";
    var  str2="";
    for(var i=0;i<data.length;i++){
        str1+='<div><img realImg="'+data[i].imgSrc+'" alt=""/></div>'
        str2+=i===0?'<li class="bg"></li>':'<li></li>'
    }
    str1+='<div><img realImg="'+data[0].imgSrc+'" alt=""/></div>'
    oBoxInner.innerHTML=str1
    oUl.innerHTML=str2
 oBoxInner.style.width=aDiv.length*aDiv[0].offsetWidth+'px';
}
   setTimeout(lazyImg,1000)
    lazyImg()
    function lazyImg(img){
        for(var i=0;i<aImg.length;i++){
            var tmpImg=new Image;
            tmpImg.src=aImg[i].getAttribute('realImg');
            tmpImg.index=i;
            tmpImg.onload=function(){
                aImg[this.index].src=this.src
                tmpImg=null;
            }
        }
    }
    //1）图片自动轮播
    clearInterval(autoTimer);
    var autoTimer=setInterval(autoMove,1000);
    function autoMove(){
        if(step>=aDiv.length-1){
            step=0;
            utils.css(oBoxInner,'left',-step*1000);
        }
        step++;
        //utils.css(oBoxInner,'left',-step*1000)
        //小技巧：在使用运动库前，先写好效果，再加运动
        zhufengAnimate(oBoxInner,{left:-step*1000},500,0);
        bannerTip();
    }
    //2）圆按钮也是自动轮播
    function bannerTip(){
        //var tmpStep=step>aLi.length-1?0:step;
        var tmpStep=step>=aLi.length?0:step;
        for(var i=0; i<aLi.length; i++){
            if(i===tmpStep){
                aLi[i].className='bg';
            }else{
                aLi[i].className='';
            }
        }
    }
    //3）鼠标移入停止运动，鼠标移出继续运动
    oBox.onmouseover=function(){
        clearInterval(autoTimer);
        //utils.css(aA[0],'display','block');
        //utils.css(aA[1],'display','block');
        aA[0].style.display=aA[1].style.display='block'
    };
    oBox.onmouseout=function(){
        autoTimer=setInterval(autoMove,1000);
        //utils.css(aA[0],'display','none');
        //utils.css(aA[1],'display','none');
        aA[0].style.display=aA[1].style.display='none'
    };
    //4）点击焦点手动切换
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;//用自定义属性保存索引
            aLi[i].onclick=function(){
                step=this.index;//当点击焦点的时候，把索引做为step
                zhufengAnimate(oBoxInner,{left:-step*1000},500);
                bannerTip();
            }
        }
    }
    //5）点击左右按钮手动切换
    aA[0].onclick=function(){
        if(step<=0){
            step=aLi.length;
            //快速设置到给末尾添加的图片1；
            utils.css(oBoxInner,'left',-step*1000)
        }
        step--;
        zhufengAnimate(oBoxInner,{left:-step*1000},500,0);
        bannerTip();
    };
    aA[1].onclick=autoMove;
})();










