function toggleDiary() {
    const diary = document.getElementById('diaryWindow');
    if (!diary) return;

    if (getComputedStyle(diary).display === 'none') {
        // Show the element block so it can be animated
        diary.style.display = 'flex';

        // Small delay to allow display:flex to register before adding animation class
        setTimeout(() => {
            diary.classList.add('active');
        }, 10);
    } else {
        // Fade out
        diary.classList.remove('active');

        setTimeout(() => {
            diary.style.display = 'none';
        }, 300); // Matches the 0.3s in CSS
    }
}

dragElement(document.getElementById("diaryWindow"));

function dragElement(elmnt) {
    if (!elmnt) return;

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById("diaryHeader");

    if (header) {
        header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        let deltaX = e.clientX - pos3;

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        let skew = Math.max(Math.min(deltaX * 0.2, 15), -15);
        elmnt.style.transform = `skewX(${-skew}deg)`;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.transform = `skewX(0deg)`;
    }
}