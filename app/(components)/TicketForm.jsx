'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TicketForm = ({ ticket, fullWidth = false }) => {
  const router = useRouter();
  const EDITMODE = ticket._id !== 'new';

  const startingTicketData = {
    title: '',
    description: '',
    priority: 1,
    progress: 0,
    status: 'not started',
    category: 'Need a Job',
  };

  if (EDITMODE) {
    startingTicketData.title = ticket.title ?? '';
    startingTicketData.description = ticket.description ?? '';
    startingTicketData.priority = ticket.priority ?? 1;
    startingTicketData.progress = ticket.progress ?? 0;
    startingTicketData.status = ticket.status ?? 'not started';
    startingTicketData.category = ticket.category ?? 'Need a Job';
  }

  const [formData, setFormData] = useState(startingTicketData);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setFormError('');
    setSubmitting(true);
    const body = {
      ...formData,
      priority: Number(formData.priority) || 1,
      progress: Number(formData.progress) || 0,
    };

    try {
      if (EDITMODE) {
        const res = await fetch(`/api/v1/tickets/${ticket._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          setFormError('İşlem yapılamadı. Tekrar deneyin.');
          return;
        }
      } else {
        const res = await fetch('/api/v1/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          setFormError('İşlem yapılamadı. Tekrar deneyin.');
          return;
        }
      }
      router.push('/');
      router.refresh();
    } catch {
      setFormError('Bağlantı hatası. Tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className={`flex flex-col gap-3 ${fullWidth ? 'w-full max-w-2xl' : 'w-full max-w-md'}`}
        method="post"
        onSubmit={handleSubmit}
      >
        <h3 className="text-retro-cyan text-sm">
          {EDITMODE ? '[ UPDATE TICKET ]' : '[ CREATE TICKET ]'}
        </h3>
        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows={4}
        />
        <label>Category</label>
        <select name="category" id="category" value={formData.category} onChange={handleChange}>
          <option value="Need a Job">Need A Job</option>
          <option value="Software Problems">Software Problems</option>
          <option value="How to get a girlfriend">How to get a girlfriend</option>
        </select>
        <label>Priority (1–5)</label>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="flex items-center gap-1 text-retro-muted cursor-pointer">
              <input
                type="radio"
                name="priority"
                onChange={handleChange}
                checked={formData.priority == n}
                value={n}
              />
              <span>{n}</span>
            </label>
          ))}
        </div>
        <label>Progress %</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        {formError && <p className="text-retro-red text-xs">{formError}</p>}
        <input
          type="submit"
          className="btn mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          value={submitting ? '...' : (EDITMODE ? '[ UPDATE ]' : '[ CREATE ]')}
          disabled={submitting}
        />
      </form>
    </div>
  );
};

export default TicketForm;
