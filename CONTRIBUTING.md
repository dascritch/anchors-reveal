If you are not a developer
--------------------------

 - My english is a pity. You may help me to correct it.
 - You can re-read my doc, and ask me some precisions.
 - You may be have a disability and you're using some accessibility tools… You're super useful ! For sure, I missed something important for you. By example : should the webext layer at first in tab navigation before the website content ?
 - Perhaps you can help me on translations, the design or the logos.
 - Install in your own website, test, note the bugs, [report them in the issues section of the repo](https://github.com/dascritch/anchors-reveal/issues).

If you are a developer
----------------------

 - When I started it in 2014, I wished to use the bare minimal dev environment : no npm, no tooling, only using the devtool bar for both WebExtension and in-page behaviour. It help to keep the project really small.
 - We work mainly for Firefox (MV3) first. Creation of a Chrome version is to do next.
 - So [the main documentation I refer is MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/What_are_WebExtensions) . Beware : [Chrome pages are sometimes contraditing Mozilla](https://developer.chrome.com/docs/extensions?hl=en), as Chrome is locking the Webextensions domains, and also the browser lacks some implementations.
 - Clone the project, use the `dev` branch and merge into it
 - Always prefer any W3C standards instead of create something.
 - Think about clean code, minimalism, small parts, expressive variables and functions. The beauty of this WebExtention is its minimalist : **Do a single thing, but do it well.**
 - If you're lost, don't be shy : I'll be very happy to help you. Just ask me.
 - Work by cloning the `dev` branch. We merge in `master` when everything is alright.
 - I usually [create bug](https://github.com/dascritch/anchors-reveal/issues) and refers to them in my commits. Most of the time.

If you are integrating HTML
---------------------------
 - Avoid to create HTML tags unwisely : try to have a minimum footprint, use specific tag names for what they mean.
 - Do **not** inline styles, never `style=""`, `background=""` in HTML or `fill=""` in SVG.
 - Do **not** inline javascript, any event should be in a named function and bound it via a DOMelement`.addEventListener()`, and nothing else.
 - Try to group CSS properties into CSS varables, and document them : it helps to not repeat yourself, and someone may need to change them.
 - Be wise : SVG path can be declared as symbols to reuse them.
 - Simplify your path in SVG:`<path d="">` : we don't have 10000 dpi screens yet. Use preferably `viewport="0 0 32 32"`, have only one digit precision after decimal point and reduce number of points if your path.

How to work on Web-Extension in Firefox
---------------------------------------
 1. Go to `about:debugging#/runtime/this-firefox` page,
 2. Click on the `Load temporary add-on`,
 3. Select the `manifest.json` file of the locally cloned repository,
 4. Once loaded click on `Inspect`
 5. Use the big `↺` button when you changed the code.

How to work on Web-Extension in Chrome
--------------------------------------
(TBD)

Tests
-----
Well, I didn't write early the tests, because I started that project in a 2014 afternoon, as toying. If you can write test, I'll be happy. So actually, this is a manual check :

 - Test mainly of Firefox. Chrome compliance is for later.
 - Watch out with parameters : try to change style, opacity, size, context menu entry and shortkey.
 - Here is what to check on each scenarii, do it twice :
   - Click on the toolbar button
   - Call via the context menu
   - Call via the shortkey, <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> by default
 - Scenarii to check :
   - Check on a page you **cannot** insert JS, on Firefox : [The module page](https://addons.mozilla.org/en-US/firefox/addon/anchors-reveal/). You should have a FORBIDDEN badge
   - Check on a page without any `id=""` tag. [Perdu.com](http://perdu.com) is a good one. You should have a ZERO badged and a message into the page
   - Check on a regular page. [CPU.pm](http://cpu.pm) is a good one, as I maintain it. You should have a number in the badge, with tags in the page
   - Check on a message page with lot of unuseful `id=""` tags. Compage the badged count with the number of tagged in the page. [Youtube.com](http://youtube.com) is a good one. As previously, but confusing different numbers

Reference for the commit messages
---------------------------------

A one liner describing the atomic work. A blank line, then the references to the tickets with both Ticket name nd number then its URL


Example :  https://github.com/dascritch/anchors-reveal/commit/db9a876d94b8e2819b9f1547d5c4101cfdeb11d3
```
fix: english localized link

`README.md`: Fix Link to `addons.mozilla.org` #46
https://github.com/dascritch/anchors-reveal/issues/46
```

Code acceptability
------------------

 - Respect of standards
 - Simplicity
 - Atomicity
 - Re-usability
 - Translations
 - Tests (manually)
 - In code documentation (function annotations, etc…)
 - Documentation

Some of the ballot-box won't apply on your patch, and you may need help to fullfill some of them. We can help you, the goal is to learn together and understand good practices and standards.


Compilation
-----------

To make the `anchors-reveal.zip` build file, run `./make.sh`. 

If you're not working on `master` or `preprod` original branches, try to avoid to commit the .zip file, to avoid conflicts during merge.


