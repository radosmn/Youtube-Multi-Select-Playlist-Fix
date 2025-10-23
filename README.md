# YouTube Playlist Multi-Select Fix

This Chrome extension restores the old YouTube behavior where the "Save to playlist" menu stays open, allowing you to add a video to multiple playlists at once.

## The Problem

In recent YouTube updates, when you click to save a video to a playlist, the menu automatically closes after selecting just one playlist. This forces you to reopen the menu each time you want to add the video to another playlist.

## The Solution

This extension keeps the "Save to playlist" menu open after you select a playlist, just like the old behavior. You can select as many playlists as you want before manually closing the menu.

## Features

✅ **Keeps playlist menu open** - Select multiple playlists without the menu closing
✅ **Full add/remove functionality** - Click to add to a playlist, click again to remove
✅ **Manual close options** - Click outside the menu or press ESC to close when done
✅ **Centers the playlist menu** - Positions the menu in the center of the window for better visibility
✅ **No interference** - Doesn't block normal YouTube functionality

## Installation Instructions

### Method 1: Load Unpacked Extension (Developer Mode)

1. **Download the extension files**
   - Make sure you have all the files in a folder:
     - `manifest.json`
     - `content.js`
     - `icon16.png`, `icon48.png`, `icon128.png`

2. **Open Chrome Extensions Page**
   - Open Chrome browser
   - Go to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked" button
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

5. **Test It Out**
   - Go to YouTube
   - Click the "Save" button under a video
   - Try adding the video to multiple playlists
   - The menu should stay open!
   - Click outside the menu or press ESC when done

## How It Works

The extension intercepts YouTube's automatic close behavior while allowing normal interactions:

1. **Blocks auto-close**: Prevents the menu from closing after clicking a playlist
2. **Allows playlist clicks**: All add/remove functionality works normally
3. **Manual close**: Backdrop clicks and ESC key still close the menu when you want

## Usage

1. Click the "Save" button under any YouTube video
2. Click on playlists to add the video to them
3. Click again to remove from a playlist (toggle behavior)
4. When done, click outside the menu or press ESC to close it

## Troubleshooting

### The extension isn't working
- Make sure the extension is enabled in `chrome://extensions/`
- Refresh the YouTube page after installing
- Check the browser console (F12) for any errors - you should see green "[Playlist Fix]" messages

### The menu still closes automatically
- Try refreshing the page
- Disable and re-enable the extension
- Make sure no other extensions are conflicting

### Clicking a playlist doesn't add/remove the video
- This is normal YouTube behavior being preserved
- Make sure you're clicking on the playlist name, not outside it
- Check if the video is already in the playlist (toggle behavior)

### The bookmark icon doesn't update
- This is a known limitation due to YouTube's internal state management
- The video is still being added/removed correctly
- Closing and reopening the menu will show the correct state

## Known Limitations

- The bookmark icon next to each playlist may not update immediately (visual only, doesn't affect functionality)
- Extension needs to be reloaded if YouTube makes significant code changes

## Updates

If YouTube changes their code again, this extension may need updates. The extension logs its activity to the browser console (F12) for debugging.

## Privacy

This extension:
- Only runs on YouTube.com
- Does not collect any data
- Does not track your activity
- Only modifies local behavior in your browser
- Does not communicate with any external servers

## Technical Details

The extension works by:
- Detecting when YouTube's playlist dropdown appears
- Overriding the automatic close functionality
- Preserving all normal click and interaction behavior
- Allowing manual close via backdrop click or ESC key

## Changes Compared to Original

- The original repository provided the extension as a 7z archive file. This fork extracts the source files for easier access and modification.
- Added individual files: manifest.json, content.js, icon16.png, icon48.png, icon128.png.
- Removed: youtube-playlist-fix v2.7z
- Users can now directly load the extension from the source files without extracting the archive.

**Note:** Those changes are made with help of AI (Vibe coded ) 