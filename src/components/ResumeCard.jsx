import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, Briefcase } from "lucide-react";

export default function ResumeCard({ work }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      className="card resume-card enhanced-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-head">
        <div className="job-info">
          <div className="job-icon">
            <Briefcase size={18} color="var(--accent)" />
          </div>
          <div>
            <h4 className="job-title">{work.position}</h4>
            <div className="muted company-name">{work.company}</div>
          </div>
        </div>
        <div className="date muted">
          <Calendar size={14} />{" "}
          <span>{work.startDate} → {work.endDate}</span>
        </div>
      </div>

      <p className="summary">{work.summary}</p>

      <button
        className="btn toggle-btn"
        onClick={() => setOpen(!open)}
        aria-controls={`highlights-${work.id}`}
        aria-expanded={open}
      >
        {open ? (
          <>
            Hide details <ChevronUp size={16} />
          </>
        ) : (
          <>
            Show details <ChevronDown size={16} />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`highlights-${work.id}`}
            className="highlights-list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {work.highlights &&
              work.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  • {h}
                </motion.li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
