import * as Express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
export class File {
  private req: any;
  private res: any;
  constructor(req: any, res: any) {
    this.req = req;
    this.res = res;
  }

  public download(req: any, res: any) {
    const currDir = path.normalize(req.query.dir);
    const fileName = req.query.name;
    const currFile = path.join(currDir, fileName);
    const fsexists = promisify(fs.exists);

    fsexists(currFile).then((exist: any) => {
      if (exist) {
        const f = fs.createReadStream(currFile);
        this.res.writeHead(200, {
          'Content-Disposition': 'attachment; filename=' + encodeURI(fileName),
          'Content-Type': 'application/force-download',
        });
        f.pipe(res);
      } else {
        res.set('Content-type', 'text/html');
        res.send('file not exist!');
        res.end();
      }
    });
  }

}
