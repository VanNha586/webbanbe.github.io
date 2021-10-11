// JavaScript Document
$('.btn_login').click(function() {
    var username = $('.txtuser').val(); //lay gia i tu Ă´ nháº­p liá»‡u mĂ£ thá»ƒ loáº¡i
    var password = $('.txtpass').val();
    if (username == '') {
        //alert("MĂ£ thá»ƒ loáº¡i khĂ¡c khoáº£ng trá»‘ng");
        alert_info('Tài khoản khác khoảng trống');
    } else if (password == '') {
        alert_info('Mật khác khoảng trống');
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
                alert_info('Tài khoản hoặc mật khẩu không chính xác');
            }
        });
    }
});