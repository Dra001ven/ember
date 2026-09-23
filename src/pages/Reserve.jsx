import { useState } from 'react';
import { restaurantInfo } from '../data.js';

const STORAGE_KEY = 'ember-and-salt-reservations';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '19:00',
  guests: 2,
};

function loadReservations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveReservations(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore storage errors (e.g. private browsing)
  }
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.phone.trim()) errors.phone = 'Please enter a phone number.';
  if (!form.date) errors.date = 'Pick a date.';
  else if (form.date < new Date().toISOString().slice(0, 10)) errors.date = 'Pick a date in the future.';
  if (form.guests < 1 || form.guests > 12) errors.guests = 'Parties over 12 should call the kitchen directly.';
  return errors;
}

export default function Reserve() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [reservations, setReservations] = useState(loadReservations);
  const [confirmed, setConfirmed] = useState(null);

  const updateField = (field) => (e) => {
    const value = field === 'guests' ? Number(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const reservation = { ...form, id: Date.now() };
    const updated = [reservation, ...reservations].slice(0, 5);
    setReservations(updated);
    saveReservations(updated);
    setConfirmed(reservation);
    setForm(emptyForm);
  };

  const cancelReservation = (id) => {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    saveReservations(updated);
    if (confirmed?.id === id) setConfirmed(null);
  };

  return (
    <section id="reserve" style={{ paddingTop: 48 }}>
      <div className="wrap">
        <div className="reserve reveal">
          <div className="reserve-inner">
            <div>
              <div className="eyebrow">Reserve</div>
              <h2 style={{ marginTop: 16 }}>Come hungry. Come early. We don't take walk-ins after 8.</h2>
              <p>Tables for two to twelve. For parties over eight, call the kitchen directly.</p>

              {confirmed && (
                <div className="reserve-confirmation" role="status">
                  Table booked for <b>{confirmed.name}</b> · {confirmed.guests} guest{confirmed.guests > 1 ? 's' : ''} on{' '}
                  <b>{confirmed.date}</b> at <b>{confirmed.time}</b>. A confirmation was sent to {confirmed.email}.
                </div>
              )}

              <form className="reserve-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <label>
                    Name
                    <input type="text" value={form.name} onChange={updateField('name')} placeholder="Full name" />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </label>
                  <label>
                    Email
                    <input type="email" value={form.email} onChange={updateField('email')} placeholder="you@example.com" />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Phone
                    <input type="tel" value={form.phone} onChange={updateField('phone')} placeholder="+44 ..." />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </label>
                  <label>
                    Guests
                    <input type="number" min="1" max="12" value={form.guests} onChange={updateField('guests')} />
                    {errors.guests && <span className="form-error">{errors.guests}</span>}
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Date
                    <input type="date" value={form.date} onChange={updateField('date')} />
                    {errors.date && <span className="form-error">{errors.date}</span>}
                  </label>
                  <label>
                    Time
                    <select value={form.time} onChange={updateField('time')}>
                      {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: 22 }}>
                  Confirm reservation
                </button>
              </form>

              <p style={{ marginTop: 18 }}>
                Prefer to talk it through? <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}>Call to reserve</a>
              </p>
            </div>

            <div className="reserve-info">
              <div className="reserve-block">
                <div className="reserve-label">Address</div>
                <div className="reserve-value">{restaurantInfo.address}</div>
              </div>
              <div className="reserve-block">
                <div className="reserve-label">Hours</div>
                <div className="reserve-value">{restaurantInfo.hours}</div>
              </div>
              <div className="reserve-block">
                <div className="reserve-label">Phone</div>
                <div className="reserve-value">
                  <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}>{restaurantInfo.phone}</a>
                </div>
              </div>
              <div className="reserve-block">
                <div className="reserve-label">Email</div>
                <div className="reserve-value">
                  <a href={`mailto:${restaurantInfo.email}`}>{restaurantInfo.email}</a>
                </div>
              </div>

              {reservations.length > 0 && (
                <div className="reserve-block">
                  <div className="reserve-label">Your bookings</div>
                  <ul className="reservation-list">
                    {reservations.map((r) => (
                      <li key={r.id}>
                        <span>{r.date} · {r.time} · {r.guests} guests</span>
                        <button type="button" onClick={() => cancelReservation(r.id)} aria-label="Cancel reservation">
                          Cancel
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
