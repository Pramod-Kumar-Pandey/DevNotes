import Note from "../models/noteModel.js";

export const getNoteController=async(req,res)=>{
    try {
        const userId=req.userId;
        const notes=await Note.find({user:userId});

        return res.status(200).json({
            message:"Notes fetched successfully",
            notes
        })
    } catch (error) {
        console.log("Error in getNote "+ error.message);
        return res.status(500).json({
            message:"Server Error"
        });
    }

}


export const createNoteController=async(req,res)=>{
    try {
        const userId=req.userId;
        const {title,content,category,tags}=req.body;

        if(!title || !content || !category){
            return res.status(400).json({
                message:"Title, content and category are required"
            })
        }

        const note=await Note.create({
            title,
            content,
            category,
            tags,
            user:userId
        });

        return res.status(201).json({
            message:"Note created successfully",
            note
        });
        
    } catch (error) {
        console.log("Error in Create Notes : " + error.message);
        return res.status(500).json({
            message:"Server Error"
        })
    }

}


export const deleteNoteController=async(req,res)=>{
    try {
        const {id}=req.params;
        const userId=req.userId;

        if (!id) {
            return res.status(400).json({
                message: "Note id is required"
            });
        }

        const deletedNote= await Note.findOneAndDelete({_id : id, user :userId});

        if(! deletedNote){
            return res.status(404).json({
                message: "Note not found for deletion"
            });
        }

        return res.status(200).json({
            message: "Note deleted successfully",
            note: deletedNote
        });
    } catch (error) {
        console.log("Error in deletion "+ error.message);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


export const readNoteController=async(req,res)=>{
    try{
        const {id}=req.params;
        const userId=req.userId;

        if(! id){
            return res.status(400).json({
                message:"Note id required"
            });
        }

        const note=await Note.findOne({
            _id : id,
            user:userId
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        return res.status(200).json({
            message:"Note fetched successfully",
            note
        })
    }catch(error){
        console.log("Error in Read Note:", error.message);

        return res.status(500).json({
            message: "Server Error"
        });
    }

}


export const updateNoteController=async(req,res)=>{
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!id) {
            return res.status(400).json({
                message: "Note id is required"
            });
        }
        

        const {title,content,category,tags}=req.body;

        if (!title || !content || !category) {
            return res.status(400).json({
                message: "Title, content and category are required"
            });
        }

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: id,
                user: userId
            },
            {
                title,
                content,
                category,
                tags
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        return res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote
        });
        
    } catch (error) {
        console.log("Error in update Note:", error.message);
        return res.status(500).json({
            message:"Server error"
        });
    }
}