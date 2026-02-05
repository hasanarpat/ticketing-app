import { Press_Start_2P } from 'next/font/google';
import './globals.css';
import Navbar from './(components)/Navbar';
import { AuthProvider } from './(components)/AuthProvider';

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
});

export const metadata = {
  title: 'TICKET APP',
  description: '8-bit ticket manager',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={pressStart.variable}>
      <body className="font-pixel bg-retro-bg text-retro-text min-h-screen crt-overlay">
        <AuthProvider>
          <div className="flex flex-col h-screen max-h-screen">
            <Navbar />
            <div className="flex-grow overflow-y-auto bg-retro-bg">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
