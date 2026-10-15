import { useState } from 'react';
import { CartProvider } from './store/cart';
import { UserProvider } from './store/user';
import { Navbar, Footer, type Page } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { ToastHost } from './components/ToastHost';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Loyalty } from './pages/Loyalty';

function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <UserProvider>
      <CartProvider>
        <div className="min-h-screen">
          <Navbar page={page} onNavigate={setPage} />
          <main>
            {page === 'home' && <Home onNavigate={setPage} />}
            {page === 'menu' && <Menu />}
            {page === 'loyalty' && <Loyalty />}
          </main>
          <Footer onNavigate={setPage} />
          <CartDrawer />
          <ToastHost />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
