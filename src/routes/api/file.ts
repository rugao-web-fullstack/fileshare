import * as Express from 'express';
import * as multer from 'multer';
import cb from '../../cb/cb';
import { File } from '../../operations/file';
import { Hot } from '../../operations/hotfile';
const router = Express.Router();
const upload = multer({ dest: './__tests__/file' });

// 文件操作
router.post('/', upload, (req: any, res: any) => {
  switch (req.body.action) {
    case 'upload':
      const files = req.files._upload;
      const file = new File(
        files.originalname.split('.')[0],
        files.name.split('.')[0],
      );
      file.upload(req.files._upload, req, res);
      break;
  }
});

router.get('/hot/video', (req: any, res: any) => {
  const hot1 = new Hot(req, res);
  hot1.getVideo(req, res);
});
router.get('/hot/audio', (req: any, res: any) => {
  const hot2 = new Hot(req, res);
  hot2.getAudio(req, res);
});
router.get('/hot/image', (req: any, res: any) => {
  const hot3 = new Hot(req, res);
  hot3.getImage(req, res);
});
router.get('/hot/article', (req: any, res: any) => {
  const hot4 = new Hot(req, res);
  hot4.getArticle(req, res);
});

export default router;
