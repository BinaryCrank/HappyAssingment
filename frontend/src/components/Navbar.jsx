import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass-nav">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <Link to="/" className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 transition-colors">
          <Ticket className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight">CRM Desk</span>
        </Link>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link to="/create" className="btn-primary text-sm">
            New Ticket
          </Link>
        </div>
      </div>
    </nav>
  );
}
