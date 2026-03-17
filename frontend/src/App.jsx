import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Book, LayoutDashboard, Library, Users, RotateCcw, LogOut, Bell, Settings, User } from 'lucide-react';
import './index.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Members from './pages/Members';
import Circulation from './pages/Circulation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MemberPortal from './pages/MemberPortal';

function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to={user.role === 'member' ? '/portal' : '/dashboard'} />;
  }
  return children;
}

function Header() {
  const location = useLocation();
  const { user } = useAuth();
  
  const pathMap = {
    '/dashboard': 'Executive Overview',
    '/catalog': 'Asset Catalog',
    '/circulation': 'Circulation Desk',
    '/members': 'Member Registry',
    '/portal': 'Member Portal'
  };
  
  const pathName = pathMap[location.pathname] || 'Athena';
  
  if (!user) return null;

  return (
    <header className="page-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff' }}>{pathName}</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Bell size={20} className="text-muted" style={{ cursor: 'pointer' }} />
        <Settings size={20} className="text-muted" style={{ cursor: 'pointer' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.8rem', borderRadius: '2rem', border: '1px solid var(--border-color)' }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '50%', 
            background: user.role === 'member' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <User size={14} className={user.role === 'member' ? 'text-primary' : 'text-emerald'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{user.name}</span>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.6 }}>{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const hideSidebar = ['/', '/login', '/signup'].includes(location.pathname);
  if (hideSidebar || !user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <Library size={28} />
        <span>Athena</span>
      </div>
      
      <div style={{ flexGrow: 1 }}>
        {user.role !== 'member' ? (
          <>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <LayoutDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink to="/catalog" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <Book size={20} /> Catalog
            </NavLink>
            <NavLink to="/circulation" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <RotateCcw size={20} /> Circulation
            </NavLink>
            <NavLink to="/members" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              <Users size={20} /> Members
            </NavLink>
          </>
        ) : (
          <NavLink to="/portal" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <LayoutDashboard size={20} /> Member Portal
          </NavLink>
        )}
      </div>

      <div className="sidebar-footer">
        <button 
          onClick={handleLogout} 
          className="nav-link" 
          style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', justifyContent: 'flex-start' }}
        >
          <LogOut size={20} /> Sign Out
        </button>
      </div>
    </nav>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const isPublic = ['/', '/login', '/signup'].includes(location.pathname);
  
  return (
    <div className="app-container">
      <Sidebar />
      <main className={`content-area ${!isPublic ? 'content-with-sidebar' : ''}`}>
        {!isPublic && <Header />}
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Staff Routes */}
            <Route path="/dashboard" element={<ProtectedRoute roles={['admin', 'librarian']}><Dashboard /></ProtectedRoute>} />
            <Route path="/catalog" element={<ProtectedRoute roles={['admin', 'librarian']}><Catalog /></ProtectedRoute>} />
            <Route path="/circulation" element={<ProtectedRoute roles={['admin', 'librarian']}><Circulation /></ProtectedRoute>} />
            <Route path="/members" element={<ProtectedRoute roles={['admin', 'librarian']}><Members /></ProtectedRoute>} />
            
            {/* Member Routes */}
            <Route path="/portal" element={<ProtectedRoute roles={['member']}><MemberPortal /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

