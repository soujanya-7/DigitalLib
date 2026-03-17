import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Zap, ArrowRight, Library, Globe, Database, CheckCircle, Cpu, BarChart3 } from 'lucide-react';

export default function Landing() {
  return (
    <div className="landing-container">
      <header style={{ 
        padding: '1.5rem 3rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'fixed',
        width: '100%',
        backdropFilter: 'blur(15px)',
        zIndex: 1000,
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="sidebar-logo" style={{ marginBottom: 0 }}>
          <Library size={28} />
          <span>Athena</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="btn btn-outline" style={{ border: 'none' }}>Log In</Link>
          <Link to="/signup" className="btn">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section" style={{ padding: '12rem 2rem 8rem' }}>
        <div style={{ 
          verticalAlign: 'middle',
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: '0.5rem 1rem', 
          borderRadius: '2rem', 
          background: 'rgba(16, 185, 129, 0.1)', 
          color: 'var(--primary)',
          fontSize: '0.85rem',
          fontWeight: '600',
          marginBottom: '2rem'
        }}>
          <Zap size={14} /> v2.0 Enterprise Release
        </div>
        <h1 className="hero-title">Empower Your Library <br/>with Digital Intelligence.</h1>
        <p className="hero-subtitle">
          Athena is an enterprise-grade ecosystem designed to modernize physical library management through automated workflows, real-time analytics, and advanced discovery.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="btn">Create Institution Account</Link>
          <Link to="/login" className="btn btn-outline">Operator Sign In</Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Built for Modern Scalability</h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>Leveraging state-of-the-art technologies to provide a seamless experience for librarians and members alike.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          <div className="glass-card">
            <Database size={32} className="text-emerald mb-4" />
            <h3 className="mb-4">Unified Data Engine</h3>
            <p className="text-muted">A robust MongoDB-backed infrastructure that scales with your collection, providing sub-second search latency across millions of assets.</p>
          </div>
          <div className="glass-card">
            <Globe size={32} className="text-emerald mb-4" />
            <h3 className="mb-4">Global Network</h3>
            <p className="text-muted">Seamlessly handle e-book distributions and physical asset tracking from a single, centralized administrative interface.</p>
          </div>
          <div className="glass-card">
            <ShieldCheck size={32} className="text-emerald mb-4" />
            <h3 className="mb-4">Automated Governance</h3>
            <p className="text-muted">Set intelligent protocols for lending periods and automated fine collection, ensuring your library operations remain efficient.</p>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div style={{ padding: '8rem 2rem', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '2rem' }}>Streamlined Workflow <br/><span className="text-emerald">End-to-End.</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>1</div>
                  <div>
                    <h4>Asset Onboarding</h4>
                    <p className="text-muted">Instantly catalog new arrivals with smart ISBN detection and categorization.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>2</div>
                  <div>
                    <h4>Smart Allocation</h4>
                    <p className="text-muted">Allocate assets to members with dynamic due-date calculations and real-time inventory updates.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>3</div>
                  <div>
                    <h4>Institutional Analytics</h4>
                    <p className="text-muted">Monitor circulation trends and fine collections through the Executive Dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '3rem', borderStyle: 'solid', borderColor: 'rgba(16, 185, 129, 0.2)', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'var(--primary)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.8rem' }}>Live Preview</div>
               <div style={{ background: '#000', borderRadius: '0.5rem', padding: '1rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>
                  <div style={{ height: '200px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ height: '20px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                    <div style={{ height: '100px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}></div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ height: '30px', width: '30%', background: 'var(--primary)', borderRadius: '4px' }}></div>
                      <div style={{ height: '30px', width: '30%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Sections */}
      <div style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>Ready to Modernize?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          <div className="glass-card" style={{ border: 'none', background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)' }}>
            <Cpu size={48} className="text-emerald mb-6" style={{ margin: '0 auto' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Advanced Infrastructure</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><CheckCircle size={18} className="text-emerald" /> JWT-Based Security</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><CheckCircle size={18} className="text-emerald" /> Automated Cron Engine</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><CheckCircle size={18} className="text-emerald" /> Full-Text Discovery</li>
            </ul>
          </div>
          <div className="glass-card" style={{ border: 'none', background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.05) 0%, transparent 100%)' }}>
            <BarChart3 size={48} style={{ color: 'var(--accent)', margin: '0 auto' }} className="mb-6" />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Enterprise Insights</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><CheckCircle size={18} style={{ color: 'var(--accent)' }} /> Circulation Trends</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><CheckCircle size={18} style={{ color: 'var(--accent)' }} /> Revenue Analytics</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><CheckCircle size={18} style={{ color: 'var(--accent)' }} /> Member Demographics</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '5rem' }}>
           <Link to="/signup" className="btn" style={{ padding: '1.5rem 3rem', fontSize: '1.2rem' }}>Deploy Athena Now</Link>
           <p className="text-muted mt-4">No credit card required for standard deployment.</p>
        </div>
      </div>

      <footer style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border-color)', marginTop: '6rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="sidebar-logo" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
              <Library size={24} /> Athena
            </div>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Precision Engineering for Modern Institutions.</p>
          </div>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Athena Systems. Built for the future of knowledge.
          </div>
        </div>
      </footer>
    </div>
  );
}
