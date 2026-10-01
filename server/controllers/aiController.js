import { summarizer, explainer, keyPointer,impQuestioner,quizer,chatWithAI} from "../services/aiServices.js";
import Note from "../models/noteModel.js";

export const summarizeController=async(req,res)=>{
    try {
        const { noteId } = req.body;
        const userId=req.userId;
    
        const note= await Note.findOne({_id : noteId,user:userId});
        if(!note){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const response=await summarizer(note.content);
        
        if(!response){
            return res.status(500).json({
                message: "Failed to generate summary"
            });
        }

        return res.status(200).json({
            message: "Summary generated successfully",
            result: response
        });

    } catch (error) {
        console.log("AI Error:", error.message);

        return res.status(503).json({
            message: "AI service is temporarily unavailable. Please try again."
        });
    }
}

export const explainController=async(req,res)=>{
    try {
        const { noteId } = req.body;
        const userId=req.userId;
    
        const note= await Note.findOne({_id : noteId,user:userId});
        if(!note){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const response=await explainer(note.content);
        
        if(!response){
            return res.status(500).json({
                message: "Failed to explain note"
            });
        }

        return res.status(200).json({
            message: "Explaination generated successfully",
            result: response
        });

    } catch (error) {
        console.log("AI Error:", error.message);

        return res.status(503).json({
            message: "AI service is temporarily unavailable. Please try again."
        });
    }
}

export const keyPointController=async(req,res)=>{
    try {
        const { noteId } = req.body;
        const userId=req.userId;
    
        const note= await Note.findOne({_id : noteId,user:userId});
        if(!note){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const response=await keyPointer(note.content);
        
        if(!response){
            return res.status(500).json({
                message: "Failed to generate key points"
            });
        }

        return res.status(200).json({
            message: "Key Points generated successfully",
            result: response
        });

    } catch (error) {
        console.log("AI Error:", error.message);

        return res.status(503).json({
            message: "AI service is temporarily unavailable. Please try again."
        });
    }
}


export const impQuestionsController=async(req,res)=>{
    try {
        const { noteId } = req.body;
        const userId=req.userId;
    
        const note= await Note.findOne({_id : noteId,user:userId});
        if(!note){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const response=await impQuestioner(note.content);
        
        if(!response){
            return res.status(500).json({
                message: "Failed to generate Imporatnt Questions"
            });
        }

        return res.status(200).json({
            message: "Imporatnt Questions generated successfully",
            result: response
        });

    } catch (error) {
        console.log("AI Error:", error.message);

        return res.status(503).json({
            message: "AI service is temporarily unavailable. Please try again."
        });
    }
}



export const quizController=async(req,res)=>{
    try {
        const { noteId } = req.body;
        const userId=req.userId;
    
        const note= await Note.findOne({_id : noteId,user:userId});
        if(!note){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const response=await quizer(note.content);
        
        if(!response){
            return res.status(500).json({
                message: "Failed to generate Quiz"
            });
        }

        return res.status(200).json({
            message: "Quiz generated successfully",
            result: response
        });

    } catch (error) {
        console.log("AI Error:", error.message);

        return res.status(503).json({
            message: "AI service is temporarily unavailable. Please try again."
        });
    }
}


export const chatController=async(req,res)=>{
    try {
        const { noteId , question} = req.body;
        const userId=req.userId;
        
        if (!question?.trim()) {
            return res.status(400).json({
                message: "Question is required"
            });
        }

        const note= await Note.findOne({_id : noteId,user:userId});
        if(!note){
            return res.status(404).json({
                message: "Note not found"
            });
        }

        const response=await chatWithAI(note.content,question);
        
        if(!response){
            return res.status(500).json({
                message: "Failed to generate answer"
            });
        }

        return res.status(200).json({
            message: "Answer generated successfully",
            result: response
        });

    } catch (error) {
        console.log("AI Error:", error.message);

        return res.status(503).json({
            message: "AI service is temporarily unavailable. Please try again."
        });
    }
}