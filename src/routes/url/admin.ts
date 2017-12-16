import * as Express from "express";
const router = Express.Router();

router.get('/login', function(req:any, res:any) {
    res.render('admin/login');
});

export default router;