import BottomBar from "@/libs/components/BottomBar";
import Footer from "@/libs/components/Footer";
import TopBar from "@/libs/components/TobBar";

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
