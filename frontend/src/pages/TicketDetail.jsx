import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Mail, MessageSquare } from 'lucide-react';
import { fetchTicket, updateTicket } from '../api/tickets';
import StatusBadge from '../components/StatusBadge';

export default function TicketDetail() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [noteText, setNoteText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  const loadTicket = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTicket(ticketId);
      setTicket(data);
    } catch (error) {
      console.error("Failed to load ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updated = await updateTicket(ticketId, { status: newStatus });
      setTicket(updated);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setIsSubmitting(true);
    try {
      const updated = await updateTicket(ticketId, { note: noteText });
      setTicket(updated);
      setNoteText('');
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="text-center py-12 text-slate-500">Loading ticket...</div>;
  if (!ticket) return <div className="text-center py-12 text-red-400">Ticket not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/" className="inline-flex items-center text-sm text-slate-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to tickets
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold font-mono text-cyan-400">{ticket.ticket_id}</h1>
            <StatusBadge status={ticket.status} />
          </div>
          <h2 className="text-xl font-medium text-slate-200">{ticket.subject}</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {ticket.status !== 'Open' && (
            <button onClick={() => handleStatusChange('Open')} className="btn-secondary text-xs py-1.5 px-3">
              Mark Open
            </button>
          )}
          {ticket.status !== 'In Progress' && (
            <button onClick={() => handleStatusChange('In Progress')} className="btn-secondary text-xs py-1.5 px-3 border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
              In Progress
            </button>
          )}
          {ticket.status !== 'Closed' && (
            <button onClick={() => handleStatusChange('Closed')} className="btn-secondary text-xs py-1.5 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700">
              Close Ticket
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Description
            </h3>
            <div className="text-slate-300 whitespace-pre-wrap">{ticket.description}</div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-200">Notes & Activity</h3>
            
            <div className="space-y-4">
              {ticket.notes && ticket.notes.map(note => (
                <div key={note.id} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-slate-800">
                  <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 transition-all hover:bg-slate-800/40">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      <Clock className="w-3 h-3 text-cyan-500" />
                      {new Date(note.created_at).toLocaleString()}
                    </div>
                    <div className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{note.note_text}</div>
                  </div>
                </div>
              ))}
              
              {(!ticket.notes || ticket.notes.length === 0) && (
                <div className="text-sm text-slate-500 italic">No notes added yet.</div>
              )}
            </div>

            <form onSubmit={handleAddNote} className="mt-6">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows="3"
                className="input-field resize-none mb-3"
                placeholder="Add an internal note..."
              ></textarea>
              <div className="flex justify-end">
                <button type="submit" className="btn-primary" disabled={isSubmitting || !noteText.trim()}>
                  {isSubmitting ? 'Adding...' : 'Add Note'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-sm font-medium text-slate-400 mb-4">Customer Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-slate-500 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">Name</div>
                  <div className="text-sm font-medium text-slate-200">{ticket.customer_name}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-slate-500 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="text-sm font-medium text-slate-200 break-all">{ticket.customer_email}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-sm font-medium text-slate-400 mb-4">Ticket Info</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-500">Created</div>
                <div className="text-sm font-medium text-slate-200">
                  {new Date(ticket.created_at).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Last Updated</div>
                <div className="text-sm font-medium text-slate-200">
                  {new Date(ticket.updated_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
