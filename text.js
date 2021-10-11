// $('..form_trangchu').show();
$('.xemthem').click(function name(params) {
    // $('.hien').show(1000),
    $('.hien').show('slow');
    $('.andi').show();
    $(this).hide();
});
$('.xemthem1').click(function name(params) {
    // $('.hien').show(1000),
    $('.hien1').show('slow');
    $('.andi1').show();
    $(this).hide();
});

$('.andi').click(function name(params) {
    $('.hien').hide(1000);
    $('.xemthem').show('slow');
    $(this).hide();
});
$('.andi1').click(function name(params) {
    $('.hien1').hide(1000);
    $('.xemthem1').show('slow');
    $(this).hide();
});
$('.menu_banbe').click(function(params) {
    $('.form_sukien').hide();
    $('.form_trangchu').hide();
    $('.form_banbe').show();
    $('.form_phanloai').hide();
    $('.form_sothich').hide();
    $('.form_nhombb').hide();
    $('.form_congviec').hide();
    $('.form_search').hide();
});

$('.menu_phanloai').click(function name(params) {
    $('.form_sukien').hide();
    $('.form_trangchu').hide();
    $('.form_banbe').hide();
    $('.form_phanloai').show();
    $('.form_sothich').hide();
    $('.form_nhombb').hide();
    $('.form_congviec').hide();
    $('.form_search').hide();
});
$('.menu_search').click(function name(params) {
    $('.form_sukien').hide();
    $('.form_trangchu').hide();
    $('.form_banbe').hide();
    $('.form_phanloai').hide();
    $('.form_sothich').hide();
    $('.form_nhombb').hide();
    $('.form_congviec').hide();
    $('.form_search').show();
});
$('.menu_sukien').click(function name(params) {
    $('.form_sukien').show();
    $('.form_trangchu').hide();
    $('.form_banbe').hide();
    $('.form_phanloai').hide();
    $('.form_sothich').hide();
    $('.form_nhombb').hide();
    $('.form_congviec').hide();
    $('.form_search').hide();
});

$('.menu_sothich').click(function name(params) {
    $('.form_sukien').hide();
    $('.form_trangchu').hide();
    $('.form_banbe').hide();
    $('.form_phanloai').hide();
    $('.form_sothich').show();
    $('.form_nhombb').hide();
    $('.form_congviec').hide();
    $('.form_search').hide();
});

$('.menu_nhombb').click(function name(params) {
    $('.form_sukien').hide();
    $('.form_trangchu').hide();
    $('.form_banbe').hide();
    $('.form_phanloai').hide();
    $('.form_sothich').hide();
    $('.form_nhombb').show();
    $('.form_congviec').hide();
    $('.form_search').hide();
});

$('.menu_congviec').click(function name(params) {
    $('.form_sukien').hide();
    $('.form_trangchu').hide();
    $('.form_banbe').hide();
    $('.form_phanloai').hide();
    $('.form_sothich').hide();
    $('.form_nhombb').hide();
    $('.form_congviec').show();
    $('.form_search').hide();
});
$('.anh1').mouseenter(function name(params) {
    var anh = $(this);
    anh.animate({
            height: '320px',
            width: '220px',
        },
        'slow'
    );
    // $(this).animate({
    //     height:'310px',
    //     width:'210px',

    // }),
    $(this).animate({
        height: '300px',
        width: '200px',
    });
});