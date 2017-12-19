// 引用basic
// 引用cb
import * as crypto from 'crypto';
import cbFunc from '../cb/cb';
import basic from '../db/basic';

export class Hot {
  private _req: any;
  private _res: any;
  constructor(req: any, res: any) {
    this._req = req;
    this._res = res;
  }

  public getVideo(req: any, res: any) {
    basic('cloud').then((con) => {
      const sql =
        'select * from file where type = \'video\' order by downloads DESC';
      con.query(
        sql,
        cbFunc((result: any) => {
          for (let i = 0; i < result.length; i++) {
            const fileid = result[i].id;
            const sql2 =
              'select user from user_file where file = \'' + fileid + '\'';
            con.query(
              sql2,
              cbFunc((result2: any) => {
                const sql3 =
                  'select username from user where id =\'' +
                  result2[0].user +
                  '\'';
                con.query(
                  sql3,
                  cbFunc((result3: any) => {
                    result[i].username = result3[0].username;
                    if (i === result.length - 1) {
                      res.json(result);
                      con.end();
                    }
                  }),
                );
              }),
            );
          }
        }),
      );
    });
  }
}
