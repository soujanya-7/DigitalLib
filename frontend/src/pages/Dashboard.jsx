import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Book, Users, DollarSign, Activity, Search, UserPlus, PlusCircle } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ books: 0, members: 0, issues: 0, fines: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // ... existing fetch logic ...
      try {
        const [books, members, transactions] = await Promise.all([
          axios.get('http://localhost:5001/api/books'),
          axios.get('http://localhost:5001/api/members'),
          axios.get('http://localhost:5001/api/transactions')
        ]);
        
        const issues = transactions.data.filter(t => t.status === 'issued').length;
        const fines = members.data.reduce((acc, m) => acc + m.totalFines, 0);

        setStats({
          books: books.data.length,
          members: members.data.length,
          issues,
          fines
        });
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="dashboard-stats">
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Titles</span>
            <div className="stat-icon-wrapper">
              <Book size={20} />
            </div>
          </div>
          <p className="stat-value">{stats.books}</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span className="stat-label">Registered Members</span>
            <div className="stat-icon-wrapper" style={{background: 'rgba(5, 150, 105, 0.1)'}}>
              <Users size={20} className="text-emerald" />
            </div>
          </div>
          <p className="stat-value">{stats.members}</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span className="stat-label">Active Circulation</span>
            <div className="stat-icon-wrapper" style={{background: 'rgba(245, 158, 11, 0.1)'}}>
              <Activity size={20} style={{color: 'var(--accent)'}} />
            </div>
          </div>
          <p className="stat-value">{stats.issues}</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Fines Due</span>
            <div className="stat-icon-wrapper" style={{background: 'rgba(239, 68, 68, 0.1)'}}>
              <DollarSign size={20} className="text-danger" />
            </div>
          </div>
          <p className="stat-value">${stats.fines.toFixed(2)}</p>
        </div>
      </div>

      <div className="quick-actions-grid">
        <div className="glass-card action-card" onClick={() => navigate('/catalog')}>
          <Search size={32} />
          <h3 style={{ fontSize: '1.1rem' }}>Search Catalog</h3>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Instantly find assets using full-text search.</p>
        </div>
        <div className="glass-card action-card" onClick={() => navigate('/members')}>
          <UserPlus size={32} />
          <h3 style={{ fontSize: '1.1rem' }}>Register Member</h3>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Add new members to the institution registry.</p>
        </div>
        <div className="glass-card action-card" onClick={() => navigate('/circulation')}>
          <PlusCircle size={32} />
          <h3 style={{ fontSize: '1.1rem' }}>New Allocation</h3>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Issue assets and manage lending ledgers.</p>
        </div>
      </div>
    </div>
  );
}
