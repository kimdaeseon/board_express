var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listRouter = require('./routes/list');
var postRouter = require('./routes/post');

var app = express();

// view engine setup
app.use(session({
  secret:"asdzxcqweasdzxc",
  resave : false,
  saveUninitialized: true,
  store: false
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname + "/views/main.html"))
})
app.get('/makePost', (req,res)=>{
  res.sendFile(path.join(__dirname + "/views/makePost.html"))
})
app.get('/posts', (req, res)=>{
  const data = JSON.parse(req.session.valid);
  let string = "";
  string += `<!DOCTYPE html>
  <html lang>
  <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="/stylesheets/bootstrap.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
      <script src="/javascripts/showList.js"></script>
      <title>test</title>
  </head>
  <body>
      <div class="holy">
      <h3>글</h3>
          <table class ="table">
              <form action="/makePost" method="POST">
                  <tbody>
                      <tr>
                          <td id ="pTitle">제목</td>
                          <td class = "postTitle" id="title">${data.title}</td>
                      </tr>
                      <tr>
                          <td colspan="2">내용</td>
                      </tr>
                      <tr>
                          <td colspan="2" id="content">${data.content}</td>
                      </tr>
                      <tr><td colspan="2"><button type="submit" class ="btn">글쓰기</button></td></tr>
                  </tbody>
                  
              </form>
          </table>
      </div>
  </body>
  </html>`
  res.send(string);
})
app.use('/page', indexRouter);
app.use('/makePost', usersRouter);
app.use('/list', listRouter);
app.use('/post', postRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
