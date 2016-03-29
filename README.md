# react-spotify-album-player

This is a simple spotify player for a single album of a given artist.

## install

Bower:

```sh
bower install react-spotify-album-player
```

For bower usage,

```html
<script src="path/to/react.js"></script>
<script src="path/to/react-spotify-album-player/index.js"></script>
```

NPM:

```
npm install react-spotify-album-player
```


## Basic Usage

```html
<SpotifyPlayer albumName="Milo Goes to College" artistName="Descendents" noDataFoundText="No data found" previewWarningText="Only 20 seconds preview" showHeader />
```

Attributes:

* `albumName`: Name of the release, mandatory
* `artistName`: Name of the artist, mandatory
* `noDataFoundText`: Text to display when album is not found. Default: _"No data found"_.
* `previewWarningText`: Text to display when hovering play button. Default: _"Only 20 seconds preview"_.
* `showHeader`: Shows playlist header, with cover thumbnail, album name and album release year. Default: `false`;

## License

*react-spotify-album-player* is available under MIT. See LICENSE for more details.

