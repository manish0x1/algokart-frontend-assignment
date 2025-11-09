import React, { useState } from "react";

export default function TimelineItem({ work }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="timeline-item">
      <div className="timeline-meta">
        <div className="timeline-date">{work.startDate} — {work.endDate}</div>
        <div className="timeline-company">{work.company}</div>
      </div>
      <div className="timeline-body">
        <h4>{work.position}</h4>
        <p className="muted">{work.summary}</p>
        <button className="btn ghost small" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Collapse" : "Expand"}
        </button>
        {open && (
          <ul className="highlights">
            {work.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
