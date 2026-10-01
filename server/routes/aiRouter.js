import express from "express";

const aiRouter=express.Router();

import isAuth from "../middlewares/authMiddleware.js";
import { explainController, keyPointController, summarizeController,impQuestionsController,quizController,chatController} from "../controllers/aiController.js";

aiRouter.post("/summarize",isAuth,summarizeController);
aiRouter.post("/explain",isAuth,explainController);
aiRouter.post("/keyPoints",isAuth,keyPointController);
aiRouter.post("/impQuestions",isAuth,impQuestionsController);
aiRouter.post("/quiz",isAuth,quizController);
aiRouter.post("/askFromAi",isAuth,chatController);


export default aiRouter;