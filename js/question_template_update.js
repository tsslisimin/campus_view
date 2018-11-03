window.onload = function () {
    var vue = new Vue({
        el: '#app',
        data: {sign: 0, health: 0, templateName: '', items: []},
        methods: {
            inputClick: function (doc, item, optionIndex) {
                // select
                item.inputText = optionIndex;
                console.log(item);
            },
            signChange: function (cb) {
                this.sign = this.sign == undefined ? 1 : this.sign == 1 ? 0 : 1;
                console.log(this.sign)
            },
            healthChange: function (option) {
                option.health = option.health == undefined ? 1 : option.health == 1 ? 0 : 1;
                console.log(option.health)
            }
        }
    });
    window.vue = vue;

    //JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;
    });
    layui.use('layer', function () {
        window.layer = layui.layer;

    });

    layui.$.get(checkPoint, function (data, event) {
        if (data.code == 0) {
            vue.options = data.data;
            vue.options.unshift({describes: "无"})
        }
    });
    layui.$.get(question.concat('/').concat(getQueryString('id')), function (data, ev) {
        console.log(data);
        if (data.code == 0) {

            vue.sign = data.data.sign;
            vue.templateName = data.data.title;
            for (let i = 0; i < data.data.items.length; i++) {
                var d = data.data.items[i];

                vue.items.push({
                    inputText: d.inputText,
                    describes: d.itemTitle,
                    itemId: d.itemId,
                    health: d.health,
                    questionType: d.questionType,
                    editorType: d.editorType == 2,
                    typeDes: d.questionType === 1 ? "单选题" : d.questionType === 2 ? "多选题" : "填空题",
                    index: d.itemIndex,
                    check: '',
                    options: d.options
                });
            }
        }
    })
};


function change() {

    window.vue.message = 'change！';
}

function deleteOption(doc) {
    let index = doc.qid;
    let opid = doc.opid;
    let items = window.vue.items;
    items.forEach(function (q) {
        if (q.index == index) {
            deleteArray(q.options, function (i) {
                return i && i.index == opid
            });
        }
    });
}

function deleteQuestion(doc) {
    let index = doc.qid;
    let items = window.vue.items;

    deleteArray(items, function (i) {
        return i && i.index == index
    });
}


/**
 * 增加问题选项
 * @param item
 */
function pushOption(item) {
    let index = item.data;

    vue.items.forEach(function (i) {
        if (i.index === index) {
            let length = i.options.length;
            i.options.push({index: length + 1, content: "选项" + (length + 1)})
        }
    });


}

/**
 * 增加问题
 * @param obj
 */
function push(obj) {
    console.log(obj);
    var div = document.getElementById('body');
    var options = [];
    if (obj === 1) {
        // single
        options.push({index: 1, content: "选项1"})
    } else if (obj === 2) {
        // muilt
        options.push({index: 1, content: "选项1"})

    } else if (obj === 3) {
        // edit
        options.push({index: 1, content: ""})

    }
    let index = window.vue.items.length + 1;
    window.vue.items.push({
        describes: "",
        desHint: "请输入标题...",
        questionType: obj,
        editorType: false,
        health: 0,
        typeDes: obj === 1 ? "单选题" : obj === 2 ? "多选题" : "填空题",
        index: index,
        check: '',
        options: options
    });

    div.scrollTop = div.scrollHeight;

    let items = vue.checkSelects;
    console.log(items)
}

function submit() {
    if (vue.items.length == 0) {
        layui.layer.msg('未添加问题');
        return
    }
    for (let it in window.vue.items) {
        var i = window.vue.items[it]
        if (i.describes == null || i.describes == undefined || i.describes == '') {
            layui.layer.msg('未填写标题');

            return
        }
    }
    // axios({
    //     method: 'POST', url: question.concat('/all'),
    //     data: window.vue.items,
    //     console: 'debug',
    //     contentType: 'application/json;charset=utf-8'
    // })
    //     .then(function (res) {
    //         console.log(res);
    //     }).catch(function (error) {
    //     console.log(error);
    //
    // });
    //

    var base = new Base64();

    let obj = JSON.stringify(window.vue.items);
    layui.$.post(question.concat('/edit/').concat(getQueryString('id')), {
        sign: window.vue.sign,
        templateName: window.vue.templateName,
        body: base.encode(obj)
    }, function (data, code) {
        layer.msg(data.msg);
        if (data.code == 0) {
            history.go(-1);
        }
    });
    // layui.$.ajax({
    //     type: 'POST',
    //     dataType: 'json',
    //     contentType: 'application/json;charset=utf-8',
    //     url: question.concat('/all'),
    //     data: JSON.stringify(window.vue.items),
    //     success: function (data, event) {
    //
    //     },
    //     error: function (e) {
    //
    //     }
    //
    // });
    console.log(window.vue.$data)
}