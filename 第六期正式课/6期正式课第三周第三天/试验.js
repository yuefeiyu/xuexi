/**
 * Created by Administrator on 2016/6/30 0030.
 */
getByClass:function getByClass(curEle,strClass){
    curEle=curEle|| document
    if('getComputedStyle'in window){
        return Array.prototype.slice.call(curEle.getElementsByClassName(strClass))
    }
}
hasClass:function hasClass(curEle,cName){
    cName=cName.replace(/(^ +)|( +s)/g,'')
   var reg=new RegExp('\\b'+cName+'\\b')
    return reg.test(curEle.className)
}
addClass:function addClass(curEle ,strClass){
    var aryClass=strClass.replace(/(^ +)|( +s)/g,'').split(/\s+/g)
    for(var i= 0;i<aryClass.length;i++){
        var curClass=aryClass[i]
        if(!this.hasClass(cur,curClass)){
            curEle.className+=' '+curClass
        }
    }

}
getCss: function setCss(curEle,attr){
    var val, reg
   if(flag) {
       val=getComputedStyle(curEle,false)[attr];
   }else{if(attr==='opacity'){
       val=cur.currentStyle['filter']
       reg=/^alp[=:](\d+)\)$/;
       return reg.test(val)?reg.exec(val)[1]/100:1;
   }
 else{   val=curEle.currentStyle[attr]
   }
   }
    reg=/^([+-])?\d+(\.\d+)?(pt|px|rem|em)$/
    return reg.test(val)?parseFloat(val):val;
}
css: function css(curEle){
    var arg2=arguments[1]
    if(typeof  arg2==="string"){
        var arg3=arguments[2]
        if(typeof arg3==='undefind'){
            return this.getCss(curEle,arg2)
        }else{
            this.setCss(curEle,arg2,arg3)
        }
    }
    if(arg2 instanceof Object){
        this.setGroupCss(curEle,arg2,arg3)
    }

}