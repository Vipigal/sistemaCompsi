import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import validateEnvString from "../utils/validateEnvString";

const credentials = {
  accessKeyId: validateEnvString(process.env.AWS_ACCESS_KEY),
  secretAccessKey: validateEnvString(process.env.AWS_SECRET_KEY),
};

export const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: credentials,
});

const generateFileKey = (
  fileName: string,
  timestamp: number,
  fileExtention: string
): string => {
  return `${fileName}-${timestamp}.${fileExtention}`;
};

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: validateEnvString(process.env.AWS_BUCKET_NAME),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(
        null,
        generateFileKey(
          file.originalname.split(".")[0],
          new Date().getTime(),
          file.mimetype.split("/")[1]
        )
      );
    },
  }),

  fileFilter: (req, file: Express.Multer.File, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedMimes.includes(file.mimetype)) {
      cb(new Error("Tipo de arquivo invalido!"));
    }
    cb(null, true);
  },
});
