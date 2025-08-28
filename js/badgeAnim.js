document.addEventListener('DOMContentLoaded', function() {
  // Select all badges
  const badges = document.querySelectorAll('.profileBadge');
  
  // For each badge, add mouse events
  badges.forEach(badge => {
    // Create a custom tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'badge-tooltip';
    
    // Determine the text based on the badge's class
    let tooltipText = '';
    if (badge.classList.contains('dev')) tooltipText = 'Developer';
    else if (badge.classList.contains('staff')) tooltipText = 'Staff';
    else if (badge.classList.contains('certif')) tooltipText = 'Certified';
    else if (badge.classList.contains('premium')) tooltipText = 'Premium';
    else if (badge.classList.contains('bughunter')) tooltipText = 'Bug Hunter';
    else if (badge.classList.contains('earlysupporter')) tooltipText = 'Early Supporter';
    else if (badge.classList.contains('fire')) tooltipText = 'ζξζ ι ζξζ';
    else if (badge.classList.contains('graphic')) tooltipText = 'Graphic Designer';
    else if (badge.classList.contains('imagehost')) tooltipText = 'Image Host';
    else if (badge.classList.contains('og')) tooltipText = 'OG';
    else if (badge.classList.contains('sweet')) tooltipText = 'Candy';
    else if (badge.classList.contains('patrick')) tooltipText = 'St. Patrick';
    
    tooltip.textContent = tooltipText;
    document.body.appendChild(tooltip);
    
    // Position and animate the tooltip on mouseover
    badge.addEventListener('mouseenter', function(e) {
    const badgeRect = badge.getBoundingClientRect();
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translate(-50%, 10px) scale(0.8)';
    
    // Position the tooltip above the badge
    tooltip.style.left = `${badgeRect.left + badgeRect.width/2}px`;
    tooltip.style.top = `${badgeRect.top - 10}px`;
    
    // Apply the animation
    requestAnimationFrame(() => {
      tooltip.style.opacity = '0.9';
      tooltip.style.transform = 'translate(-50%, -30px) scale(1)';
    });
    });
    
    // Hide and animate the tooltip on mouse leave
    badge.addEventListener('mouseleave', function() {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translate(-50%, 10px) scale(0.8)';
    
    // Completely hide after the animation finishes
    setTimeout(() => {
      tooltip.style.visibility = 'hidden';
    }, 300);
    });
  });
  
  // Implementation for discordUserBadge with data-tooltip
  const discordBadges = document.querySelectorAll('.discordUserBadge[data-tooltip]');
  
  discordBadges.forEach(badge => {
    // Create a custom tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'badge-tooltip discord-tooltip';
    tooltip.textContent = badge.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    // Position and animate the tooltip on mouseover
    badge.addEventListener('mouseenter', function(e) {
    const badgeRect = badge.getBoundingClientRect();
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translate(-50%, 10px) scale(0.8)';
    
    // Position the tooltip above the badge
    tooltip.style.left = `${badgeRect.left + badgeRect.width/2}px`;
    tooltip.style.top = `${badgeRect.top - 7}px`;
    
    // Apply the animation
    requestAnimationFrame(() => {
      tooltip.style.opacity = '0.9';
      tooltip.style.transform = 'translate(-50%, -30px) scale(1)';
    });
    });
    
    // Hide and animate the tooltip on mouse leave
    badge.addEventListener('mouseleave', function() {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translate(-50%, 10px) scale(0.8)';
    
    // Completely hide after the animation finishes
    setTimeout(() => {
      tooltip.style.visibility = 'hidden';
    }, 300);
    });
  });
  });