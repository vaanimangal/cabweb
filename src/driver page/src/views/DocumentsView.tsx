import { FileText, ShieldCheck, Car, BadgeCheck, Upload, CheckCircle2, Clock, AlertTriangle, XCircle, Plus } from 'lucide-react';
import { documents } from '../data';
import type { DocItem } from '../types';
import type { ToastKind } from '../components/Toast';

const typeMeta: Record<DocItem['type'], { label: string; icon: typeof FileText }> = {
  license: { label: 'License', icon: BadgeCheck },
  insurance: { label: 'Insurance', icon: ShieldCheck },
  registration: { label: 'Registration', icon: FileText },
  background: { label: 'Background', icon: ShieldCheck },
  vehicle: { label: 'Vehicle', icon: Car },
};

const statusMeta: Record<DocItem['status'], { label: string; chip: string; icon: typeof CheckCircle2 }> = {
  verified: { label: 'Verified', chip: 'bg-red-50 text-red-700', icon: CheckCircle2 },
  pending: { label: 'Pending review', chip: 'bg-gold-50 text-gold-700', icon: Clock },
  expired: { label: 'Expired', chip: 'bg-ink-100 text-ink-700', icon: AlertTriangle },
  rejected: { label: 'Action needed', chip: 'bg-red-50 text-red-700', icon: XCircle },
};

export function DocumentsView({ pushToast }: { pushToast: (kind: ToastKind, msg: string) => void }) {
  const verified = documents.filter((d) => d.status === 'verified').length;
  const completion = Math.round((verified / documents.length) * 100);

  return (
    <div className="space-y-5">
      <div className="card p-5 sm:p-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Compliance Status</p>
            <h2 className="text-lg font-extrabold text-ink-900 mt-0.5">Document verification</h2>
            <p className="text-sm text-ink-500 mt-1">
              {verified} of {documents.length} documents verified. Keep documents current to stay eligible for rides.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative grid place-items-center w-20 h-20">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#e4e4e7" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="34" fill="none" stroke="#ef4444" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(completion / 100) * 2 * Math.PI * 34} ${2 * Math.PI * 34}`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="text-xl font-extrabold text-ink-900">{completion}%</span>
            </div>
            <button
              onClick={() => pushToast('info', 'Document upload flow coming soon')}
              className="btn btn-md tap bg-red-500 text-white hover:bg-red-600 shadow-glowRed font-bold"
            >
              <Upload size={16} />
              Upload
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
        {documents.map((doc) => {
          const tm = typeMeta[doc.type];
          const sm = statusMeta[doc.status];
          const TmIcon = tm.icon;
          const SmIcon = sm.icon;
          return (
            <div key={doc.id} className="card p-5 card-hover">
              <div className="flex items-start gap-3">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-ink-100 text-ink-700 shrink-0">
                  <TmIcon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-ink-900 truncate">{doc.name}</p>
                      <p className="text-xs text-ink-500 mt-0.5">Uploaded {doc.uploadedAt}</p>
                    </div>
                    <span className={`chip ${sm.chip} shrink-0`}>
                      <SmIcon size={12} />
                      {sm.label}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-ink-400 font-semibold uppercase tracking-wide">Expires</p>
                      <p className="text-ink-800 font-bold mt-0.5">{doc.expiryDate}</p>
                    </div>
                    <button
                      onClick={() => pushToast('info', `Re-upload for ${doc.name}`)}
                      className="btn btn-sm tap bg-ink-100 text-ink-700 hover:bg-ink-200"
                    >
                      <Plus size={14} />
                      Re-upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
