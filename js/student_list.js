var vue = new Vue({
    el: "#StudentForm",
    data: {
        item: {
            numberId: '',
            studentNumber: '',
            xxdm: '',
            school: '',
            username: '',
            sex: '',
            birthday: '',
            usernameOld: '',
            englishName: '',
            cardNo: '',
            studentNative: '',
            nation: '',
            politicsStudent: '',
            familyAddress: '',
            registerAddress: '',
            speciality: '',
            phone: '',
            postcode: '',
            fatherName: '',
            motherName: '',
            fatherWork: '',
            motherWork: '',
            fatherPhone: '',
            motherPhone: '',
            publicVolunteer: '',
            remark: '',
            lqxxdm: '',
            lqxxmc: '',
            admissions: '',
            studentCode: ''
        }
    }
});


layui.use(['table', 'jquery', 'layer'], function () {
    var sdtuentDetails = layui.jquery, layer = layui.layer, table = layui.table;
    var table = layui.table;
    table.render({
        elem: '#test'
        , url: student_apply + "/query"
        , cols: [[
            {field: 'id', width: 90, title: 'ID', sort: true}
            , {field: 'studentNumber', width: 110, title: '学生编号'}
            , {field: 'school', width: 90, title: '毕业学校'}
            , {field: 'username', width: 90, title: '姓名'}
            , {field: 'sex', width: 40, title: '性别'}
            , {field: 'birthday', width: 120, title: '出生日期'}
            , {field: 'cardNo', width: 120, title: '身份证号'}
            , {field: 'publicVolunteer', width: 120, title: '公办志愿'}
            , {field: 'studentCode', width: 120, title: '全国学籍号'}
            , {field: '', align: 'left', title: '操作', toolbar: '#barDemo'}
        ]]
        , page: true
    });
    var width = parseInt(window.screen.width * 0.4);
    var height = window.screen.height - 300;
    var table = layui.table;
    //监听工具条
    table.on('tool(testDemo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'find') {
            layui.$.ajax({
                url: student_apply + "/findStudentExcelDetails",
                type: "GET",
                dataType: "json",
                data: {id: data.id},
                success: function (data) {
                    console.log(data)
                    layer.open({
                        type: 1,
                        area: [width + "px", height + "px"]
                        , content: sdtuentDetails('#StudentForm').html()
                    });
                    vue.item = data.data;
                }
            });
        }
    });

});