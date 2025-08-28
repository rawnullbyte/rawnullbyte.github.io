document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('redirect-popup');
    const popupCancel = document.getElementById('popup-cancel');
    const popupConfirm = document.getElementById('popup-confirm');
    const popupMessage = document.getElementById('popup-message');

    let currentLink = '';
    let currentPlatform = '';

    // Add click event to links with id trigger-popup
    document.querySelectorAll('a#trigger-popup').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            currentLink = this.getAttribute('href');
            currentPlatform = this.getAttribute('data-type');

            // Set the popup message
            popupMessage.textContent = `You will be redirected to ${currentPlatform}. Do you want to continue?`;

            // Show the popup
            popup.classList.add('active');
        });
    });

    // Cancel button
    popupCancel.addEventListener('click', function() {
        popup.classList.remove('active');
    });

    // Confirm button
    popupConfirm.addEventListener('click', function() {
        window.open(currentLink, '_blank');
        popup.classList.remove('active');
    });

    // Close the popup when clicking outside of it
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});