import './globals.css';
import TopNav from '../components/TopNav';

export const metadata = {
  title: 'FeedMind',
  description: 'Personal AI news feed',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <main style={{
          paddingTop: '72px',       /* clear fixed topnav (56px bar + 16px breathing room) */
          minHeight: '100vh',
          width: '100%',
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}