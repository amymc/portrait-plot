<a href='http://www.recurse.com' title='Made with love at the Recurse Center'><img src='https://cloud.githubusercontent.com/assets/2883345/11325206/336ea5f4-9150-11e5-9e90-d86ad31993d8.png' height='20px'/></a>

Vector portrait created from a photo and then plotted on the pen plotter at Recurse Center.

Inspired by this blog post:
https://www.csun.io/2021/12/29/plotting-old-pictures.html

- To generate the svg from the phtoto I ran `vpype flow_img -kdt -ml 1 -Ml 200 -ms 1 -Ms 20 -tm --max_size 1600 -nc 0.0005 original_photo.jpg write mam.svg`.
- I opened the svg in Inkscape and went to the File -> Document Properties menu.
- I rotated it by 90 degrees and set the page size to US Letter size.
- Then File -> Save as and save as HPGL (Hewlett Packard Graphics Library)
- In the HPGL output dialog box, on the Plot features tab, set Overcut to 0.00
- Ran the script `node conversion.js`
  
I created the conversion script to modify the code to get it work with the plotter.
  The script does the following:
  - Replaces SP1 with SP2 because the pen 1 holder is broken on the plotter.
  - Replaces all the PD X,Y commands with PA X, Y commands instead.
  - Then splits all those PA commands into their own individual lines.
  - Replaces any PU X, Y commands with PU; PA X, Y: PD

Using the plotter tools chunker - https://github.com/WesleyAC/plotter-tools/tree/master/chunker

- Ran `sudo ./target/debug/chunker ./mam-converted.hpgl`
