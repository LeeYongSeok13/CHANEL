const headerPlaceholder = document.querySelector("#site-header-placeholder");

async function loadHeader() {
  if(!headerPlaceholder) return;

  try {
    const response = await fetch("/components/header.html");

    if(!response.ok) {
      throw new Error(`헤더 요청 실패: ${response.status}`);
    }

    const headerHtml = await response.text();

    headerPlaceholder.outerHTML = headerHtml;

    await loadScript("/js/navigation.js");
    await loadScript("/js/header-search.js");
  } catch(error) {
    console.error("공통 헤더를 불러오지 못했습니다.", error);
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = src;

    script.onload = () => resolve();

    script.onerror = () => {
      reject(new Error(`스크립트 로드 실패: ${src}`));
    };

    document.body.appendChild(script);
  });
}

loadHeader();