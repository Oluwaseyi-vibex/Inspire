"use client";
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SlideTabs } from '@/components/ui/slide-tabs'

const Navbar = () => {
    const pathname = usePathname()
    const isGallery = pathname === '/gallery'

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-2 transition-all duration-500 ${isGallery ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'}`}>
            <Link href="/" className="flex items-center gap-3">
                <Image src={'/logo.svg'} alt='logo' width={1000} height={1000} className="rounded-xl w-[100%]" />
            </Link>
            <SlideTabs />
            <div>
                <button className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition-colors active:scale-95 mr-2">
                    Support
                </button>
                <button className="px-5 py-2.5 bg-white text-red-900 text-sm font-semibold rounded-lg hover:bg-red-50 transition-colors active:scale-95">
                    Contact Us
                </button>
            </div>
        </nav>
    )
}

export default Navbar
