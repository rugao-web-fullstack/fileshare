<<<<<<< HEAD
import * as Express from "express";
const router = Express.Router();

router.get('/login', function(req:any, res:any) {
    res.render('admin/login');
});

export default router;
=======
import * as Express from 'express';
const router = Express.Router();

router.get('/users', (req:any, res:any) => {
  res.render('admin/back-user');
});

/**
 * 文件分类
 */
router.get('/file/category', (req:any, res:any) => {
  res.render('admin/back-file-category');
});

export default router;
>>>>>>> afc5af91ee8bf4fda09dc624ca7bd6e64eefd750
