$('.btn_themsothich').click(function() {
    console.log('btn_them');
    var mast = $('.txtmast').val(); //lay gia i tu ô nhập liệu mã thể loại
    var tenst = $('.txttenst').val();

    if (mast == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Họ và tên khác khoảng trống');
        // } else if (diachi == '') {
        // alert_info('Địa chỉ khác khoảng trống');
    } else {
        var datasend = {
            event: 'insertst',
            mast: mast,
            tenst: tenst,
        };
        queryDataGET_JSON('php/sothich.php', datasend, function(res) {
            console.log(res);
            if (res['insertst'] == 1) {
                alert_info('Thêm thành công');
                builddssothich(sothich_current, recordsothich); // banbe_current
                $('.txtmast').val('');
                $('.txttenst').val('');
            } else {
                alert_error('Thêm không thành công');
            }
        });
    }
});
// ==============================================================

$('.btn_xoasothich').click(function() {
    console.log('btn_xóa');
    var mast = $('.txtmast').val(); //lay gia i tu ô nhập liệu mã thể loại
    var tenst = $('.txttenst').val();

    if (mast == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Họ và tên khác khoảng trống');
    } else {
        bootbox.confirm(
            'Bạn có chắc xóa thể loại ' + mast + ' không?',
            function(result) {
                if (result == true) {
                    //nếu nhấn ok
                    var datasend = {
                        event: 'deletest',
                        mast: mast,
                    };
                    queryDataGET_JSON('php/sothich.php', datasend, function(res) {
                        console.log(res);
                        if (res['deletest'] == 1) {
                            alert_info('Xóa thành công' + sothich_current);
                            builddssothich(sothich_current, recordsothich);
                            // $('.txtmabb').val('');
                            // $('.txttenbb').val('');
                            $(mast) = val('');
                            $(tenst) = val('');
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

$('.btn_suasothich').click(function() {
    console.log('btn_sua');
    var mast = $('.txtmast').val(); //lay gia i tu ô nhập liệu mã thể loại
    var tenst = $('.txttenst').val();

    bootbox.confirm(
        'Bạn có chắc sửa thể loại ' + mast + ' không?',
        function(result) {
            if (result == true) {
                //nếu nhấn ok
                var datasend = {
                    event: 'updatest',
                    mast: mast,
                    tenst: tenst,
                };
                queryDataGET_JSON('php/sothich.php', datasend, function(res) {
                    console.log(res);
                    if (res['updatest'] == 1) {
                        alert_info('Sửa thành công' + sothich_current);
                        builddssothich(sothich_current, recordsothich);
                        $('.txtmast').val('');
                        $('.txttenst').val('');
                    } else {
                        alert_error('Sửa không thành công');
                    }
                });
            } //Nếu nhấn cancel
            else {}
        }
    );
});

function builddssothich(page, record) {
    var dataSend = {
        event: 'getDSsothich',
        page: page,
        record: record,
    };

    $('.listdssothich').html(
        "<img src='images/loading.gif' width='30px' height='30px'/>"
    );
    queryDataGET_JSON('php/sothich.php', dataSend, function(res) {
        $('.listdssothich').html('');
        buildHTMLsothichData(res);
        // alert_info('Da lay du lieu duoc' + res);
    });
}

var resallsothich; //mang
//hien thi du lieu json lay tu server
function buildHTMLsothichData(res) {
    if (res.total == 0) {
        $('.listdssothich').html('Chưa có nội dung');
    } else {
        var data = res.items;

        resallsothich = data;
        var stt = 1;
        var currentpage = parseInt(res.page);
        stt = printSTT(recordsothich, currentpage);
        var html = '';
        var vt = 0;
        for (item in data) {
            var list = data[item];
            html =
                html +
                '<tr data-mast="' +
                list.mast +
                '" data-namest="' +
                list.tenst +
                '">' +
                '<td>' +
                stt +
                '</td>' +
                '<td>' +
                list.mast +
                '</td>' +
                '<td>' +
                list.tenst +
                '</td>' +
                '<td class="click_sua_so_thich"><i class="fa fa-eye"></i></td>' +
                '</tr>';
            stt++;

            $('.listdssothich').html(html);
        }
        buildSlidePage($('.pagenumbersothich'), 5, res.page, res.totalpage);
    }
}
var sothich_current = 0;
$('.pagenumbersothich').on('click', 'button', function() {
    sothich_current = $(this).val();
    builddssothich($(this).val(), recordsothich);
});

$('.listdssothich').on('click', '.click_sua_so_thich', function() {
    var mast = $(this).parents('tr').attr('data-mast');
    var tenst = $(this).parents('tr').attr('data-namest');

    $('.txtmast').val([mast]);

    $('.txttenst').val([tenst]);
});