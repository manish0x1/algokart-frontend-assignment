import React from "react";

export default function FilterBar({
  query,
  setQuery,
  skills,
  selectedSkills,
  setSelectedSkills,
  view,
  setView
}) {
  function toggleSkill(skill) {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  }

  return (
    <div className="filterbar" role="region" aria-label="Filters">
      <label htmlFor="search" className="visually-hidden">Search</label>
      <input
        id="search"
        placeholder="Search roles, companies, skills..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="skill-chips" role="list" aria-label="Skill filters">
        {skills.map((s) => (
          <button
            key={s}
            aria-pressed={selectedSkills.includes(s)}
            className={`chip ${selectedSkills.includes(s) ? "active" : ""}`}
            onClick={() => toggleSkill(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="view-toggle" role="group" aria-label="View toggle">
        <button className={`btn ${view === "cards" ? "primary" : ""}`} onClick={() => setView("cards")}>Cards</button>
        <button className={`btn ${view === "list" ? "primary" : ""}`} onClick={() => setView("list")}>Timeline</button>
      </div>
    </div>
  );
}
