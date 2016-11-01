/**
 * Created by xiao lei on 2016/6/24.
 */
var utils={
    //listToArray:类数组转数组
    listToArray:function (arg){
        var ary;
        try{
            ary=Array.prototype.slice.call(arg);
        }catch(e){
            for(var i=0; i<arg.length; i++){
                ary[ary.length]=arg[i];
            }
        }
        return ary;
    },
    //jsonParse:把JSON格式的字符串转成JSON格式的数据(对象形式)
    jsonParse:function(str){
        return 'JSON' in window?JSON.parse(str):eval('('+str+')');
    },
}