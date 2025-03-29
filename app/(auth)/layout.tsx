export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center  min-h-11/12 h-full">
      {children}
    </div>
  );
}
