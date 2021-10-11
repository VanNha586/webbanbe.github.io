$('.btn_themsk').click(function() {
    console.log('btn_them');
    var mask = $('.txtmask').val(); //lay gia i tu ô nhập liệu mã thể loại
    var tensk = $('.txttensk').val();
    var noitochuc = $('.txtntcsk').val();

    var thoigian = $('.txttgsk').val();

    if (mask == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Mã sự kiện khác khoảng trống');
    } else if (noitochuc == '') {
        alert_info('Nơi tổ chức khác khoảng trống');
    } else {
        var datasend = {
            event: 'insertsk',
            mask: mask,
            tensk: tensk,
            noitochuc: noitochuc,
            thoigian: thoigian,
        };
        queryDataGET_JSON('php/sukien.php', datasend, function(res) {
            console.log(res);
            if (res['insertsk'] == 1) {
                alert_info('Thêm thành công');
                builddssukien(sukien_current, recordsukien); // sukien_current
                $('.txtmask').val('');
                $('.txttensk').val('');
                $('.txtntcsk').val('');
                $('.txttgsk').val('');
            } else {
                alert_error('Thêm không thành công');
            }
        });
    }
});

// ==============================================================
$('.btn_xoask').click(function() {
    console.log('btn_xóa');
    var mask = $('.txtmask').val(); //lay gia i tu ô nhập liệu mã thể loại
    var tensk = $('.txttensk').val();
    var noitochuc = $('.txtntcsk').val();

    var thoigian = $('.txttgsk').val();

    if (mask == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Mã sk khác khoảng trống');
    } else {
        bootbox.confirm('Bạn có chắc xóa  ' + mask + ' không?', function(result) {
            if (result == true) {
                //nếu nhấn ok
                var datasend = {
                    event: 'deletesk',
                    mask: mask,
                };
                queryDataGET_JSON('php/sukien.php', datasend, function(res) {
                    console.log(res);
                    if (res['deletesk'] == 1) {
                        alert_info('Xóa thành công' + sukien_current);
                        builddssukien(sukien_current, recordsukien);

                        $('.txtmask').val('');
                        $('.txttensk').val('');
                        $('.txtntcsk').val('');
                        $('.txttgsk').val('');
                    } else {
                        alert_error('Xóa không thành công');
                    }
                });
            } //Nếu nhấn cancel
            else {}
        });
    }
});

$('.btn_suask').click(function() {
    console.log('btn_suask');
    var mask = $('.txtmask').val(); //lay gia i tu ô nhập liệu mã thể loại
    var tensk = $('.txttensk').val();
    var noitochuc = $('.txtntcsk').val();

    var thoigian = $('.txttgsk').val();
    bootbox.confirm(
        'Bạn có chắc sửa sự kiện ' + mask + ' không?',
        function(result) {
            if (result == true) {
                //nếu nhấn ok
                var datasend = {
                    event: 'updatesk',
                    mask: mask,
                    tensk: tensk,
                    noitochuc: noitochuc,
                    thoigian: thoigian,
                };
                queryDataGET_JSON('php/sukien.php', datasend, function(res) {
                    console.log(res);
                    if (res['updatesk'] == 1) {
                        alert_info('Sửa thành công' + sukien_current);
                        builddssukien(sukien_current, recordsukien);
                        $('.txtmask').val('');
                        $('.txttensk').val('');
                        $('.txtntcsk').val('');
                        $('.txttgsk').val('');
                    } else {
                        alert_error('Sửa không thành công');
                    }
                });
            } //Nếu nhấn cancel
            else {}
        }
    );
});

function builddssukien(page, record) {
    var dataSend = {
        event: 'getDSsukien',
        page: page,
        record: record,
    };

    $('.listdssukien').html(
        "<img src='images/loading.gif' width='30px' height='30px'/>"
    );
    queryDataGET_JSON('php/sukien.php', dataSend, function(res) {
        $('.listdssukien').html('');
        buildHTMLsukienData(res);
        // alert_info('Da lay du lieu duoc' + res);
    });
}

var resallsukien; //mang

/* -------------------------------------------------------------------------- */
/*                     hien thi du lieu json lay tu server                    */
/* -------------------------------------------------------------------------- */

function buildHTMLsukienData(res) {
    if (res.total == 0) {
        $('.listdssukien').html('Chưa có nội dung');
    } else {
        var data = res.items;

        resallsukien = data;
        var stt = 1;
        var currentpage = parseInt(res.page);
        stt = printSTT(recordsukien, currentpage);
        var html = '';
        var vt = 0;
        for (item in data) {
            var list = data[item];
            html =
                html +
                '<tr data-mask="' +
                list.mask +
                '" data-tensk="' +
                list.tensk +
                '"  data-noitochuc="' +
                list.noitochuc +
                '" data-tg="' +
                list.thoigian +
                '">' +
                '<td>' +
                stt +
                '</td>' +
                '<td>' +
                list.mask +
                '</td>' +
                '<td>' +
                list.tensk +
                '</td>' +
                '<td>' +
                list.noitochuc +
                '</td>' +
                '<td>' +
                list.thoigian +
                '</td>' +
                '<td class="click_sua_su_kien"><i class="fa fa-eye"></i></td>' +
                '</tr>';
            stt++;

            $('.listdssukien').html(html);
        }
        buildSlidePage($('.pagenumbersukien'), 5, res.page, res.totalpage);
    }
}
var sukien_current = 0;
$('.pagenumbersukien').on('click', 'button', function() {
    sukien_current = $(this).val();
    builddssukien($(this).val(), recordsukien);
});

$('.listdssukien').on('click', '.click_sua_su_kien', function() {
    var mask = $(this).parents('tr').attr('data-mask');
    var tensk = $(this).parents('tr').attr('data-tensk');
    var noitochuc = $(this).parents('tr').attr('data-noitochuc');
    var thoigian = $(this).parents('tr').attr('data-tg');

    $('.txtmask').val([mask]);

    $('.txttensk').val([tensk]);

    $('.txtntcsk').val([noitochuc]);

    $('.txttgsk').val([thoigian]);
});