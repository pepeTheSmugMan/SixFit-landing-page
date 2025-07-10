document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-gallery]').forEach(gallery => {
        const images = gallery.querySelectorAll('img');
        const prev = gallery.querySelector('.sixfit-gallery-prev');
        const next = gallery.querySelector('.sixfit-gallery-next');
        let currentIndex = 0;

        const showImage = (index) => {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
            currentIndex = index;
        };

        if (prev && next && images.length > 0) {
            prev.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(newIndex);
            });

            next.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % images.length;
                showImage(newIndex);
            });

            showImage(currentIndex); // Initial state
        } else {
            console.warn("Gallery buttons or images missing in this block.");
        }
    });
});