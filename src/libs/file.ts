import fs from 'fs'
import path from 'path'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

const defaultPath = path.join(__dirname, '.', '.', 'asssets')

export interface Upload {
  filename: string
  createReadStream: () => Promise<fs.ReadStream>
}

export function saveFile(upload: Upload): Promise<UploadApiResponse> {
  return new Promise(async function(resolve, reject) {
    const imagePath = `${defaultPath}/${upload.filename}`

    const stream = await upload.createReadStream()

    stream
      .pipe(fs.createWriteStream(imagePath))
      .on('finish', async () => {
        const upload = await cloudinary.uploader.upload(imagePath, {
          crop: 'limit',
          tags: 'products',
          width: 3000,
          height: 2000
        })

        resolve(upload)
      })
      .on('error', err => reject(err))
  })
}

export default {
  saveFile
}
