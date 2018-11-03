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
            {type: 'checkbox', fixed: 'left'}
            , {field: 'type', width: 80, title: '类型', sort: true}
            , {field: 'id', width: 80, title: '类型ID', sort: true}
            , {field: 'describes', width: 330, title: '描述'}
            , {field: 'remark', width: 330, title: '备注'}
            , {fixed: 'right', width: 178, align: 'center', toolbar: '#barDemo'}
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
            edit(data, 1);
        } else if (obj.event === 'del') {
            layer.confirm('确认删除id[' + data.id + ']的数据？', function (index) {
                obj.del();
                layer.close(index);

                deleteById(data.id);
            });
        } else if (obj.event === 'edit') {
            edit(data, 2);
        }
    });

    var $ = layui.$, active = {
        getCheckData: function () { //获取选中数据
            var checkStatus = table.checkStatus('idTest')
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

    var url = question_type;
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
        type: 1,
        area: ['500px', '400px'],
        content: './question_edit.html?id=' + data.id //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
        , cancel: function () {
            console.log('cancel');
            render(layui.table, question_type)
        }
    });
}

function edit(data, status) {
    layer.open({
        type: 2,
        area: ['500px', '400px'],
        content: './question_edit.html?id=' + data.id + "&status=" + status //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
        , cancel: function () {
            console.log('cancel');
            render(layui.table, question_type)
        }
    });
}

function deleteById(id) {
    console.log(id);
    var url = question_type;
    url = url.concat('/').concat(id);

    console.log(url);
    layui.$.ajax({
        type: 'DELETE',
        url: url,
        success: {},
        error: {}

    });
}

function search() {

    var id = document.getElementById("id").value;
    var type = document.getElementById("type").value;
    var des = document.getElementById("des").value;
    id = id == null ? "" : id;
    find(id, type, des);
}

function insert() {
    layer.open({
        type: 2,
        area: ['500px', '400px'],
        content: './question_insert.html'
        , cancel: function () {
            console.log('cancel');
            render(layui.table, question_type)
        }
    });
}