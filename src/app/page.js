'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import PreferencesPopup from '@/components/PreferencesPopup';

// Dynamically import heavy components so the Preloader can show instantly while they download in the background
const CinematicTechBackground = dynamic(() => import('@/components/CinematicTechBackground'), { ssr: false });
const RainbowCursorTrail = dynamic(() => import('@/components/RainbowCursorTrail'), { ssr: false });
const Navbar = dynamic(() => import('@/components/sections/Navbar'), { ssr: false });
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/sections/About'), { ssr: false });
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: false });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: false });
const CyberTerminal = dynamic(() => import('@/components/CyberTerminal'), { ssr: false });

export default function Home() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize' });

        // Global Layout Observer: Wait for lazy-loaded components and heavy images 
        // to finish injecting into the DOM and expanding the total height.
        // Whenever the height changes, tell GSAP to recalculate pinned section coordinates 
        // (like Hero and Projects limits) so they don't trigger too early!
        let timeoutId;
        const observer = new ResizeObserver(() => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 300);
        });

        observer.observe(document.body);

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <Preloader />
            <PreferencesPopup />
            <ScrollProgress />
            <CinematicTechBackground />
            <RainbowCursorTrail />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
            <CyberTerminal />
        </>
    );
}
