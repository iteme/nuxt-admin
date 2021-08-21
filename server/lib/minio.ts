import path from 'path';
import { nanoid } from 'nanoid';
import { Client } from 'minio';
import { ossConfig } from '../config';

const SEPARATOR = '/';

const minioClient = new Client({
  endPoint: ossConfig.endPoint,
  port: ossConfig.port,
  useSSL: false,
  accessKey: ossConfig.accessKey,
  secretKey: ossConfig.secretKey,
});

const metaData = {
  'Content-Type': 'application/octet-stream',
};

function getUploadPath(filePath: string): string {
  return (
    SEPARATOR +
    new Date().getFullYear() +
    (new Date().getMonth() + 1).toString().padStart(2, '0') +
    SEPARATOR +
    nanoid() +
    path.extname(filePath)
  );
}

export async function uploadProduct(filePath: string): Promise<string> {
  const uploadPath = getUploadPath(filePath);
  await minioClient.fPutObject(ossConfig.productBucket, uploadPath, filePath, metaData);
  return ossConfig.domain + SEPARATOR + ossConfig.productBucket + uploadPath;
}
