import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";
import userData from "$lib/data/user.json"; // Import the JSON file

export const POST: RequestHandler = async ({ request }) => {
    const ollama = new Ollama({ host: "http://localhost:11434" });

    const body = await request.json();
    const chatMessage = body.chat || "";

    try {
        const chat = await ollama.chat({
            model: "deepseek-r1:7b",
            messages: [
                {
                    role: "system",
                    content: `Here is the data of my user: ${JSON.stringify(userData)}
                              Respond only based on the data provided. If the user asks a question not covered, say: 'Sorry, I don’t have info on that yet!'`,
                },
                {
                    role: "user",
                    content: chatMessage,
                },
            ],
        });

        return json({ message: chat.message });
    } catch (error) {
        console.error("Error communicating with Ollama:", error);
        return json({ error: "Failed to process the request" }, { status: 500 });
    }
};