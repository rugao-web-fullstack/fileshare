import * as Express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { File } from '../../operations/Files';
const router = Express.Router();

router.get('/download', (req: any, res: any) => {
  const down = new File(req, res);
  down.download(req,res);
});

router.get('/register', (req:any, res:any) => {
  res.render('user/register');
});
router.get('/login', (req:any, res:any) => {
  res.render('user/login');
});


router.get('/:id', (req: any, res: any) => {
  if (!isNaN(req.params.id)) {
    res.render('user/user');
  } else {
    res.send('404');
  }
});

export default router;
