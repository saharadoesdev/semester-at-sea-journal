import Link from 'next/link';

export default function TimelineCard({ city, country, dates, status, countrySlug }) {
  const statusClass = `status-${status.toLowerCase()}`;

  return (
    <div className={`timeline-card ${statusClass}`}>
      <div className="card-info">
        <h3>{country} ({city})</h3>
        <p>{dates}</p>
        <p className="status-badge">{status}</p>
      </div>
      <div className="card-link">
        <Link href={`/country/${countrySlug}`}>
          View Country Page &rarr;
        </Link>
      </div>
    </div>
  );
}