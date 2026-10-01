import express from "express";
import {createNoteController,getNoteController,readNoteController,updateNoteController,
    deleteNoteController} from "../controllers/noteController.js";

import isAuth from "../middlewares/authMiddleware.js";

const noteRouter= express.Router();

noteRouter.post("/",isAuth,createNoteController);
noteRouter.get("/",isAuth,getNoteController);
noteRouter.get("/:id",isAuth,readNoteController);
noteRouter.put("/:id",isAuth,updateNoteController);
noteRouter.delete("/:id",isAuth,deleteNoteController);

export default noteRouter;