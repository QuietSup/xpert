export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid grid-cols-1 place-items-center min-h-[calc(100vh-74px)]">
        {children}
      </div>
    </>
  );
}
