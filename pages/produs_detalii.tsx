"use client"
// src/pages/ProductDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Product = {
    Brand: string;
    Descriere: string;
    Id: number;
    Id_tip: string;
    Imagine: string;
    Nume: string;
    PretBucata: number;
    Stoc: number;
};

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>(); // Folosește useParams pentru a obține ID-ul din URL
    const [product, setProduct] = useState<Product | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false); // Starea pentru a verifica dacă produsul este în favorite

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/produse/${id}`);
                const data = await response.json();
                setProduct(data); // Presupunem că răspunsul conține produsul
            } catch (error) {
                console.error("Eroare la obținerea detaliilor produsului:", error);
            }
        };
        fetchProduct();
    }, [id]); // Reîncarcă datele când se schimbă ID-ul

    // Verifică dacă produsul este deja în favorite
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const isProductFavorite = storedFavorites.some((item: Product) => item.Id === Number(id));
        setIsFavorite(isProductFavorite);
    }, [id]);

    const addToFavorites = () => {
        if (product) {
            // Obține produsele favorite din localStorage
            const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

            // Adaugă produsul doar dacă nu este deja în favorite
            if (!storedFavorites.some((item: Product) => item.Id === product.Id)) {
                storedFavorites.push(product);
                localStorage.setItem("favorites", JSON.stringify(storedFavorites));
                setIsFavorite(true); // Actualizează starea pentru a arăta că este favorit
                alert("Produsul a fost adăugat la favorite!");
            } else {
                alert("Acest produs este deja în favorite.");
            }
        }
    };

    if (!product) {
        return <div>Se încarcă detaliile produsului...</div>;
    }

    return (
        <div>
            <h1>{product.Nume}</h1>
            <img src={product.Imagine} alt={product.Nume} />
            <p>{product.Descriere}</p>
            <p>Preț: {product.PretBucata} RON</p>
            <p>Stoc: {product.Stoc}</p>

            {/* Butonul pentru adăugarea la favorite */}
            <button
                onClick={addToFavorites}
                className={`p-2 mt-4 ${isFavorite ? "bg-gray-300" : "bg-indigo-500"} text-white rounded-lg`}
                disabled={isFavorite}
            >
                {isFavorite ? "Adăugat la favorite" : "Adaugă la favorite"}
            </button>
        </div>
    );
};

export default ProductDetailPage;
