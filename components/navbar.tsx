import Image from 'next/image'
import Link from 'next/link'
import { LiquidButton } from './ui/liquid-glass-button'

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
            <LiquidButton className="bg-white text-red-900">Contact</LiquidButton>
        </nav>
    )
}

export default Navbar
