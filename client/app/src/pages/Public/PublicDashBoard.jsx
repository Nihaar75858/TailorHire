import React from 'react';
import { useNavigate } from 'react-router-dom';

const PublicDashBoard = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600 flex flex-col items-center justify-center text-gray-800'>
            <div className='text-8xl justify-center text-center text-white pt-15 pb-6'>Welcome to TailorHire</div>
            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
                {/* Primary Button */}
                <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition duration-200">
                    Try TailorHire ↗
                </button>

                {/* Secondary Buttons */}
                <button onClick={() => navigate('/register')} className="text-black font-medium px-6 py-3 hover:underline">
                    Sign Up →
                </button>
                <button onClick={() => navigate('/formwizard')} className="text-black font-medium px-6 py-3 hover:underline">
                    Add your Resume →
                </button>
            </div>

            <div className="w-full max-w-6xl px-6 mt-12 space-y-12">

                {/* Top Two Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Enhance your productivity with trusted AI agents for every team
                            </h3>
                            <button className="mt-4 bg-black text-white px-4 py-2 rounded-full hover:opacity-80">
                                Chat now
                            </button>
                            <div className="mt-6 bg-gray-100 rounded-lg p-4">
                                {/* Image Placeholder */}
                                <img
                                    src="/path-to-your-first-image.png"
                                    alt="Productivity preview"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="bg-gradient-to-br from-purple-800 to-blue-900 rounded-2xl shadow-lg p-6 flex flex-col justify-between text-white">
                        <div>
                            <h3 className="text-xl font-semibold">
                                Power your AI and agents with the #1 web search API for LLMs
                            </h3>
                            <button className="mt-4 bg-white text-black px-4 py-2 rounded-full hover:opacity-80">
                                Get started
                            </button>
                            <div className="mt-6 bg-gray-900 rounded-lg p-4 text-green-300 font-mono text-sm overflow-auto">
                                <pre>{`import requests

def get_snippets_for_query(query):
    headers = {"X-API-Key": "YOUR_API_KEY"}
    params = {"query": query}
    return requests.get(
        f"https://api.ycd-index.io/search",
        params=params,
        headers=headers,
    ).json()

results = get_snippets_for_query("reasons to smile")`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Logos */}
                <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500">
                    <span>Trusted by the best</span>
                    <img src="/logo-amazon.png" alt="Amazon" className="h-6" />
                    <img src="/logo-duckduckgo.png" alt="DuckDuckGo" className="h-6" />
                    <img src="/logo-databricks.png" alt="Databricks" className="h-6" />
                    <img src="/logo-mimecast.png" alt="Mimecast" className="h-6" />
                    <img src="/logo-dpa.png" alt="DPA" className="h-6" />
                    <img src="/logo-w.png" alt="W" className="h-6" />
                </div>

                {/* Bottom Banner */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold">Introducing ARI, the world’s most intelligent deep research agent</h3>
                        <p className="text-sm text-blue-100">ARI beats OpenAI Deep Research 76% of the time. <a href="#" className="underline">Learn more</a></p>
                        <div className="flex gap-2 mt-4">
                            <input
                                type="email"
                                placeholder="Enter your work email"
                                className="px-4 py-2 rounded-full text-black w-64"
                            />
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-full hover:opacity-80">Try ARI for free</button>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <img src="/path-to-your-second-image.png" alt="ARI preview" className="rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicDashBoard