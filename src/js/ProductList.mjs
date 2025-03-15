function productCardTemplate(product) {
  // Calcular si hay descuento
  const hasDiscount = product.FinalPrice < product.SuggestedRetailPrice;

  // Si hay descuento, calcula el monto y/o porcentaje
  const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
  const discountPercent = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);

  // Crear etiqueta de descuento solo si aplica
  const discountTag = hasDiscount
    ? `<span class="discount-tag">Save $${discountAmount} (${discountPercent}% OFF)</span>`
    : "";

  return `
    <li class="product-card">
      <a href="../product_pages/${product.Id}.html">
        <img src="${product.Image}" alt="${product.Name}">
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__brand">${product.Brand?.Name || ''}</p>
        <p class="product-card__color">${product.Colors?.[0]?.ColorName || ''}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
        ${discountTag}
      </a>
    </li>
  `;
}


export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list); // ← Mostrar todos los productos
  }

  renderList(productList) {
    const htmlString = productList.map(productCardTemplate).join("");
    this.listElement.innerHTML = htmlString;
  }

  // Método auxiliar: verifica si hay un archivo HTML para ese producto
  hasDetailPage(product) {
    // Este método puede ser más complejo si lo deseas, por ahora asumimos que
    // solo los productos que tienen un HTML de detalles (Id.html) deben mostrarse.
    // Aquí puedes hacer una comparación simple por lista blanca, si sabes cuáles sí tienen página.
    const allowedIds = ["880RR", "985RF"]; // ← Solo mostrar estos por ahora
    return allowedIds.includes(product.Id);
  }
}