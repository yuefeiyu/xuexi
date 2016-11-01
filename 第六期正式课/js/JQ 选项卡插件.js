function tab(id){
    $(id+' li').click(function(){
        $(this).addClass('bg').siblings('li').removeClass('bg');
        $(id+' div').eq($(this).index()).addClass('show').siblings('div').removeClass('show')
    })
}