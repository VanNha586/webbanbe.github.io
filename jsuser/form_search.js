$('.btn_tk').click(function name(params) {
    console.log('object');
    var timkiem = $('.txttk').val();

    if (timkiem == '') {
        alert_error('Ô tìm kiếm không đc để trống');
    } else {
        var dataSend = {
            event: 'search',
        };
        queryDataGET_TEXT('php/search.php', dataSend, function(res) {
            if (res['search'] == 1) {
                alert_info('Tìm thanh cong');
                builddssearch(search_current, recordsearch); // banbe_current
            } else {
                alert_error('Tìm khong thanh cong');
            }
        });
    }
});

function buildHTMLsearchData(res) {
    if (res.total == 0) {
        $('.listdssearch').html('Chưa có nội dung');
    } else {
        var data = res.items;

        resallsearch = data;
        var stt = 1;
        var currentpage = parseInt(res.page);
        stt = printSTT(recordsearch, currentpage);
        var html = '';
        var vt = 0;
        for (item in data) {
            var list = data[item];
            html =
                html +
                '<tr data-nameSearch="' +
                list.hovaten +
                '" data-gtSearch="' +
                list.gioitinh +
                '"  data-tSearch="' +
                list.tuoi +
                '" data-dcSearch="' +
                list.diachi +
                '" data-ISearch="' +
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
                '</tr>';
            stt++;

            $('.listdsSearch').html(html);
        }
        buildSlidePage($('.pagenumberSearch'), 5, res.page, res.totalpage);
    }
}
var search_current = 0;
$('.pagenumberSearch').on('click', 'button', function() {
    search_current = $(this).val();
    builddssearch($(this).val(), recordsearch);
});

function builddssearch(page, record) {
    var dataSend = {
        event: 'getDSSearch',
        page: page,
        record: record,
    };

    $('.listdsSearch').html(
        "<img src='images/loading.gif' width='30px' height='30px'/>"
    );
    queryDataGET_JSON('php/search.php', dataSend, function(res) {
        $('.listdsSearch').html('');
        buildHTMLSearchData(res);
        // alert_info("Da lay du lieu duoc"+res);
    });
}