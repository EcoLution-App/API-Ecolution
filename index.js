import express from "express";
import cors from "cors";
import multer from "multer";

import houseRoutes from "./routes/houseRoutes.js";
import favoriteRoutes from './routes/favoriteRoutes.js';

const app = express();

const multerMid = multer({
  storage: multer.memoryStorage(),
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multerMid.single("image"));

app.use("/api/v1", houseRoutes);
app.use("/api/v1", favoriteRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});