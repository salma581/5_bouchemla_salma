// Récupération des articles de l'API
async function getArticles() {
    try {
        const response = await fetch('https://kanap-js.onrender.com/api/products');
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        return [];
    }
}

// Répartition des données de l'API dans le DOM
async function fillSection() {
    const articles = await getArticles();
    
    if (!articles || articles.length === 0) {
        console.log('Aucun produit trouvé');
        return;
    }
    
    console.table(articles);
    
    // Parcourir tous les produits
    for (let i = 0; i < articles.length; i++) {
        const product = articles[i];
        
        // Insertion de l'élément "a"
        let productLink = document.createElement("a");
        productLink.href = `product.html?id=${product._id}`;
        document.querySelector(".items").appendChild(productLink);
        
        // Insertion de l'élément "article"
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);
        
        // Insertion de l'image
        let productImg = document.createElement("img");
        productImg.src = product.imageUrl;
        productImg.alt = product.altText;  // Note: altText (pas altTxt)
        productArticle.appendChild(productImg);
        
        // Insertion du titre "h3"
        let productName = document.createElement("h3");
        productName.classList.add("productName");
        productName.textContent = product.name;  // textContent est plus sûr
        productArticle.appendChild(productName);
        
        // Insertion de la description "p"
        let productDescription = document.createElement("p");
        productDescription.classList.add("productDescription");  // classe différente
        productDescription.textContent = product.description;
        productArticle.appendChild(productDescription);
    }
}

// Appel de la fonction
fillSection();