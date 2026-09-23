"use client";
import { SlideTabs } from '@/components/ui/slide-tabs'

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 md:px-12 py-2">
            <SlideTabs />
        </nav>
    )
}

export default Navbar
