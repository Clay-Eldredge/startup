import React from 'react';
import './feed.css';

export function Feed() {
  const initialPosts = [
    {
      id: 1,
      username: "Clay",
      content: "I hate playing against [Bayonetta]",
      timestamp: "2025-10-06 09:30 AM",
    },
    {
      id: 2,
      username: "Clay's Mom",
      content: "Clay, get off your phone.",
      timestamp: "2025-10-06 09:31 AM",
    },
  ];

  const characters = [
    "Mario", "Donkey Kong", "Link", "Samus", "Dark Samus", "Yoshi", "Kirby", "Fox", "Pikachu",
    "Luigi", "Ness", "Captain Falcon", "Jigglypuff", "Peach", "Daisy", "Bowser", "Ice Climbers",
    "Sheik", "Zelda", "Dr. Mario", "Pichu", "Falco", "Marth", "Lucina", "Young Link", "Ganondorf",
    "Mewtwo", "Roy", "Chrom", "Mr. Game & Watch", "Meta Knight", "Pit", "Dark Pit", "Zero Suit Samus",
    "Wario", "Snake", "Ike", "Pokémon Trainer", "Squirtle", "Ivysaur", "Charizard", "Diddy Kong",
    "Lucas", "Sonic", "King Dedede", "Olimar", "Lucario", "R.O.B.", "Toon Link", "Wolf", "Villager",
    "Mega Man", "Wii Fit Trainer", "Rosalina & Luma", "Little Mac", "Greninja", "Mii Brawler",
    "Mii Swordfighter", "Mii Gunner", "Palutena", "Pac-Man", "Robin", "Shulk", "Bowser Jr.",
    "Duck Hunt", "Ryu", "Ken", "Cloud", "Corrin", "Bayonetta", "Inkling", "Ridley", "Simon", "Richter",
    "King K. Rool", "Isabelle", "Incineroar", "Piranha Plant", "Joker", "Hero", "Banjo & Kazooie",
    "Terry", "Byleth", "Min Min", "Steve", "Sephiroth", "Pyra", "Mythra", "Kazuya", "Sora"
  ];

  const [posts, setPosts] = React.useState(initialPosts);
  const [postText, setPostText] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [filteredCharacters, setFilteredCharacters] = React.useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPostText(value);

    const match = value.match(/\[([^\]]*)$/);
    if (match) {
      const query = match[1].toLowerCase();
      const matches = characters.filter((c) =>
        c.toLowerCase().startsWith(query)
      );
      setFilteredCharacters(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (character) => {
    const newText = postText.replace(/\[([^\]]*)$/, `[${character}]`);
    setPostText(newText);
    setShowSuggestions(false);
  };

  const handlePost = () => {
    if (!postText.trim()) return;

    const newPost = {
      id: posts.length + 1,
      username: "Clay", // you can make this dynamic later
      content: postText.trim(),
      timestamp: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]); // new post at top
    setPostText("");
    setShowSuggestions(false);
  };

  return (
    <main>
      <div className="character-div">
        <img src="/Mario.png" alt="Mario" />
        <p>
          THIS IS WHERE THE TOURNAMENT DATA WILL BE DISPLAYED FOR THIS CHARACTER USING AN API
        </p>
      </div>

      <div className="create-post-div">
          <p>
            Post a note with tips for the Mario matchup! Type '[' to add one or
            more tags. (Example: '[Pikachu][Bair]')
          </p>
            
          <div className="input-wrapper">
            <textarea
              value={postText}
              onChange={handleInputChange}
              placeholder="Create a post..."
              rows={4} // taller input
            />
            {showSuggestions && (
              <div className="autocomplete-box">
                {filteredCharacters.length > 0 ? (
                  filteredCharacters.map((c) => (
                    <div
                      key={c}
                      className="suggestion-item"
                      onClick={() => handleSelect(c)}
                    >
                      {c}
                    </div>
                  ))
                ) : (
                  <div className="no-results">No matches found</div>
                )}
              </div>
            )}
          </div>
        
          <div className="post-btn-wrapper">
            <button className="btn btn-primary post-btn" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>


      <div className="feed-div">
        <ul className="feed-ul">
          {posts.map((post) => (
            <li key={post.id} className="post">
              <div className="post-user-div">
                <p>{post.username}</p>
              </div>
              <div className="post-contents-div">
                <p>{post.content}</p>
              </div>
              <div className="post-footer-div">
                <button className="btn btn-primary">LIKE</button>
                <span>0 Likes</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
