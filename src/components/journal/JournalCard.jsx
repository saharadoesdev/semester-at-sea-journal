// import React from "react";
import Link from 'next/link';
import styles from './JournalCard.module.css';

const JournalCard = (entry) => {
    // const previewText = entry.content.substring(0, 200) + '...';

    // return (
    //     <div className="JournalCard">
    //         <Link href="/journal/1">
    //             <img src={entry.images[0]} alt={entry.title} />
    //             <h5>{entry.title}</h5>
    //             <p>{entry.date}</p>
    //             <h6>{previewText}</h6>
    //             <p>Read more...</p>
    //         </Link>

    //         {/* <Link href="/journal/1">Read more...</Link> */}

    //         {/* <img src={props.image} alt={props.name} />
    //         <h5>{props.name}</h5>
    //         <h6>{props.type}</h6>
    //         <a href={`https://www.instagram.com/${props.insta}`} target="_blank" rel="noopener noreferrer">
    //             <button>Follow</button>
    //         </a> */}
    //     </div>
    // )

    return (
        <div className={styles.JournalCard}>
            <Link href={`/journal/${entry.slug || ""}`}>
                <img src={entry.image || "/next.svg"} alt="Placeholder Title" />
                <h5>{entry.title || "Placeholder Title"}</h5>
                <p>{entry.date || "2024-01-01"}</p>
                <h6>{entry.content || "This is a preview of the journal entry. More content will be available soon..."}</h6>
                <p>Read more...</p>
            </Link>
        </div>
    )
}

export default JournalCard;