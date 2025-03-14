<script lang="ts">
    import MarkdownIt from "markdown-it";

    let response = "";
    let chat = "";
    let isTyping = false;
    const md = new MarkdownIt();

    const onSubmit = async () => {
        if (!chat.trim()) return;

        isTyping = true;
        response = "";

        const req = await fetch("http://localhost:5173/api", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat }) 
        });
        const res2 = await req.json();

        response = res2.message?.content || "";
        isTyping = false;
        chat = ""; // Clear input after sending
    };
</script>

<style>
    :global(body) {
        background: radial-gradient(circle at top right, #1a1a2a, #2a2a3a);
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: 'Inter', -apple-system, sans-serif;
        color: #e0e0e0;
    }

    .chat-wrapper {
        width: 90%;
        max-width: 700px;
        background: rgba(40, 40, 50, 0.95);
        border-radius: 25px;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
        padding: 30px;
        margin: 20px;
    }

    .response-container {
        min-height: 100px;
        max-height: 500px;
        overflow-y: auto;
        background: rgba(50, 50, 60, 0.8);
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 25px;
        scrollbar-width: thin;
        scrollbar-color: #555 #2a2a2a;
    }

    .response {
        color: #e0e0e0;
        font-size: 16px;
        line-height: 1.6;
    }

    .loading {
        color: #888;
        font-style: italic;
        font-size: 14px;
        text-align: center;
        padding: 10px;
        background: rgba(60, 60, 70, 0.5);
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .input-container {
        display: flex;
        gap: 15px;
        background: rgba(30, 30, 40, 0.95);
        border-radius: 15px;
        padding: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    input {
        flex: 1;
        background: rgba(50, 50, 60, 0.8);
        border: 1px solid #444;
        border-radius: 10px;
        padding: 12px 20px;
        color: #e0e0e0;
        font-size: 15px;
        outline: none;
        transition: all 0.2s ease;
    }

    input:focus {
        border-color: #7b54b7;
        background: rgba(60, 60, 70, 0.8);
    }

    input::placeholder {
        color: #888;
    }

    button {
        background: linear-gradient(135deg, #6e48aa, #9d65c9);
        border: none;
        border-radius: 10px;
        padding: 12px 24px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(110, 72, 170, 0.3);
        background: linear-gradient(135deg, #7b54b7, #aa71d6);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
</style>

<div class="chat-wrapper">
    {#if response}
        <div class="response-container">
            <div class="response">
                {@html md.render(response.replace(/^[\s\S]*<\/think>(?![\s\S]*<\/think>)/g, ""))}
            </div>
        </div>
    {/if}
    
    {#if isTyping}
        <p class="loading">Assistant is thinking...</p>
    {/if}

    <div class="input-container">
        <input 
            type="text" 
            bind:value={chat} 
            placeholder="Message KelAI" 
            on:keypress={(e) => e.key === 'Enter' && onSubmit()} 
        />
        <button on:click={onSubmit}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2.01 21L23 12 2.01 3v7l15 2-15 2v7z" fill="currentColor"/>
            </svg>
            Send
        </button>
    </div>
</div>