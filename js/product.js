const projectRoot = new URL('../', import.meta.url);

const response = await fetch(new URL('data/product.json', projectRoot));
const products = await response.json();

function createProductCard(product) {
    const item = document.createElement("li");
    item.className = "product_card";

    const firstImage = product.images?.[0];

    if (firstImage) {
        const image = document.createElement("img");
        image.className = "product_image";
        image.src = new URL(firstImage.src, projectRoot).href;
        image.alt = firstImage.alt || product.name;
        image.loading = "lazy";
        item.append(image);
    }

    const name = document.createElement("h3");
    name.className = "product_name";
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "product_price";
    price.textContent = `${product.price.toLocaleString("ko-KR")}원`;

    item.append(name, price);

    return item;
}

const featuredList = document.querySelector("#featured_list");

// 추천 상품만 선택
const featuredProducts = products.filter(
    (product) => product.featured === true
);

// 카드를 만들고 목록에 추가
featuredProducts.forEach((product) => {
    const card = createProductCard(product);
    featuredList.append(card);
})