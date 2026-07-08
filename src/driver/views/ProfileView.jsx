import { useState } from 'react';
import { User, Mail, Phone, MapPin, Car, Calendar, Star, Award, Camera, Check, Bell, Lock } from 'lucide-react';
import { driverProfile } from '../data';
import './ProfileView.css';

export function ProfileView({ pushToast }) {
  const [form, setForm] = useState({
    name: driverProfile.name,
    email: driverProfile.email,
    phone: driverProfile.phone,
    city: driverProfile.city,
    vehicleModel: driverProfile.vehicleModel,
    vehiclePlate: driverProfile.vehiclePlate,
  });
  const [notifications, setNotifications] = useState({ rides: true, earnings: true, promotions: false, reminders: true });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleSave = () => pushToast('success', 'Profile updated successfully');

  return (
    <div className="pv-container">
      {/* Profile Header */}
      <div className="pv-card pv-header-card">
        <div className="pv-header-banner" />
        <div className="pv-header-content">
          <div className="pv-avatar-wrapper">
            <img src={driverProfile.avatarUrl} alt="Profile" className="pv-avatar" />
            <button onClick={() => pushToast('info', 'Photo upload coming soon')} className="pv-cam-btn">
              <Camera size={15} />
            </button>
          </div>
          <div className="pv-profile-meta">
            <h2>{form.name}</h2>
            <div className="pv-stats">
              <span><Star size={14} className="star" /> <b>{driverProfile.rating}</b> rating</span>
              <span><Award size={14} /> {driverProfile.totalTrips.toLocaleString()} trips</span>
              <span><Calendar size={14} /> Member since {driverProfile.memberSince}</span>
            </div>
          </div>
        </div>
      </div>

      <Section title="Personal information" desc="Keep your contact details current.">
        <div className="pv-grid">
          <Field icon={User} label="Full name" value={form.name} onChange={(v) => update('name', v)} />
          <Field icon={Mail} label="Email" value={form.email} onChange={(v) => update('email', v)} type="email" />
          <Field icon={Phone} label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
          <Field icon={MapPin} label="City" value={form.city} onChange={(v) => update('city', v)} />
        </div>
      </Section>

      <Section title="Vehicle information" desc="Visible to passengers when matching.">
        <div className="pv-grid">
          <Field icon={Car} label="Vehicle model" value={form.vehicleModel} onChange={(v) => update('vehicleModel', v)} />
          <Field icon={Car} label="License plate" value={form.vehiclePlate} onChange={(v) => update('vehiclePlate', v)} />
        </div>
      </Section>

      <Section title="Notification preferences" desc="Choose what alerts you receive.">
        <div className="pv-toggle-list">
          {[
            { key: 'rides', label: 'New ride requests', desc: 'Get notified when a passenger requests you' },
            { key: 'earnings', label: 'Earnings updates', desc: 'Daily and weekly earnings summaries' },
            { key: 'promotions', label: 'Promotions & bonuses', desc: 'Surge zones and incentive programs' },
            { key: 'reminders', label: 'Document reminders', desc: 'Alerts before documents expire' },
          ].map((n) => (
            <Toggle
              key={n.key}
              icon={Bell}
              label={n.label}
              desc={n.desc}
              on={notifications[n.key]}
              onToggle={() => setNotifications((s) => ({ ...s, [n.key]: !s[n.key] }))}
            />
          ))}
        </div>
      </Section>

      <div className="pv-actions">
        <button onClick={handleSave} className="pv-btn-save"><Check size={18} /> Save changes</button>
        <button onClick={() => pushToast('info', 'Password change flow coming soon')} className="pv-btn-sec"><Lock size={18} /> Change password</button>
      </div>
    </div>
  );
}

function Section({ title, desc, children }) {
  return (
    <div className="pv-card pv-section">
      <h3>{title}</h3>
      <p>{desc}</p>
      {children}
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, type = 'text' }) {
  return (
    <label className="pv-field">
      <span>{label}</span>
      <div className="pv-input-wrapper">
        <Icon size={18} />
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </label>
  );
}

function Toggle({ icon: Icon, label, desc, on, onToggle }) {
  return (
    <div className="pv-toggle-item">
      <div className="pv-toggle-info">
        <span className={`pv-toggle-icon ${on ? 'on' : 'off'}`}><Icon size={18} /></span>
        <div>
          <p>{label}</p>
          <small>{desc}</small>
        </div>
      </div>
      <button onClick={onToggle} className={`pv-switch ${on ? 'on' : ''}`}>
        <span className="pv-switch-thumb" />
      </button>
    </div>
  );
}