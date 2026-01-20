async function loadDiary() {
    const contentArea = document.querySelector('.diary-content-area');
    const template = document.getElementById('entry-template');

    if (!contentArea) {
        console.warn("Diary content area not found yet.");
        return;
    }

    try {
        const response = await fetch('diary.txt');
        if (!response.ok) throw new Error('diary.txt not found');

        const text = await response.text();
        const chunks = text.split(/^---$/m).map(chunk => chunk.trim()).filter(Boolean);

        contentArea.innerHTML = '';

        for (let i = 0; i < chunks.length; i += 2) {
            const metadata = chunks[i];
            const body = chunks[i + 1];

            if (!body) continue;

            const dateMatch = metadata.match(/date:\s*(.*)/i);
            const dateText = dateMatch ? dateMatch[1] : "Undated";

            const clone = template.content.cloneNode(true);
            clone.querySelector('.date').textContent = dateText;
            clone.querySelector('.markdown-content').innerHTML = marked.parse(body);

            contentArea.prepend(clone);
        }
    } catch (err) {
        console.error("Diary Error:", err);
        if (contentArea) {
            contentArea.innerHTML = `<p style="color:gray; padding: 20px;">Error loading diary.md</p>`;
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDiary);
} else {
    loadDiary();
}