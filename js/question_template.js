function render(table, url) {
    table.render({
        elem: '#content'
        , url: url
        , page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
            //,curr: 5 //设定初始在第 5 页
            , groups: 1 //只显示 1 个连续页码
            , first: false //不显示首页
            , last: false //不显示尾页

        }
        , cols: [[
            // {type: 'checkbox', fixed: 'left'},
            {field: 'id', width: 60, title: 'ID', sort: true}
            , {field: 'startDate', width: 160, title: '开始时间'}
            , {field: 'endDate', width: 160, title: '结束时间', sort: true}
            , {field: 'status', width: 80, title: '状态', toolbar: '#titleTpl'}
            , {field: 'describes', width: 270, align: 'center', title: '模版名称'}
            , {fixed: 'right', width: 308, align: 'center', toolbar: '#barDemo'}
        ]]

    });
}

function listener(table) {
//监听表格复选框选择
    table.on('checkbox(content)', function (obj) {
        console.log(obj)
    });
    //监听工具条
    table.on('tool(content)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            window.location = "../view/question.html?id=" + data.id;
        } else if (obj.event === 'build') {

            var url = 'http://' + window.location.host + '/questions/view/index.html?id=' + data.id;

            window.open("https://cli.im/api/qrcode/code?text=" + url);

            // layer.open({
            //     title: '问卷调查地址'
            //     , content: url
            // });

        } else if (obj.event === 'editQuestion') {
            window.location = "../view/question_template_update.html?id=" + data.id;

        } else if (obj.event === 'del') {
            layer.confirm('确认删除id[' + data.id + ']的数据？', function (index) {
                obj.del();
                layer.close(index);

                deleteById(data.id);
            });
        } else if (obj.event === 'edit') {
            edit(data, true);
        }
    });

    var $ = layui.$, active = {
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('content')
                , data = checkStatus.data;
            layer.alert(JSON.stringify(data));
        }
        , getCheckLength: function () { //获取选中数目
            var checkStatus = table.checkStatus('idTest')
                , data = checkStatus.data;
            layer.msg('选中了：' + data.length + ' 个');
        }
        , isAll: function () { //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            layer.msg(checkStatus.isAll ? '全选' : '未全选')
        }
    };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
}

function find(id, type, des) {

    var url = question_template;
    if (id !== undefined || length(id) > 0) {
        url.lastIndexOf('?') > 0 ? url.concat('&id=').concat(id) : url.concat('&id=').concat(id)
    }
    url = url.concat('?id=').concat(id).concat("&describes=").concat(des).concat("&type=").concat(type);

    console.log(url);
    console.log(id);

    layui.use('table', function () {
        var table = layui.table;
        render(table, url);
        listener(table);

    });
}

function save() {
    layer.open({
        type: 2,
        area: ['500px', '400px'],
        content: './question_edit.html?id=' + data.id //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
        , cancel: function () {
            console.log('cancel');
            render(layui.table, question_template)
        }
    });
}

function edit(data, status) {
    layer.open({
        type: 2,
        area: ['500px', '400px'],
        content: './question_template_edit.html?id=' + data.id + "&status=" + status //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
        , cancel: function () {
            console.log('cancel');
            render(layui.table, question_template)
        }
    });
}

function deleteById(id) {
    console.log(id);
    var url = question_template;
    url = url.concat('/').concat(id);

    console.log(url);
    $.ajax({
        url: url,
        type: "POST",
        data: {_method: "DELETE"},
        dataType: "json",
        success: function (result) {
            console.log(result)
        }


    });


}

function queryTemp() {

    var id = document.getElementById("id").value;
    // var type = document.getElementById("type").value;
    var des = document.getElementById("des").value;
    id = id == null ? "" : id;
    find(id, undefined, des);
}