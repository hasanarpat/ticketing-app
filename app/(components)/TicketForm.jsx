'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TicketForm = ({ ticket }) => {
  const router = useRouter();

  const EDITMODE = ticket._id === 'new' ? false : true;

  const startingTicketData = {
    title: '',
    description: '',
    priority: 1,
    progress: 0,
    status: 'not started',
    category: 'need a job',
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/tickets/${ticket._id}`, {
        method: 'PUT',
        body: JSON.stringify({ formData }),
        'content/type': 'application/json',
      });

      if (!res.ok) {
        throw new Error('Failed to update Ticket.');
      }
    } else {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ formData }),
        'content/type': 'application/json',
      });

      if (!res.ok) {
        throw new Error('Failed to create Ticket.');
      }
    }

    router.push('/');
    router.refresh();
  };

  if (EDITMODE) {
    startingTicketData['title'] = ticket.title;
    startingTicketData['description'] = ticket.description;
    startingTicketData['priority'] = ticket.priority;
    startingTicketData['progress'] = ticket.progress;
    startingTicketData['status'] = ticket.status;
    startingTicketData['category'] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? 'Update your Ticket' : 'Create your Ticket'}</h3>
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
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows={5}
        ></textarea>
        <label>Category</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Need a Job">Need A Job</option>
          <option value="Software Problems">Software Problems</option>
          <option value="How to get a girlfriend">
            How to get a girlfriend
          </option>
        </select>
        <label>Priority</label>
        <div>
          <input
            type="radio"
            name="priority"
            onChange={handleChange}
            id="priority-1"
            checked={formData.priority == 1}
            value={1}
          />
          <label>1</label>{' '}
          <input
            type="radio"
            name="priority"
            onChange={handleChange}
            id="priority-2"
            checked={formData.priority == 2}
            value={2}
          />
          <label>2</label>{' '}
          <input
            type="radio"
            name="priority"
            onChange={handleChange}
            id="priority-3"
            checked={formData.priority == 3}
            value={3}
          />
          <label>3</label>{' '}
          <input
            type="radio"
            name="priority"
            onChange={handleChange}
            id="priority-4"
            checked={formData.priority == 4}
            value={4}
          />
          <label>4</label>{' '}
          <input
            type="radio"
            name="priority"
            onChange={handleChange}
            id="priority-5"
            checked={formData.priority == 5}
            value={5}
          />
          <label>5</label>
        </div>
        <label>Progess</label>
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
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          className="btn"
          value={EDITMODE ? 'Update Ticket' : 'Create Ticket'}
        />
      </form>
    </div>
  );
};

export default TicketForm;
