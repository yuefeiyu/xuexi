/** 1获取解析数据，2绑定数据，3隔行换色 4排序（类数组转数组，sort排序
 * 重插 ）*
 */
//1绑定数据
var oTab = document.getElementById('tab')
var tHead = oTab.tHead;
var tCells = tHead.rows[0].cells;
var tBody = oTab.tBodies[0]
var aRows = tBody.rows
var data = null
getData()
function getData() {
    var xml = new XMLHttpRequest()
    xml.open('get', 'data.txt', false)
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && /^2\d{2}$/.test(xml.status)) {
            data = utils.jsonParse(xml.responseText)
        }
    }
    xml.send()
}
//绑定数据
bang()
//function bang(){
//    var str=''
//   for(var i=0;i<data.length;i++){
//       var  cur=data[i];
//       cur.sex=cur.sex===0?'男':'女'
//       str+='<tr>\
//                <td>'+cur.name+'</td>\
//                <td>'+cur.age+'</td>\
//                <td>'+cur.score+'</td>\
//                <td>'+cur.sex+'</td>\
//                </tr>';
//   }
// tBody.innerHTML+=str
//}
function bang() {
    var frg = document.createDocumentFragment()
    for (var i = 0; i < data.length; i++) {
        var cur = data[i]
        var oTr = document.createElement('tr')
        for (var attr in cur) {
            if (attr === 'sex') {
                cur[attr] = cur[attr] === 0 ? '男' : '女'
            }
            var oTd = document.createElement('td')
            oTd.innerHTML = cur[attr]
            oTr .appendChild(oTd)
        }
        frg.appendChild(oTr)
    }
    tBody.appendChild(frg)
    frg = null
}
//3隔行换色
changeColor()
function changeColor() {
    for (var i = 0; i < aRows.length; i++) {
        aRows[i].className = 'bg' + i % 3
    }
}
//4表格排序
function sort(){
   //1类转数组
    var ary=utils.listToArray(aRows);
    //排序
    ary.sort(function(a,b){
        return
    })
}