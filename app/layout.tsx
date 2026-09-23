import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Inspire Nigeria Child Project",
  description: "Empowering children in the Niger Delta through quality education and impactful learning experiences",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col space-y-4">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
