"use client";
// import styles from "@/app/page.module.css";
import JournalArchive from "@/components/journal/JournalArchive";
import PhotoGallery from "@/components/country/PhotoGallery";

export default function CountryPageDisplay({ country, posts, isUnlocked, photos }) {

  let fastFacts = country.fast_facts;
  if (typeof fastFacts === "string") {
    try {
      fastFacts = JSON.parse(fastFacts);
    } catch {
      fastFacts = {};
    }
  }

  if (isUnlocked) {
    return <UnlockedView country={country} posts={posts} photos={photos} />;
  } else {
    return <LockedView country={country} />;
  }

  // return (
  //   <div className={styles.page} style={{ paddingTop: "1000px" }}>
  //     <div>
  //       <h1>
  //         {country.flag_emoji} {country.name}
  //       </h1>
  //       <img
  //       src={country.stock_photo_url}
  //       alt={`Stock of ${country.name}`}
  //       style={{ width: "100%", maxWidth: 500, borderRadius: 12, marginBottom: 24 }}
  //     />
  //     </div>
  //     <div>
  //       {/* <h2>Fast Facts</h2> */}
  //       {/* <ul> */}
  //         {fastFacts &&
  //           Object.entries(fastFacts).map(([key, value]) => (
  //             <li key={key}>
  //               <strong>{key}:</strong> {value}
  //             </li>
  //           ))}
  //       {/* </ul> */}
  //     </div>
  //     <div>
  //       <h2>Journal Posts</h2>
  //       <JournalArchive posts={posts || []} />
  //       {/* {posts && posts.length > 0 ? (
  //         <ul>
  //           {posts.map((post) => (
  //             <li key={post.id}>
  //               <a href={`/journal/${post.slug}`}>{post.title}</a>
  //               {post.display_date && (
  //                 <span style={{ marginLeft: 8, color: "#888" }}>
  //                   ({new Date(post.display_date).toLocaleDateString()})
  //                 </span>
  //               )}
  //             </li>
  //           ))}
  //         </ul>
  //       ) : (
  //         <p>No posts for this country yet.</p>
  //       )} */}
  //     </div>
  //   </div>
  // );
}


function UnlockedView({ country, posts, photos }) {
  // Prepare the data for the photo gallery
  const allImages = posts.flatMap(post => post.image_urls);

  return (
    // <div className={styles.page} style={{ paddingTop: "1000px" }}>
    <div>
      {/* 1. The Banner */}
      <header className="country-banner" style={{ backgroundImage: `url(${country.my_photo_url || country.stock_photo_url})` }}>
        <h1>{country.name} {country.flag_emoji}</h1>
      </header>

      {/* 2. Your Post-Visit Summary */}
      <section className="summary-section">
        <p>{country.post_visit_summary || "Welcome! Here are my stories from this country."}</p>
      </section>

      {/* 3. The Journal Entries */}
      {/* <section className="journal-section" style={{ paddingTop: "1000px" }}> */}
      <section className="journal-section">
        <h2>Journal Entries from {country.name}</h2>
        {/* <div className="journal-grid"> */}
          {/* {posts && posts.length > 0 ? ( */}
            {/* // posts.map(post => <JournalCard key={post.id} entry={post} />) */}
            <JournalArchive posts={posts || []} />
          {/* ) : ( */}
            {/* <p>No journal entries posted yet.</p> */}
          {/* )} */}
        {/* </div> */}
      </section>

      {/* 4. The Photo Gallery */}
      <section className="gallery-section">
        <h2>Photo Gallery</h2>
        <PhotoGallery images={photos} />
      </section>

      {/* 5. The "Mission Accomplished" Section */}
      <section className="mission-section">
        <h3>Mission Accomplished!</h3>
        <p>{country.mission_results_text || "Results from the pre-visit poll will be here!"}</p>
      </section>
    </div>
  );
}


// This component renders the simple, teaser view for a future country
function LockedView({ country }) {
  // Logic to calculate the countdown would go here
  // For now, we'll just show a placeholder.
  const countdown = "Unlocks Soon!";

  return (
    // <div className={styles.page} style={{paddingTop: "500px"}}>
    <div>
      {/* 1. The Banner */}
      <header className="country-banner" style={{ backgroundImage: `url(${country.stock_photo_url})` }}>
        <h1>{country.name} {country.flag_emoji}</h1>
        <div className="countdown-timer">{countdown}</div>
      </header>
      
      {/* 2. Fast Facts Section */}
      <section className="fast-facts-section">
        <h3>Fast Facts</h3>
        <ul>
          {country.fast_facts && Object.entries(country.fast_facts).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </section>

      {/* 3. The Interactive Poll */}
      <section className="poll-section">
        <h3>Help Me Explore!</h3>
        <p>{country.mission_prompt}</p>
        {/* You would place your <Poll /> component here */}
        <div className="poll-placeholder">[Interactive Poll Goes Here]</div>
      </section>
    </div>
  );
}