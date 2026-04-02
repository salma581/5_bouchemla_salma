/// Détection automatique pour fetch local ou Render
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://kanap-js.onrender.com";

// Récupération des articles de l'API
async function getArticles() {
  try {
    const response = await fetch(`${API_URL}/api/products`);
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return [];
  }
}

// Injection des articles dans le DOM
async function fillSection() {
  const articles = await getArticles();

  if (!articles || articles.length === 0) {
    console.log("Aucun produit trouvé");
    return;
  }

  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = ""; // Nettoyage du container

  // Boucle pour chaque produit
  for (let product of articles) {
    // Création du lien vers la page produit avec l'ID
    const productLink = document.createElement("a");
    productLink.href = `html/product.html?id=${product._id}`;
    itemsContainer.appendChild(productLink);

    // Création de l'article
    const productArticle = document.createElement("article");
    productLink.appendChild(productArticle);

    // Image
    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;
    productArticle.appendChild(productImg);

    // Nom
    const productName = document.createElement("h3");
    productName.classList.add("productName");
    productName.textContent = product.name;
    productArticle.appendChild(productName);

    // Description
    const productDescription = document.createElement("p");
    productDescription.classList.add("productDescription");
    productDescription.textContent = product.description;
    productArticle.appendChild(productDescription);
  }
}

// Appel de la fonction pour injecter les produits
fillSection();