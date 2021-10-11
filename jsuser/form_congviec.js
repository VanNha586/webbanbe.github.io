$('.btn_themcongviec').click(function() {
    console.log('btn_themcv');
    var tencongviec = $('.txttencv').val(); //lay gia i tu ô nhập liệu mã thể loại
    var trinhdo = $('.txttrinhdo').val();

    if (tencongviec == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Công việc khác khoảng trống');
        // } else if (diachi == '') {
        // alert_info('Địa chỉ khác khoảng trống');
    } else {
        var datasend = {
            event: 'insertcv',
            tencongviec: tencongviec,
            trinhdo: trinhdo,
        };
        queryDataGET_JSON('php/congviec.php', datasend, function(res) {
            console.log(res);
            if (res['insertcv'] == 1) {
                alert_info('Thêm thành công');
                builddscongviec(congviec_current, recordcongviec); // banbe_current
                $('.txttencv').val('');
                $('.txttrinhdo').val('');
            } else {
                alert_error('Thêm không thành công');
            }
        });
    }
});
// ==============================================================

$('.btn_xoacongviec').click(function() {
    console.log('btn_xóacv');
    var tencongviec = $('.txttencv').val(); //lay gia i tu ô nhập liệu mã thể loại
    var trinhdo = $('.txttrinhdo').val();

    if (tencongviec == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Tên công việc khác khoảng trống');
    } else {
        bootbox.confirm(
            'Bạn có chắc xóa công việc ' + tencongviec + ' không?',
            function(result) {
                if (result == true) {
                    //nếu nhấn ok
                    var datasend = {
                        event: 'deletecv',
                        tencongviec: tencongviec,
                    };
                    queryDataGET_JSON('php/congviec.php', datasend, function(res) {
                        console.log(res);
                        if (res['deletecv'] == 1) {
                            alert_info('Xóa thành công' + congviec_current);
                            builddscongviec(congviec_current, recordcongviec);
                            // $('.txtmabb').val('');
                            // $('.txttenbb').val('');
                            $(tencongviec) = val('');
                            $(trinhdo) = val('');
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

$('.btn_suacongviec').click(function() {
    console.log('btn_suacv');
    var tencongviec = $('.txttencv').val(); //lay gia i tu ô nhập liệu mã thể loại
    var trinhdo = $('.txttrinhdo').val();

    bootbox.confirm(
        'Bạn có chắc sửa trình độ công việc của ' + tencongviec + ' không?',
        function(result) {
            if (result == true) {
                //nếu nhấn ok
                var datasend = {
                    event: 'updatecv',
                    tencongviec: tencongviec,
                    trinhdo: trinhdo,
                };
                queryDataGET_JSON('php/congviec.php', datasend, function(res) {
                    console.log(res);
                    if (res['updatecv'] == 1) {
                        alert_info('Sửa thành công' + congviec_current);
                        builddscongviec(congviec_current, recordcongviec);
                        $('.txttencv').val('');
                        $('.txttrinhdo').val('');
                    } else {
                        alert_error('Sửa không thành công');
                    }
                });
            } //Nếu nhấn cancel
            else {}
        }
    );
});

function builddscongviec(page, record) {
    var dataSend = {
        event: 'getDScongviec',
        page: page,
        record: record,
    };

    $('.listdscongviec').html(
        "<img src='images/loading.gif' width='30px' height='30px'/>"
    );
    queryDataGET_JSON('php/congviec.php', dataSend, function(res) {
        $('.listdscongviec').html('');
        buildHTMLcongviecData(res);
        // alert_info('Da lay du lieu duoc' + res);
    });
}

var resallcongviec; //mang
//hien thi du lieu json lay tu server
function buildHTMLcongviecData(res) {
    if (res.total == 0) {
        $('.listdscongviec').html('Chưa có nội dung');
    } else {
        var data = res.items;

        resallcongviec = data;
        var stt = 1;
        var currentpage = parseInt(res.page);
        stt = printSTT(recordcongviec, currentpage);
        var html = '';
        var vt = 0;
        for (item in data) {
            var list = data[item];
            html =
                html +
                '<tr data-tencv="' +
                list.tencongviec +
                '" data-trinhdo="' +
                list.trinhdo +
                '">' +
                '<td>' +
                stt +
                '</td>' +
                '<td>' +
                list.tencongviec +
                '</td>' +
                '<td>' +
                list.trinhdo +
                '</td>' +
                '<td class="click_sua_cong_viec"><i class="fa fa-eye"></i></td>' +
                '</tr>';
            stt++;

            $('.listdscongviec').html(html);
        }
        buildSlidePage($('.pagenumbercongviec'), 5, res.page, res.totalpage);
    }
}
var congviec_current = 0;
$('.pagenumbercongviec').on('click', 'button', function() {
    congviec_current = $(this).val();
    builddscongviec($(this).val(), recordcongviec);
});

$('.listdscongviec').on('click', '.click_sua_cong_viec', function() {
    var tencongviec = $(this).parents('tr').attr('data-tencv');
    var trinhdo = $(this).parents('tr').attr('data-trinhdo');

    $('.txttencv').val([tencongviec]);

    $('.txttrinhdo').val([trinhdo]);
});