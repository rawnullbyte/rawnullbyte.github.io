function updateDiscordProfile() {
    const userId = '1430764750622425168';
    
    // Use Lanyard API to get Discord status
    fetch(`https://api.lanyard.rest/v1/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Check if data was successfully fetched
            if (!data || !data.success) {
                throw new Error('Invalid response from Lanyard API');
            }
            
            const userData = data.data;
            console.log('Lanyard API response:', userData);
            
            // Update profile avatar
            const avatarImg = document.querySelector('.avatarImage');
            if (avatarImg && userData.discord_user && userData.discord_user.avatar) {
                // Get avatar URL with cache busting
                const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${userData.discord_user.avatar}.png?size=256&t=${Date.now()}`;
                
                avatarImg.src = avatarUrl;
                avatarImg.crossOrigin = "anonymous";
                avatarImg.onerror = function() {
                    // Fallback to default avatar if custom avatar fails to load
                    console.log('Avatar failed to load, using fallback');
                    this.src = `https://cdn.discordapp.com/embed/avatars/${userId % 5}.png`;
                };
                console.log(`Updated avatar:`, avatarUrl);
            }
            
            // Update status indicator
            const statusImg = document.querySelector('.discordStatus');
            if (statusImg) {
                // Set status image based on Discord status
                const status = userData.discord_status || 'offline';
                switch(status) {
                    case 'online': statusImg.src = '/img/online.png'; break;
                    case 'idle': statusImg.src = '/img/idle.png'; break;
                    case 'dnd': statusImg.src = '/img/dnd.png'; break;
                    default: statusImg.src = '/img/offline.png';
                }
                console.log(`Updated status:`, status);
            } else {
                console.error('Element .discordStatus not found in DOM');
            }
            
            // Update username if element exists
            const displayNameElement = document.querySelector('.discordDisplayName');
            if (displayNameElement && userData.discord_user) {
                // Use display_name if available, otherwise username
                displayNameElement.textContent = userData.discord_user.display_name;
            }

            // Update username if element exists
            const usernameElement = document.querySelector('.discordUsername');
            if (usernameElement && userData.discord_user) {
                // Use display_name if available, otherwise username
                usernameElement.textContent = userData.discord_user.username;
            }
            
            // Get bio from Lanyard's KV store
            const bioElement = document.querySelector('.discordBio');
            if (bioElement && userData.kv) {
                // Check if bio exists in KV store
                if (userData.kv.bio) {
                    bioElement.textContent = userData.kv.bio;
                } else {
                    // Fallback to default bio if no KV bio found
                    bioElement.textContent = '𝘐 𝘸𝘢𝘯𝘵 𝘵𝘰 𝘣𝘦 𝘥𝘦𝘢𝘉';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching Discord status:', error);
            
            // Set offline status on error
            const statusImg = document.querySelector('.discordStatus');
            if (statusImg) {
                statusImg.src = '/img/offline.png';
            }
            
            // Set fallback username and bio
            const displayNameElement = document.querySelector('.discordDisplayName');
            if (displayNameElement) {
                displayNameElement.textContent = 'NullByte';
            }

            const usernameElement = document.querySelector('.discordUsername');
            if (usernameElement) {
                usernameElement.textContent = 'rawnullbyte';
            }

        });
}

// Update when document loads
document.addEventListener('DOMContentLoaded', function() {
    // Call function to update
    updateDiscordProfile();
    
    // Call function periodically to keep updated
    setInterval(updateDiscordProfile, 30000); // 30 seconds
});

// Add manual click event to force update
const avatarImg = document.querySelector('.avatarImage');
if (avatarImg) {
    avatarImg.addEventListener('click', function() {
        console.log('Manually updating...');
        updateDiscordProfile();
    });
}
