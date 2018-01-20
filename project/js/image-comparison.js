document.querySelectorAll('.image-comparison__frame').forEach(el => {
    const imageToCompare = el.querySelector('.image-comparison__compare');
    const imageDivider = el.querySelector('.image-comparison__divider');
    let isClicked = false;
    let x = undefined;
    let width = undefined;

    document.querySelectorAll('.image-comparison__switcher li').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            link.parentElement.childNodes.forEach(e => e.classList.remove('image-comparison__switcher--active'))
            link.classList.add('image-comparison__switcher--active');
            changeImageTo(link.dataset.type);
        }
    });

    function changeImageTo(type) {
        el.querySelectorAll('img').forEach(img => {
            if(img.dataset.type === type) {
                img.classList.add('image-comparison__object');
            } else {
                img.classList.remove('image-comparison__object');
            }
        })
    }

    function changeDivPosition(e) {
        var horizontal = (e.clientX - x) / width * 100;
        imageToCompare.style.width = horizontal + '%';
        imageDivider.style.left = horizontal + '%';
    }

    function onTouchStart(e) {
        e.preventDefault();
        isClicked = true;
        const size = el.getBoundingClientRect();
        x = size.x;
        width = size.width;
        changeDivPosition(e);
    }

    function onTouchEnd(e) {
        e.preventDefault();
        isClicked = false;
    }

    function onMove(e) {
        if(!isClicked) {
            return;
        }
        changeDivPosition(e);
    }

    el.ontouchstart = onTouchStart;
    el.onmousedown = onTouchStart;
    el.ontouchend = onTouchEnd;
    el.ontouchleave = onTouchEnd;
    el.onmouseup = onTouchEnd;
    el.onmouseleave = onTouchEnd;

    el.ontouchmove = onMove;
    el.onmousemove = onMove;
});