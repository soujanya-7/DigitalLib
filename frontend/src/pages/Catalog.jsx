import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus } from 'lucide-react';

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  
  const [showAdd, setShowAdd] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: '', totalCopies: 1 });

  const fetchBooks = async (searchQ = '') => {
    try {
      const url = searchQ ? `http://localhost:5000/api/books?q=${searchQ}` : 'http://localhost:5000/api/books';
      const res = await axios.get(url);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(query);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', newBook);
      setNewBook({ title: '', author: '', category: '', totalCopies: 1 });
      setShowAdd(false);
      fetchBooks();
    } catch (err) {
      alert('Error adding asset');
    }
  };

  return (
    <div>
      <div className="flex mb-8" style={{justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>ASSET REGISTRY</h1>
        <button className="btn" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Close' : <><Plus size={18} /> REGISTER ASSET</>}
        </button>
      </div>

      {showAdd && (
        <div className="glass-card mb-8">
          <h2 className="mb-8" style={{ letterSpacing: '0.1em', fontWeight: '700' }}>NEW ENTRY</h2>
          <form onSubmit={handleAddBook}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="input-group mb-4">
                <label className="stat-label">Title</label>
                <input className="input-field" placeholder="Entry Title" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} required />
              </div>
              <div className="input-group mb-4">
                <label className="stat-label">Author/Origin</label>
                <input className="input-field" placeholder="Author Name" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} required />
              </div>
              <div className="input-group mb-4">
                <label className="stat-label">Classification</label>
                <input className="input-field" placeholder="Category" value={newBook.category} onChange={e => setNewBook({...newBook, category: e.target.value})} required />
              </div>
              <div className="input-group mb-4">
                <label className="stat-label">Inventory Quantity</label>
                <input className="input-field" type="number" value={newBook.totalCopies} onChange={e => setNewBook({...newBook, totalCopies: parseInt(e.target.value)})} min="1" required />
              </div>
            </div>
            <button type="submit" className="btn mt-8">CONFIRM REGISTRATION</button>
          </form>
        </div>
      )}

      <div className="glass-card mb-8" style={{ padding: '1.5rem 2.5rem' }}>
        <form onSubmit={handleSearch} style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
          <Search size={24} className="text-gold" />
          <input 
            className="input-field" 
            style={{flexGrow: 1, border: 'none', padding: '0', background: 'transparent', fontSize: '1.25rem'}}
            placeholder="Search registry by title, author, or genre..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className="btn" style={{ padding: '0.75rem 2rem' }}>Execute</button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '1rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Asset Identity</th>
                <th>Origin</th>
                <th>Class</th>
                <th>Inventory Status</th>
                <th>Command</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id}>
                  <td><strong style={{fontSize: '1.1rem'}}>{book.title}</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>{book.author}</td>
                  <td><span style={{ border: '1px solid var(--border-color)', padding: '0.2rem 0.6rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>{book.category}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '4px', height: '16px', background: book.availableCopies > 0 ? 'var(--primary)' : 'var(--danger)' }}></div>
                      <span>{book.availableCopies} Units</span>
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={{padding: '0.5rem 1rem', fontSize: '0.7rem'}}>
                      RESERVE
                    </button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && <tr><td colSpan="6" style={{textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', letterSpacing: '0.1em'}}>NO DATA MATCHES QUERY</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
