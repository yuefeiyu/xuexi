/**
 * Created by xiao lei on 2016/6/23.
 */
//单例模式封装
var utils=(function(){
    var flag='getComputedStyle' in window;
    return {
        //rnd:兼容版的求一定范围的随机数 n,m
        rnd:function(n,m){
            n=Number(n);
            m=Number(m);
            if(isNaN(n) || isNaN(m)){
                return Math.random();//如果传的数字无效，直接返回0-1随机小数
            }
            if(n>m){
                tmp=n;
                n=m;
                m=tmp;
            }
            return Math.round(Math.random()*(m-n)+n);
        },
        //listToArray：类数组转数组
        listToArray:function listToArray(arg){
            if(flag){
                return Array.prototype.slice.call(arg)
            }
            var ary=[];
            for(var i=0; i<arg.length; i++){
                ary[ary.length]=arg[i];
            }
            return ary;

        },
        //jsonParse:把JSON格式的字符串转成JSON格式的数据(对象)
        jsonParse:function(jsonStr){
            /*var obj={};
             if('JSON' in window){//高级浏览器支持
             obj=JSON.parse(jsonStr);
             }else{//处理低级浏览器的兼容
             obj=eval('('+jsonStr+')')
             }
             return obj;*/
            return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
        },
        //win:浏览器盒子模型的兼容性处理；
        win:function (attr,value){
            //获取时候就得return； 设置的时候不需要；
            //win有两个功能： 获取-return 设置（不需要return）
            //当win方法调用时，传了一个参数的时候（1.arguments.length 2.typeof value==='undefined'）；就是获取；否则就是设置；
            if(typeof value==='undefined'){//获取
                return document.documentElement[attr]||document.body[attr];
            }
            //设置；
            document.documentElement[attr]=document.body[attr]=value;
        },
        //offset:当前元素距离body的位置 {left:l,top:t}
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
        //getByClass：在一定的范围内，通过className来获取元素
        getByClass:function(curEle,strClass){
            curEle=curEle||document;
            if(flag){
                return this.listToArray(curEle.getElementsByClassName(strClass))
            }
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            var nodeList=curEle.getElementsByTagName('*');
            var ary=[];
            for(var i=0; i<nodeList.length; i++){
                var curNode=nodeList[i];
                var bOk=true;
                for(var k=0; k<aryClass.length; k++){
                    var curClass=aryClass[k];
                    //var reg=new RegExp('(^| +)'+curClass+'( +|$)')
                    var reg=new RegExp('\\b'+curClass+'\\b');
                    if(!reg.test(curNode.className)){
                        bOk=false;
                        break;
                    }
                }
                if(bOk){
                    ary[ary.length]=curNode;
                }
            }
            return ary;
        },
        //hasClass:验证这个元素上是否有某个class名；
        hasClass:function(curEle,cName){
            cName=cName.replace(/(^ +)|( +$)/g,'')
            var reg=new RegExp('\\b'+cName+'\\b');
            return reg.test(curEle.className)
        },
        //addClass:如果元素身上没有这个class名，我们才会添加
        addClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            for(var i=0; i<aryClass.length; i++){
                var curClass=aryClass[i];
                if(!this.hasClass(curEle,curClass)){
                    curEle.className+=' '+curClass;
                }
            }
        },
        //removeClass:如果元素身上有这个class名，才能删除
        removeClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            for(var i=0; i<aryClass.length; i++){
                //var reg=new RegExp('(^| +)'+aryClass[i]+'( +|$)');
                var reg=new RegExp('\\b'+aryClass[i]+'\\b');
                if(reg.test(curEle.className)){
                    curEle.className=curEle.className.replace(reg, ' ').replace(/\s+/g,' ').replace(/(^ +)|( +$)/g,'');
                }
            }
        },
        //getCss:获取经过浏览器计算过的样式（面试：如何获取非行间样式）
        getCss:function(curEle,attr){
            var val,reg;
            if(flag){
                val=getComputedStyle(curEle,false)[attr];
            }else{
                if(attr==='opacity'){
                    val=curEle.currentStyle['filter'];
                    reg=/^alpha\(opacity[=:](\d+)\)$/;
                    return reg.test(val)?reg.exec(val)[1]/100:1;
                }else{
                    val=curEle.currentStyle[attr];
                }

            }
            reg=/^([+-])?\d+(\.\d+)?(pt|px|rem|em)$/
            return reg.test(val)?parseFloat(val):val;
        },
        //setCss:设置样式 透明度 单位 float
        setCss:function (curEle,attr,value){
            if(attr==='float'){
                curEle.style.cssFloat=value;/*火狐*/
                curEle.style.styleFloat=value;/*IE*/
                return;
            }
            if(attr==='opacity'){
                curEle.style.opacity=value;
                curEle.style.filter='alpha(opacity='+value*100+')';
                return;
            }
            var reg=/(width|height|top|right|bottom|left|((margin|padding)(top|right|bottom|left)?))/;
            if(reg.test(attr)){
               value=parseFloat(value)+'px';
            }
            curEle.style[attr]=value;
        },
        setGroupCss:function(curEle,options){
            for(var attr in options){
                this.setCss(curEle,attr,options[attr]);
            }
        },
        //css:取值赋值合体的函数：getCss,setCss,setGroupCss三合一
        css:function(curEle){
            var arg2=arguments[1];
            if(typeof arg2==='string'){//获取 或 设置
                var arg3=arguments[2];
                if(typeof arg3==='undefined'){//arg3实参不存在；
                    return this.getCss(curEle,arg2)
                }else{//设置1个 arg3实参存在
                    this.setCss(curEle,arg2,arg3)
                }
            }
              if(arg2 instanceof Object){
                this.setGroupCss(curEle,arg2);
            }
            /*if(arg2.toString()==='[object Object]'){//说明第二个参数是个对象
                this.setGroupCss(curEle,arg2);
            }*/
            //if(arg2.constructor.name==='Object'){
            //    console.dir(arg2.constructor)
            //    this.setGroupCss(curEle,arg2);
            //}
        },
getChildren:function(curEle){
    if(flag){
        return this.listToArray(curEle.children)
    }
    var ary=[]
    var nodeList=curEle.childNodes
    for(var i=0;i<nodeList.length;i++){
      if(nodeList[i].nodeType===1) {
          ary.push(nodelist[i])
      }
    }
    return ary;
},
        prev: function(curEle){
            if(flag){
                return curEle.previousElementSibling;
            }
            var pre=curEle.previousSibling
            while(pre&&pre.nodeType!==1){
                pre=pre.previousSibling
            }
            return pre
        },
            prevAll: function(curEle){
            var pre=this.prev(curEle)
            var ary=[]
            while(pre){
                ary.unshift(pre)
                pre=this.prev(pre)
            }
            return ary
        },
        next: function(curEle){
            if(flag){
                return curEle.nextElementSibling;
            }
            var next=curEle.nextiousSibling
            while(next&&next.nodeType!==1){
                next=next.nextiousSibling
            }
            return next
        },
        nextAll: function(curEle){
            var nex=this.next(curEle)
            var ary=[]
            while(nex){
                ary.unshift(nex)
                nex=this.next(nex)
            }
            return ary
        },
        Sibling: function(curEle){
            var pre=this.prev(curEle)
            var nex=this.next(curEle)
            var ary=[]
            if(pre){ary.push(pre)}
            if(nex){ary.push(nex)}
            return ary;
        },
        Siblings: function(curEle){
            return this.prevAll(curEle).concat(nextAll(curEle))
        },
        firstChild: function(curEle){
            return this.getChildren(curEle)[0]
        },
        lastChild: function(curEle){
            var aChs=this.getChildren(curEle)
            return aChs[aChs.length-1]
        },
        index: function(curEle){
            return this.prevAll(curEle).length
        },
       prependchild:function(parent,newEle){
           var first=this.firstChild(parent)
           if(first){
               parent.insertBefore(newEle,first)
           }else{parent.appendChild(newEle);
           }
       },
        insertBefore: function(newle,oldEle){
            oldEle.parentNode.insertBefore(newle,oldEle);
        },
        //没有这个方法，所以要封装
        insertArter:function(newle,oldEle){
            var  nex=this.next(oldEle);
            if(nex){
                oldEle.parentNode.insertBefore(newle,nex)
            }else{
                oldEle.parentNode.appendChild(newle)
            }
        },
    }
})();











