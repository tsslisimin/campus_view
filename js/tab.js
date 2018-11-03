function tabShow(page) {
    $("#content").attr("src", "../view/" + page)

}

/*content高度*/
function initSize() {
    var height = $(window).height() - $("#head").height()/2;
    $("#content").height(height + "px");
    var width = $(window).width() - $("#menu").width();
    $("#content").width(width + "px");
    // console.log(height)
    // console.log(width)

}

