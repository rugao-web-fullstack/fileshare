import * as bodyParser from 'body-parser';
import * as Express from 'express';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
<<<<<<< HEAD
import api_admin from './routes/api/admin';
import file from './routes/api/file';
=======
import apiAdmin from './routes/api/admin';
import files from './routes/api/file';
>>>>>>> 83a1e216cc475985d038bb3e718a54119433a43f
import hot from './routes/api/hot';
import apiUser from './routes/api/user';
import admin from './routes/url/admin';
import hots from './routes/url/hots';
import main from './routes/url/main';
import user from './routes/url/user';
export class Server {
  private _server: Express;
  private _port: number;

  constructor(server: Express, port = 8080) {
    this._server = server;
    this._port = port;
    this.init(server);
    this.initRouters(server);
  }
  get server(): Express {
    return this._server;
  }
  set server(server: Express) {
    this._server = server;
  }
  public listen() {
    return this._server.listen(this._port);
  }
  public init(app: Express) {
    app.set('view engine', 'html');
    nunjucks.configure(path.resolve(__dirname, 'views'), {
      autoescape: true,
      express: app,
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(Express.static(path.join(__dirname, 'public')));
  }
  public initRouters(app: Express) {
    app.use('/user', user);
    app.use('/admin', admin);
<<<<<<< HEAD
    app.use('/api/admin', api_admin);
    app.use('/api/files', file);
    app.use('/api/users', users);
=======
    app.use('/api/admins', apiAdmin);
    app.use('/api/files', files);
    app.use('/api/users', apiUser);
>>>>>>> 83a1e216cc475985d038bb3e718a54119433a43f
    app.use('/', main);
  }
}
