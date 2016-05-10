1.npm install -g express  全局安装express     npm uninstall -g express  删除express
2.npm install -g express-generator  全局安装express-generator
3.express node  创建一个node应用项目
4.cd node  切换到应用目录下
5.npm install  安装应用依赖包(node_modules)
6.npm start  启动应用程序
7.127.0.0.1:3000  浏览器访问
8.npm install ejs  安装ejs模板引擎
9.npm install mysql  安装mysql包

1.添加ejs模板(修改app.js)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
2.添加bootstrap和jquery库
npm install bootstrap
npm install jquery
3.模板设计
    3.1   header.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title><%=title%></title>
        <!-- Bootstrap -->
        <link rel="stylesheet" href="/stylesheets/bootstrap.min.css" media="screen">
    </head>
    <body screen_capture_injected="true">
    3.2   index.html
    <% include header.html %>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <% include footer.html %>
    3.3   footer.html
    <script src="/javascripts/jquery.min.js"></script>
    <script src="/javascripts/bootstrap.min.js"></script>
    </body>
    </html>
4.路由设计
    4.1   app.js
    app.use('/', routes);
    app.use('/users', users);
    app.use('/login',routes);
    app.use('/logout',routes);
    app.use('/home',routes);
    4.2   index.js
    router.route('/login').get(function(req,res){
        res.render('login',{title:'用户登录'});
    }).post(function(req,res){
        var user={
            username:'admin',
            password:'123456'
        };
        if (req.body.username === user.username && req.body.password === user.password) {
            res.redirect('/home');
        }
        res.redirect('/login');
    });

    router.get('/logout',function(req,res){
        res.redirect('/');
    });

    router.get('home',function(req,res){
        var user={
            username:'admin',
            password:'123456'
        };
        res.render('/home',{title:'首页',user:user});
    }); 
    4.3   login.html
    <% include header.html %>
    <div class="container">
        <form class="col-sm-offset-4 col-sm-4 form-horizontal" role="form" method="post">
            <fieldset>
                <legend>用户登录</legend>
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="username">用户名</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="username" name="username" placeholder="用户名" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="password">密码</label>
                    <div class="col-sm-9">
                        <input type="password" class="form-control" id="password" name="password" placeholder="密码" required>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-3 col-sm-9">
                        <button type="submit" class="btn btn-primary">登录</button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
    <% include footer.html %>
    4.4   home.html
    <% include header.html %>
    <h1>Welcome <%= user.username %>, 欢迎登录！！</h1>
    <a class="btn" href="/logout">退出</a>
    <% include footer.html %>
    4.5   index.html
    <% include header.html %>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <p><a href="/login">登录</a></p>
    <% include footer.html %>
5.session
    5.1  npm install express-session  安装中间件express-session
    5.2  npm install connect-mongodb  安装中间件connect-mongodb
    5.3  npm install mongodb  安装中间件mongodb
