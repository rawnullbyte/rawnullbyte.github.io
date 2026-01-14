// Optimized code to block inspection and context menu without interfering with other elements
(function () {
    // Using passive: false only when necessary
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    }, { passive: false });

    // Optimized to check only the relevant keys
    document.addEventListener('keydown', function (event) {
        // First check keyCode to avoid unnecessary checks
        if (event.keyCode === 123 || (event.ctrlKey && event.shiftKey && event.keyCode === 73)) {
            event.preventDefault();
            return false;
        }
    }, { passive: false, capture: false });
})();