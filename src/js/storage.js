const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    quantity: 10,
    createdAt: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    quantity: 10,
    createdAt: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "Vue.js",
    category: "frontend",
    quantity: 10,
    createdAt: "2021-11-01T10:47:26.889Z",
  },
];

const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of applications",
    createdAt: "2021-11-01T10:47:26.889Z",
  },
  {
    id: 2,
    title: "backend",
    description: "the backend of the applications",
    createdAt: "2021-10-01T10:47:26.889Z",
  },
];

export default class Storage {
  // add new category
  // save category
  // get all category
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    // sort => desending
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }
  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedCategory = savedCategories.find(
      (c) => c.id === categoryToSave.id
    );
    if (existedCategory) {
      // edite
      existedCategory.title = categoryToSave.title;
      existedCategory.description = categoryToSave.description;
    } else {
      // new
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    // sort => desending
    return savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }
  static saveProduct(productToSave) {
    const savedProducts = Storage.getAllProducts();
    const existedProducts = savedProducts.find(
      (c) => c.id === productToSave.id
    );
    if (existedProducts) {
      // edite
      existedProducts.title = productToSave.title;
      existedProducts.quantity = productToSave.quantity;
      existedProducts.category = productToSave.category;
    } else {
      // new
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id != parseInt(id));
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}
