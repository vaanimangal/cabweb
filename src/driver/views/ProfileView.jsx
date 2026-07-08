import { useState } from 'react';
import { User, Mail, Phone, MapPin, Car, Calendar, Star, Award, Camera, Check, Bell, Lock } from 'lucide-react';
import { driverProfile } from '../data';

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
    <div className="space-y-5">
      <div className="card overflow-hidden animate-slide-up">
        <div className="h-24 bg-gradient-to-br from-ink-900 to-ink-800 relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #ef4444 0, transparent 40%), radial-gradient(circle at 80% 30%, #eab308 0, transparent 40%)' }} />
        </div>
        <div className="px-5 sm:px-6 pb-5 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="relative shrink-0">
              <img src={driverProfile.avatarUrl} alt="" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-card" />
              <button
                onClick={() => pushToast('info', 'Photo upload coming soon')}
                className="absolute -bottom-1 -right-1 grid place-items-center w-8 h-8 rounded-xl bg-ink-900 text-white hover:bg-ink-800 tap shadow-soft"
                aria-label="Change photo"
              >
                <Camera size={15} />
              </button>
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <h2 className="text-xl font-extrabold text-ink-900 truncate">{form.name}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-ink-500">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-gold-400" fill="currentColor" strokeWidth={0} />
                  <span className="font-bold text-ink-800">{driverProfile.rating}</span> rating
                </span>
                <span className="flex items-center gap-1">
                  <Award size={14} className="text-red-600" />
                  {driverProfile.totalTrips.toLocaleString()} trips
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Member since {driverProfile.memberSince}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Personal information" desc="Keep your contact details current.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field icon={User} label="Full name" value={form.name} onChange={(v) => update('name', v)} />
          <Field icon={Mail} label="Email" value={form.email} onChange={(v) => update('email', v)} type="email" />
          <Field icon={Phone} label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
          <Field icon={MapPin} label="City" value={form.city} onChange={(v) => update('city', v)} />
        </div>
      </Section>

      <Section title="Vehicle information" desc="Visible to passengers when matching.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field icon={Car} label="Vehicle model" value={form.vehicleModel} onChange={(v) => update('vehicleModel', v)} />
          <Field icon={Car} label="License plate" value={form.vehiclePlate} onChange={(v) => update('vehiclePlate', v)} />
        </div>
      </Section>

      <Section title="Notification preferences" desc="Choose what alerts you receive.">
        <div className="space-y-1">
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

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={handleSave} className="btn btn-lg tap flex-1 bg-red-500 text-white hover:bg-red-600 shadow-glowRed font-bold">
          <Check size={18} strokeWidth={2.5} />
          Save changes
        </button>
        <button onClick={() => pushToast('info', 'Password change flow coming soon')} className="btn btn-lg tap bg-ink-100 text-ink-800 hover:bg-ink-200 font-bold">
          <Lock size={18} />
          Change password
        </button>
      </div>
    </div>
  );
}

function Section({ title, desc, children }) {
  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4">
        <h3 className="font-extrabold text-ink-900">{title}</h3>
        <p className="text-sm text-ink-500 mt-0.5">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink-500 uppercase tracking-wide">{label}</span>
      <div className="mt-1.5 flex items-center gap-2.5 h-12 px-3.5 rounded-xl bg-ink-50 border border-ink-100 focus-within:border-red-400 focus-within:ring-4 focus-within:ring-red-100 transition-all">
        <Icon size={18} className="text-ink-400 shrink-0" />
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent outline-none text-sm font-semibold text-ink-800 w-full" />
      </div>
    </label>
  );
}

function Toggle({ icon: Icon, label, desc, on, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-ink-100 last:border-0">
      <div className="flex items-start gap-3 min-w-0">
        <span className={`grid place-items-center w-10 h-10 rounded-xl shrink-0 ${on ? 'bg-red-50 text-red-700' : 'bg-ink-100 text-ink-400'}`}>
          <Icon size={18} />
        </span>
        <div className="min-w-0">
          <p className="font-bold text-ink-900 text-sm">{label}</p>
          <p className="text-xs text-ink-500 mt-0.5">{desc}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={on}
        aria-label={label}
        className={`relative shrink-0 w-12 h-7 rounded-full transition-colors duration-200 tap ${on ? 'bg-red-500' : 'bg-ink-200'}`}
      >
        <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-soft transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}