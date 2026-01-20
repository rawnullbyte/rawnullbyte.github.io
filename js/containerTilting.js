document.addEventListener('DOMContentLoaded', () => {
    const groups = [
        {
            selectors: ['.container', '.music-container'],
            yOffsetTarget: -60,
            tiltIntensity: 10,
            state: { targetX: 0, targetY: 0, currentX: 0, currentY: 0, targetYOff: 0, currentYOff: 0 }
        }
    ];

    groups.forEach(group => {
        group.elements = group.selectors
            .map(s => document.querySelector(s))
            .filter(el => el !== null);

        group.elements.forEach(el => {
            Object.assign(el.style, {
                opacity: '0',
                transformStyle: 'preserve-3d',
                transition: 'opacity 0.8s ease',
                willChange: 'transform'
            });

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

                group.state.targetX = x * group.tiltIntensity;
                group.state.targetY = y * group.tiltIntensity;
            });

            el.addEventListener('mouseleave', () => {
                group.state.targetX = 0;
                group.state.targetY = 0;
            });
        });
    });

    function animate() {
        groups.forEach(group => {
            const s = group.state;

            // Smooth interpolation (Lerp)
            s.currentX += (s.targetX - s.currentX) * 0.1;
            s.currentY += (s.targetY - s.currentY) * 0.1;
            s.currentYOff += (s.targetYOff - s.currentYOff) * 0.05;

            group.elements.forEach((el, index) => {
                if (el.style.opacity !== '0') {
                    // Only apply vertical shift to the first element (leader) of a group
                    const yMove = (index === 0) ? s.currentYOff : 0;

                    el.style.transform = `
                        perspective(1000px) 
                        translateY(${yMove}px) 
                        rotateX(${-s.currentY}deg) 
                        rotateY(${s.currentX}deg)
                    `;
                }
            });
        });
        requestAnimationFrame(animate);
    }
    animate();

    document.body.addEventListener('click', () => {
        groups.forEach((group, gIndex) => {
            setTimeout(() => {
                if (group.elements[0]) group.elements[0].style.opacity = '1';

                // Delay movement and follower appearance
                setTimeout(() => {
                    group.state.targetYOff = group.yOffsetTarget;
                    group.elements.slice(1).forEach((follower, fIndex) => {
                        setTimeout(() => {
                            follower.style.opacity = '1';
                        }, fIndex * 300);
                    });
                }, 1000);

            }, gIndex * 500);
        });
    }, { once: true });
});