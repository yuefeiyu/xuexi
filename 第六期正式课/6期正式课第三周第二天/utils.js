/**
 * Created by xiao lei on 2016/6/28.
 */
var utils=(function(){
    return {
        //listToArray:把类数组转数组
        listToArray:function(arg){
            var ary=[];
            try{//高级浏览器
                ary=Array.prototype.slice.call(arg);
            }catch(e){
                for(var i=0; i<arg.length; i++){
                    ary[ary.length]=arg[i];
                }
            }
            return ary;
        },
        //jsonParse:把JSON格式的字符串转成JSON格式的数据
        jsonParse:function(str){
            return 'JSON' in window?JSON.parse(str):eval('('+str+')');
        },
        //win:处理(获取，设置)浏览器盒子模型的兼容性
        win:function (attr,value){
            if(typeof value==='undefined'){
                return document.documentElement[attr]||document.body[attr];
            }
            document.documentElement[attr]=document.body[attr]=value;
        },
        //getCss:获取哪个元素经浏览器计算过的样式（获取非行间样式）
        getCss:function(curEle,attr){
            var val,reg;
            if('getComputedStyle' in window){
                if(/MSIE (9|10|11)/.test(navigator.userAgent)){
              return curEle.currentStyle[attr]
                }
                val=getComputedStyle(curEle,false)[attr]
            }else{
                if(attr==='opacity'){
                    val=curEle.currentStyle['filter'];
                    reg=/^alpha\(opacity[=:](\d+)\)$/i;
                    return reg.test(val)?reg.exec(val)[1]/100:1;
                }else{
                    val=curEle.currentStyle[attr];
                }
            }
            reg=/^([+-])?\d+(\.\d+)?(pt|px|em|rem)$/;
            return reg.test(val)?parseFloat(val):val;

        },
        //offset:当前元素到body的距离；{left:l,top:t}
        offset:function(curEle){
            var l=curEle.offsetLeft;
            var t=curEle.offsetTop;
            var par=curEle.offsetParent;
            while(par){
                if(navigator.userAgent.indexOf('MSIE 8.0')===-1){
                    l+=par.clientLeft;
                    t+=par.clientTop;
                }
                l+=par.offsetLeft;
                t+=par.offsetTop;
                par=par.offsetParent;
            }
            return {left:l,top:t}
        },
        hasClass:function(curEle,cName){
            var  reg=new RegExp('\\b'+cName+'\\b')
            return reg.test(curEle.className)
        },
        addClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            for(var i= 0;i<aryClass.length;i++){
                var curClass=aryClass[i];
                if(!this.hasClass(curEle,curClass)){
                    curEle.className+=' '+curClass
                }
            }
        }
    }
})();