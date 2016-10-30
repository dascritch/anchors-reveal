Anchors reveal
==============
“Anchors reveal” is a **Firefox addon to show anchors in a web page.** Its main use is to help [a lazy blog redactor](http://dascritch.net) for rapidly linking to a relevant chapter in a long web page.

To install latest stable and validated version, [go directly to its Mozilla addon page](https://addons.mozilla.org/fr/firefox/addon/anchors-reveal/)

Author :  [Xavier "dascritch" Mouton-Dubosc](http://dascritch.com)

Icon taken from the [default KDE](http://kde.org) theme [Oxygen by the Oxygen Team](http://techbase.kde.org/Projects/Oxygen)

Version : 0.6

Reference links
---------------
* Mozilla addon page : <https://addons.mozilla.org/fr/firefox/addon/anchors-reveal/>
* Repository : <https://github.com/dascritch/anchors-reveal>
* Blog post (FR) : <http://dascritch.net/post/2014/06/24/Sniffeur-d-ancre>

Known bugs
----------
* GitHub won't work correctly, [because of their improperly use of attribute `name=""` in MD→HTML headings instead of `id=""`](https://github.com/jch/html-pipeline/issues/135)

Howto build
-----------
Since 0.6, you will need [JPM](https://github.com/mozilla/jpm) and Firefox 34+ (Nightly as today)
To run, launch from directory : `jpm run -b firefox-trunk`

Todo
----
See <https://github.com/dascritch/anchors-reveal/issues>
* Original logo in SVG

Licence
-------

Copyright (C) 2014 Xavier "dascritch" Mouton-Dubosc

This software is licenced under the [GNU General Purpose Licence](http://www.gnu.org/licenses/gpl-3.0.txt).
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
