const projectRoot = new URL('../', import.meta.url);

const productList = document.querySelector("#featured_list");

const categoryButtons = document.querySelectorAll(".category_btn");

const priceFormatter = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
});

// 상품 하나를 목록 항목으로 만들기
function createProductCard(product) {
    const item = document.createElement("li");
    item.className = "product_card";

    const image = document.createElement("img");
    const mainImage = product.images[0];

    // 이미지 경로도 프로젝트 루트를 기준으로 해석
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

// 선택한 카테고리의 추천 상품 표시하기
function renderProducts(products, category) {
    const filteredProducts = products.filter(product => {
        return product.category === category && product.featured === true;
    });

    // 이전 목록 비우기
    productList.replaceChildren();

    if (filteredProducts.length === 0) {
        const message = document.createElement("li");
        message.textContent = "등록된 추천 상품이 없습니다.";
        productList.append(message);
        return;
    }

    const cards = filteredProducts.map(createProductCard);
    productList.append(...cards);
}

// 데이터 불러오기 및 초기화면 설정
async function initProducts() {
    // 상품 목록이 없는 페이지에서는 실행하지 않기
    if (!productList) return;

    try {
        const response = await fetch(
            new URL("data/product.json", projectRoot)
        );

        if (!response.ok) {
            throw new Error(`상품 요청 실패: ${response.status}`);
        }

        const products =await response.json();

        const selectedButton = document.querySelector(".category_btn[aria-pressed='true']");

        const initialCategory = selectedButton?.dataset.category ?? "clothing";
        renderProducts(products, initialCategory);

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
    } catch (error) {
        console.error(error);

        const message = document.createElement("li");
        message.textContent = "상품 정보를 불러오지 못했습니다.";
        productList.replaceChildren(message);
    }
}

initProducts();
