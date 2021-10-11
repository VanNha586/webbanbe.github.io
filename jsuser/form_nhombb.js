$('.btn_themnhombb').click(function() {
    console.log('btn_themnhombb');
    var tennhom = $('.txttenn').val(); //lay gia i tu ô nhập liệu mã thể loại
    var sothanhvien = $('.txtsotv').val();
    var motanhom = $('.txtmtnhom').val();

    if (tennhom == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Họ và tên khác khoảng trống');
        // } else if (diachi == '') {
        // alert_info('Địa chỉ khác khoảng trống');
    } else {
        var datasend = {
            event: 'insertnbb',
            tennhom: tennhom,
            sothanhvien: sothanhvien,
            motanhom: motanhom,
        };
        queryDataGET_JSON('php/nhombb.php', datasend, function(res) {
            console.log(res);
            if (res['insertnbb'] == 1) {
                alert_info('Thêm thành công');
                builddsnhombb(nhombb_current, recordnhombb); // banbe_current
                $('.txttenn').val('');
                $('.txtsotv').val('');
                $('.txtmtnhom').val('');
            } else {
                alert_error('Thêm không thành công');
            }
        });
    }
});
// ==============================================================

$('.btn_xoanhombb').click(function() {
    console.log('btn_xóanbb');
    var tennhom = $('.txttenn').val(); //lay gia i tu ô nhập liệu mã thể loại

    if (tennhom == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Tên nhóm khác khoảng trống');
    } else {
        bootbox.confirm(
            'Bạn có chắc xóa nhóm bạn bè ' + tennhom + ' không?',
            function(result) {
                if (result == true) {
                    //nếu nhấn ok
                    var datasend = {
                        event: 'deletenbb',
                        tennhom: tennhom,
                    };
                    queryDataGET_JSON('php/nhombb.php', datasend, function(res) {
                        console.log(res);
                        if (res['deletenbb'] == 1) {
                            alert_info('Xóa thành công' + nhombb_current);
                            builddsnhombb(nhombb_current, recordnhombb);

                            $('.txttenn').val('');
                            $('.txtsotv').val('');
                            $('.txtmtnhom').val('');
                        } else {
                            alert_error('Xóa không thành công');
                        }
                    });
                } //Nếu nhấn cancel
                else {}
            }
        );
    }
});

$('.btn_suanhombb').click(function() {
    console.log('btn_suanbb');
    var tennhom = $('.txttenn').val(); //lay gia i tu ô nhập liệu mã thể loại
    var sothanhvien = $('.txtsotv').val();
    var motanhom = $('.txtmtnhom').val();

    bootbox.confirm(
        'Bạn có chắc sửa tên nhóm ' + tennhom + ' không?',
        function(result) {
            if (result == true) {
                //nếu nhấn ok
                var datasend = {
                    event: 'updatenbb',
                    tennhom: tennhom,
                    sothanhvien: sothanhvien,
                    motanhom: motanhom,
                };
                queryDataGET_JSON('php/nhombb.php', datasend, function(res) {
                    console.log(res);
                    if (res['updatenbb'] == 1) {
                        alert_info('Sửa thành công' + nhombb_current);
                        builddsnhombb(nhombb_current, recordnhombb);
                        $('.txttenn').val('');
                        $('.txtsotv').val('');
                        $('.txtmtnhom').val('');
                    } else {
                        alert_error('Sửa không thành công');
                    }
                });
            } //Nếu nhấn cancel
            else {}
        }
    );
});

function builddsnhombb(page, record) {
    var dataSend = {
        event: 'getDSnhombb',
        page: page,
        record: record,
    };

    $('.listdsnhombb').html(
        "<img src='images/loading.gif' width='30px' height='30px'/>"
    );
    queryDataGET_JSON('php/nhombb.php', dataSend, function(res) {
        $('.listdsnhombb').html('');
        buildHTMLnhombbData(res);
        // alert_info('Da lay du lieu duoc' + res);
    });
}

var resallnhombb; //mang
//hien thi du lieu json lay tu server
function buildHTMLnhombbData(res) {
    if (res.total == 0) {
        $('.listdsnhombb').html('Chưa có nội dung');
    } else {
        var data = res.items;

        resallnhombb = data;
        var stt = 1;
        var currentpage = parseInt(res.page);
        stt = printSTT(recordnhombb, currentpage);
        var html = '';
        var vt = 0;
        for (item in data) {
            var list = data[item];
            html =
                html +
                '<tr data-tennhom="' +
                list.tennhom +
                '" data-sotv="' +
                list.sothanhvien +
                '" data-mota="' +
                list.motanhom +
                '">' +
                '<td>' +
                stt +
                '</td>' +
                '<td>' +
                list.tennhom +
                '</td>' +
                '<td>' +
                list.sothanhvien +
                '</td>' +
                '<td>' +
                list.motanhom +
                '</td>' +
                '<td class="click_sua_nhombb"><i class="fa fa-eye"></i></td>' +
                '</tr>';
            stt++;

            $('.listdsnhombb').html(html);
        }
        buildSlidePage($('.pagenumbernhombb'), 5, res.page, res.totalpage);
    }
}
var nhombb_current = 0;
$('.pagenumbernhombb').on('click', 'button', function() {
    nhombb_current = $(this).val();
    builddsnhombb($(this).val(), recordnhombb);
});

$('.listdsnhombb').on('click', '.click_sua_nhombb', function() {
    var tennhom = $(this).parents('tr').attr('data-tennhom');
    var sothanhvien = $(this).parents('tr').attr('data-sotv');
    var motanhom = $(this).parents('tr').attr('data-mota');

    $('.txttenn').val([tennhom]);

    $('.txtsotv').val([sothanhvien]);
    $('.txtmtnhom').val([motanhom]);
});