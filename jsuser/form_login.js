// JavaScript Document
$('.btn_login').click(function() {
    var username = $('.txtuser').val(); //lay gia i tu ô nhập liệu mã thể loại
    var password = $('.txtpass').val();
    if (username == '') {
        //alert("Mã thể loại khác khoảng trống");
        alert_info('Tài khoản khác khổng trống');
    } else if (password == '') {
        alert_info('Mật khẩu khác khoảng trống');
    } else {
        var datasend = {
            event: 'login',
            username: username,
            password: password,
        };
        queryDataGET_JSON('php/login.php', datasend, function(res) {
            console.log(res);
            if (res.event == 1) {
                localStorage.setItem('userBS', res.items.username);
                localStorage.setItem('passBS', password);
                localStorage.setItem('avartar', res.items.avartar);
                location.href = 'index.html';
            } else {
                alert_info('Tài khoản hoặc mật khẩu sai');
            }
        });
    }
});