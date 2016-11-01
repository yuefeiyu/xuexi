var aImg=document.getElementsByTagName('img')
window.onscroll=function(){
    var scrollBottom=utils.win('scrollTop')+utils.win('clientHeight')
    for(var i=0;i<aImg.length;i++){
        var imgp=utils.offset(aImg[i]).top+utils.getCss(aImg[i],'height')
        if(imgp<=scrollBottom){
            lazyImg(aImg[i])
        }
    }
}
function lazyImg(img){
    if(img.loaded){
        return
    }
    var tapImg=new Image
    tapImg.src=img.getAttribute('realImg')
    tapImg.onload=function(){
        img.src=this.src
        tapImg=null
        img.loaded=ture
    }
    tapImg.onerror=function(){
        tapImg=null
        img.loaded=ture
    }
}