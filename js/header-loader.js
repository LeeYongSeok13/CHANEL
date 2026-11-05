(() => {
  const loaderUrl = document.currentScript?.src;
  const placeholder = document.querySelector("#site-header-placeholder");

  if (!loaderUrl || !placeholder) return;

  function loadScript(fileName) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = new URL(fileName, loaderUrl).href;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`스크립트를 불러오지 못했습니다: ${fileName}`));
      document.body.appendChild(script);
    });
  }

  async function loadHeader() {
    try {
      const headerUrl = new URL("../components/header.html", loaderUrl);
      const response = await fetch(headerUrl);

      if (!response.ok) {
        throw new Error(`header.html 로드 실패: ${response.status}`);
      }

      const headerHtml = await response.text();
      placeholder.insertAdjacentHTML("beforebegin", headerHtml);
      placeholder.remove();

      // 삽입된 헤더를 대상으로 메뉴와 검색 이벤트를 차례로 연결
      await loadScript("navigation.js");
      await loadScript("header-search.js");
    } catch (error) {
      console.error("공통 헤더를 불러오지 못했습니다.", error);
    }
  }

  loadHeader();
})();
