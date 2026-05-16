import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/tickets';
import { User, Mail, Tag, FileText, Send, X } from 'lucide-react';

export default function CreateTicket() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    subject: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.customer_name || !formData.customer_email || !formData.subject || !formData.description) {
      setError('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createTicket(formData);
      navigate(`/tickets/${result.ticket_id}`);
    } catch (err) {
      setError('Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create New Ticket</h1>
        <p className="text-slate-400">Fill out the form below to submit a new support request.</p>
      </div>
      
      <div className="card">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-medium text-slate-400 mb-2">
                <User className="w-4 h-4 mr-2 text-cyan-500" />
                Customer Name
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="input-field"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-slate-400 mb-2">
                <Mail className="w-4 h-4 mr-2 text-cyan-500" />
                Customer Email
              </label>
              <input
                type="email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
                className="input-field"
                placeholder="jane@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="flex items-center text-sm font-medium text-slate-400 mb-2">
              <Tag className="w-4 h-4 mr-2 text-cyan-500" />
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="input-field"
              placeholder="Brief description of the issue"
              required
            />
          </div>
          
          <div>
            <label className="flex items-center text-sm font-medium text-slate-400 mb-2">
              <FileText className="w-4 h-4 mr-2 text-cyan-500" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="input-field resize-none"
              placeholder="Provide detailed information about the issue..."
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-800/50">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="btn-secondary mr-3 flex items-center"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Creating...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Create Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
