/**
 * Created by Administrator on 2016/6/29 0029.
 */
var aImg=document.getElementsByTagName('img');
 window.onscroll=function(){
 var scrollT=utils.win('scrollTop')
     var clientH=utils.win('clientHeight')
     var scrollBottom=scrollT+clientH
     for(var i=0;i<aImg.length;i++){
         var imgPosition=aImg[i].offsetTop+aImg[i].offsetHeight
         if(imgPosition<=scrollBottom){
             lazyImg(aImg[i])
         }
     }
 };
function lazyImg(img){
    if(img.loaded){
        return
    }
    var  tmpImg=new Image
    tmpImg.src=img.getAttribute('realImg')
    tmpImg.onload=function(){
        img.src=this.src
        tmpImg=null;
        img.loaded=true
    }
    tmpImg.onerror=function(){
        tmpImg=null
        img.loaded=true
    }
}








































































































