import Express from 'express'
import ejs from 'ejs'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import favicon from 'serve-favicon'
import path from 'path'

const app = Express();

app.disable('x-powered-by');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, '../views'));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type,user-code,X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(favicon(path.join(`${global.ROOTDIR}/static`, 'favicon.ico')));
app.use(Express.static(path.join(global.ROOTDIR, 'static')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '4mb' }));


export { app as default }
