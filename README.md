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
        showHeader />,
    container
);
```
## Required options:
Property			|	Type		|	Description
:-----------------------|:--------------|:--------------------------------
albumName 				|	string		|	 Release's name
artistName 				|	string		|	 Artist's name

### Further options:

Property			|	Type		|	Default | Description
:-----------------------|:--------------|:--------|:--------------------------------
onTrackPlayed 				|	func			|	`undefined` | track played handler: `function(audioTrack, spotifyTrack) {}`
onTrackPaused 				|	func |	`undefined`			|	 track paused handler: `function(audioTrack, spotifyTrack) {}`
noDataFoundText 			|	string		| _No data found_ |	 placeholder displayed when there are no matching search results values
previewWarningText 			|	string		| _Only 20 seconds preview_ |	 placeholder preview audio file warning
showHeader 				|	bool		| `false` |	 whether to show player header

## Todo

- [ ] Play whole songs in case user has an spotify account
- [ ] Sanity checks in xhr calls
- [ ] Error handling in xhr calls

## License

*react-spotify-album-player* is available under MIT. See LICENSE for more details.
