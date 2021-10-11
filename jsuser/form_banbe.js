$('.btn_them').click(function() {
    console.log('btn_them');
    var hovaten = $('.txtht').val(); //lay gia i tu ô nhập liệu mã thể loại
    var gioitinh = $('.txtgt').val();
    var tuoi = $('.txtt').val();

    var diachi = $('.txtdc').val();

    var Images = $('.txtI').val();

    if (hovaten == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Họ và tên khác khoảng trống');
    } else if (diachi == '') {
        alert_info('Địa chỉ khác khoảng trống');
    } else {
        var datasend = {
            event: 'insertbb',
            hovaten: hovaten,
            gioitinh: gioitinh,
            tuoi: tuoi,
            diachi: diachi,
            Images: Images,
        };
        queryDataGET_JSON('php/banbe.php', datasend, function(res) {
            console.log(res);
            if (res['insertbb'] == 1) {
                alert_info('Thêm thành công');
                builddsbanbe(banbe_current, recordbanbe); // banbe_current
                $('.txtht').val('');
                $('.txtgt').val('');
                $('.txtt').val('');
                $('.txtdc').val('');
                $('.txtI').val('');
            } else {
                alert_error('Thêm không thành công');
            }
        });
    }
});
// ==============================================================
// $('#upload').on('click', function() {
//     //Lấy ra files
//     var file_data = $('#file').prop('files')[0];
//     //lấy ra kiểu file
//     var type = file_data.type;
//     //Xét kiểu file được upload
//     var match = ['image/gif', 'image/png', 'image/jpg'];
//     //kiểm tra kiểu file
//     if (type == match[0] || type == match[1] || type == match[2]) {
//         //khởi tạo đối tượng form data
//         var form_data = new FormData();
//         //thêm files vào trong form data
//         form_data.append('file', file_data);
//         //sử dụng ajax post
//         $.ajax({
//             url: 'upload_anh.php', // gửi đến file upload.php
//             dataType: 'text',
//             cache: false,
//             contentType: false,
//             processData: false,
//             data: form_data,
//             type: 'post',
//             success: function(res) {
//                 $('.status').text(res);
//                 $('#file').val('');
//             },
//         });
//     } else {
//         $('.status').text('Chỉ được upload file ảnh');
//         $('#file').val('');
//     }
//     return false;
// });
// ==============================================================
$('.btn_xoa').click(function() {
    console.log('btn_xóa');
    var hovaten = $('.txtht').val(); //lay gia i tu ô nhập liệu mã thể loại
    var gioitinh = $('.txtgt').val();
    var tuoi = $('.txtt').val();

    var diachi = $('.txtdc').val();

    var Images = $('.txtI').val();
    if (hovaten == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Họ và tên khác khoảng trống');
    } else {
        bootbox.confirm(
            'Bạn có chắc xóa bạn bè ' + hovaten + ' không?',
            function(result) {
                if (result == true) {
                    //nếu nhấn ok
                    var datasend = {
                        event: 'deletebb',
                        hovaten: hovaten,
                    };
                    queryDataGET_JSON('php/banbe.php', datasend, function(res) {
                        console.log(res);
                        if (res['deletebb'] == 1) {
                            alert_info('Xóa thành công' + banbe_current);
                            builddsbanbe(banbe_current, recordbanbe);
                            // $('.txtmabb').val('');
                            // $('.txttenbb').val('');
                            $(hovaten) = val('');
                            $(gioitinh) = val('');
                            $(tuoi) = val('');
                            $(diachi) = val('');

                            $(Images) = val('');
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

$('.btn_sua').click(function() {
    console.log('btn_sua');
    var hovaten = $('.txtht').val(); //lay gia i tu ô nhập liệu mã thể loại
    var gioitinh = $('.txtgt').val();
    var tuoi = $('.txtt').val();

    var diachi = $('.txtdc').val();

    var Images = $('.txtI').val();
    bootbox.confirm(
        'Bạn có chắc sửa bạn bè ' + hovaten + ' không?',
        function(result) {
            if (result == true) {
                //nếu nhấn ok
                var datasend = {
                    event: 'updatebb',
                    hovaten: hovaten,
                    gioitinh: gioitinh,
                    tuoi: tuoi,
                    diachi: diachi,
                    Images: Images,
                };
                queryDataGET_JSON('php/banbe.php', datasend, function(res) {
                    console.log(res);
                    if (res['updatebb'] == 1) {
                        alert_info('Sửa thành công' + banbe_current);
                        builddsbanbe(banbe_current, recordbanbe);
                        $('.txtht').val('');
                        $('.txtgt').val('');
                        $('.txtt').val('');
                        $('.txtdc').val('');
                        $('.txtI').val('');
                    } else {
                        alert_error('Sửa không thành công');
                    }
                });
            } //Nếu nhấn cancel
            else {}
        }
    );
});

function builddsbanbe(page, record) {
    var dataSend = {
        event: 'getDSbanbe',
        page: page,
        record: record,
    };

    $('.listdsbanbe').html(
        "<img src='images/loading.gif' width='30px' height='30px'/>"
    );
    queryDataGET_JSON('php/banbe.php', dataSend, function(res) {
        $('.listdsbanbe').html('');
        buildHTMLbanbeData(res);
        // alert_info('Da lay du lieu duoc' + res);
    });
}

var resallbanbe; //mang
//hien thi du lieu json lay tu server
function buildHTMLbanbeData(res) {
    if (res.total == 0) {
        $('.listdsbanbe').html('Chưa có nội dung');
    } else {
        var data = res.items;

        resallbanbe = data;
        var stt = 1;
        var currentpage = parseInt(res.page);
        stt = printSTT(recordbanbe, currentpage);
        var html = '';
        var vt = 0;
        for (item in data) {
            var list = data[item];
            html =
                html +
                '<tr data-name="' +
                list.hovaten +
                '" data-gt="' +
                list.gioitinh +
                '"  data-t="' +
                list.tuoi +
                '" data-dc="' +
                list.diachi +
                '" data-I="' +
                list.Images +
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
                list.tuoi +
                '</td>' +
                '<td>' +
                list.diachi +
                '</td>' +
                '<td>' +
                list.Images +
                '</td>' +
                '<td class="click_sua_the_loai"><i class="fa fa-eye"></i></td>' +
                '</tr>';
            stt++;

            $('.listdsbanbe').html(html);
        }
        buildSlidePage($('.pagenumberbanbe'), 5, res.page, res.totalpage);
    }
}
var banbe_current = 0;
$('.pagenumberbanbe').on('click', 'button', function() {
    banbe_current = $(this).val();
    builddsbanbe($(this).val(), recordbanbe);
});

$('.listdsbanbe').on('click', '.click_sua_the_loai', function() {
    var hovaten = $(this).parents('tr').attr('data-name');
    var gioitinh = $(this).parents('tr').attr('data-gt');
    var tuoi = $(this).parents('tr').attr('data-t');

    var diachi = $(this).parents('tr').attr('data-dc');

    var Images = $(this).parents('tr').attr('data-I');

    $('.txtht').val([hovaten]);

    $('.txtgt').val([gioitinh]);

    $('.txtt').val([tuoi]);

    $('.txtdc').val([diachi]);

    $('.txtI').val([Images]);
});
/* -------------------------------------------------------------------------- */
/*                                 Đổi avatar                                 */
/* -------------------------------------------------------------------------- */
$('.btn_doi_avatar').click(function() {
    $('#imgSP').val('');
    $('.showmodal_changeavartar').modal('show');
    initUploadImage('imgSP', 'imgSPPreview', 'onSuccessUploadImageavartar');
});

/* -------------------------------- Tiếp theo ------------------------------- */
var urlimage = '';

function onSuccessUploadImageavartar(oj) {
    $('#imgSPPreview').removeClass('is-hidden');
    $('#imgSPPreview').attr('src', oj.url);
    urlimage = oj.attach;
}
//hàm đổi avatar trên csdl
$('.btn_update_avartar').click(function() {
    var username = localStorage.getItem('userBS');

    if (urlimage == '') {
        alert_info('Chưa chọn hình');
    } else {
        var datasend = {
            event: 'UpdateAvatar',
            username: username,
            avartar: urlimage,
        };
        queryDataGET_JSON('php/banbe.php', datasend, function(data) {
            if (data['UpdateAvatar'] == 1) {
                alert_info('Update thành công !!');
                localStorage.removeItem('avartar'); //xóa avartar localstorge
                localStorage.setItem('avartar', urlimage); //lưu lại avartar localstorge
                showAvartar();
                urlimage = '';
            } else {
                alert_info('Thất bại !!');
            }
        });
    }
});