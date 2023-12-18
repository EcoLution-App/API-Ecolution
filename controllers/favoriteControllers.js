import { dbRef } from "../firebase.js";

export const getAllFavorites = async (req, res) => {
  try {
    const favoriteSnapshot = await dbRef
      .child("favorites")
      .child(req.params.id)
      .get();
    const favorites = favoriteSnapshot.val();
    if (!favorites) {
      res.status(404).json({});
      return;
    }

    const houseSnapshot = await dbRef.child("houses").get();
    const houses = houseSnapshot.val();

    const favoriteHouses = {};
    for (const houseId of favorites) {
      if (houses[houseId]) {
        favoriteHouses[houseId] = houses[houseId];
      }
    }

    res.status(200).json(favoriteHouses);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const addFavorite = async (req, res) => {
  try {
    const data = req.body;
    const snapshot = await dbRef.child("favorites").child(data.userId).get();
    let favorites = snapshot.val();

    if (!favorites) {
      favorites = [];
    }

    if (favorites.includes(data.houseId)) {
      res.status(400).send("House already favorited");
      return;
    }

    favorites.push(data.houseId);
    await dbRef.child("favorites").child(data.userId).set(favorites);

    res.status(200).json({
      message: "Favorite added successfully",
      favorites,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteFavorite = async (req, res) => {
  try {
    const data = req.body;
    const snapshot = await dbRef.child("favorites").child(data.userId).get();
    let favorites = snapshot.val();

    if (!favorites) {
      res.status(400).send("No favorites found");
      return;
    }

    const index = favorites.indexOf(data.houseId);
    if (index > -1) {
      favorites.splice(index, 1);
    }

    await dbRef.child("favorites").child(data.userId).set(favorites);

    res.status(200).json({
      message: "Favorite deleted successfully",
      favorites,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}