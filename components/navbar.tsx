import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-around px-6 md:px-12 py-2 bg-transparent">
            <Link href="/" className="flex items-center gap-3">
                <Image src={'/logo.svg'} alt='logo' width={1000} height={1000} className="rounded-xl w-[100%]" />
            </Link>
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            </ul>
            <button className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-colors active:scale-95 border border-white/20 mr-2">
                Support
            </button>
            <button className="px-5 py-2.5 bg-white text-red-900 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors active:scale-95">
                Contact
            </button>
        </nav>
    )
}

export default Navbar
