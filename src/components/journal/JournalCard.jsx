import Link from "next/link";
import Image from "next/image";
import styles from "./JournalCard.module.css";

const JournalCard = ({ entry }) => {
  if (!entry) return null;

  const previewText = entry.content
    ? entry.content.substring(0, 120) + "..."
    : "Click to read more.";

  const formattedDate = entry.display_date
    ? new Date(entry.display_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  return (
    <article className={styles.card}>
      <Link href={`/journal/${entry.slug || ""}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <Image 
            src={entry.image_urls[0] || "/ship-icon.svg"}   // use ship icon as placeholder image (for now?)
            alt={entry.title || "Journal entry image"}
            fill // The 'fill' prop makes the image fill its container
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.contentWrapper}>
          <time dateTime={entry.date}>{formattedDate}</time>
          <h2>{entry.title || "Placeholder Title"}</h2>
          {/* You can add tags here later if you want */}
          <p className={styles.previewText}>{previewText}</p>
          <span className={styles.readMore}>Read More &rarr;</span>
        </div>
      </Link>
    </article>
  );
};

export default JournalCard;
