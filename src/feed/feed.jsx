import React, { useEffect } from 'react';
import './feed.css';
import { useSearchParams } from "react-router-dom"
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

  const [searchParams] = useSearchParams()
  const hasCharacterInURL = searchParams.has("character")
  const [posts, setPosts] = React.useState(initialPosts);
  const [postText, setPostText] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [filteredCharacters, setFilteredCharacters] = React.useState([]);
  const [selectedCharacter, setSelectedCharacter] = React.useState("");
  const [selectedMove, setSelectedMove] = React.useState("");
  const [activeTag, setActiveTag] = React.useState({ postId: null, tag: null });

  const actionTags = [
    "bair",
    "nair",
    "uair",
    "dair",
    "fair",
    "nb",
    "sb",
    "ub",
    "db",
    "jab",
    "fsmash",
    "usmash",
    "dsmash",
    "ftilt",
    "utilt",
    "dtilt",
  ];

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
    dashattack: "Dash Attack",
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPostText(value);

    const match = value.match(/\[([^\]]*)$/);
    if (match) {
      const query = match[1].toLowerCase();

      const characterMatches = Object.values(characters)
        .filter((c) => c.display_name.toLowerCase().startsWith(query))
        .map((c) => c.display_name);

      const moveMatches = [
        ...actionTags.filter((m) => m.toLowerCase().startsWith(query)),
        ...Object.entries(tagAliases)
          .filter(([key, alias]) => alias.toLowerCase().startsWith(query))
          .map(([key, alias]) => alias),
      ];

      const combinedMatches = Array.from(new Set([...characterMatches, ...moveMatches]));

      setFilteredCharacters(combinedMatches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };


  const handleSelect = (tag) => {
    const newText = postText.replace(/\[([^\]]*)$/, `[${tag}]`);
    setPostText(newText);
    setShowSuggestions(false);
  };

  const normalizeTag = (raw, currentCharacter = null) => {
    const key = raw.toLowerCase().trim();

    if (tagAliases[key]) {
      const moveName = tagAliases[key];
      return currentCharacter ? `${moveName} (${currentCharacter})` : moveName;
    }

    const matchedCharacter = Object.values(characters).find(
      (c) => c.display_name.toLowerCase() === key
    );
    if (matchedCharacter) {
      return matchedCharacter.display_name;
    }

    return raw.charAt(0).toUpperCase() + raw.slice(1).trim();
  };


  const handlePost = () => {
    if (!postText.trim()) return;

    const tagMatches = [...postText.matchAll(/\[([^\]]+)\]/g)];
    const parsedTags = [];

    let currentCharacter = null;

    for (const match of tagMatches) {
      const raw = match[1].trim();
      const key = raw.toLowerCase();

      const matchedCharacter = Object.values(characters).find(
        (c) => c.display_name.toLowerCase() === key
      );

      if (matchedCharacter) {
        currentCharacter = matchedCharacter.display_name;
        parsedTags.push(currentCharacter);
        continue;
      }

      if (tagAliases[key]) {
        const display = tagAliases[key];
        if (currentCharacter) {
          parsedTags.push(`${currentCharacter} ${display}`);
        } else {
          parsedTags.push(display);
        }
        continue;
      }

      parsedTags.push(raw);
    }

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
    let currentCharacter = null;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }

      const rawTag = match[1].trim().toLowerCase();

      const matchedCharacter = Object.values(characters).find(
        (c) => c.display_name.toLowerCase() === rawTag
      );
      if (matchedCharacter) {
        currentCharacter = matchedCharacter.display_name;
      }

      const normalized = normalizeTag(rawTag, currentCharacter);

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
      ? post.tags.some(tag => tag.toLowerCase().includes(selectedCharacter.toLowerCase()))
      : true;

    const matchesMove = selectedMove
      ? post.tags.some(tag => tag.toLowerCase().includes(selectedMove.toLowerCase()))
      : true;

    return matchesCharacter && matchesMove;
  });

  const allCharacters = Object.values(characters);

  useEffect(() => {
    const char = searchParams.get("character")
    console.log("URL CHAR PARAM =", char)

    if (char) {
      const formatted =
        char.charAt(0).toUpperCase() + char.slice(1).toLowerCase()
      setSelectedCharacter(char)
    }
  }, [searchParams, setSelectedCharacter])

  const [amiiboImg, setAmiiboImg] = React.useState("");

  useEffect(() => {
    if (!selectedCharacter) return;

    async function loadAmiibo() {
      try {
        const amiiboUrl = 'https://www.amiiboapi.com/api/amiibo/'
        const charKey = selectedCharacter.toLowerCase();
        const amiiboName = characters[charKey].amiibo_name;
        console.log(charKey)
        const response = await fetch(`${amiiboUrl}?character=${amiiboName}`);
        const data = await response.json();
        console.log("amiibo:", data);
        const amiibos = data.amiibo
        const n = Math.floor(Math.random() * amiibos.length);
        const selectedAmiibo = amiibos[n]
        console.log(selectedAmiibo)
        setAmiiboImg(selectedAmiibo.image)
      } catch (err) {
        console.error("Failed to fetch amiibo data:", err);
      }
    }

    loadAmiibo();
  }, [selectedCharacter]);

  return (
    <main>
      {hasCharacterInURL && (
        <div className="character-div">
          <h1>
            {characters[selectedCharacter.toLowerCase()]?.display_name}
          </h1>
          <img src={amiiboImg} alt={selectedCharacter} />
        </div>
      )}

      {!hasCharacterInURL && (
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
      )}

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
                    <p>Startup: { }</p>
                    <p>On Shield: { }</p>
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
