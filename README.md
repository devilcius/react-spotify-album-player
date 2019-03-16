# Spotify Player

This is a simple spotify player for a single album of a given artist.

## install

Bower:

```sh
bower install react-spotify-album-player
```

For bower usage,

```html
<script src="path/to/react.js"></script>
<script src="path/to/react-spotify-album-player/dist/react-spotify-album-player.js"></script>
```

NPM:

```
npm install react-spotify-album-player
```

## Demo

http://devilcius.github.io/react-spotify-album-player/

## Basic Usage

```jsx
var React = require('react');
var SpotifyPlayer = require('react-spotify-album-player');
var container = document.getElementById('spotify-player');
var ReactDOM = require('react-dom');
ReactDOM.render(
    <SpotifyPlayer
        albumName="Milo Goes to College"
        artistName="Descendents"
        noDataFoundText="No data found"
        previewWarningText="Only 20 seconds preview"
        showHeader
        token
 />,
    container
);
```
## Required options:
Property			|	Type		|	Description
:-----------------------|:--------------|:--------------------------------
albumName 				|	string		|	 Release's name
artistName 				|	string		|	 Artist's name
token    				|	string		|	 A valid spotify web api access token

### Further options:

Property			|	Type		|	Default | Description
:-----------------------|:--------------|:--------|:--------------------------------
listGroupItemBadgeClassName 		|	string		| 'badge'           |	 class name for badge element
listGroupClassName 			|	string		| 'list-group'      |	 class name for list group element
listGroupItemClassName 			|	string		| 'list-group-item' |	 class name for list group item element
onTrackPlayed 				|	func			|	`undefined` | track played handler: `function(audioTrack, spotifyTrack) {}`
onTrackPaused 				|	func |	`undefined`			|	 track paused handler: `function(audioTrack, spotifyTrack) {}`
noDataFoundText 			|	string		| _No data found_ |	 placeholder displayed when there are no matching search results values
previewWarningText 			|	string		| _Only 20 seconds preview_ |	 placeholder preview audio file warning
showHeader 				|	bool		| `false` |	 whether to show player header

## Development

Local development is separated into two parts (ideally using two tabs).

First, run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.

```bash
npm start # runs rollup with watch flag
```

The second part will be running the `example/` create-react-app that's linked to the local version of your module.

```bash
# (in another tab)
cd example
npm start # runs create-react-app dev server
```

Now, anytime you make a change to your library in `src/` or to the example app's `example/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.


#### Publishing to npm

```bash
npm publish
```

This builds `cjs` and `es` versions of your module to `dist/` and then publishes your module to `npm`.

Make sure that any npm modules you want as peer dependencies are properly marked as `peerDependencies` in `package.json`. The rollup config will automatically recognize them as peers and not try to bundle them in your module.


#### Deploying to Github Pages

```bash
npm run deploy

```

This creates a production build of the example `create-react-app` that showcases your library and then runs `gh-pages` to deploy the resulting bundle.

## Todo

- [ ] Sanity checks in xhr calls
- [ ] Error handling in xhr calls

## License

MIT © [devilcius](https://github.com/devilcius)
