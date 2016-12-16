// 暂时封装的输入限制插件
$.fn.extend({
    entryRestrict:function(option){
        var opt={
            keyupFun:null,
            restrictNum:0,
            entryNum:0
        };
        option=$.extend(opt,option);
        _that=$(this);
        option.restrictNum=_that.attr('maxlength');
        //  删除ios的emoji表情
        function filteremoji(content){  
           var ranges = [
                '\ud83c[\udf00-\udfff]', 
                '\ud83d[\udc00-\ude4f]', 
                '\ud83d[\ude80-\udeff]'
            ];
            var emojireg = content.replace(new RegExp(ranges.join('|'), 'g'), '');
            return emojireg;
        }

        function todoMethod(){
            _that.val(filteremoji(_that.val()))
            option.entryNum=_that.val().length;
            if(option.entryNum>option.restrictNum){
                option.entryNum=option.restrictNum;
            }
            option.keyupFun && option.keyupFun(option);
        }
        // 按键弹起事件
        _that.keyup(function(){
            todoMethod()
        })
        // 联想粘贴事件
        _that.on('input paste',function(){
            todoMethod()
        })
    }
})
