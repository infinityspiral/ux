# pug-scss-autoprefixer
A starter package with watchers for WebStorm that allow you to render scss directly on the page.  This is useful for doing quick code snippets without having to build out a whole big thing with webpack.  

## Setup
- Run `npm i pug-cli postcss-cli live-server autoprefixer -g`
- To **enable watchers**:  
*File>Settings>Tools>File Watchers* and turn on the watcher boxes.

##How to Use
This project uses pug and pug filters to output an html copy of your .pug files. 
Styles are included directly into the page for a rapid setup environment useful for building styles.  
Scss files will be processed and then run through autoprefixer before being added to the final html file.

##Notes
- Currently browserlist for autoprefixer is set to use `last 2 versions` inside `package.json` you can change 
the string to support whatever versions you need to support.
- You can also auto-refresh changes using Live Edit see WebStorm docs at:
https://www.jetbrains.com/help/webstorm/live-editing.html
