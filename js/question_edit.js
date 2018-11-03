function initData(id, status) {


    var url = question_type.concat("/").concat(id);
    console.log(url);
    layui.$.get(url, function (data, code) {
        layui.use(['form', 'layedit', 'laydate'], function () {

            var form = layui.form
                , layer = layui.layer
                , layedit = layui.layedit;


            var laydate = layui.laydate;
            //日期范围
            var startDate = laydate.render({
                elem: '#startDate',
                type: 'datetime',
                format: 'yyyy-MM-dd HH:mm:ss',
                max: "2099-12-31",//设置一个默认最大值
                done: function (value, date) {
                    endDate.config.min = {
                        year: date.year,
                        month: date.month - 1, //关键
                        date: date.date,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    };
                }
            });

            //日期范围
            var endDate = laydate.render({
                elem: '#endDate',//选择器结束时间
                type: 'datetime',
                format: 'yyyy-MM-dd HH:mm:ss',
                min: "1970-1-1",//设置min默认最小值
                done: function (value, date) {
                    startDate.config.max = {
                        year: date.year,
                        month: date.month - 1,//关键
                        date: date.date,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    }
                }
            });

            form.render();

            if (status === "1") {
                layui.$("#commit").attr("style", "display:none;");//隐藏div
            }
            //监听提交
            form.on('submit(update)', function (data) {
                console.log(data);
                data.field.id = id;
                data.field.describes = data.field.des;
                layui.$.ajax({
                    type: 'PUT',
                    url: question_type,
                    data: data.field,
                    dataType: 'json',
                    success: function (data) {
                        layer.msg(data.msg);
                        parent.layer.cancel();
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        // parent.layer.close(index); //再执行关闭

                    },
                    error: function () {
                        layer.msg("修改失败");
                    },

                });
                return false;
            });

            //表单初始赋值
            form.val('form', {
                "type": data.data.type // "name": "value"
                , "des": data.data.describes
                , "remark": data.data.remark
            })
        });
    });
}

window.onload = function () {
    initData(getQueryString('id'), getQueryString('status'))
};

