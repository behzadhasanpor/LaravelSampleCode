$(document).ready(()=>{
    searchWriterCars()
    searchPhotographerImages()
    $(".pagination").find("li").addClass('page-item').addClass('')
    $(".pagination").find("li").find('a').addClass('page-link')
    $(".pagination").find("li").find('span').addClass('page-link')
})
$("#image-collection-btn").click(() => {
    makeImageCollectionDiv()
});
var collectionFlag=false;
function makeImageCollectionDiv() {
    if(collectionFlag==false){
        var collection=$("<div></div>")
        var search=$("<div></div>")
        var content=$("<div></div>")
        $(search).addClass('image-collection-search-place')
        $(search).html(`<br><button id='image-collection-btn' onclick="makeImageCollectionDiv()" class='button info'>بستن</button><br><input class='input-lg' type='search' id='image-collection-search' onkeyup='searchImage()'
                                placeholder='نام عکس جهت جستجو' autofocus ><br>`)
        $(content).addClass('image-collection-content-place')
        $(search).html()
        $(collection).addClass('image-collection')
        $(collection).append(search)
        $(collection).append(content)
        $('body').append(collection)
        imageCollectionAjax()
        $('body').css('overflow','hidden')
        collectionFlag=true;
    }else if(collectionFlag==true){
        $('.image-collection').remove()
        $("#image-collection-search").css('display','none')
        $('body').css('overflow','auto')
        collectionFlag=false;
    }
}
function searchImage(){
    imageCollectionAjax()
}
function imageCollectionAjax(){
    $.ajax({
        method  : "GET",
        url     : siteURL+"/user/images",
        data    : {name:$("#image-collection-search").val()},
        success : (data)=>{
            let innerHTML="<div class='row'><br>"
            data.forEach((image)=>{
                innerHTML+=`<div class='cell-2'>
                                <div class=thumbnail>
                                    <a href='${siteURL+'/'+image.path}'>
                                        <img src='${siteURL+'/'+image.path}' alt='Lights' style='width:100%'>
                                    </a>
                                    <div class='caption'>
                                        <h5 class='card-title'>${image.name}</h5>
                                        <button class='button info' id='image-collection-btn-copy' onclick='copyUrl(this,"${siteURL+'/'+image.path}","${image.name}")' >copy to clipboard</button>
                                    </div>
                                </div>
                            </div>`
            })
            $(".image-collection-content-place").html(innerHTML)
        },
        dataType:"json"
    })
}
function copyUrl(elem,path,name) {
    let img=`<br><div class="img-container"><img src="${path}"><div class="image-overlay"><h2 class="text-light">${name}</h2></div></div><br>`;
    copyToClipboard(img);
}
function copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
function toggleVisibility(el,id,creator) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method  : "PATCH",
        url     : siteURL+"/articles/comments/"+id+"/"+creator,
        data    : {visibility:(el.checked)?1:0},
        success : (data)=> {
            if(data=="TRUE"){
                $(el).prop('checked',true)
            }else if(data=="FALSE"){
                $(el).prop('checked','')
            }
        }
    })
}
function searchWriterCars(){
    getWriterCarsAjax()
}
function getWriterCarsAjax(){
    $.ajax({
        url     : siteURL+"/user/writer/cars/ajax",
        method  : "GET",
        data    : {name:$("#search-cars").val()},
        dataType:"JSON",
        success : (data) => {
            let innerHTML=''

            data.forEach((car)=>{
                let url= (car['image_path']!=null)?(siteURL+'/'+car['image_path']):"https://image.flaticon.com/icons/svg/741/741407.svg"
                    innerHTML+=`<li class="cell-2">
                                    <figure class="text-center">
                                        <div class="img-container thumbnail">
                                            <img src="${url}" alt="${car['name']}">
                                            <a href="${siteURL+"/user/writer/cars/"+car['id']+"/"+car['name']}">ویرایش</a><br>
                                            <button class="button bg-danger" onclick="delete_car(this,'${car['id']}','${car['name']}')">
                                                حذف اتومبیل
                                            </button>
                                        </div>
                                            <figcaption class="painting-name">${car['name']}</figcaption>
                                    </figure>
                                </li>`
            })
            $("#cars").html(innerHTML)
        }
    })
}
function delete_car(el,id,name) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method  : "DELETE",
        url     : siteURL+"/user/writer/cars/"+id+"/"+name,
        success : ()=> {
            searchWriterCars()
        }
    })
}
function searchPhotographerImages(){
    getPhotographerImagesAjax()
}
function getPhotographerImagesAjax(page=0){
    $.ajax({
        url     : siteURL+"/user/photographer/ajax",
        method  : "GET",
        data    : {name:$("#search-images").val(),page:page},
        dataType:"JSON",
        success : (data) => {
            let innerHTML='<div class="row">'

            data['data'].forEach((image)=>{
                let url= (image['path']!=null)?(siteURL+'/'+image['path']):"https://image.flaticon.com/icons/svg/741/741407.svg"
                innerHTML+=`<li class="cell-2">
                                    <figure class="text-center"><div class="img-container thumbnail">
                                            <img src="${url}" alt="${image['name']}">
                                            <button class="button bg-danger" onclick="delete_image(this,'${image['id']}','${image['name']}')">
                                                حذف عکس
                                            </button>
                                        </div>
                                            <figcaption class="painting-name">${image['name']}</figcaption>
                                    </figure>
                                </li>`
            })
            innerHTML+="</div><br><div>"
            if(data['last_page']>1){

                innerHTML+=`<ul class="pagination">`
                if(data['current_page']!=data['start_page']) {
                    innerHTML += `<li class="page-item service"><button class="button success" onclick="getPhotographerImagesAjax('${data['curent_page']-1}')"><span class="mif-chevron-thin-right icon"></span></button></li>`
                }
                innerHTML+=`<li class="page-item"><button class="button info" onclick="getPhotographerImagesAjax('1')">1</button></li>`

                if(data['last_page']>5){
                    for(var i=data['from']+1 ; i <= data['from']+2;i++){
                        let active='';
                        if(data['current_path']==i){
                            active='active';
                        }
                        innerHTML+=`
                        <li class="page-item ${active}"><button class="button info" onclick="getPhotographerImagesAjax('${i}')">${i}</button></li>
                            `
                    }
                    for(var i=data['last_page']-2 ; i <= data['last_page'];i++){
                        let active='';
                        if(data['current_path']==i){
                            active='active';
                        }
                        innerHTML+=`
                        <li class="page-item ${active}"><button class="button info" onclick="getPhotographerImagesAjax('${i}')">${i}</button></li>
                            `
                    }

                }else if(data['last_page']<=5){
                    let active='';
                    if(data['current_path']==i){
                        active='active';
                    }
                    for(var i=data['from']+1 ; i <= data['last_page'];i++){
                        innerHTML+=`
                        <li class="page-item ${active}"><button class="button info" onclick="getPhotographerImagesAjax('${i}')">${i}</button></li>
                            `
                    }
                }


                if(data['current_page']!=data['last_page']){
                    innerHTML+=`<li class="page-item service"><button class="button dark" onclick="getPhotographerImagesAjax('${data['current_page']+1}')"><span class="mif-chevron-thin-left icon"></span></button></li>`
                }
                innerHTML+="</ul></div>"

            }

            $("#images").html(innerHTML)
        }
    })
}
function delete_image(el,id,name) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method  : "DELETE",
        url     : siteURL+"/user/photographer/"+id+"/"+name,
        success : ()=> {
            searchPhotographerImages()
        }
    })
}
function brand1Change(el) {
    $("#auto1").find('option').remove()
    $.ajax({
        url :   siteURL+"/brands/ajax",
        method :    "GET",
        data    : {current_brand:$(el).find(":selected").val()},
        dataType:"JSON",
        success : (data)=>{
            let innerHTML=''
            data.forEach((car)=>{
                innerHTML+=`<option value="${car['id']}">${car['name']}</option>`
            })
            var select=$("#auto1").data('select')
            select.data(innerHTML)
        }
    })

}
function brand2Change(el) {
    $("#auto2").find('option').remove()
    $.ajax({
        url :   siteURL+"/brands/ajax",
        method :    "GET",
        data    : {current_brand:$(el).find(":selected").val()},
        dataType:"JSON",
        success : (data)=>{
            let innerHTML=''
            data.forEach((car)=>{
                innerHTML+=`<option value="${car['id']}">${car['name']}</option>`
            })
            var select=$("#auto2").data('select')
            select.data(innerHTML)
        }
    })

}
function toggleCarVote(el,id,name) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method  : "PATCH",
        url     : siteURL+"/votes/car/"+id+'/'+name,
        data    : {vote:(($(el).find('span').hasClass("mif-star-full")))?1:0},
        success : (data)=> {
            toggleVoteSuccess(el,data)
        }
    })
}
function toggleArticleVote(el,id,title) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method  : "PATCH",
        url     : siteURL+"/votes/article/"+id+'/'+title,
        data    : {vote:(($(el).find('span').hasClass("mif-star-full")))?1:0},
        success : (data)=> {
            toggleVoteSuccess(el,data)
        }
    })
}
function toggleUserVote(el,id,first_name) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        method  : "PATCH",
        url     : siteURL+"/votes/user/"+id+'/'+first_name,
        data    : {vote:(($(el).find('span').hasClass("mif-star-full")))?1:0},
        success : (data)=> {
            toggleVoteSuccess(el,data)
        }
    })
}
function toggleVoteSuccess(el,data) {
    if(data=="f2e"){
        $(el).find('span').removeClass("mif-star-full")
        $(el).find('span').addClass('mif-star-empty')
        let n=parseInt($(el).next('button').text())
        $(el).next('button').text(n-1)
    }else if(data=='e2f'){
        $(el).find('span').removeClass('mif-star-empty')
        $(el).find('span').addClass('mif-star-full')
        let n=parseInt($(el).next('button').text())
        $(el).next('button').text(n+1)
    }
}