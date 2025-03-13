<script lang="ts">
    import MarkdownIt from "markdown-it";
    import { onMount } from "svelte";

    let response = "";
    let chat = "";
    let md = new MarkdownIt();

    const onSubmit = async () => {
        try {
            const req = await fetch("/api", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ chat }) 
            });
            const res = await req.json();
            response = res?.message || "No response";
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
</script>

<div class="m-4 rounded bg-blue-400 p-4">   
    <input type="text" bind:value={chat} placeholder="Enter Chat" class="rounded border border-blue-600 p-2 focus:ring-blue-600" />
    <button on:click={onSubmit} class="rounded bg-pink-700 p-3 text-white">Send</button>
    {@html md.render(response || "Waiting for response...")}
</div>
