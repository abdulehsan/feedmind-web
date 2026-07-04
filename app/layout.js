import './globals.css';

import Sidebar from '../components/Sidebar';

export const metadata = {
  title: 'FeedMind',
  description: 'Personal AI news feed',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{
            marginLeft: '240px',
            flex: 1,
            minHeight: '100vh',
            padding: '32px',
          }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}