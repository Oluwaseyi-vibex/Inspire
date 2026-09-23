"use client";
import { usePathname } from 'next/navigation'
import { SlideTabs } from '@/components/ui/slide-tabs'

const Navbar = () => {
    const pathname = usePathname()
    const isGallery = pathname === '/gallery'

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 md:px-12 py-2 transition-all duration-500 ${isGallery ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'}`}>
            <SlideTabs />
        </nav>
    )
}

export default Navbar
