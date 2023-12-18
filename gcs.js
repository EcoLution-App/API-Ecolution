import { Storage } from "@google-cloud/storage";
import { generateUniqueId } from "./helpers.js";
import util from "util";
import path from "path";

const storage = new Storage({
  keyFilename: "gcs-keys.json",
  projectId: "ecolution-408007",
});

const bucket = storage.bucket("ecolution");

const uploadImage = (image) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = image;
    const imageName = generateUniqueId() + path.extname(originalname);

    const blob = bucket.file(imageName);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on("finish", async () => {
        const publicUrl = util.format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

export { uploadImage, bucket };
