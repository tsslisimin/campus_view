function find(id, saId) {

    var vue = new Vue({
        el: '#app',
        data: {title: '', items: []},
        methods: {
            submit: function (item) {

            }

        }
    });


    $.get(question.concat('/answer?templateId=').concat(id).concat("&saId=").concat(saId), function (data) {
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
    find(getQueryString('templateId'), getQueryString('saId'));


};

