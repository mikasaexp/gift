OUR LITTLE ERA — SETUP GUIDE (phone-friendly)
================================================

WHAT CHANGED IN THIS ROUND
- Fixed the invisible "our little era" title — it now has a solid fallback
  color so it can never render blank again.
- Removed the leftover dev-notes that were showing up on the live page
  (the "drop photos in assets/" text etc.) — those were never meant to be
  visible to Ramya, my mistake.
- Gallery photos are now single-column and much bigger on phone screens,
  plus you can tap any photo to view it full-size.
- Added a few hand-drawn doodle accents (heart, stars, a squiggle
  underline) that draw themselves in as you scroll.
- Turned off the accidental "select text / copy" popup everywhere except
  the final letter, which stays copyable on purpose.
- Your actual final message is now in the "final_message.txt" section,
  in your own words, arranged in reading order.
- File names are back to plain style.css / script.js to match what's
  already in your repo — no more renaming needed.

FILES IN THIS FOLDER
- index.html   → the page structure/content
- style.css    → all the visual styling
- script.js    → all the animations/interactions
- assets/      → photos, artwork, video go here

HOW TO UPLOAD TO GITHUB (replacing your old files)
1. Open your repository on GitHub (in your phone browser or the GitHub app).
2. For each file (index.html, style.css, script.js) — tap the file, tap
   the pencil/edit icon, select all the existing text, delete it, and
   paste in the new version I gave you. Commit each change.
3. Double check index.html's <link> and <script> tags say exactly
   "style.css" and "script.js" — no "-bday" anywhere. That mismatch was
   what broke the site last time.
4. For the assets folder — tap "Add file" → "Upload files" inside the
   assets/ folder (create the folder first if it asks) and upload the
   photos. Keep the exact filenames shown below or the gallery won't find
   them:
     vcmp-dream.jpg
     stranger-things-1.jpg
     stranger-things-2.jpg
     valorant-lobby.jpg
     bestfriends-1.jpg
     bestfriends-2.jpg
     bestfriends-3.jpg
     pls-huny.jpg
     artwork.png          (your drawing, once it's done)
     birthday-video.mp4   (your video, once it's done)
5. GitHub Pages will rebuild automatically after each commit — refresh the
   live site in a minute or two to see changes.

ABOUT THE MUSIC
Brooklyn Baby and Reflections are embedded as real, official Spotify
players — tapping play inside either card plays the actual song. I didn't
upload the raw song files myself: hosting someone else's copyrighted song
as an mp3 file on a public website isn't something I'll do, even privately
for a friend, and browsers also block audio from auto-playing with sound
before someone interacts with the page anyway. The Spotify embed is the
closest thing to "it just plays" that's both real and safe to host —
Ramya taps once and hears the actual track while scrolling.
If you'd rather it feel even more "background music"-like, you could also
just tell him to hit play on the first song before he starts reading — I
can help with wording for that if you want.

STILL TO DO
- Add your drawing as assets/artwork.png (once it's done).
- Add your video as assets/birthday-video.mp4 (once it's done).
- Your photos are already wired in from last time — just make sure the
  assets/ folder actually made it into the repo (check the file list).

Everything is still phone-editable — no build tools, no installs, just
edit-and-commit on GitHub like before.
