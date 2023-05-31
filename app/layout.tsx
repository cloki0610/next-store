import { Inter } from "next/font/google";
import Link from "next/link";

import { Providers } from "./(store)/provider";
import Header from "./(components)/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Buy It Now - online store template",
    description: "Anywhere, but now",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                    crossOrigin="anonymous"
                ></link>
            </head>
            <body
                className={`min-h-screen flex flex-col ${inter.className} relative`}
            >
                <Providers>
                    <Header />
                    <div className="flex-1">{children}</div>
                    <footer className="flex items-center flex-wrap justify-center border-t border-solid border-primary p-3">
                        <Link
                            href={"https://www.instagram.com/"}
                            target="_blank"
                            className="mx-5 hover:scale-110"
                        >
                            <i className="fa-brands fa-instagram text-primary hover:text-secondary text-2xl sm:text-3xl md:text-4xl cursor-pointer"></i>
                        </Link>
                        <Link
                            href={"https://www.facebook.com/"}
                            target="_blank"
                            className="mx-5 hover:scale-110"
                        >
                            <i className="fa-brands fa-facebook text-primary hover:text-secondary text-2xl sm:text-3xl md:text-4xl cursor-pointer"></i>
                        </Link>
                    </footer>
                    <div id="portal"></div>
                </Providers>
            </body>
        </html>
    );
}
