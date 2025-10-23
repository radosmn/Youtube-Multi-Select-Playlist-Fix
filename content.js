// YouTube Playlist Multi-Select Fix - Lifecycle Management Version
// Keeps playlist menu open by re-patching on every open

(function() {
    'use strict';
    
    console.log('%c[Playlist Fix] 🚀 Lifecycle Version Loaded', 'color: #00ff00; font-weight: bold; font-size: 16px');
    
    let isManualClose = false;
    let currentDropdown = null;
    let currentStyleObserver = null;
    let currentEscapeHandler = null;
    let currentClickHandler = null;
    
    function cleanupDropdown() {
        if (currentStyleObserver) {
            currentStyleObserver.disconnect();
            currentStyleObserver = null;
        }
        if (currentEscapeHandler) {
            document.removeEventListener('keydown', currentEscapeHandler, true);
            currentEscapeHandler = null;
        }
        if (currentClickHandler) {
            document.removeEventListener('click', currentClickHandler, true);
            currentClickHandler = null;
        }
        // Reset dropdown styles before nullifying
        if (currentDropdown) {
            currentDropdown.style.position = '';
            currentDropdown.style.top = '';
            currentDropdown.style.left = '';
            currentDropdown.style.transform = '';
            currentDropdown.style.zIndex = '';
        }

        // Reset backdrop styles
        const backdrop = document.querySelector('tp-yt-iron-overlay-backdrop');
        if (backdrop) {
            backdrop.style.position = '';
            backdrop.style.top = '';
            backdrop.style.left = '';
            backdrop.style.width = '';
            backdrop.style.height = '';
            backdrop.style.zIndex = '';
        }

        currentDropdown = null;
        console.log('%c[Playlist Fix] 🧹 Cleaned up old dropdown', 'color: #888');
    }
    
    function patchDropdown(dropdown) {
        if (!dropdown) return;
        
        // Check if this dropdown contains playlist items
        const hasPlaylistItems = dropdown.querySelector('[aria-label*="Watch later"], [aria-label*="playlist"], ytd-playlist-add-to-option-renderer, yt-list-item-view-model');
        
        if (!hasPlaylistItems) {
            return; // Not a playlist menu
        }
        
        // Check if dropdown is actually visible
        const style = window.getComputedStyle(dropdown);
        if (style.display === 'none') {
            return; // Not visible yet
        }
        
        // If we're already managing a dropdown, clean it up first
        if (currentDropdown && currentDropdown !== dropdown) {
            console.log('%c[Playlist Fix] ⚠️ Found new dropdown, cleaning up old one', 'color: #ffaa00');
            cleanupDropdown();
        }
        
        // If this is the same dropdown we're already managing, don't re-patch
        if (currentDropdown === dropdown) {
            return;
        }
        
        console.log('%c[Playlist Fix] 🎵 NEW Playlist dropdown detected - patching...', 'color: #00ff00; font-weight: bold');
        currentDropdown = dropdown;

        // Center the dropdown
        dropdown.style.position = 'fixed';
        dropdown.style.top = '50%';
        dropdown.style.left = '50%';
        dropdown.style.transform = 'translate(-50%, -50%)';
        dropdown.style.zIndex = '10000';

        // Ensure backdrop is full screen
        const backdrop = document.querySelector('tp-yt-iron-overlay-backdrop');
        if (backdrop) {
            backdrop.style.position = 'fixed';
            backdrop.style.top = '0';
            backdrop.style.left = '0';
            backdrop.style.width = '100vw';
            backdrop.style.height = '100vh';
            backdrop.style.zIndex = '9999';
        }
        
        // Store original close/hide methods
        const origClose = dropdown.close ? dropdown.close.bind(dropdown) : null;
        const origHide = dropdown.hide ? dropdown.hide.bind(dropdown) : null;
        
        // Track if we've overridden the methods on THIS instance
        if (!dropdown._playlistFixPatched) {
            dropdown._playlistFixPatched = true;
            
            // Override close method
            if (dropdown.close) {
                dropdown.close = function() {
                    if (isManualClose) {
                        console.log('%c[Playlist Fix] ✓ Manual close allowed', 'color: #ffaa00');
                        cleanupDropdown();
                        if (origClose) origClose();
                    } else {
                        console.log('%c[Playlist Fix] ⛔ Auto-close blocked', 'color: #ff0000');
                    }
                };
            }
            
            // Override hide method  
            if (dropdown.hide) {
                dropdown.hide = function() {
                    if (isManualClose) {
                        console.log('%c[Playlist Fix] ✓ Manual hide allowed', 'color: #ffaa00');
                        cleanupDropdown();
                        if (origHide) origHide();
                    } else {
                        console.log('%c[Playlist Fix] ⛔ Auto-hide blocked', 'color: #ff0000');
                    }
                };
            }
        }
        
        // Watch for style changes that try to hide the dropdown
        currentStyleObserver = new MutationObserver((mutations) => {
            if (isManualClose) return;
            
            for (const mut of mutations) {
                if (mut.attributeName === 'style') {
                    const style = dropdown.getAttribute('style') || '';
                    if (style.includes('display: none') || style.includes('display:none')) {
                        console.log('%c[Playlist Fix] ⛔ Prevented display:none', 'color: #ff0000');
                        dropdown.style.display = '';
                    }
                }
            }
        });
        
        currentStyleObserver.observe(dropdown, { attributes: true, attributeFilter: ['style'] });
        
        // Manual close function
        function manualClose() {
            console.log('%c[Playlist Fix] 🚪 Manual close triggered', 'color: #ffaa00');
            isManualClose = true;
            
            cleanupDropdown();
            
            // Close the dropdown
            if (origClose) {
                origClose();
            } else if (origHide) {
                origHide();
            } else {
                dropdown.style.display = 'none';
                dropdown.setAttribute('aria-hidden', 'true');
            }
            
            // Reset flag after a delay
            setTimeout(() => {
                isManualClose = false;
            }, 300);
        }
        
        // Handle backdrop click
        function setupBackdropHandler() {
            const backdrop = document.querySelector('tp-yt-iron-overlay-backdrop');
            if (backdrop && !backdrop._playlistFixHandler) {
                backdrop._playlistFixHandler = true;
                
                const backdropClickHandler = (e) => {
                    if (currentDropdown && currentDropdown === dropdown) {
                        console.log('%c[Playlist Fix] 👆 Backdrop clicked', 'color: #ffaa00');
                        e.stopPropagation();
                        e.preventDefault();
                        manualClose();
                    }
                };
                
                backdrop.addEventListener('click', backdropClickHandler, true);
                
                // When dropdown closes, remove the handler
                dropdown.addEventListener('iron-overlay-closed', () => {
                    backdrop.removeEventListener('click', backdropClickHandler, true);
                    backdrop._playlistFixHandler = false;
                }, { once: true });
                
                console.log('%c[Playlist Fix] ✓ Backdrop handler attached', 'color: #00aaff');
            }
        }
        
        setupBackdropHandler();
        setTimeout(setupBackdropHandler, 100);
        setTimeout(setupBackdropHandler, 300);
        
        // Handle ESC key
        currentEscapeHandler = function(e) {
            if (e.key === 'Escape' && currentDropdown === dropdown) {
                console.log('%c[Playlist Fix] ⌨️ ESC pressed', 'color: #ffaa00');
                e.stopPropagation();
                e.preventDefault();
                manualClose();
            }
        };

        document.addEventListener('keydown', currentEscapeHandler, true);

        // Handle clicks outside the menu
        currentClickHandler = function(e) {
            if (currentDropdown === dropdown && !dropdown.contains(e.target)) {
                console.log('%c[Playlist Fix] 👆 Clicked outside menu', 'color: #ffaa00');
                e.stopPropagation();
                e.preventDefault();
                manualClose();
            }
        };

        document.addEventListener('click', currentClickHandler, true);
        
        console.log('%c[Playlist Fix] ✅ Dropdown fully patched', 'color: #00ff00; font-weight: bold');
    }
    
    // Aggressive scanning for dropdowns
    function scanForDropdowns() {
        const dropdowns = document.querySelectorAll('tp-yt-iron-dropdown');
        dropdowns.forEach(patchDropdown);
    }
    
    // Initial scan
    scanForDropdowns();
    
    // Scan very frequently
    const fastScanner = setInterval(scanForDropdowns, 100); // Very fast - every 100ms
    
    // Watch for DOM changes
    const observer = new MutationObserver((mutations) => {
        let shouldScan = false;
        
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.tagName === 'TP-YT-IRON-DROPDOWN' || 
                            node.tagName === 'TP-YT-IRON-OVERLAY-BACKDROP' ||
                            (node.querySelector && node.querySelector('tp-yt-iron-dropdown'))) {
                            shouldScan = true;
                        }
                    }
                });
            }
            
            // Also scan on attribute changes to existing dropdowns
            if (mutation.type === 'attributes' && 
                mutation.target.tagName === 'TP-YT-IRON-DROPDOWN') {
                shouldScan = true;
            }
        }
        
        if (shouldScan) {
            scanForDropdowns();
            // Scan again shortly after to catch late updates
            setTimeout(scanForDropdowns, 50);
        }
    });
    
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class', 'aria-hidden']
        });
        console.log('%c[Playlist Fix] 👀 Aggressively watching for dropdowns', 'color: #00aaff; font-weight: bold');
    }
    
    // Scan when clicking Save buttons
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[aria-label*="Save"], [aria-label*="save"], ytd-button-renderer');
        if (target) {
            console.log('%c[Playlist Fix] 🖱️ Save button clicked, scanning...', 'color: #00aaff');
            setTimeout(scanForDropdowns, 50);
            setTimeout(scanForDropdowns, 150);
            setTimeout(scanForDropdowns, 300);
        }
    }, true);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(fastScanner);
        observer.disconnect();
        cleanupDropdown();
    });
    
})();
