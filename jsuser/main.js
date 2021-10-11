var recordbanbe = 3;
var recordphanloai = 3;
var recordsothich = 3;
var recordsukien = 3;
var recordnhombb = 3;
var recordsearch = 3;
var recordcongviec = 2;

/* -------------------------------------------------------------------------- */
/*                                   bạn bè                                   */
/* -------------------------------------------------------------------------- */

$('.menu_banbe').click(function() {
    console.log('click menu banbe');
    //gọi hàm swapmain

    swapmain('form_banbe');
    var html =
        '<li><a href="#">' +
        '<i class="fa fa-home">' +
        '</i> Danh mục</a></li>' +
        '<li class="active">&nbsp; &gt; &nbsp;Bạn bè</li>';
    $('.titlebreadcrumb').html(html);
    // builddstheloai(0, recordtheloai); //
    builddsbanbe(0, recordbanbe);
});

/* -------------------------------------------------------------------------- */
/*                                  phân loai                                 */
/* -------------------------------------------------------------------------- */

$('.menu_phanloai').click(function() {
    console.log('click menu_phanloai');

    /* ---------------------------- gọi hàm swapmain ---------------------------- */

    swapmain('form_phanloai');
    var html =
        '<li><a href="#">' +
        '<i class="fas fa-0">' +
        '</i>Danh mục</a></li>' +
        '<li class="active">&nbsp; &gt; &nbsp;Phân loại</li>';
    $('.titlebreadcrumb').html(html);

    /* ------------------ builddstheloai(0, recordtheloai); // ------------------ */

    builddsphanloai(0, recordphanloai);
});

/* -------------------------------------------------------------------------- */
/*                                  sở thích                                  */
/* -------------------------------------------------------------------------- */
$('.menu_sothich').click(function() {
    console.log('click menu sothich');
    //gọi hàm swapmain

    swapmain('form_sothich');
    var html =
        '<li><a href="#">' +
        '<i class="fa fa-home">' +
        '</i> Danh mục</a></li>' +
        '<li class="active">&nbsp; &gt; &nbsp;Sở thích</li>';
    $('.titlebreadcrumb').html(html);
    // builddstheloai(0, recordtheloai); //
    builddssothich(0, recordsothich);
});

/* -------------------------------------------------------------------------- */
/*                               !Click sự kiện                               */
/* -------------------------------------------------------------------------- */
$('.menu_sukien').click(function() {
    console.log('click menu sukien');
    //gọi hàm swapmain

    swapmain('form_sukien');
    var html =
        '<li><a href="#">' +
        '<i class="fa fa-home">' +
        '</i> Danh mục</a></li>' +
        '<li class="active">&nbsp; &gt; &nbsp;Sự kiện</li>';
    $('.titlebreadcrumb').html(html);
    // builddstheloai(0, recordtheloai); //
    builddssukien(0, recordsukien);
});
/* -------------------------------------------------------------------------- */
/*                                 nhóm bạn bè                                */
/* -------------------------------------------------------------------------- */
$('.menu_nhombb').click(function() {
    console.log('click menu nhombb');
    //gọi hàm swapmain

    swapmain('form_nhombb');
    var html =
        '<li><a href="#">' +
        '<i class="fa fa-home">' +
        '</i> Danh mục</a></li>' +
        '<li class="active">&nbsp; &gt; &nbsp;Nhóm bạn bè</li>';
    $('.titlebreadcrumb').html(html);
    // builddstheloai(0, recordtheloai); //
    builddsnhombb(0, recordnhombb);
});

/* ----------------------------------- .. ----------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  tìm kiếm                                  */
/* -------------------------------------------------------------------------- */
$('.menu_search').click(function() {
    console.log('click menu search');
    //gọi hàm swapmain
    swapmain('menu_search');
    var html =
        '<li><a href="#">' +
        '<i class="fa fa-home">' +
        '</i></a></li>' +
        '<li class="active">&nbsp; &gt; &nbsp; Nhóm bạn bè</li>';
    $('.titlebreadcrumb').html(html);
    builddssukien(0, recordsukien);
});

/* -------------------------------------------------------------------------- */
/*                                  Công việc                                 */
/* -------------------------------------------------------------------------- */
$('.menu_congviec').click(function() {
    console.log('click menu congviec');
    //gọi hàm swapmain

    swapmain('form_congviec');
    var html =
        '<li><a href="#">' +
        '<i class="fa fa-home">' +
        '</i> Danh mục</a></li>' +
        '<li class="active">&nbsp; &gt; &nbsp;Công việc</li>';
    $('.titlebreadcrumb').html(html);
    // builddstheloai(0, recordtheloai); //
    builddscongviec(0, recordcongviec);
});
$('.menu_sothich').click(function() {
    swapmain('form_sothich');
});
$('.menu_sukien').click(function() {
    swapmain('form_sukien');
});

function swapmain(main) {
    $('.form_banbe').addClass('is-hidden');
    $('.form_search').addClass('is-hidden');
    $('.form_sothich').addClass('is-hidden');
    $('.form_sukien').addClass('is-hidden');
    $('.' + main).removeClass('is-hidden');
}

function alert_info(mes) {
    bootbox.alert({
        size: 'small',
        title: 'Thanh cong',
        message: mes,
        callback: function() {},
    });
}

function alert_error(mes) {
    bootbox.alert({
        size: 'small',
        title: "<span style='color: red'>Thất bại</span>",
        message: mes,
        callback: function() {
            /* your callback code */
        },
    });
}

function queryDataPOST(url, dataSend, callback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'json',
        success: callback,
    });
}

function queryDataGET_TEXT(url, dataSend, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'text',
        success: callback,
    });
}

function queryDataPOST_TEXT(url, dataSend, callback) {
    $.ajax({
        type: 'POST',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'text',
        success: callback,
    });
}

function queryDataGET_JSON(url, dataSend, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        data: dataSend,
        async: true,
        dataType: 'JSON',
        success: callback,
    });
}

function printSTT(record, pageCurr) {
    if (pageCurr + 1 == 1) {
        return 1;
    } else {
        return record * (pageCurr + 1) - (record - 1);
    }
}

function buildSlidePage(obj, codan, pageActive, totalPage) {
    var html = '';
    pageActive = parseInt(pageActive);
    for (i = 1; i <= codan; i++) {
        if (pageActive - i < 0) break;
        html =
            '<button type="button" class="btn btn-outline btn-default" value="' +
            (pageActive - i) +
            '">' +
            (pageActive - i + 1) +
            '</button>' +
            html;
    }
    if (pageActive > codan) {
        html =
            '<button type="button" class="btn btn-outline btn-default" value="' +
            (pageActive - i) +
            '">...</button>' +
            html;
    }
    html +=
        '<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="' +
        pageActive +
        '">' +
        (pageActive + 1) +
        '</button>';
    for (i = 1; i <= codan; i++) {
        if (pageActive + i >= totalPage) break;
        html =
            html +
            '<button  type="button" class="btn btn-outline btn-default" value="' +
            (pageActive + i) +
            '">' +
            (pageActive + i + 1) +
            '</button>';
    }
    if (totalPage - pageActive > codan + 1) {
        html =
            html +
            '<button type="button" value="' +
            (pageActive + i) +
            '" class="btn btn-outline btn-default">...</button>';
    }
    obj.html(html);
}