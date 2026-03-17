import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Circulation() {
  const [transactions, setTransactions] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [issueData, setIssueData] = useState({ bookId: '', memberId: '', days: 14 });

  const fetchData = async () => {
    try {
      const [tRes, bRes, mRes] = await Promise.all([
        axios.get('http://localhost:5000/api/transactions'),
        axios.get('http://localhost:5000/api/books'),
        axios.get('http://localhost:5000/api/members')
      ]);
      setTransactions(tRes.data);
      setBooks(bRes.data.filter(b => b.availableCopies > 0));
      setMembers(mRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/transactions/issue', issueData);
      setIssueData({ bookId: '', memberId: '', days: 14 });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error issuing book');
    }
  };

  const handleReturn = async (transactionId) => {
    try {
      await axios.post(`http://localhost:5000/api/transactions/return/${transactionId}`);
      fetchData();
    } catch (err) {
      alert('Error returning book');
    }
  };

  return (
    <div>
      <h1 className="mb-8">Circulation Desk</h1>
      
      <div className="glass-card mb-8" style={{maxWidth: '600px'}}>
        <h2 className="mb-4">New Asset Allocation</h2>
        <form onSubmit={handleIssue}>
          <div className="input-group mb-4">
            <select className="input-field" value={issueData.bookId} onChange={e => setIssueData({...issueData, bookId: e.target.value})} required>
              <option value="">Select Asset...</option>
              {books.map(b => (
                <option key={b._id} value={b._id}>{b.title} ({b.availableCopies} in stock)</option>
              ))}
            </select>
          </div>
          <div className="input-group mb-4">
            <select className="input-field" value={issueData.memberId} onChange={e => setIssueData({...issueData, memberId: e.target.value})} required>
              <option value="">Select Member...</option>
              {members.map(m => (
                <option key={m._id} value={m._id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="input-group mb-4">
             <input className="input-field" type="number" placeholder="Duration (Days)" value={issueData.days} onChange={e => setIssueData({...issueData, days: parseInt(e.target.value)})} min="1" required />
          </div>
          <button type="submit" className="btn mt-4">Assign Asset</button>
        </form>
      </div>

      <div className="glass-card table-container">
        <h2 className="mb-4">Transaction Ledger</h2>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Member</th>
              <th>Allocation Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Fine</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t._id}>
                <td><strong style={{color: '#fff'}}>{t.bookId ? t.bookId.title : 'Deleted Asset'}</strong></td>
                <td>{t.memberId ? t.memberId.name : 'Unknown'}</td>
                <td>{new Date(t.issueDate).toLocaleDateString()}</td>
                <td>{new Date(t.dueDate).toLocaleDateString()}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '0.4rem', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    background: t.status === 'returned' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: t.status === 'returned' ? 'var(--primary)' : 'var(--accent)'
                  }}>
                    {t.status.toUpperCase()}
                  </span>
                </td>
                <td className={t.fine > 0 ? 'text-danger' : ''}>
                  {t.fine > 0 ? `$${t.fine.toFixed(2)}` : '$0.00'}
                </td>
                <td>
                  {t.status === 'issued' && (
                    <button className="btn" onClick={() => handleReturn(t._id)} style={{padding: '0.4rem 0.8rem', fontSize: '0.8rem'}}>
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && <tr><td colSpan="7" style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>No recorded history.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
