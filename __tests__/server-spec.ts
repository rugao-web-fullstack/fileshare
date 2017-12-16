import { Server } from '../src/server';
import * as Express from "express";
import * as request from 'supertest';

const app = Express();
const server = new Server(app,3000);

test('Should greet with message', () => {
  const express1 = Express();
  const express2 = Express();
  expect(express1 !== express2).toBe(true);
  const server = new Server(express1);
  expect(server.server).toBe(express1);
  server.server = express2;
  expect(server.server).toBe(express2);
});

test('测试访问用户页面success', (done) => {
  let app = Express();
  let server = new Server(app,3000);
  request(app)
  .get('/user/5555')
  .expect(200, function (err, res) {
    if(err) throw err;
    expect((res.text).includes('-用户文件管理')).toBeTruthy();
    done();
  });
});
test('测试访问用户页面fail', (done) => {
  let app = Express();
  let server = new Server(app,3000);
  request(app)
  .get('/user/qqq')
  .expect(200, function (err, res) {
    if(err) throw err;
    expect((res.text).includes('404')).toBeTruthy();
    done();
  });
});
test('测试管理员登录success', (done) => {
  request(app)
  .get('/admin/login')
  .expect(200, function (err, res) {
    expect(err).toBeFalsy();
    expect((res.text).includes('-管理员登录')).toBeTruthy();
    done();
  });
});