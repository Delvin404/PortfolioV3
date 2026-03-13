document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('a.btn, a.btn2, input.send-btn');
    const logo = document.getElementById('nav-logo');
    const destroySound = document.getElementById('destroySound');
    const screamAudio = document.getElementById('mustafaAudio');
    const kuruVideo = document.getElementById('kurukuruVideo'); // ✅ Moved here
    const clickCounts = new Map();
    let currentLogoIndex = 1;
    const totalLogos = 8;
    let screamAchievementUnlocked = false;
    let kuruAchievementUnlocked = false; // ✅ New achievement flag

    // Button click achievement
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentCount = clickCounts.get(btn) || 0;
            clickCounts.set(btn, currentCount + 1);

            if (clickCounts.get(btn) === 10) {
                showAchievementNotification(
                    'Button Masher',
                    'Click the same button 10 times.',
                    'https://cdn-icons-png.flaticon.com/512/1055/1055646.png'
                );
            }
        });
    });

    // Footer button achievement
    document.getElementById('footerGrassButton').addEventListener('click', () => {
        showAchievementNotification(
            'Touch some grass',
            "Wait, that's not what I meant–",
            './img/grassad.png'
        );
    });

    // Logo click cycle
    logo.addEventListener('click', () => {
        if (destroySound) {
            destroySound.currentTime = 0;
            destroySound.play().catch(e => {
                console.warn("Destroy sound could not be played:", e);
            });
        }

        currentLogoIndex++;
        if (currentLogoIndex > totalLogos) currentLogoIndex = 1;

        logo.classList.add('animate');

        setTimeout(() => {
            logo.classList.remove('animate');
            logo.src = `img/logo/logo_${currentLogoIndex}.png`;

            if (currentLogoIndex === totalLogos) {
                showAchievementNotification(
                    'Destroy Portoflio of Delvin',
                    'Awww man you destroyed my portfolio',
                    './img/destroyad.jpg'
                );
            }
        }, 150);
    });

    // Scream audio triggers achievement
    if (screamAudio) {
        screamAudio.addEventListener('play', () => {
            if (!screamAchievementUnlocked) {
                screamAchievementUnlocked = true;
                showAchievementNotification(
                    'Ewwww Ghulam Mustafa',
                    'I need to wash my eyes',
                    './img/gmad.jpg'
                );
            }
        });
    }

    // ✅ Kuru kuru video triggers achievement
    if (kuruVideo) {
        kuruVideo.addEventListener('play', () => {
            if (!kuruAchievementUnlocked) {
                kuruAchievementUnlocked = true;
                console.log("Kuru video found:", !!kuruVideo);
                showAchievementNotification(
                    'kuru kuru',
                    'Kuru kuru kuru kuru kuru',
                    './img/kurukuru.gif'
                );
            }
        });
    }

    // ✅ Achievement notification function
    function showAchievementNotification(title, description, iconUrl) {
        const titleElem = document.getElementById('achievementTitle');
        const descElem = document.getElementById('achievementDesc');
        const iconElem = document.getElementById('achievementIcon');
        const notification = document.getElementById('achievementNotification');
        const audio = document.getElementById('achievementSound');

        titleElem.textContent = title;
        descElem.textContent = description;
        iconElem.src = iconUrl;

        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => {
                console.warn("Achievement sound could not be played:", e);
            });
        }

        notification.classList.remove('hidden');
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hidden');
        }, 6000);
    }
});
