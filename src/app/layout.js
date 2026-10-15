import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import GlobalStyles from '@/styles/GlobalStyles';

export const metadata = {
    title: 'Ritesh Kumar — Software Engineer & AI/ML Developer',
    description: 'Portfolio of Ritesh Kumar, a Software Engineer & B.Tech CSE student specializing in AI, Machine Learning, Python, Java, and Modern Web Applications. Software Engineering Intern at Apexsquare Solutions.',
    keywords: ['Ritesh Kumar', 'software engineer', 'AI ML developer', 'Python', 'Java', 'React', 'Next.js', 'Cybersecurity', 'portfolio', 'AKTU'],
    authors: [{ name: 'Ritesh Kumar' }],
    openGraph: {
        title: 'Ritesh Kumar — Software Engineer & AI/ML Developer',
        description: 'Software Engineer & AI/ML Developer building intelligent software and modern web applications.',
        type: 'website',
    },
    icons: {
        icon: [
            { url: '/icon.png?v=3', sizes: '32x32', type: 'image/png' },
            { url: '/icon.svg?v=3', type: 'image/svg+xml' },
        ],
        shortcut: '/favicon.ico?v=3',
        apple: '/apple-icon.png?v=3',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="ltr">
            <head>
                <link rel="icon" href="/icon.png?v=3" type="image/png" sizes="32x32" />
                <link rel="icon" href="/icon.svg?v=3" type="image/svg+xml" />
                <link rel="shortcut icon" href="/favicon.ico?v=3" />
                <link rel="apple-touch-icon" href="/apple-icon.png?v=3" />
                {/* DNS prefetch for faster font domain resolution */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/*
                  Next.js App Router automatically optimizes Google Fonts at build time.
                  Using raw `<link rel="stylesheet">` allows Next.js to inline the CSS,
                  completely eliminating FCP/LCP network delays natively.
                */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <ThemeProvider>
                        <LanguageProvider>
                            <GlobalStyles />
                            {children}
                        </LanguageProvider>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
