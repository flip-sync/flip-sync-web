import BottomBar from "../../lib/components/BottomBar";
import Footer from "../../lib/components/Footer";
import TopBar from "../../lib/components/TobBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <TopBar />
      {children}
      <BottomBar />
      <Footer />
    </div>
  );
}
