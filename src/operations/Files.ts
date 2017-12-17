import * as Express from 'express';
import * as fs from 'fs';
import * as path from 'path';

export class Files {
  private req:any;
  private res:any;
  constructor(req,res) {
    this.req = req;
    this.res = res;
  }

  public download(req: any, res: any) {
    const currDir = path.normalize(req.query.dir);
    const fileName = req.query.name;
    const currFile = path.join(currDir, fileName);
    let fReadStream;

    fs.exists(currFile, (exist: any) => {
      if (exist) {
        res.set({
          'Content-Disposition': 'attachment;filename=' + encodeURI(fileName),
          'Content-type': 'application/octet-stream',
        });
        fReadStream = fs.createReadStream(currFile);
        fReadStream.on('data', (chunk) => {
          // console.log(chunk);
          res.write(chunk, 'binary');
        });
        fReadStream.on('end', () => {
          res.end();
        });
      } else {
        res.set('Content-type', 'text/html');
        res.send('file not exist!');  
        res.end();
      }
    });
  }
}
