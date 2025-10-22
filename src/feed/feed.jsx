import React from 'react';
import './feed.css';
import { characters } from '../characters/characterList.jsx';

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
      username: "Clay", // make this dynamic later
      content: postText.trim(),
      timestamp: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setShowSuggestions(false);
  };

  function parsePostContent(content) {
      const parts = [];
      const regex = /\[([^\]]+)\]/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.slice(lastIndex, match.index));
        }

        const charName = match[1];
        parts.push(
          <a
            key={match.index}
            href={`/characters/${charName}`}
            className="character-link"
          >
            {charName}
          </a>
        );

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < content.length) {
        parts.push(content.slice(lastIndex));
      }

      return parts;
    }


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
                <p>{parsePostContent(post.content)}</p>
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
