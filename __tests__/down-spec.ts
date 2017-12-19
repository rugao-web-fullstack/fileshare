import { Server } from '../src/server';
import * as Express from 'express';
import * as request from 'supertest';
import * as mysql from 'mysql';
import cbFunc from '../src/cb/cb';

test('测试数据库创建', done => {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  });

  con.query('CREATE DATABASE cloud', function(err) {
    expect(err).toBeFalsy();
    // 断开
    con.end();
    done();
  });
});

test('测试download----success', done => {
  let app = Express();
  let server = new Server(app, 3000);
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  // 创建file
  con.query(
    'create table file (id int primary key auto_increment,filename varchar(255)not null,type varchar(20)not null,size int(11)not null,downloads int(11) not null,hash varchar(64)not null)',
    function(err) {
      expect(err).toBeFalsy();
      console.log('success user');
      con.query(
        "insert into file(filename, type, size, downloads,hash) values ('girl.JPG','image',40,2,'asgsagasgasdaasg');",
        function(err) {
          expect(err).toBeFalsy();
          console.log('insert success');
          con.end();
          done();
        }
      );
    }
  );
  const sql = 'select * from file;';
  con.query(
    sql,
    cbFunc((result: any) => {
      con.end();
    })
  );
  request(app)
    .get('/user/download?id=1')
    .expect(200, function(err, res) {
      if (err) throw err;
      expect(res.text != 0).toBeTruthy();
      done();
    });
});

test('测试download----fail', done => {
  let app = Express();
  let server = new Server(app, 3000);
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'cloud',
  });
  con.query(
    'create table file (id int primary key auto_increment,filename varchar(255)not null,type varchar(20)not null,size int(11)not null,downloads int(11) not null,hash varchar(64)not null)',
    function(err) {
      expect(err).toBeFalsy();
      console.log('success user');
      con.query(
        "insert into file(filename, type, size, downloads,hash) values ('girlTest.JPG','image',40,2,'asgsagasgasdaasg');",
        function(err) {
          expect(err).toBeFalsy();
          console.log('insert success');
          con.end();
          done();
        }
      );
    }
  );
  const sql = 'select * from file;';
  con.query(
    sql,
    cbFunc((result: any) => {
      con.end();
    })
  );
  request(app)
    .get('/user/download?id=2')
    .expect(200, function(err, res) {
      if (err) throw err;
      expect(res.text.includes('not')).toBeTruthy();
      done();
    });
});

test('cb错误测试覆盖', done => {
  let func = cbFunc(() => {});
  expect(func(new Error('222'), '0') === undefined).toBeTruthy();
  done();
});

beforeAll(function(done) {
  var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  });
  con.query('DROP DATABASE IF EXISTS cloud;', function(err) {
    expect(err).toBeFalsy();
    // 断开
    con.end();
    done();
  });
});
