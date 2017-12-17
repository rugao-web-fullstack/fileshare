import { Server } from '../src/server';
import * as Express from "express";
import * as request from 'supertest';

test('测试download----success', (done) => {
  let app = Express();
  let server = new Server(app, 3000);
  request(app)
    .get('/user/download?dir=/home/sinpo/Documents/fileSave&name=girl.JPG')
    .expect(200, function (err, res) {
      if (err) throw err;
      expect((res.text) != 0).toBeTruthy();
      done();
    });
});

test('测试download----fail', (done) => {
  let app = Express();
  let server = new Server(app, 3000);
  request(app)
    .get('/user/download?dir=/home/sinpo/Documents/fileSave&name=girl.JP')
    .expect(200, function (err, res) {
      if (err) throw err;
      expect((res.text).includes('not')).toBeTruthy();
      done();
    });
}
