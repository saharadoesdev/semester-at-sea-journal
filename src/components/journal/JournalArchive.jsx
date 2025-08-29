"use client";
import JournalCard from './JournalCard';
// import styles from "@/app/page.module.css";

const JournalArchive = (props) => {
  const posts = props.posts || [];
  // const [searchQuery, setSearchQuery] = useState('')
  // const [sortBy, setSortBy] = useState('newest') // 'newest' or 'upvotes'
  // const [flagFilter, setFlagFilter] = useState('');

  // const filteredPosts = posts.filter((post) => {
  //     const titleMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     const flagMatch = flagFilter ? post.flag === flagFilter : true;
  //     return titleMatch && flagMatch;
  // })

  // const sortedPosts = [...filteredPosts].sort((a, b) => {
  //     if (sortBy === 'newest') {
  //         return new Date(b.created_at) - new Date(a.created_at);
  //     } else if (sortBy === 'upvotes') {
  //         return b.upvoteCount - a.upvoteCount;
  //     }
  //     return 0;
  // });

  return (
    <>
      {/* <div className="filters">
            <input
                id="search"
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="upvotes">Popular</option>
            </select>
            <select value={flagFilter} onChange={e => setFlagFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Question">Question</option>
                <option value="Opinion">Opinion</option>
                <option value="Discussion">Discussion</option>
                <option value="Advice">Advice</option>
            </select>
        </div> */}

      {/* <div className={styles.JournalCards}> */}
      <div>
        {posts && posts.length > 0 ? (
          [...posts]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))    // display newest first
            .map((post, index) => (
              <JournalCard
                key={post.id}
                entry={post}
                // id={post.id}
                // title={post.title}
                // content={post.content}
                // date={post.display_date}
                // image={post.image_urls[0]}
                // slug={post.slug}
              />
            ))
        ) : (
          <h2>{"Looks like the journal entries got lost at sea! 🌊"}</h2>
        )}
      </div>
    </>
  );
};

export default JournalArchive;
