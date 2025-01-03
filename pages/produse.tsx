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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/produse", {
                    cache: "no-store",
                });
                const data = await response.json();
                console.log("Produse primite:", data); // Loghează întreaga structură a datelor
                const products = data.produse || [];
                setProducts(products); // Actualizează starea cu produsele
            } catch (error) {
                console.error("Eroare la obținerea produselor:", error);
            }
        };
        fetchProducts(); // Apelează funcția de obținere a produselor
    }, []); // Acest useEffect se va executa doar o singură dată, la montarea componentului

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {products.slice(0, 10).map((product) => {
                // Loghează întregul obiect product
                console.log(product);
                // Loghează câmpurile corecte
                console.log(product.Nume); // Nume, cu N mare
                console.log(product.Imagine); // Imagine, cu I mare
                console.log(product.PretBucata); // PretBucata, cu P mare

                return (
                    <div key={product.Id} className="bg-white shadow-md p-3 rounded-lg">
                        <img
                            src={product.Imagine} // Corectat la 'Imagine'
                            alt={product.Nume} // Corectat la 'Nume'
                            className="h-32 w-full object-cover rounded-lg" // Dimensiune mai mică pentru imagine
                        />
                        <h3 className="text-lg font-bold mt-2">{product.Nume}</h3> {/* Dimensiune mai mică pentru titlu */}
                        <p className="text-sm text-gray-500">{product.Descriere}</p> {/* Text mai mic pentru descriere */}
                        <p className="text-indigo-700 font-semibold text-sm mt-2">{product.PretBucata} RON</p> {/* Dimensiune mai mică pentru preț */}
                    </div>
                );
            })}
        </div>
    );

}