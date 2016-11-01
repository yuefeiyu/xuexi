/**
 * Created by xiao lei on 2016/6/24.
 */
//思路:1.获取并解析数据 2.绑定数据 3.隔行换色 4.排序 5.代码优化
(function(){
    var oTab=document.getElementById('tab');
    var tHead=oTab.tHead;
    var tCells=tHead.rows[0].cells;
    var tBody=oTab.tBodies[0];
    var aRows=tBody.rows;
    var data;
    //1.获取并解析数据
    getData();
    function getData(){
        var xml=new XMLHttpRequest;
        xml.open('get','data.txt',false);
        xml.onreadystatechange=function(){
            if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
                data=utils.jsonParse(xml.responseText)
            }
        };
        xml.send(null)
    }
    //2.绑定数据
    bind();
    function bind(){
        var frg=document.createDocumentFragment();
        for(var i=0; i<data.length; i++){
            var cur=data[i];
            var oTr=document.createElement('tr');
            for(var attr in cur){
                if(attr==='sex'){
                    cur[attr]=cur[attr]===0?'男':'女';
                }
                var oTd=document.createElement('td');
                oTd.innerHTML=cur[attr];
                oTr.appendChild(oTd);
            }
            frg.appendChild(oTr)
        }
        tBody.appendChild(frg);
        frg=null;
    }
    //3.隔行换色
    changeColor();
    function changeColor(){
        for(var i=0; i<aRows.length; i++){
            aRows[i].className='bg'+i%3;
        }
    }
    //4.排序
    function sort(n){
        var _this=this;
        for(var i=0; i<tCells.length; i++){
            tCells[i].flag=(i===n)?tCells[i].flag*-1:-1;
        }
        //1.类数组专数组
        var ary=utils.listToArray(aRows);
        //2.sort
        ary.sort(function(a,b){
            var curInner=a.cells[n].innerHTML;
            var nexInner=b.cells[n].innerHTML;
            var curNum=parseFloat(a.cells[n].innerHTML);
            var nexNum=parseFloat(b.cells[n].innerHTML);
            if(isNaN(curInner) || isNaN(nexInner)){
                return curInner.localeCompare(nexInner)*_this.flag;
            }
            return (curNum-nexNum)*_this.flag;
        });
        //3.重插
        var frg=document.createDocumentFragment();
        for(var i=0; i<ary.length; i++){
           frg.appendChild(ary[i]);
        }
        tBody.appendChild(frg);
        frg=null;
        changeColor();
    }
    for(var i=0; i<tCells.length; i++){
        if(tCells[i].className==='cursor'){
            tCells[i].flag=-1;
            tCells[i].index=i;
            tCells[i].onclick=function(){
                sort.call(this,this.index)
            }
        }
    }
    /*tCells[1].flag=-1;
    tCells[1].onclick=function(){
        sort.call(this);
    }*/

})()
