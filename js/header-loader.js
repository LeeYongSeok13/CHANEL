const headerPlaceholder = document.querySelector("#site-header-placeholder");
// 페이지 깊이와 관계없이 이 스크립트의 상위 폴더를 프로젝트 루트로 사용
const headerBaseUrl = new URL("../", document.currentScript.src);

async function loadHeader() {
  if(!headerPlaceholder) return;

  try {
    const response = await fetch(new URL("components/header.html", headerBaseUrl));

    if(!response.ok) {
      throw new Error(`헤더 요청 실패: ${response.status}`);
    }

    const headerHtml = await response.text();

    const template = document.createElement("template");
    template.innerHTML = headerHtml;

    // 공통 컴포넌트의 링크와 검색 폼을 프로젝트 기준 주소로 변환
    template.content.querySelectorAll('[href^="./"], [action^="./"]').forEach((element) => {
      const attribute = element.hasAttribute("href") ? "href" : "action";
      element.setAttribute(attribute, new URL(element.getAttribute(attribute), headerBaseUrl).href);
    });

    headerPlaceholder.replaceWith(template.content);

    await loadScript(new URL("js/navigation.js", headerBaseUrl));
    await loadScript(new URL("js/header-search.js", headerBaseUrl));
    await loadScript(new URL("js/auth.js", headerBaseUrl));
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
