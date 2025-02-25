import BottomBar from "../components/BottomBar";
import Footer from "../components/Footer";
import TopBar from "../components/TobBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="py-[62px] px-[40px]">{children}</div>
      <BottomBar />
      <Footer />
    </div>
  );
}
