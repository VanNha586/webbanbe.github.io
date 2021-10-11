$('.btn_thempl').click(function() {
    console.log('btn_them');
    var hovaten = $('.txthtpl').val(); //lay gia i tu ô nhập liệu mã thể loại
    var gioitinh = $('.txtgtpl').val();
    var quanhe = $('.txtqhpl').val();
    var tuoi = $('.txttpl').val();

    if (hovaten == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Họ và tên khác khoảng trống');
    } else if (quanhe == '') {
        alert_info('Quan hệ khác khoảng trống');
    } else {
        var datasend = {
            event: 'insertpl',
            hovaten: hovaten,
            gioitinh: gioitinh,
            quanhe: quanhe,
            tuoi: tuoi,
        };
        queryDataGET_JSON('php/phanloai.php', datasend, function(res) {
            console.log(res);
            if (res['insertpl'] == 1) {
                alert_info('Thêm thành công');
                builddsphanloai(phanloai_current, recordphanloai); // phanloai_current
                $('.txthtpl').val('');
                $('.txtgtpl').val('');
                $('.txtqhpl').val('');
                $('.txttpl').val('');
            } else {
                alert_error('Thêm không thành công');
            }
        });
    }
});

// ==============================================================
$('.btn_xoapl').click(function() {
    console.log('btn_xóa');
    var hovaten = $('.txthtpl').val(); //lay gia i tu ô nhập liệu mã thể loại
    var gioitinh = $('.txtgtpl').val();
    var quanhe = $('.txtqhpl').val();

    var tuoi = $('.txttpl').val();

    if (hovaten == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Họ và tên khác khoảng trống');
    } else {
        bootbox.confirm(
            'Bạn có chắc xóa  ' + hovaten + ' không?',
            function(result) {
                if (result == true) {
                    //nếu nhấn ok
                    var datasend = {
                        event: 'deletepl',
                        hovaten: hovaten,
                    };
                    queryDataGET_JSON('php/phanloai.php', datasend, function(res) {
                        console.log(res);
                        if (res['deletepl'] == 1) {
                            alert_info('Xóa thành công' + phanloai_current);
                            builddsphanloai(phanloai_current, recordphanloai);

                            $(hovaten) = val('');
                            $(gioitinh) = val('');
                            $(quanhe) = val('');
                            $(tuoi) = val('');
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

$('.btn_suapl').click(function() {
    console.log('btn_sua');
    var hovaten = $('.txthtpl').val(); //lay gia i tu ô nhập liệu mã thể loại
    var gioitinh = $('.txtgtpl').val();
    var quanhe = $('.txtqhpl').val();

    var tuoi = $('.txttpl').val();

    bootbox.confirm(
        'Bạn có chắc sửa thể loại ' + hovaten + ' không?',
        function(result) {
            if (result == true) {
                //nếu nhấn ok
                var datasend = {
                    event: 'updatepl',
                    hovaten: hovaten,
                    gioitinh: gioitinh,
                    quanhe: quanhe,

                    tuoi: tuoi,
                };
                queryDataGET_JSON('php/phanloai.php', datasend, function(res) {
                    console.log(res);
                    if (res['updatepl'] == 1) {
                        alert_info('Sửa thành công' + phanloai_current);
                        builddsphanloai(phanloai_current, recordphanloai);
                        $('.txthtpl').val('');
                        $('.txtgtpl').val('');
                        $('.txtqhpl').val('');

                        $('.txttpl').val('');
                    } else {
                        alert_error('Sửa không thành công');
                    }
                });
            } //Nếu nhấn cancel
            else {}
        }
    );
});

function builddsphanloai(page, record) {
    var dataSend = {
        event: 'getDSphanloai',
        page: page,
        record: record,
    };

    $('.listdsphanloai').html(
        "<img src='images/loading.gif' width='30px' height='30px'/>"
    );
    queryDataGET_JSON('php/phanloai.php', dataSend, function(res) {
        $('.listdsphanloai').html('');
        buildHTMLphanloaiData(res);
        // alert_info('Da lay du lieu duoc' + res);
    });
}

var resallphanloai; //mang

/* -------------------------------------------------------------------------- */
/*                     hien thi du lieu json lay tu server                    */
/* -------------------------------------------------------------------------- */

function buildHTMLphanloaiData(res) {
    if (res.total == 0) {
        $('.listdsphanloai').html('Chưa có nội dung');
    } else {
        var data = res.items;

        resallphanloai = data;
        var stt = 1;
        var currentpage = parseInt(res.page);
        stt = printSTT(recordphanloai, currentpage);
        var html = '';
        var vt = 0;
        for (item in data) {
            var list = data[item];
            html =
                html +
                '<tr data-htpl="' +
                list.hovaten +
                '" data-gtpl="' +
                list.gioitinh +
                '"  data-qhpl="' +
                list.quanhe +
                '" data-tpl="' +
                list.tuoi +
                '">' +
                '<td>' +
                stt +
                '</td>' +
                '<td>' +
                list.hovaten +
                '</td>' +
                '<td>' +
                list.gioitinh +
                '</td>' +
                '<td>' +
                list.quanhe +
                '</td>' +
                '<td>' +
                list.tuoi +
                '</td>' +
                '<td class="click_sua_the_loai"><i class="fa fa-eye"></i></td>' +
                '</tr>';
            stt++;

            $('.listdsphanloai').html(html);
        }
        buildSlidePage($('.pagenumberphanloai'), 5, res.page, res.totalpage);
    }
}
var phanloai_current = 0;
$('.pagenumberphanloai').on('click', 'button', function() {
    phanloai_current = $(this).val();
    builddsphanloai($(this).val(), recordphanloai);
});

$('.listdsphanloai').on('click', '.click_sua_the_loai', function() {
    var hovaten = $(this).parents('tr').attr('data-htpl');
    var gioitinh = $(this).parents('tr').attr('data-gtpl');
    var quanhe = $(this).parents('tr').attr('data-qhpl');
    var tuoi = $(this).parents('tr').attr('data-tpl');

    $('.txthtpl').val([hovaten]);

    $('.txtgtpl').val([gioitinh]);

    $('.txtqhpl').val([quanhe]);

    $('.txttpl').val([tuoi]);
});