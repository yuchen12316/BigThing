$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从 layui 中获取 form 对象
    var form = layui.form;
    //通过 form.varify() 函数自定义校验规则
    form.verify({
        //用正则表达式规定密码格式
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repass: function (value) {
            //通过形参拿到是确认框的内容
            //还需要拿到密码框中的内容
            //然后进行等于判断
            //如果判断失败，则return一个提示
            let password = $('.reg-box [name=password]').val();
            if (password !== value) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        let formDate = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', formDate, function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link_login').click();
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登陆成功');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})