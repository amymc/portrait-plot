Vector portrait created from a photo and then plotted on the pen plotter at Recurse Center.

Inspired by this blog post:
https://www.csun.io/2021/12/29/plotting-old-pictures.html

To generate the svg from the phtoto I ran `vpype flow_img -kdt -ml 1 -Ml 200 -ms 1 -Ms 20 -tm --max_size 1600 -nc 0.0005 original_photo.jpg write mam.svg`.

I opened the svg in Inkscape and went to the File -> Document Properties menu.
I rotated it by 90 degrees and set the page size to US Letter size.
I scaled my image down to be less than that actual page size because I found that the plotter wasn't priniting exactly aligned with the edges of the page. So one side it would have some white space and on the other side it would try to plot off the edge of the page.
Then File -> Save as and save as HPGL (Hewlett Packard Graphics Library)

I created the conversion script to modify the code to get it work with the plotter.
The script does the following:

- Replaces SP1 with SP2 because the pen 1 holder is broken on the plotter
- Replaces all the PD X,Y commands with PA X, Y commands instead
- Then splits all those PA commands into their own individual lines.
- Replaces any PU X, Y commands with PU; PA X, Y: PD
- At every 15th PD command it inserts the sequence PU; nSP0; PU; SP2;PU. As the hpgl file is quite long we found the plotter was getting overwhelmed and inclined to timeout. Periodically telling the machine to put down the pen and pick it back up mostly resolved that.

Ran the script `node conversion.js`

Using the plotter tools chunker - https://github.com/WesleyAC/plotter-tools/tree/master/chunker
Ran `sudo ./target/debug/chunker ./mam-converted.hpgl`

Even so the plotter still timed out after about 60% of the way through the drawing. So I created a new hpgl file with just the 2nd half of the code and ran that on the same page.
