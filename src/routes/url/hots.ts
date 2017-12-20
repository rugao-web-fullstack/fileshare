import express = require('express');
const router = express.Router();

router.get('/video', (req: any, res: any) => {
  res.render('show');
});
router.get('/audio', (req: any, res: any) => {
  res.render('show');
});
router.get('/image', (req: any, res: any) => {
  res.render('show');
});
router.get('/article', (req: any, res: any) => {
  res.render('show');
});

export default router;
