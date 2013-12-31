Library-Manager
===============

Library Manager is an extension for Chrome that automatically downloads your JS libraries and provides you with relevant and easily available information about them. It has been designed to be both good-looking and functional. Library Manager is [available in the Chrome Web Store](https://chrome.google.com/webstore/detail/cjkgbbikkgioafiagcjmagjlnonpfpcb)


**What libraries are included?**

- jQuery
- jQuery UI
- Prototype
- scritp.aculo.us
- MooTools
- Dojo
- Ext JS
- SWFObject
- AngularJS
- WebFont Loader


**What can it actually do, though?**

- Automatically download the latest version of 10 JS libraries
- Store them with the Filesystem API so that you always can download them (*even offline!*)
- Notify you of updates.
- Provide you with script tags and links that are ready to be copy-pasted into your HTML.
- Provide you with a link to the libary's website so that you quickly can see what's new in the updated version.

**Why would I want to use Google's CDN?**

- You'll be able to reduce the load on your own server a bit.
- It's free!
- Google's servers are very fast, distributed all over the world and never go down.
- Many other websites use it, so chances are the user will already have the file cached.

**I'm worried about the permission that it asks for**

For the sake of transparency, here are all the permissions, and what they are used for:
- developers.google.com: Library Manager needs access to the site https://developers.google.com/speed/libraries/devguide to scrape information about libraries.
- *.ajax.googleapis.com: To download the new versions of libraries (through XMLHttpRequests), an access to Google's CDN is required.
- unlimitedStorage: To be able to permanently store files on disk. This rarely takes more than 850 KB, but may vary slightly according to the size of updated libraries (nothing major, though. This has been designed to be very lightweight). The content of the FileSystem API can be viewed through the options page.
- clipboardWrite: To be able to copy script tags to your clipboard. It cannot read the content of your clipboard, though.

**There's a bug, or the latest version isn't available yet**

Please, send me an email at maxime.kjaer[at]gmail[dot]com. If it's a bug, I'll try to fix it as soon as possible. If the latest version isn't available yet, I'll contact the Google team in charge of the CDN to tell them to update (I've already done it twice, it's usually fixed within a week).
