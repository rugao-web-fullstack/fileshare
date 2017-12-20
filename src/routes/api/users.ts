import * as Express from 'express';
const router = Express.Router();

import { User } from '../../operations/user';

router.post('/', async (req: any, res: any) => {
  console.log('====进入api======');
  console.log(req.body);
  const user = new User(req, res);
  switch (req.body.action) {
    case 'register':
      await user.register(req, res);
      break;
    case 'login':
      await user.login(req, res);
      break;
    default:
      res.send('error');
  }
});

export default router;
