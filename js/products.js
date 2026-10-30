
const projectRoot = new URL("../", import.meta.url);

const productList = document.querySelector("#featured_list");
const categoryButtons = document.querySelectorAll(".category_btn");

const prevButton = document.querySelector(".products_prev");
const nextButton = document.querySelector(".products_next");

const priceFormatter = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
});

// 현재 캐러셀 위치
let currentIndex = 0;

// 상품 가격 포맷 및 카드 생성
function createProductCard(product) {
    const item = document.createElement("li");
    item.className = "product_card";

    const image = document.createElement("img");
    const mainImage = product.images[0];

    image.src = new URL(mainImage.src, projectRoot).href;
    image.alt = mainImage.alt;
    image.loading = "lazy";

    const name = document.createElement("h3");
    name.className = "product_name";
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product_price";
    price.textContent = priceFormatter.format(product.price);

    item.append(image, name, price);

    return item;
}

// 현재 화면에 표시할 수 있는 상품 개수 계산
function getVisibleCount() {
    const firstCard = productList.querySelector(".product_card");

    if (!firstCard) return 0;

    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(getComputedStyle(productList).columnGap) || 0;

    return Math.floor(
        (productList.clientWidth + gap) / (cardWidth + gap)
    );
}

// 캐러셀 위치 및 버튼 상태 업데이트
function updateCarousel() {
    const cards = productList.querySelectorAll(".product_card");

    const visibleCount = getVisibleCount();

    const gap = parseFloat(getComputedStyle(productList).columnGap) || 0;
    const cardWidth = cards[0]?.offsetWidth ?? 0;

    const maxIndex = Math.max(0, cards.length - visibleCount);

    // 화면 크기가 바뀌어도 마지막 상품을 넘어가지 않도록 제한
    currentIndex = Math.min(currentIndex, maxIndex);

    const moveDistance = cardWidth + gap;

    productList.style.transform =
        `translateX(-${currentIndex * moveDistance}px)`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
}

// 상품 목록 표시
function renderProducts(products, category) {
    const filteredProducts = products.filter(product => {
        return product.category === category && product.featured === true;
    });

    // 카테고리를 변경하면 첫 번째 상품부터 표시
    currentIndex = 0;

    productList.replaceChildren();

    if (filteredProducts.length === 0) {
        const message = document.createElement("li");
        message.className = "products_empty";
        message.textContent = "등록된 추천 상품이 없습니다.";

        productList.append(message);

        updateCarousel();
        return;
    }

    const cards = filteredProducts.map(createProductCard);
    productList.append(...cards);

    updateCarousel();
}

// 이전 상품으로 이동
prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// 다음 상품으로 이동
nextButton.addEventListener("click", () => {
    const visibleCount = getVisibleCount();
    const cards = productList.querySelectorAll(".product_card");
    const maxIndex = Math.max(0, cards.length - visibleCount);

    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

// 데이터 불러오기 및 초기화
async function initProducts() {
    if (!productList) return;

    try {
        const response = await fetch(
            new URL("data/product.json", projectRoot)
        );

        if (!response.ok) {
            throw new Error(`상품 요청 실패: ${response.status}`);
        }

        const products = await response.json();

        const selectedButton = document.querySelector(
            ".category_btn[aria-pressed='true']"
        );

        const initialCategory =
            selectedButton?.dataset.category ?? "clothing";

        renderProducts(products, initialCategory);

        // 카테고리 버튼 이벤트
        categoryButtons.forEach(button => {
            button.addEventListener("click", () => {
                categoryButtons.forEach(categoryButton => {
                    categoryButton.setAttribute(
                        "aria-pressed",
                        String(categoryButton === button)
                    );
                });

                renderProducts(products, button.dataset.category);
            });
        });

        // 브라우저 크기가 변경되면 위치 재계산
        window.addEventListener("resize", updateCarousel);

    } catch (error) {
        console.error(error);

        const message = document.createElement("li");
        message.className = "products_empty";
        message.textContent = "상품 정보를 불러오지 못했습니다.";

        productList.replaceChildren(message);

        updateCarousel();
    }
}

initProducts();
