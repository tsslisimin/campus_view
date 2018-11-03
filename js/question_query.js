function find() {

    var vue = new Vue({
        el: '#app',
        data: {title: '', items: []},
        methods: {
            submit: function (item) {

            }

        }
    });

    let id = getQueryString('id');
    if (id == null || id == undefined) {
        alert('问卷不存在');
        return
    }
    $.get(question.concat('/').concat(id), function (data) {
        if (data.code != 0) {
            alert(data.msg);
            return
        }
        vue.items = data.data.items;
        vue.templateId = data.data.templateId;
        vue.title = data.data.title;
        window.vue = vue;
        console.log('ret ' + JSON.stringify(data))
    });
}

window.onload = function () {
    find();


};


function submit() {
    let items = window.vue.items;
    var userId = window.sessionStorage['campus_userId'];

    var data = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        var retOp;
        for (let j = 0; j < item.options.length; j++) {
            let option = item.options[j];
            if ((item.editorType == 2 || (option.select == null || option.select == undefined)) && item.questionType != 3) {
                continue
            } else if (item.editorType == 2 && (option.content == null || option.content == undefined || option.content.length == 0)
                && item.questionType == 3) {
                continue
            }
            retOp = option;

        }
        if (retOp == null || retOp == undefined) {
            alert("问题:" + item.itemTitle + "未填写");
            return
        }
        let d = {'templateId': window.vue.templateId, 'itemId': item.itemId};
        d.optionId = retOp.optionId;
        d.content = item.questionType != 3 ? retOp.select : retOp.content;
        data.push(d);
        retOp = null;
    }
    let base64 = new Base64();
    $.post(question.concat("/commit"), {
        userId: userId,
        body: base64.encode(JSON.stringify(data))
    }, function (data, textStatus, jqXHR) {
        // var obj = JSON.parse(data)
        alert(data.msg)
    }, "json");
    console.log(data)
}