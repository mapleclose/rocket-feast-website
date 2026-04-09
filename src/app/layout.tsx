import type { Metadata, Viewport } from "next";
import { Inter, Barlow } from "next/font/google";
import { LocaleProvider } from "@/providers/locale-provider";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const barlow = Barlow({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
    variable: "--font-barlow",
});

export const metadata: Metadata = {
    title: {
        default: "Rocket Feast | Restaurant Operating System for Ordering, Payments & Operations",
        template: "%s — Rocket Feast",
    },
    description: "Rocket Feast connects ordering, fulfilment, and staffing into one seamless platform — helping restaurants, cafes, and hospitality venues serve faster and run leaner.",
};

export const viewport: Viewport = {
    themeColor: "#D95A5A",
    colorScheme: "light dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cx(inter.variable, barlow.variable, "bg-primary antialiased")} suppressHydrationWarning>
                <LocaleProvider>
                    <RouteProvider>
                        <Theme>{children}</Theme>
                    </RouteProvider>
                </LocaleProvider>
            </body>
        </html>
    );
}
