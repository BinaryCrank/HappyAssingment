const API_BASE = import.meta.env.VITE_API_URL || '/api/tickets';

export const fetchTickets = async (status, search) => {
  const params = new URLSearchParams();
  if (status && status !== 'All') params.append('status', status);
  if (search) params.append('search', search);
  
  const response = await fetch(`${API_BASE}?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch tickets');
  return response.json();
};

export const fetchTicket = async (ticketId) => {
  const response = await fetch(`${API_BASE}/${ticketId}`);
  if (!response.ok) throw new Error('Failed to fetch ticket');
  return response.json();
};

export const createTicket = async (ticketData) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData)
  });
  if (!response.ok) throw new Error('Failed to create ticket');
  return response.json();
};

export const updateTicket = async (ticketId, updateData) => {
  const response = await fetch(`${API_BASE}/${ticketId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
  if (!response.ok) throw new Error('Failed to update ticket');
  return response.json();
};
