'use client'
import { useState, useEffect } from 'react'

function Modal({ id, title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="legal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby={id}>
      <div className="legal-modal" onClick={e => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h2 id={id}>{title}</h2>
          <button className="legal-close" onClick={onClose} aria-label="Schliessen">✕</button>
        </div>
        <div className="legal-modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function FooterModals() {
  const [open, setOpen] = useState(null) // null | 'datenschutz' | 'agb'

  // escucha el evento del banner de cookies
  useEffect(() => {
    const handler = () => setOpen('datenschutz')
    document.addEventListener('open-datenschutz', handler)
    return () => document.removeEventListener('open-datenschutz', handler)
  }, [])

  return (
    <>
      {/* Trigger buttons */}
      <button className="footer-legal-btn" onClick={() => setOpen('datenschutz')}>Datenschutz</button>
      <button className="footer-legal-btn" onClick={() => setOpen('agb')}>AGB</button>

      {/* Datenschutz Modal */}
      {open === 'datenschutz' && (
        <Modal id="modal-datenschutz" title="Datenschutzerklärung" onClose={() => setOpen(null)}>
          <p className="legal-intro">
            iNOTEC-Engineering legt grossen Wert auf den Schutz Ihrer persönlichen Daten.
            Diese Website dient als <strong>Engineering-Portfolio</strong> zur Präsentation
            realisierter Projekte und Kompetenzen — sie verfolgt keine kommerzielle
            Massendatenerhebung.
          </p>

          <h3>1. Verantwortliche Stelle</h3>
          <p>
            iNOTEC-Engineering<br />
            Bahnhofstrasse 2 · CH-9475 Sevelen, Schweiz<br />
            E-Mail: inotec-inotec@bluewin.ch · Tel: +41 81 756 74 55
          </p>

          <h3>2. Erhobene Daten</h3>
          <p>
            Diese Website erhebt <strong>keine Tracking-Cookies</strong> und nutzt
            keine Analyse- oder Werbedienste Dritter. Beim Besuch der Seite werden
            ausschliesslich technisch notwendige Server-Logs gespeichert
            (IP-Adresse, Zugriffszeit, aufgerufene Seite), die nach 7 Tagen
            automatisch gelöscht werden.
          </p>

          <h3>3. Kontaktformular</h3>
          <p>
            Wenn Sie uns über das Kontaktformular schreiben, werden Ihre Angaben
            (Name, E-Mail, Nachricht) ausschliesslich zur Bearbeitung Ihrer Anfrage
            verwendet und nicht an Dritte weitergegeben. Die Daten werden nach
            abschliessender Bearbeitung gelöscht, sofern keine gesetzlichen
            Aufbewahrungspflichten bestehen.
          </p>

          <h3>4. Keine Weitergabe an Dritte</h3>
          <p>
            Personenbezogene Daten werden nicht verkauft, vermietet oder ohne
            Ihre ausdrückliche Zustimmung an Dritte weitergegeben — ausgenommen
            gesetzlich vorgeschriebene Fälle.
          </p>

          <h3>5. Ihre Rechte (DSG / DSGVO)</h3>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und
            Einschränkung der Verarbeitung Ihrer Daten sowie das Recht auf
            Datenübertragbarkeit. Anfragen richten Sie bitte an die oben genannte
            E-Mail-Adresse.
          </p>

          <h3>6. Änderungen</h3>
          <p>
            Diese Datenschutzerklärung kann jederzeit angepasst werden.
            Massgeblich ist stets die auf dieser Seite veröffentlichte
            aktuelle Version. Stand: Januar 2026.
          </p>
        </Modal>
      )}

      {/* AGB Modal */}
      {open === 'agb' && (
        <Modal id="modal-agb" title="Allgemeine Geschäftsbedingungen" onClose={() => setOpen(null)}>
          <p className="legal-intro">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung
            der Portfolio-Website von iNOTEC-Engineering sowie für Engineering-
            Dienstleistungsverträge, die auf Basis dieser Präsentation geschlossen werden.
          </p>

          <h3>1. Geltungsbereich</h3>
          <p>
            Diese AGB gelten für alle Projekte und Dienstleistungsverträge zwischen
            iNOTEC-Engineering und Kunden, sofern nicht schriftlich abweichend vereinbart.
            Massgeblich ist das Schweizer Recht (OR/ZGB).
          </p>

          <h3>2. Portfolio & Urheberrecht</h3>
          <p>
            Alle auf dieser Website gezeigten Projekte, Konstruktionen, FEM-Analysen,
            3D-Modelle und Visualisierungen sind geistiges Eigentum von iNOTEC-Engineering
            oder wurden mit ausdrücklicher Genehmigung der jeweiligen Auftraggeber
            veröffentlicht. Jede Vervielfältigung oder Nutzung ohne schriftliche
            Genehmigung ist untersagt.
          </p>

          <h3>3. Vertraulichkeit</h3>
          <p>
            iNOTEC-Engineering behandelt alle projektbezogenen Informationen,
            technischen Unterlagen und Kundendaten vertraulich. Details zu
            laufenden Projekten werden nur mit ausdrücklicher Zustimmung
            des Auftraggebers veröffentlicht.
          </p>

          <h3>4. Angebote & Auftragserteilung</h3>
          <p>
            Angebote von iNOTEC-Engineering sind unverbindlich und freibleibend,
            sofern nicht ausdrücklich als verbindlich bezeichnet. Ein Vertrag
            kommt erst durch schriftliche Auftragsbestätigung zustande.
          </p>

          <h3>5. Leistungsumfang</h3>
          <p>
            Der genaue Leistungsumfang wird im jeweiligen Projektvertrag
            festgelegt. Änderungen oder Erweiterungen des Leistungsumfangs
            bedürfen der schriftlichen Vereinbarung und werden gesondert vergütet.
          </p>

          <h3>6. Haftungsbeschränkung</h3>
          <p>
            iNOTEC-Engineering haftet nur für grobe Fahrlässigkeit und Vorsatz.
            Die Haftung für leichte Fahrlässigkeit ist im gesetzlich zulässigen
            Rahmen ausgeschlossen. Für die Vollständigkeit und Aktualität der
            Portfolio-Inhalte wird keine Gewähr übernommen.
          </p>

          <h3>7. Gerichtsstand</h3>
          <p>
            Gerichtsstand ist Sevelen, Kanton St. Gallen, Schweiz.
            Es gilt ausschliesslich Schweizer Recht.
          </p>

          <p className="legal-date">Stand: Januar 2026</p>
        </Modal>
      )}
    </>
  )
}
