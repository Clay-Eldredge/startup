# Smash Talk

[My Notes](notes.md)

Smash Talk is a companion tool for competitive players of Super Smash Bros. Ultimate. The primary feature will be note taking. Users can select a character to take notes on. To be better from just a normal note taking app, Smash Talk will allow users to add tags to their notes for organization and shareability. Users can search through all the notes for a specific character matchup that have been made public by other users. 


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Smash players are some of the most dedicated competitive gamers out there. There is so much to learn about in the game, and players are always trying to keep track of their recently gained experience. SmashTalk will allow these players to take, post, and view notes made by others. Notes can be organized by character and move, making it easy for users to find exactly what they need. On top of that, community building features like sharing your main character, tournament results, and socials for potential requests to practice will have smash players always using SmashTalk as their smash note keeping companion.

### Design

![Design image](design.png)

The core design includes the note feed, a display showing which character page you are viewing, and text for each note (text content, upvotes, downvotes, poster, date and time).

![Design image2](design2.png)

This would be a profile page, which shows a few pieces of information (main character, discord link, win rate, and desired practice) and their recent posts.

### Key features

* posting notes that are organized by character
* logging in with a start.gg account (tournament website that keeps tournament data) to be able to see your performance against different characters
* upvoting / downvoting notes, so only the most relevant and community approved notes are shown first
* sharing your current online score (smash uses a score rather than ranking for online, so comparing scores is helpful for seeing how you place amongst all players)

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - The structure of my website. Text, images, buttons. Necessary for all pages (profile, character feeds).
- **CSS** - The styling of my website. I don't think I'll have any animations, just static styling. I need it to look professional so people will actually use it, since my website requires a userbase to be functional. I'll probably have to seed it with notes anyways.
- **React** - Dynamic front end stuff. This will handle stuff like the note feed on each character page. Also will be necessary for sorting and searching features.
- **Service** - I'll use the discord api do users can connect their discord account to their smash talk account. This will allow users to make it public, allowing message requests for practicing the character matchup. I might use the start.gg api if I have time, to add the ability to pull tournament results. I will use the data from the tournament results to display recent success with that character on the character page. 
- **DB/Login** - I'll have a database for storing the notes that are posted, and for storing account information. 
- **WebSocket** - I'll make the note feed (comments, upvotes, downvotes) update through a websocket, so you can see it update live.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - index, feed, profile, character list pages are all structured
- [x] **Proper HTML element usage** - I used a header with a nav for my links between pages. I used a footer for my github link and name. I used body correctly. Same with main.
- [x] **Links** - My header contains links to all the pages.
- [x] **Text** - There isn't much text in my app yet, other than instructions. Most is user generated. Text can be found on the feed page.
- [x] **3rd party API placeholder** - The API will be on the feed page, where it displays the tournament data for that character.
- [x] **Images** - There's an image in the header, and images on the feed and profile pages.
- [x] **Login placeholder** - It can be found on the index page. The username will be displayed as the link to the profile page in the header.
- [x] **DB data placeholder** - Database data will be shown in the feed (Post Contents). Posts made by users are saved and displayed.
- [x] **WebSocket placeholder** - The posts on the feed have like buttons and like counters. These will update in real time using a websocket.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - Header and footer have colored text, special font, and flex displays.
- [x] **Navigation elements** - The navs in the header are flexible, and styled to sit on the right side of the header unless the screen is too narrow. They are then centered and placed in a column.
- [x] **Responsive to window resizing** - The header is responsive to window resizing by changing to a column of links when the screen is narrow, and the footer doubles in padding.
- [x] **Application elements** - The like buttons on the feed use bootstrap primary button styling (except they're red!). The feed is centered. 
- [x] **Application text content** - The font family is changed for all text. Application text (like posts) will be loaded into the feed list items (which are already centered)
- [x] **Application images** - Character img at top of feed will resize for small screens. Image is centered.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.
(I forgot to update my readme last night, hope that's okay)
- [x] **Bundled using Vite** - It is bundled using vite
- [x] **Components** - All my components are now shown on a single page using React.
- [x] **Router** - I replaced the multiple html pages with the react browser router.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I mocked out posting and implemented functionality for filtering posts on the feed page. There's also the entire tags system, where if you start to type the name of a character it will give auto complete suggestions that you can click on. You start a tag with the '[' character.
- [x] **Hooks** - I used a bunch of useState hooks in my feed.jsx to control pop ups when hovering over tags in posts. If you want to test, go to the feed page and then hover or click on any of the red words like 'Mario'. This will bring up a placeholder pop up that will contain data from an API if I can figure it out or just manually port over to my own database.  I also used useEffect for mock username functionality. It will autoset username to test_user and then show that in place of the profile text in the nav bar.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Yes, I use express and node.js to run my backend
- [x] **Static middleware for frontend** - Yes, I did this...
- [x] **Calls to third party endpoints** - My feed page will now display a random amiibo for the selected character, but only if chosen through the character page. If you click search, it will be replaced with a filter drop down menu. I had to decide not to go with the tournament data api because it wasn't as easily available as I thought. You have to query by tournament. You can't even query by player, so I couldn't do anything like show the stats of the best player of each character or anything. Had to settle for this. Maybe in the future I'll do tournament results once we have mongo DB set up and I can pull tournament data and then run through it with my own code.
- [x] **Backend service endpoints** - I created endpoints for getting and making posts.
- [x] **Frontend calls service endpoints** - The frontend calls the backend to make and get posts.
- [x] **Supports registration, login, logout, and restricted endpoint** - Yup, it absolutely does. I still need to route my pages better though, so when you click on the main logo it does something other than go back to the login page.

The only thing I still need to do is make the profile page functionality, but it's just extra at this point. 


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
