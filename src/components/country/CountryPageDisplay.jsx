"use client";
import styles from "@/app/page.module.css";
import JournalArchive from "@/components/journal/JournalArchive";

export default function CountryPageDisplay({ country, posts, isUnlocked }) {

  let fastFacts = country.fast_facts;
  if (typeof fastFacts === "string") {
    try {
      fastFacts = JSON.parse(fastFacts);
    } catch {
      fastFacts = {};
    }
  }

  return (
    <div className={styles.page} style={{ paddingTop: "1000px" }}>
      <div>
        <h1>
          {country.flag_emoji} {country.name}
        </h1>
        <img
        src={country.stock_photo_url}
        alt={`Stock of ${country.name}`}
        style={{ width: "100%", maxWidth: 500, borderRadius: 12, marginBottom: 24 }}
      />
      </div>
      <div>
        {/* <h2>Fast Facts</h2> */}
        {/* <ul> */}
          {fastFacts &&
            Object.entries(fastFacts).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
        {/* </ul> */}
      </div>
      <div>
        <h2>Journal Posts</h2>
        <JournalArchive posts={posts || []} />
        {/* {posts && posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <a href={`/journal/${post.slug}`}>{post.title}</a>
                {post.display_date && (
                  <span style={{ marginLeft: 8, color: "#888" }}>
                    ({new Date(post.display_date).toLocaleDateString()})
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts for this country yet.</p>
        )} */}
      </div>
    </div>
  );
}
