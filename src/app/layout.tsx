import type {Metadata} from "next" ;
import {Inter} from "next/font/google" ;
import {ReactNode} from "react" ;
import "./globals.css" ;
import Appbar from "@/components/appbar/appbar" ;

const inter = Inter({subsets: ["latin"]}) ;

export const metadata: Metadata = {
    title          : "Kirov",
    description    : "Dependencies of NPM packages on Github analysis app",
    generator      : "Next.js",
    applicationName: "kirov",
    keywords       : ["Next.js", "React", "Typescript", "Cloud Computing"],
    authors        : [
        {
            name: "Hou Yuxi",
        },
        {
            name: "Zengkun",
        },
    ],
    creator        : "Hou Yuxi",
    formatDetection: {
        email    : false,
        address  : false,
        telephone: false,
    },
} ;

export default function RootLayout(
    {
        children,
    }: {
        children: ReactNode
    }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <nav>
            <Appbar/>
        </nav>
        {children}
        </body>
        </html>
    ) ;
}
