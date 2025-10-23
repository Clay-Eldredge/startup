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
      tags: ["Bayonetta"],
    },
    {
      id: 2,
      username: "Clay's Mom",
      content: "Clay, get off your phone.",
      timestamp: "2025-10-06 09:31 AM",
      tags: [],
    },
    {
      id: 3,
      username: "Clay",
      content: "[Mario] can use [uair] to combo off the top blast zone.",
      timestamp: "2025-10-06 09:31 AM",
      tags: ["Mario", "Up Air"],
    },
    {
      id: 4,
      username: "Clay",
      content: "[Mario] is at least a top 10 character.",
      timestamp: "2025-10-06 09:31 AM",
      tags: ["Mario"],
    },
  ];

  const [posts, setPosts] = React.useState(initialPosts);
  const [postText, setPostText] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [filteredCharacters, setFilteredCharacters] = React.useState([]);
  const [selectedCharacter, setSelectedCharacter] = React.useState("");
  const [selectedMove, setSelectedMove] = React.useState("");
  const [activeTag, setActiveTag] = React.useState({ postId: null, tag: null });

  // 🎯 Action tag list (move names)
  const actionTags = [
    "Back Air",
    "Neutral Air",
    "Up Air",
    "Down Air",
    "Forward Air",
    "Neutral Special",
    "Side Special",
    "Up Special",
    "Down Special",
    "Grab",
    "Dash Attack",
    "Forward Smash",
    "Up Smash",
    "Down Smash",
  ];

  // 🔤 Aliases / shorthand normalization
  const tagAliases = {
    bair: "Back Air",
    nair: "Neutral Air",
    uair: "Up Air",
    dair: "Down Air",
    fair: "Forward Air",
    usmash: "Up Smash",
    dsmash: "Down Smash",
    fsmash: "Forward Smash",
    nb: "Neutral Special",
    sb: "Side Special",
    ub: "Up Special",
    db: "Down Special",
    grab: "Grab",
    dash: "Dash Attack",
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPostText(value);

    const match = value.match(/\[([^\]]*)$/);
    if (match) {
      const query = match[1].toLowerCase();
      const matches = Object.values(characters)
        .filter((c) => c.display_name.toLowerCase().startsWith(query))
        .map((c) => c.display_name);
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

  const normalizeTag = (raw) => {
    const key = raw.toLowerCase().trim();
    return tagAliases[key] || raw.trim();
  };

  const handlePost = () => {
    if (!postText.trim()) return;

    const tagMatches = [...postText.matchAll(/\[([^\]]+)\]/g)];
    const parsedTags = tagMatches.map(match => normalizeTag(match[1]));

    const newPost = {
      id: posts.length + 1,
      username: "Clay",
      content: postText.trim(),
      timestamp: new Date().toLocaleString(),
      tags: parsedTags,
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setShowSuggestions(false);
  };

  function parsePostContent(content, postId) {
    const parts = [];
    const regex = /\[([^\]]+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }

      const normalized = normalizeTag(match[1]);

      parts.push(
        <span
          key={match.index}
          className="tag-span"
          onMouseEnter={() => setActiveTag({ postId, tag: normalized })}
        >
          {normalized}
        </span>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  }

  const visiblePosts = posts.filter(post => {
    const matchesCharacter = selectedCharacter
      ? post.tags.includes(selectedCharacter)
      : true;

    const matchesMove = selectedMove
      ? post.tags.includes(selectedMove)
      : true;

    return matchesCharacter && matchesMove;
  });

  const allCharacters = Object.values(characters);

  return (
    <main>
      <div className="character-div">
        <img src="/Mario.png" alt="Mario" />
        <p>
          THIS IS WHERE THE TOURNAMENT DATA WILL BE DISPLAYED FOR THIS CHARACTER USING AN API
        </p>
      </div>

      <div className="filter-bar">
        <label htmlFor="characterFilter">Character:</label>
        <select
          id="characterFilter"
          value={selectedCharacter}
          onChange={(e) => setSelectedCharacter(e.target.value)}
        >
          <option value="">All</option>
          {allCharacters.map((char) => (
            <option key={char.display_name} value={char.display_name}>
              {char.display_name}
            </option>
          ))}
        </select>

        <label htmlFor="moveFilter" style={{ marginLeft: "1rem" }}>
          Move:
        </label>
        <select
          id="moveFilter"
          value={selectedMove}
          onChange={(e) => setSelectedMove(e.target.value)}
        >
          <option value="">All</option>
          {actionTags.map((move) => (
            <option key={move} value={move}>
              {move}
            </option>
          ))}
        </select>
      </div>

      <div className="create-post-div">
        <p>
          Post a note with tips for the Mario matchup! Type '[' to add tags.
          Example: '[Mario][Bair]'
        </p>
        <div className="input-wrapper">
          <textarea
            value={postText}
            onChange={handleInputChange}
            placeholder="Create a post..."
            rows={4}
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
          {visiblePosts.map((post) => (
            <li
              key={post.id}
              className="post"
              onMouseLeave={() => setActiveTag({ postId: null, tag: null })}
            >
              <div className="post-user-div">
                <p>{post.username}</p>
              </div>
              <div className="post-contents-div">
                <p>{parsePostContent(post.content, post.id)}</p>

                {activeTag.postId === post.id && activeTag.tag && (
                  <div
                    className="tag-card"
                    style={{
                      opacity: 1,
                      transform: 'translateY(0)',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                      pointerEvents: 'none',
                    }}
                  >
                    <h4>{activeTag.tag}</h4>
                    <p>Some stats or description here</p>
                  </div>
                )}
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
