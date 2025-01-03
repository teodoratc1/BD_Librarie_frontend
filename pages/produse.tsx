"use client"
import { useEffect, useState } from "react";

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

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Starea pentru produsul selectat
    const [isModalOpen, setIsModalOpen] = useState(false); // Starea pentru deschiderea modalului
    const [isFavorite, setIsFavorite] = useState(false); // Starea pentru favorite

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/produse", {
                    cache: "no-store",
                });
                const data = await response.json();
                const products = data.produse || [];
                setProducts(products);
            } catch (error) {
                console.error("Eroare la obținerea produselor:", error);
            }
        };
        fetchProducts();
    }, []);

    // Verifică dacă produsul este în favorite
    useEffect(() => {
        if (selectedProduct) {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            const isProductFavorite = storedFavorites.some((item: Product) => item.Id === selectedProduct.Id);
            setIsFavorite(isProductFavorite);
        }
    }, [selectedProduct]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product); // Setează produsul selectat
        setIsModalOpen(true); // Deschide modalul
    };

    const closeModal = () => {
        setIsModalOpen(false); // Închide modalul
        setSelectedProduct(null); // Resetează produsul selectat
    };

    const addToFavorites = () => {
        if (selectedProduct) {
            // Obține produsele favorite din localStorage
            const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

            // Adaugă produsul doar dacă nu este deja în favorite
            if (!storedFavorites.some((item: Product) => item.Id === selectedProduct.Id)) {
                storedFavorites.push(selectedProduct);
                localStorage.setItem("favorites", JSON.stringify(storedFavorites));
                setIsFavorite(true); // Actualizează starea pentru a arăta că este favorit
                alert("Produsul a fost adăugat la favorite!");
            } else {
                alert("Acest produs este deja în favorite.");
            }
        }
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 p-4">
                {products.slice(0, 10).map((product) => (
                    <div
                        key={product.Id}
                        className="bg-white shadow-md p-3 rounded-lg cursor-pointer"
                        onClick={() => handleProductClick(product)} // Apelăm funcția de click
                    >
                        <img
                            src={product.Imagine}
                            alt={product.Nume}
                            className="h-32 w-full object-cover rounded-lg"
                        />
                        <h3 className="text-lg font-bold mt-2">{product.Nume}</h3>
                        <p className="text-sm text-gray-500">{product.Descriere}</p>
                        <p className="text-indigo-700 font-semibold text-sm mt-2">{product.PretBucata} RON</p>
                    </div>
                ))}
            </div>

            {/* Modalul care apare când utilizatorul apasă pe un produs */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                        <h2 className="text-2xl font-bold">{selectedProduct.Nume}</h2>
                        <img
                            src={selectedProduct.Imagine}
                            alt={selectedProduct.Nume}
                            className="h-64 w-full object-cover rounded-lg my-4"
                        />
                        <p className="text-lg">{selectedProduct.Descriere}</p>
                        <p className="text-xl font-semibold mt-2">{selectedProduct.PretBucata} RON</p>
                        <p className="mt-2">Stoc: {selectedProduct.Stoc}</p>

                        {/* Butonul pentru adăugarea la favorite */}
                        <button
                            className={`mt-4 ${isFavorite ? "bg-gray-400" : "bg-indigo-500"} text-white px-4 py-2 rounded-lg`}
                            onClick={addToFavorites} // Apelăm funcția pentru a adăuga la favorite
                            disabled={isFavorite} // Butonul este dezactivat dacă produsul este deja în favorite
                        >
                            {isFavorite ? "Adăugat la favorite" : "Adaugă la favorite"}
                        </button>

                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={closeModal} // Închide modalul
                        >
                            Închide
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
