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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    // Încărcăm produsele favorite din localStorage la încărcarea paginii
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromFavorites = (productId: number) => {
    // Îndepărtăm produsul din lista de favorite
    const updatedFavorites = favorites.filter((product) => product.Id !== productId);
    setFavorites(updatedFavorites); // Actualizăm starea
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Actualizăm localStorage
  };

  return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Produse Favorite</h1>

        {/* Verificăm dacă sunt favorite */}
        {favorites.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 p-4">
              {favorites.map((product) => (
                  <div key={product.Id} className="bg-white shadow-md p-3 rounded-lg">
                    <img
                        src={product.Imagine}
                        alt={product.Nume}
                        className="h-32 w-full object-cover rounded-lg"
                    />
                    <h3 className="text-lg font-bold mt-2">{product.Nume}</h3>
                    <p className="text-sm text-gray-500">{product.Descriere}</p>
                    <p className="text-indigo-700 font-semibold text-sm mt-2">{product.PretBucata} RON</p>
                    <button
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => removeFromFavorites(product.Id)} // Îndepărtează din favorite
                    >
                      Îndepărtează din favorite
                    </button>
                  </div>
              ))}
            </div>
        ) : (
            <p>Nu aveți produse în favorite.</p>
        )}
      </div>
  );
}
