import React from "react";

export default function Header({ onLogout, onDownload }) {
  const user = JSON.parse(localStorage.getItem("ir_user") || "{}");

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <div className="brand">
          <a href="/resume" aria-label="Interactive Resume Home">Interactive Resume</a>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={onDownload} aria-label="Download resume">Download</button>
          <span className="muted small">Signed in: {user?.email || "unknown"}</span>
          <button className="btn danger" onClick={onLogout}>Log out</button>
        </div>
      </div>
    </header>
  );
}
