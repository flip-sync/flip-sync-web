export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col ">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
