import { FileText, ShieldCheck, Car, BadgeCheck, Upload, CheckCircle2, Clock, AlertTriangle, XCircle, Plus } from 'lucide-react';
import { documents } from '../data';
import './DocumentsView.css';

const typeMeta = {
  license: { label: 'License', icon: BadgeCheck },
  insurance: { label: 'Insurance', icon: ShieldCheck },
  registration: { label: 'Registration', icon: FileText },
  background: { label: 'Background', icon: ShieldCheck },
  vehicle: { label: 'Vehicle', icon: Car },
};

const statusMeta = {
  verified: { label: 'Verified', chip: 'verified', icon: CheckCircle2 },
  pending: { label: 'Pending review', chip: 'pending', icon: Clock },
  expired: { label: 'Expired', chip: 'expired', icon: AlertTriangle },
  rejected: { label: 'Action needed', chip: 'rejected', icon: XCircle },
};

export function DocumentsView({ pushToast }) {
  const verifiedCount = documents.filter((d) => d.status === 'verified').length;
  const completion = Math.round((verifiedCount / documents.length) * 100);

  return (
    <div className="dv-container">
      <div className="dv-card dv-summary">
        <div className="dv-summary-content">
          <div>
            <p className="dv-label">Compliance Status</p>
            <h2 className="dv-title">Document verification</h2>
            <p className="dv-desc">
              {verifiedCount} of {documents.length} documents verified. Keep documents current to stay eligible for rides.
            </p>
          </div>
          <div className="dv-actions">
            <div className="dv-progress-ring">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#eceef2" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="34" fill="none" stroke="#ef4444" strokeWidth="8"
                  strokeLinecap="round"
                  style={{ strokeDasharray: `${(completion / 100) * 2 * Math.PI * 34} ${2 * Math.PI * 34}` }}
                />
              </svg>
              <span className="dv-progress-text">{completion}%</span>
            </div>
            <button
              onClick={() => pushToast('info', 'Document upload flow coming soon')}
              className="dv-btn-upload"
            >
              <Upload size={16} /> Upload
            </button>
          </div>
        </div>
      </div>

      <div className="dv-grid">
        {documents.map((doc) => {
          const tm = typeMeta[doc.type];
          const sm = statusMeta[doc.status];
          const TmIcon = tm.icon;
          const SmIcon = sm.icon;
          
          return (
            <div key={doc.id} className="dv-card dv-doc-item">
              <div className="dv-doc-content">
                <div className="dv-doc-icon"><TmIcon size={22} /></div>
                <div className="dv-doc-info">
                  <div className="dv-doc-header">
                    <div>
                      <p className="dv-doc-name">{doc.name}</p>
                      <p className="dv-doc-date">Uploaded {doc.uploadedAt}</p>
                    </div>
                    <span className={`dv-chip ${sm.chip}`}>
                      <SmIcon size={12} /> {sm.label}
                    </span>
                  </div>
                  <div className="dv-doc-footer">
                    <div>
                      <p className="dv-label">Expires</p>
                      <p className="dv-expiry">{doc.expiryDate}</p>
                    </div>
                    <button
                      onClick={() => pushToast('info', `Re-upload for ${doc.name}`)}
                      className="dv-btn-reupload"
                    >
                      <Plus size={14} /> Re-upload
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