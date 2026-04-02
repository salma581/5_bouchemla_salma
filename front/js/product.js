// Récupération de l'URL et de l'ID du produit
const url = new URL(window.location.href);
const idProduct = url.searchParams.get("id");
console.log("ID produit :", idProduct);

// Vérification que l'ID existe
if (!idProduct) {
    console.error("❌ Aucun ID dans l'URL");
}

// Détection automatique de l'environnement pour le fetch
const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://kanap-js.onrender.com";

// Récupération du produit
function getArticle() {
    fetch(`${API_URL}/api/products/${idProduct}`)
        .then((res) => res.json())
        .then((article) => {
            console.log("Produit reçu :", article);
            if (article) {
                displayArticle(article);
            }
        })
        .catch((error) => {
            console.error("❌ Erreur API :", error);
        });
}

// Affichage du produit dans le DOM
function displayArticle(article) {
    // Image
    const imgContainer = document.querySelector(".item__img");
    imgContainer.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;

    // Titre, prix, description
    document.getElementById("title").textContent = article.name;
    document.getElementById("price").textContent = article.price;
    document.getElementById("description").textContent = article.description;

    // Options de couleurs
    const colorSelect = document.getElementById("colors");
    article.colors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        colorSelect.appendChild(option);
    });

    // Gestion du panier
    addToCart(article);
}

// Gestion du panier
function addToCart(article) {
    const colorPicked = document.querySelector("#colors");
    const quantityPicked = document.querySelector("#quantity");
    const btn_envoyerPanier = document.querySelector("#addToCart");

    btn_envoyerPanier.addEventListener("click", () => {
        const choixCouleur = colorPicked.value;
        const choixQuantite = Number(quantityPicked.value);

        if (choixQuantite > 0 && choixQuantite <= 100 && choixCouleur) {
            const optionsProduit = {
                idProduit: idProduct,
                couleurProduit: choixCouleur,
                quantiteProduit: choixQuantite,
                nomProduit: article.name,
                prixProduit: article.price,
                descriptionProduit: article.description,
                imgProduit: article.imageUrl,
                altImgProduit: article.altTxt,
            };

            let produitLocalStorage = JSON.parse(localStorage.getItem("produit")) || [];

            const resultFind = produitLocalStorage.find(
                (el) =>
                    el.idProduit === idProduct &&
                    el.couleurProduit === choixCouleur
            );

            if (resultFind) {
                // Produit déjà dans le panier
                resultFind.quantiteProduit += choixQuantite;
            } else {
                // Nouveau produit
                produitLocalStorage.push(optionsProduit);
            }

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            // Pop-up confirmation
            if (
                window.confirm(
                    `Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier.\nPour consulter votre panier, cliquez sur OK.`
                )
            ) {
                window.location.href = "cart.html";
            }
        } else {
            alert("Veuillez sélectionner une couleur et une quantité valide (1-100).");
        }
    });
}

// Appel de la fonction principale
getArticle();