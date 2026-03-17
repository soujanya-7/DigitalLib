import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Book, History, DollarSign, Search, Clock, CheckCircle } from 'lucide-react';

export default function MemberPortal() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      // For now, members can search books and see all transactions (historically)
      // In a real system, we'd filter transactions by effective member ID linked to the user
      const [booksRes, transRes] = await Promise.all([
        axios.get('http://localhost:5000/api/books'),
        axios.get('http://localhost:5000/api/transactions')
      ]);
      setBooks(booksRes.data);
      setTransactions(transRes.data);
    } catch (err) {
      console.error('Error fetching member data:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/books?q=${searchQuery}`);
      setBooks(res.data);
    } catch (err) {
      console.error('Search error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="portal-container">
      <div className="grid grid-3 mb-8">
        <div className="glass-card">
          <div className="flex justify-between items-start mb-4">
            <div className="stat-icon bg-emerald-soft"><Book size={24} className="text-emerald" /></div>
          </div>
          <h3 className="text-muted mb-2">My Borrowed Books</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{transactions.filter(t => t.status === 'issued').length}</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-start mb-4">
            <div className="stat-icon bg-blue-soft"><Clock size={24} style={{ color: 'var(--primary)' }} /></div>
          </div>
          <h3 className="text-muted mb-2">Pending Returns</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{transactions.filter(t => t.status === 'issued').length}</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-start mb-4">
            <div className="stat-icon bg-amber-soft"><DollarSign size={24} style={{ color: 'var(--accent)' }} /></div>
          </div>
          <h3 className="text-muted mb-2">Total Fines</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${user.fines || 0}</p>
        </div>
      </div>

      <div className="glass-card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3>Explore Library Catalog</h3>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', width: '300px' }}>
            <input 
              type="text" 
              placeholder="Search title, author..." 
              className="input-field" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-outline" style={{ padding: '0.5rem' }}>
              <Search size={18} />
            </button>
          </form>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {books.map(book => (
            <div key={book._id} className="book-card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '1rem' }}>
              <h4 className="mb-2">{book.title}</h4>
              <p className="text-muted mb-4">by {book.author}</p>
              <div className="flex justify-between items-center">
                <span className={`badge ${book.availableCopies > 0 ? 'badge-success' : 'badge-danger'}`}>
                  {book.availableCopies > 0 ? `${book.availableCopies} Available` : 'Reserved'}
                </span>
                <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <h3>Borrowing History</h3>
        <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Asset</th>
                <th style={{ padding: '1rem' }}>Due Date</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Fine</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map(t => (
                <tr key={t._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '1rem' }}>{t.bookId?.title || 'Unknown Asset'}</td>
                  <td style={{ padding: '1rem' }}>{new Date(t.dueDate).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`badge ${t.status === 'issued' ? 'badge-warning' : 'badge-success'}`}>
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>${t.fineAmount}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }} className="text-muted">No borrowing history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
