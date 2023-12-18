import express from "express";
import { getAllFavorites, addFavorite, deleteFavorite } from "../controllers/favoriteControllers.js";

const router = express.Router();

router.get("/favorites/:id", getAllFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites", deleteFavorite);

export default router;
