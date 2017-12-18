import * as Express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import cbFunc from '../cb/cb';
import db from '../db/basic';

export class File {
  private filename: string;
  private hash: string;
  constructor(filename: string, hash: string) {
    this.filename = filename;
    this.hash = hash;
  }
  public upload(file: object, req: any, res: any) {
    res.json('上传成功');
  }

  public download(req: any, res: any) {
    const id = path.normalize(req.query.id);
    let filename = '';
    let hash = '';
    const type = '';
    db('cloud').then((con) => {
      const sql = 'select * from file where id=' + id + ';';
      con.query(
        sql,
        cbFunc((result: any) => {
          filename = result[0].filename;
          hash = result[0].hash;
          const fsexists = promisify(fs.exists);
          const currFile = path.resolve('file/', filename);
          fsexists(currFile).then((exist: any) => {
            if (exist) {
              const f = fs.createReadStream(currFile);
              res.writeHead(200, {
                'Content-Disposition':
                  'attachment; filename=' + encodeURI(filename),
                'Content-Type': 'application/force-download',
              });
              f.pipe(res);
            } else {
              res.set('Content-type', 'text/html');
              res.send('file not exist!');
              res.end();
            }
          });
          con.end();
        }),
      );
    });
  }
}
