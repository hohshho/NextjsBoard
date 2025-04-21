import Initializer from "../component/Initializer/Initializer";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="global_layout">
      {/* <head></head> */}
      <Initializer />
      {children}
      <footer></footer>
    </div>
  );
}