import React, { useState } from 'react';
import bgImg from "./assets/bg_img.png";
import { assets } from "./assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";

function Home() {
    const [shrinkedUrl, setShrinkedUrl] = useState('');
    const [inputUrl, setInputUrl] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        const input = inputUrl.trim();
        if (!input) {
            toast.error("Please enter a valid URL");
            setInputUrl('');
            return;
        }

        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post('http://localhost:4000/api/shorten', { url: input });
            if (data.success) {
                setShrinkedUrl(data.url);
                toast.success(data.message);
            } else {
                setShrinkedUrl('');
                toast.error(data.message);
            }
        } catch (err) {
            setShrinkedUrl('');
            toast.error("Something went wrong! Please try again.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shrinkedUrl);
        toast.success("Copied to clipboard!");
    };

    return (
        <div
            className="bg-cover bg-center h-screen flex flex-col items-center justify-between p-6"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            {/* Navbar */}
            <nav className="flex items-center p-4 gap-2 bg-transparent">
                <img src={assets.logo} alt="logo" className="h-8" />
                <span className="text-3xl font-semibold tracking-wide">shrinkr</span>
            </nav>

            {/* URL Input Section */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <form onSubmit={submitHandler} className="w-full flex flex-col items-center">
                    <span className="text-xl font-semibold tracking-wide mb-2">Enter URL</span>
                    <input
                        type="text"
                        placeholder="https://www.google.com"
                        className="border-2 border-[#404182] bg-white rounded-md p-2 w-full outline-none"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 bg-[#696aba] text-white px-4 py-2 rounded-md hover:bg-[#404182] transition"
                    >
                        Shrink URL
                    </button>
                </form>

                {/* Display Shrinked URL */}
                {shrinkedUrl && (
                    <div className="mt-4 bg-gray-100 p-2 rounded-md w-full text-center flex justify-between items-center">
                        <a href={shrinkedUrl} target="_blank" rel="noopener noreferrer" className="text-[#696aba] flex-grow text-center">
                            {shrinkedUrl}
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className="ml-2 transition"
                        >
                            <img src={assets.copy} alt="copy" className='h-6'/>
                        </button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="w-full text-center p-2 ">
                &copy; {new Date().getFullYear()} Shrinkr
            </footer>
        </div>
    );
}

export default Home;
