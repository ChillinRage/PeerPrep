import bcrypt from "bcrypt";
import { Storage } from "@google-cloud/storage";
import { DEFAULT_IMAGE_URL } from "../model/user-model.js";

export async function handleExistingUser(username, email) {
  const existingUser = await _findUserByUsernameOrEmail(username, email);
  if (existingUser) {
    return res.status(409).json({ message: "username or email already exists" });
  }
}

export function hashPassword(password) {
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  return password;
}

export async function replaceProfileImage(userId, newImage, oldImage) {
  if (!newImage) {
    return newImage;
  }

  const storage = new Storage({projectId: 'peerprep-userservice-436407'});
  const bucket = storage.bucket('peerprep_userimages');

  const newImageName = newImage.split("\\").pop();
  const newDestinationPath = `${userId}/${newImageName}`;
  const oldDestinationPath = `${userId}/${oldImage}`;

  await bucket.upload(newImage, {
    destination: newDestinationPath,
  });

  if (oldImage !== DEFAULT_IMAGE_URL && oldImage !== newImageName) {
    await bucket.file(oldDestinationPath).delete();
  }

  return newImageName;
}
