Anchors reveal
==============
“Anchors reveal” is a **Firefox addon to show anchors in a web page.** Its main use is to help [a lazy blog redactor](http://dascritch.net) for rapidly linking to a relevant chapter in a long web page.

To install latest stable and validated version, [go directly to its Mozilla addon page](https://addons.mozilla.org/fr/firefox/addon/anchors-reveal/)

Author :  [Xavier "dascritch" Mouton-Dubosc](http://dascritch.com)
Portage to WebExtension and some bug corrections : [Makyen](https://github.com/makyen) and [joggee-fr](https://github.com/joggee-fr)

Icon taken from the [default KDE](http://kde.org) theme [Oxygen by the Oxygen Team](http://techbase.kde.org/Projects/Oxygen)

Version : 1.3


Reference links
---------------
* Mozilla addon page : <https://addons.mozilla.org/fr/firefox/addon/anchors-reveal/>
* Repository : <https://github.com/dascritch/anchors-reveal>
* Blog post (FR) : <http://dascritch.net/post/2014/06/24/Sniffeur-d-ancre>


How to dev
----------

To test your code, go in `about:debugging`, tab “This Firefox” and choose the project's `manifest.json`


Howto build
-----------
Since 0.8, you must go thru WebExtension service.
How to install is described [Your first extension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out)

Building the zip file is done via the `make.sh` script.


Todo
----
See <https://github.com/dascritch/anchors-reveal/issues>

 * Original logo in SVG


Licence
-------

Copyright (C) 2014 Xavier "dascritch" Mouton-Dubosc

This software is licenced under the [GNU General Public Licence](http://www.gnu.org/licenses/gpl-3.0.txt).
Use it and deploy it as you want : i've done too much closed source before.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.


Versions
--------
* February 2026 : 1.3, [Manifest v3](https://github.com/dascritch/anchors-reveal/issues/31), badge on icon, message on no ID, some refacto. Thanks [Joggee](https://github.com/joggee-fr) for helping and [Korb](https://github.com/Korb) on suggestions.
* February 2019 : 1.1, ported in WebComponent. Will help to isolate, keep page undisturbed
* August 2017 : 0.8, now ported in WebExtension, thanks to [Makyen](https://github.com/makyen) ans everyone in the community
* October 2016 : 0.7, will now accept old `a[name]` scheeme. Thanks [Aeris](https://github.com/aeris) for his patch. Hey ? Did I know you ?
* August 2014 : 0.6, switching from addon sdk `cfx` to JetPack `jpm` . Thanks [Erik Vold](http://work.erikvold.com/jetpack/2014/08/07/cfx-to-jpm.html) for transition help
* August 2014 : 0.5, also reveal inline lements and wikipedia.
* August 2014 : 0.4, hiding labels on top left of page
* July 2014 : 0.3, removing direct html insertions for real DOM manips
* July 2014 : 0.2, sanitizing, filtering and removing layout on resize
* June 2014 : 0.1, first release. Standalone JS and Firefox Addon


Keeping in touch
----------------
* professional : <http://dascritch.com>
* blog : <http://dascritch.net>
* twitter : [@dascritch](https://twitter.com/dascritch)
