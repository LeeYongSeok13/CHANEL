async function loadFooter() {
    const placeholder = document.querySelector(
        "#site-footer-placeholder"
    );

    if (!placeholder) return;

    try {
        const response = await fetch("/components/footer.html");

        if(!response.ok) {
            throw new Error(`푸터 요청 실패: ${response.status}`);
        }

        const footerHtml = await response.text();
        placeholder.outerHTML = footerHtml;
    } catch (error) {
        console.error("공통 푸터를 불러오지 못했습니다.", error);
    }
}

loadFooter();