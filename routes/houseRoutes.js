import express from "express";

import { getAllHouses, addHouse, getHouseById, updateHouse, deleteHouse } from "../controllers/houseControllers.js";

const router = express.Router();

router.get("/houses", getAllHouses);
router.post("/houses", addHouse);
router.get("/houses/:id", getHouseById);
router.put("/houses/:id", updateHouse);
router.delete("/houses/:id", deleteHouse);

export default router;
