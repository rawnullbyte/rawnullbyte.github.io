document.addEventListener('DOMContentLoaded', () => {
    const texts = [
        ".", "..", "...", "....", ".....", "Never / ever_Whatever... forever"
    ];

    const textElement = document.getElementById('typingText');
    const cursorChar = "|";
    let currentTextIndex = 0;

    function typeWriter(text, i) {
        if (i < text.length) {
            textElement.textContent = text.substring(0, i + 1) + cursorChar;
            setTimeout(() => typeWriter(text, i + 1), 185);
        } else {
            setTimeout(() => eraseText(text), 1000);
        }
    }

    function eraseText(text) {
        if (text.length > 0) {
            textElement.textContent = text.substring(0, text.length - 1) + cursorChar;
            setTimeout(() => eraseText(text.substring(0, text.length - 1)), 40);
        } else {
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            setTimeout(() => typeWriter(texts[currentTextIndex], 0), 500);
        }
    }

    typeWriter(texts[currentTextIndex], 0);
});
