




$(document).ready(function () {
    $('#news-demo').slippry({
        // general elements & wrapper
        slippryWrapper: '<div class="sy-box news-slider" />', // wrapper to wrap everything, including pager
        elements: 'article', // elments cointaining slide content

        // options
        adaptiveHeight: false, // height of the sliders adapts to current
        captions: false,

        // pager
        pagerClass: 'news-pager',

        // transitions
        transition: 'horizontal', // fade, horizontal, kenburns, false
        speed: 1200,
        pause: 8000,

        // slideshow
        autoDirection: 'prev'
    });



});


$("#image-collection-btn").click(() => {

    if($("#image-collection").html().trim()==''){

        $("#image-collection-btn").html('بستن');
        $("#image-collection").css('display','block')
        $("#image-collection-search").css('display','block')
        imageCollectionAjax()

    }else{
        $("#image-collection-btn").html('کلکسیون عکس');
        $("#image-collection").html("")
        $("#image-collection").css('display','none')
        $("#image-collection-search").css('display','none')
    }


});

function searchImage(){
    imageCollectionAjax()
}

function imageCollectionAjax(){
    $.ajax({
        method  : "GET",
        url     : siteURL+"/user/images",
        data    : {name:$("#image-collection-search").val()},
        success : (data)=>{
            // $("#image-collection").html(data)
            let innerHTML="<div class='row'>"
            data.forEach((image)=>{
                innerHTML+=`<div class='col-md-3'>
                                <div class=thumbnail>
                                    <a href='${siteURL+'/'+image.path}'>
                                        <img src='${siteURL+'/'+image.path}' alt='Lights' style='width:100%'>
                                    </a>
                                    <div class='caption'>
                                        <h5 class='card-title'>${image.name}</h5>
                                        <input  type='hidden' value="<br><img class='article-image' src='${siteURL+'/'+image.path}'>">
                                        <button class='btn btn-info' id='image-collection-btn-copy' onclick='copyUrl(this)' >کپی کد تصویر</button>
                                    </div>
                                </div>
                            </div>`
            })
            $("#image-collection").html(innerHTML)
        },
        dataType:"json"
    })
}
function copyUrl(elem) {
    copyToClipboard($(elem).siblings('input[type=hidden]').first())
}
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
}