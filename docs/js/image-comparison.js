document.querySelectorAll('.image-comparison').forEach(comparison => {
    const frame = comparison.querySelector('.image-comparison__frame');
    const imageToCompare = comparison.querySelector('.image-comparison__compare');
    const imageDivider = comparison.querySelector('.image-comparison__divider');
    const typeSwitchLinks = comparison.querySelectorAll('.image-comparison__switcher li');
    let isClicked = false;
    let x = undefined;
    let width = undefined;

    typeSwitchLinks.forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            changeImageTo(link.dataset.type);
            changeLinkTo(link.dataset.type);
        }
    });

    function changeLinkTo(type) {
        typeSwitchLinks.forEach(link => {
            link.classList[link.dataset.type === type ? 'add' : 'remove']('image-comparison__switcher--active');
        });
    }

    function changeImageTo(type) {
        comparison.querySelectorAll('img').forEach(img => {
            img.classList[img.dataset.type === type ? 'add' : 'remove']('image-comparison__object');
        });
    }

    function changeDivPosition(e) {
        var horizontal = (e.clientX - x) / width * 100;
        imageToCompare.style.width = horizontal + '%';
        imageDivider.style.left = horizontal + '%';
    }

    function onTouchStart(e) {
        e.preventDefault();
        isClicked = true;
        const size = comparison.getBoundingClientRect();
        x = size.x;
        width = size.width;
        changeDivPosition(e);
    }

    function onTouchEnd(e) {
        e.preventDefault();
        isClicked = false;
    }

    function onMove(e) {
        if (!isClicked) {
            return;
        }
        changeDivPosition(e);
    }

    frame.ontouchstart = onTouchStart;
    frame.onmousedown = onTouchStart;
    frame.ontouchend = onTouchEnd;
    frame.ontouchleave = onTouchEnd;
    frame.onmouseup = onTouchEnd;
    frame.onmouseleave = onTouchEnd;

    frame.ontouchmove = onMove;
    frame.onmousemove = onMove;
});