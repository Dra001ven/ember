import { testimonials } from '../data.js';

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const avatarColors = ['#E8531F', '#5C7A4A', '#F0A23C', '#5A1508', '#8B7565'];

function TestimonialCard({ testimonial }) {
  const color = avatarColors[testimonial.id % avatarColors.length];
  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</div>
      <p className="testimonial-text">"{testimonial.text}"</p>
      <div className="testimonial-person">
        <span className="avatar-circle" style={{ background: color }}>{initials(testimonial.name)}</span>
        <div>
          <span className="testimonial-name">{testimonial.name}</span>
          <span className="testimonial-role">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="testimonials">
      <div className="wrap reveal">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>What people say</div>
        <h2 style={{ marginTop: 16, textAlign: 'center' }}>Reviews from the dining room.</h2>
      </div>
      <div className="testimonial-marquee">
        <div className="testimonial-track">
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
