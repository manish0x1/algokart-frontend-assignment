import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import ResumeCard from "../components/ResumeCard";
import TimelineItem from "../components/TimelineItem";
import resumeData from "../data/resume.json";

export default function ResumePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [view, setView] = useState("cards"); // 'cards' or 'list'

  useEffect(() => {
    // guard: if no session, redirect (just in case)
    if (!localStorage.getItem("ir_user")) {
      navigate("/login");
    }
  }, [navigate]);

  const allSkills = useMemo(() => resumeData.skills || [], []);

  const filteredWork = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (resumeData.work || []).filter((w) => {
      const matchesQuery =
        q === "" ||
        w.position.toLowerCase().includes(q) ||
        w.company.toLowerCase().includes(q) ||
        (w.summary && w.summary.toLowerCase().includes(q)) ||
        (w.highlights && w.highlights.join(" ").toLowerCase().includes(q));
      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((s) => resumeData.skills.includes(s));
      return matchesQuery && matchesSkills;
    });
  }, [query, selectedSkills]);

  function handleLogout() {
    localStorage.removeItem("ir_user");
    navigate("/login");
  }

  function handleDownload() {
    // use print-to-PDF (opens print dialog)
    window.print();
  }

  return (
    <>
      <Header onLogout={handleLogout} onDownload={handleDownload} />
      <main className="container">
        <section aria-labelledby="profile">
          <h2 id="profile">{resumeData.basics.name} — {resumeData.basics.label}</h2>
          <p className="muted">{resumeData.basics.summary}</p>
        </section>

        <FilterBar
          query={query}
          setQuery={setQuery}
          skills={allSkills}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          view={view}
          setView={setView}
        />

        <section aria-labelledby="experience" className="experience-section">
          <h3 id="experience">Experience</h3>
          <div className={view === "cards" ? "cards-grid" : "list-view"}>
            {filteredWork.length === 0 ? (
              <div className="empty">No matching experience found.</div>
            ) : view === "cards" ? (
              filteredWork.map((w) => <ResumeCard key={w.id} work={w} />)
            ) : (
              <div className="timeline">
                {filteredWork.map((w) => (
                  <TimelineItem key={w.id} work={w} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="projects" className="projects">
          <h3 id="projects">Projects</h3>
          <ul>
            {resumeData.projects.map((p) => (
              <li key={p.name}>
                <strong>{p.name}</strong> — {p.description}
                <div className="muted small">Tech: {p.technologies.join(", ")}</div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="education" className="education">
          <h3 id="education">Education</h3>
          <ul>
            {resumeData.education.map((ed, i) => (
              <li key={i}>
                <strong>{ed.institution}</strong> — {ed.area}
                <div className="muted small">{ed.startDate} → {ed.endDate} • GPA: {ed.gpa}</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
