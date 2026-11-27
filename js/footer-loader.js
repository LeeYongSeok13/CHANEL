const footerBaseUrl = new URL("../", document.currentScript.src);

async function loadFooter() {
    const placeholder = document.querySelector(
        "#site-footer-placeholder"
    );

    if (!placeholder) return;

    try {
        const response = await fetch(new URL("components/footer.html", footerBaseUrl));

        if(!response.ok) {
            throw new Error(`푸터 요청 실패: ${response.status}`);
        }

        const footerHtml = await response.text();
        const template = document.createElement("template");
        template.innerHTML = footerHtml;

        template.content.querySelectorAll('[href^="./"]').forEach((link) => {
            link.setAttribute("href", new URL(link.getAttribute("href"), footerBaseUrl).href);
        });

        placeholder.replaceWith(template.content);
    } catch (error) {
        console.error("공통 푸터를 불러오지 못했습니다.", error);
    }
}

loadFooter();
