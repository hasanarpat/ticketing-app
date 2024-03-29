import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './(components)/Navbar';
import { AuthProvider } from './(components)/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ticket App',
  description: 'Generated by Crow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col h-screen max-h-screen">
            <Navbar />
            <div className="flex-grow overflow-y-auto bg-page text-default">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
