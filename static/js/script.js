var canvas = document.getElementById('mycanvas');
if (!canvas || !canvas.getContext) {
    $("#save").prop("disabled", true);
    $("#erace").prop("disabled", true);
}
var ctx = canvas.getContext('2d');
ctx.lineWidth = 10;
ctx.strokeStyle = "white";
ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var gif = $('<img>').attr({
    width: 50,
    height: 50,
    src: '../static/images/gif-load.gif'
});

var startX, startY, x, y, borderWidth = 10, isDrawing = false;
$('#mycanvas').mousedown(function(e) {
    isDrawing = true;
    startX = e.pageX - $(this).offset().left - borderWidth;
    startY = e.pageY - $(this).offset().top - borderWidth;
})
.mousemove(function(e) {
    if (!isDrawing) return;
    x = e.pageX - $(this).offset().left - borderWidth;
    y = e.pageY - $(this).offset().top - borderWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();
    startX = x;
    startY = y;
})
.mouseup(function() {
    isDrawing = false;
})
.mouseleave(function() {
    isDrawing = false;
});

$('#erase').click(function() {
    if (!confirm('You sure?')) return;
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});
$('#save').click(function() {
    var base64data = canvas.toDataURL().split(',')[1];
    var data = atob(base64data);
    var buff = new ArrayBuffer(data.length);
    var arr = new Uint8Array(buff);
    var image = canvas.toDataURL("image/png")
    var blob, i, dataLen;

    $('#gallery').append(gif.attr("id", "loading"));

    $("#save").prop("disabled", true);

    // blobの生成
    for( i = 0, dataLen = data.length; i < dataLen; i++){
        arr[i] = data.charCodeAt(i);
    }
    blob = new Blob([arr], {type: 'image/png'});

    formdata = new FormData();
    formdata.append('image', blob);

    $.ajax({
        type: "POST",
        url: '/upload',
        dataType: 'json',
        processData : false,
        contentType : false,
        data: formdata,
        success: function(result) {
            console.dir(result);
            if (!result.passed) return;

            $("#result").empty();
            $('#result').text("その数字は " + result.recog + " ですね？");
            $("#save").prop("disabled", false);
            var img = $('<img>').attr({
                width: 100,
                height: 50,
                src: canvas.toDataURL()
            });
            $('img').remove("#loading");
            $('#gallery').append(img.addClass('thumbnail'));
            ctx.fillStyle = 'rgb(0,0,0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
        error: function() {
            $('img').remove("#loading");
            $('#result').text("通信に失敗しました。。。");
            $("#save").prop("disabled", false);
            console.dir("error");
        }
    });
});
