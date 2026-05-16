export default function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Open':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(52,211,153,0.1)]';
      case 'In Progress':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_12px_rgba(251,191,36,0.1)]';
      case 'Closed':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusStyles()}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'Open' ? 'bg-emerald-400' : status === 'In Progress' ? 'bg-amber-400' : 'bg-slate-400'}`}></span>
      {status}
    </span>
  );
}
