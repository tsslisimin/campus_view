function initData() {
    layui.use(['form', 'layedit', 'laydate'], function () {
        var form = layui.form
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate;

        //监听提交
        form.on('submit(update)', function (data) {
            console.log(data);
            data.field.describes = data.field.des;


            layui.$.post(question_type,data.field, function (data, code) {
                layer.msg(data.msg);
            });


            // layui.$.ajax({
            //     type: 'post',
            //     contentType: "application/json; charset=utf-8",
            //     url: question_type,
            //     data: JSON.stringify(data.field),
            //     dataType: 'json',
            //     success: function (data) {
            //         layer.msg(data.msg);
            //         parent.layer.cancel();
            //         var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            //         // parent.layer.close(index); //再执行关闭
            //
            //     },
            //     error: function () {
            //         layer.msg("保存失败");
            //     }
            //
            // });
            return false;
        });

    });


}

window.onload = function () {
    initData()
};

