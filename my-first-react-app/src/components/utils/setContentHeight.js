// utils/setContentHeight.js
export function initContentHeight() {
    const contentWrap = document.querySelector(".contentWrap");
    const header = document.querySelector("nav");
    const footer = document.querySelector("footer");

    function setContentHeight() {
        if (contentWrap && header && footer) {
        const totalHeight = window.innerHeight;
        const headerHeight = header.offsetHeight;
        const footerHeight = footer.offsetHeight;
        contentWrap.style.height = (totalHeight - headerHeight - footerHeight) + "px";
        }
    }

    setContentHeight();

    let resizeTimer;
    function debounceResize() {
        cancelAnimationFrame(resizeTimer);
        resizeTimer = requestAnimationFrame(setContentHeight);
    }

    window.addEventListener("resize", debounceResize);

    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", debounceResize);
    }
}
