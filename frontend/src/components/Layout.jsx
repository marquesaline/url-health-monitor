export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap">Monitor System</h1>
        <nav>
          <a href="/" className="text-blue-500 hover:underline">Dashboard</a>
        </nav>
      </header>

      <main className="flex-grow w-full container mx-auto p-6">
        {children}
      </main>

      <footer className="w-full bg-white p-4 text-center text-gray-500 shadow-md">
        &copy; {new Date().getFullYear()} Monitor System
      </footer>
    </div>
  );
}
