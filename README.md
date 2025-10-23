# YOUTUBE PLAYLIST FIX 
[Chrome Extension]
<br>
<br>
**About:**<br>
<br>
Allows you to save to multiple playlists on youtube without closing the window after the first click
<br>
<br>
<br>
<br>
**Changes Compared to Original:**<br>
<br>
- The original repository provided the extension as a 7z archive file. This fork extracts the source files for easier access and modification.<br>
- Added individual files: manifest.json, content.js, icon16.png, icon48.png, icon128.png.<br>
- Removed: youtube-playlist-fix v2.7z<br>
- Users can now directly load the extension from the source files without extracting the archive.<br>
**To Install:**<br>
<br>
Download the zip file (the "Source Code (zip)" file at the bottom of the Releases page, under "Assets")<br>
Extract it to a folder on your computer (you'll have to extract the first folder, then extract the zip inside of that. the folder within the second zip gives you the extension folder to load)<br>
Open Chrome and go to chrome://extensions/<br>
Enable "Developer mode" (toggle in top-right)<br>
Click "Load unpacked"<br>
Select the extracted folder<br>
Go to YouTube and test<br>
<br>
<br>
**To Use:**<br>
<br>
-open youtube video page<br>
-click 3 dots under video > click "SAVE"<br>
-select the playlist you want to save or remove from by clicking each playlist<br>
(you can do multiple at a time, but you can only "save to" or "remove from" playlists that had previously had the opposite state. since the state of each playlist does not refresh in realtime, if you want to add or remove from a playlist that you just removed or added to, you must close [ESC key] and re-open the SAVE playlist window)<br>
-to CLOSE WINDOW, press ESC key. clicking off the window does not currently work to close the playlist save window<br>
<br>
<br>
**Issues/To Fix:**<br>
<br>
-bookmark icons do not refresh (filled for SAVED, unfilled for REMOVED)<br>
-playlist state does not refresh properly: cannot save and remove at once. after saving (to multiple playlists if you want), you have to close the window (ESC key), then re-open. the icons will now reflect which playlists your video is saved to and you can now either remove from a saved playlist or save to a playlist which the video has not be added to<br>
-clicking off the window does not currently work to close the playlist save window<br>
