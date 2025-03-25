const baseUrl = import.meta.env.VITE_SERVER_URL;
// const baseUrl = 'https://wdd330-backend.onrender.com'

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseUrl}/products/search/${category}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;

    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}

