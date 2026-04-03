export default function TailwindCSS() {
    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <NavbarCard />
            <HeroCard />
            <FeatureCard />
            <ShowcaseCard />
            <ActionCard />
            <StatsCard />
        </div>
    )
}

function NavbarCard() {
    return (
        <nav className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 flex justify-between items-center shadow-sm">
            <h1 className="font-black text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                TailwindYuk!
            </h1>
            <ul className="flex gap-6 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 text-sm font-medium">Home</a></li>
                <li><a href="#" className="hover:text-gray-900 text-sm font-medium">About</a></li>
                <li><a href="#" className="hover:text-gray-900 text-sm font-medium">Contact</a></li>
            </ul>
            <button className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800">
                Login
            </button>
        </nav>
    )
}

function HeroCard() {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center text-white">
            <h1 className="text-3xl font-black">Belajar Tailwind CSS</h1>
            <p className="text-gray-300 mt-2">Modern & cepat banget!</p>
        </div>
    )
}

function FeatureCard() {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center mb-3">
                <span className="text-white text-sm">✓</span>
            </div>
            <h2 className="font-bold text-gray-800">Spacing & Layout</h2>
            <p className="text-gray-500 text-sm mt-1">Padding, margin, dan spacing yang konsisten</p>
        </div>
    )
}

function ShowcaseCard() {
    return (
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Tailwind Typography</h1>
            <p className="text-gray-500 mt-1">Belajar Tailwind menyenangkan!</p>
        </div>
    )
}

function ActionCard() {
    return (
        <div className="bg-gray-900 rounded-2xl p-6 text-center text-white">
            <h3 className="font-bold text-lg">Mulai Belajar</h3>
            <p className="text-gray-300 text-sm mt-1">Klik tombol di bawah</p>
            <div className="flex gap-2 justify-center mt-4">
                <button className="bg-white text-gray-900 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
                    Kiri
                </button>
                <button className="bg-gray-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-600">
                    Kanan
                </button>
            </div>
        </div>
    )
}

function StatsCard() {
    return (
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-gray-800">Total Belajar</h3>
                    <p className="text-2xl font-black text-gray-900 mt-1">7 Hari</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-500 text-sm">Progress</p>
                    <p className="text-gray-900 font-bold">100%</p>
                </div>
            </div>
        </div>
    )
}