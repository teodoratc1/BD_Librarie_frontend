"use client"
// pages/login.tsx
// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [parola, setParola] = useState("");
    const [eroare, setEroare] = useState("");
    const [mesaj, setMesaj] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                parola,
            }),
        });

        const data = await response.json();

        if (data.eroare) {
            setEroare(data.eroare);
        } else {
            setMesaj(data.mesaj);
            // Redirecționează utilizatorul după logare
            setTimeout(() => {
                router.push("/"); // Redirecționează pe pagina principală
            }, 2000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-semibold text-center mb-6">Autentificare</h1>
                {eroare && <p className="text-red-500 text-center mb-4">{eroare}</p>}
                {mesaj && <p className="text-green-500 text-center mb-4">{mesaj}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="parola" className="block text-sm font-medium text-gray-700">Parola</label>
                        <input
                            type="password"
                            id="parola"
                            value={parola}
                            onChange={(e) => setParola(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Autentificare
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
