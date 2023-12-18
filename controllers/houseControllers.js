import House from "../models/houseModel.js";
import { uploadImage, bucket } from "../gcs.js";
import { dbRef } from "../firebase.js";

export const getAllHouses = async (req, res) => {
  try {
    const snapshot = await dbRef.child("houses").get();
    const houses = snapshot.val();
    res.status(200).json(houses);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const addHouse = async (req, res) => {
  try {
    const image = req.file;
    const imageUrl = await uploadImage(image);

    const data = req.body;
    const house = new House(data.title, data.price, data.description, data.seller, data.email, data.address, data.subdistrict, imageUrl);

    const newHouseRef = dbRef.child("houses").push();
    newHouseRef.set(house);
    house.id = newHouseRef.key;

    res.status(200).json({
      message: "House added successfully",
      house,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getHouseById = async (req, res) => {
  try {
    const snapshot = await dbRef.child("houses").child(req.params.id).get();
    const house = snapshot.val();
    if (!house) {
      res.status(404).send("No house found");
      return;
    } else {
      res.status(200).json(house);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateHouse = async (req, res) => {
  try {
    const snapshot = await dbRef.child("houses").child(req.params.id).get();
    const house = snapshot.val();

    if (!house) {
      res.status(404).send("No house found");
      return;
    }

    const image = req.file;
    if (image) {
      const imageName = house.imageUrl.split("/").pop();
      await bucket.file(imageName).delete();
      const imageUrl = await uploadImage(image);
      house.imageUrl = imageUrl;
    }

    const data = req.body;
    const newHouse = {
      ...house,
      ...data,
    };

    const houseRef = dbRef.child("houses").child(req.params.id);
    houseRef.update(newHouse);

    res.status(200).json({
      message: "House updated successfully",
      house,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteHouse = async (req, res) => {
  try {
    const snapshot = await dbRef.child("houses").child(req.params.id).get();
    const house = snapshot.val();
    if (!house) {
      res.status(404).send("No house found");
      return;
    }

    const imageName = house.imageUrl.split("/").pop();
    await bucket.file(imageName).delete();

    const houseRef = dbRef.child("houses").child(req.params.id);
    houseRef.remove();

    res.status(200).json({
      message: "House deleted successfully",
      house,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
