import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const summarizer = async (noteContent) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `
                Summarize the following developer note in simple and concise language.
                Focus on the main concepts and important points.

                Note:
                ${noteContent}`
        });

        return response.text;
    } catch (error) {
        console.log("Summarize Error:", error.message);
        throw error;
    }
};


export const explainer = async (noteContent) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `
                Explain the following developer note in simple and easy-to-understand language.
                Break down difficult concepts and explain them step by step.
                Use a small example when it helps understanding.
                Do not add unrelated information.

                Note:
                ${noteContent}`
        });

        return response.text;
    } catch (error) {
        console.log("Explain Error:", error.message);

        throw error;
    }
};


export const keyPointer = async (noteContent) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `
                Extract the most important key points from the following developer note.
                Present them as a clear bullet-point list.
                Keep each point short and easy to understand.
                Focus only on the important concepts, facts, and takeaways from the note.
                Do not add information that is not present in the note.

                Note:
                ${noteContent}`
        });

        return response.text;
    } catch (error) {
        console.log("Key Point Error:", error.message);

       throw error;
    }
};


export const impQuestioner = async (noteContent) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `
                Based only on the following developer note, generate the most important
                questions that a student should prepare from this topic.

                Focus on:
                - Important concepts
                - Definitions
                - Differences between concepts
                - How things work
                - Important interview-oriented questions

                Do not provide answers.
                Do not add information that is not present in the note.

                Generate 5 important questions.

                Note:
                ${noteContent}`
        });

        return response.text;
    } catch (error) {
        console.log("Key Point Error:", error.message);

       throw error;
    }
};


export const quizer = async (noteContent) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `
                Create a quiz based only on the following developer note.

                Generate 5 multiple-choice questions.

                For each question provide:
                - question
                - 4 options
                - correct answer

                Requirements:
                - Each question must have exactly 4 options.
                - Only one option should be correct.
                - The correct answer must be one of the four options.
                - Questions should test understanding of the note.
                - Do not add information that is not present in the note.
                - Return the result as valid JSON only.

                Use this structure:

                [
                {
                    "question": "Question here",
                    "options": [
                    "Option A",
                    "Option B",
                    "Option C",
                    "Option D"
                    ],
                    "answer": "Correct option here"
                }
                ]

                Note:
                ${noteContent}`
        });

        return response.text;
    } catch (error) {
        console.log("Key Point Error:", error.message);

       throw error;
    }
};


export const chatWithAI = async (noteContent,question) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `
                You are an AI assistant helping a user understand their developer notes.

                Use the note as the primary context for answering the user's question.
                If the note does not contain enough information to answer the question,
                you may use your general knowledge to provide a helpful answer.
                Clearly mention when you are adding information beyond the note.

                Requirements:
                - Give a clear and simple answer.
                - Explain the concept in an easy-to-understand way.
                - Use an example when it helps.
                - If the answer is not available in the note, say:
                "This information is not available in the note."
                - Do not invent or add unrelated information.

                Note:
                ${noteContent}

                User Question:
                ${question}
                `
        });

        return response.text;
    } catch (error) {
        console.log("Ask AI Error:", error.message);

       throw error;
    }
};

