import TopBar from "../components/TobBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <TopBar />
      {children}
    </div>
  );
}
