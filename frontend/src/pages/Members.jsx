import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', membershipId: '' });

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members');
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/members', newMember);
      setNewMember({ name: '', email: '', membershipId: '' });
      setShowAdd(false);
      fetchMembers();
    } catch (err) {
      alert('Error adding member');
    }
  };

  return (
    <div>
      <div className="flex mb-8" style={{justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Member Registry</h1>
        <button className="btn" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancel' : 'Add New Member'}
        </button>
      </div>

      {showAdd && (
        <div className="glass-card mb-8" style={{maxWidth: '500px'}}>
          <h2 className="mb-4">Register Member</h2>
          <form onSubmit={handleAddMember}>
            <div className="input-group mb-4">
              <input className="input-field" placeholder="Full Name" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required />
            </div>
            <div className="input-group mb-4">
              <input className="input-field" type="email" placeholder="Email Address" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} required />
            </div>
            <div className="input-group mb-4">
              <input className="input-field" placeholder="Membership ID" value={newMember.membershipId} onChange={e => setNewMember({...newMember, membershipId: e.target.value})} required />
            </div>
            <button type="submit" className="btn mt-4">Save Member</button>
          </form>
        </div>
      )}

      <div className="glass-card table-container">
        <table>
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Membership ID</th>
              <th>Enrolled</th>
              <th>Outstanding Fines</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member._id}>
                <td>
                  <div style={{fontWeight: '600', color: '#fff'}}>{member.name}</div>
                  <div style={{fontSize: '0.8rem', opacity: 0.6}}>{member.email}</div>
                </td>
                <td>{member.membershipId}</td>
                <td>{new Date(member.joinedDate).toLocaleDateString()}</td>
                <td>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span className={member.fineBalance > 0 ? "text-danger" : "text-emerald"} style={{fontWeight: '600'}}>
                      ${member.fineBalance.toFixed(2)}
                    </span>
                    {member.fineBalance > 0 && (
                      <button className="btn" style={{padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: 'var(--success)'}}>
                        Settle fine
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {members.length === 0 && <tr><td colSpan="4" style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>No registered members found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
