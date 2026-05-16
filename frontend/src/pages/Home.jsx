import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { fetchTickets } from '../api/tickets';
import StatusBadge from '../components/StatusBadge';

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const tabs = ['All', 'Open', 'In Progress', 'Closed'];

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch tickets
  useEffect(() => {
    const loadTickets = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTickets(statusFilter, debouncedSearch);
        setTickets(data);
      } catch (error) {
        console.error("Failed to load tickets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTickets();
  }, [statusFilter, debouncedSearch]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Tickets</h1>
          <p className="text-slate-400 text-sm">Manage and track customer support requests</p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="w-full md:w-72 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/create" className="btn-primary inline-flex items-center justify-center">
            New Ticket
          </Link>
        </div>
      </div>

      <div className="flex space-x-1 border-b border-slate-800">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${statusFilter === tab
              ? 'border-cyan-500 text-cyan-500'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="py-4 px-4 font-semibold">Ticket ID</th>
                <th className="py-4 px-4 font-semibold">Customer</th>
                <th className="py-4 px-4 font-semibold">Subject</th>
                <th className="py-4 px-4 font-semibold text-center">Status</th>
                <th className="py-4 px-4 font-semibold text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">Loading tickets...</td>
                </tr>
              ) : tickets.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center">
                        <Search className="w-6 h-6 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">No tickets found</p>
                        <p className="text-slate-500 text-sm">Try adjusting your filters or search term</p>
                      </div>
                      <button
                        onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
                        className="text-cyan-500 text-sm font-medium hover:text-cyan-400 transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                tickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="py-3 px-4 font-mono text-sm text-cyan-400">
                      <Link to={`/tickets/${ticket.ticket_id}`} className="hover:underline">
                        {ticket.ticket_id}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200">{ticket.customer_name}</div>
                      <div className="text-xs text-slate-500">{ticket.customer_email}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <Link to={`/tickets/${ticket.ticket_id}`} className="hover:text-cyan-400 transition-colors">
                        {ticket.subject}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-400 text-right">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
