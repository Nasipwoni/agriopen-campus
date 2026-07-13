export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong style={{ color: 'var(--cream)' }}>AgriOpen College · Digital Campus</strong>
          <p className="disclaimer" style={{ marginTop: 8 }}>
            Co-funded by the European Union under the Erasmus+ Capacity Building in Higher
            Education programme. Views and opinions expressed are those of the author(s) only
            and do not necessarily reflect those of the European Union or the granting authority.
          </p>
        </div>
        <div className="disclaimer">© {new Date().getFullYear()} AgriOpen Campus consortium</div>
      </div>
    </footer>
  );
}
