import fs from "fs";
import path from "path";
import multer from "multer";
import uuid from "uuid";

const memoryDest = path.join(__dirname, "../public/images");

const storage = multer.diskStorage({
  // 文件存储位置
  destination: (req:any, file:any, cb:any) => {
    // 校验文件夹是否存在，如果不存在则创建一个
    const isExists = fs.existsSync(memoryDest);
    if (!isExists) {
      fs.mkdirSync(memoryDest);
    }
    cb(null, memoryDest);
  },
  filename: (req:any, file:any, cb:any) => {
    // 生成唯一文件名
    const uid = uuid.v1();
    // 获取文件扩展名
    let ext = path.extname(file.originalname);
    cb(null, uid + ext);
  },
});

// 过滤文件
function fileFilter(req:any, file:any, callback:any) {
  if (!file) {
    callback(null, false);
  } else {
    callback(null, true);
  }
}
const uploadExport = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
}).single("file"); //上传的fieldname必须为file

export default uploadExport;