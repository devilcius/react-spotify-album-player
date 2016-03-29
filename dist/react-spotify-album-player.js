(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["SpotifyPlayer"] = factory(require("react"));
	else
		root["SpotifyPlayer"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SpotifyPlayer = _react2.default.createClass({
	    displayName: 'SpotifyPlayer',
	
	    getInitialState: function getInitialState() {
	        return {
	            albumData: null,
	            playerPlaceholder: '<i class="fa fa-spinner fa-spin"></li>' };
	    },
	    fetchAlbumData: function fetchAlbumData() {
	        var that = this;
	        var xhr = new XMLHttpRequest();
	        var url = 'https://api.spotify.com/v1/search';
	        var queryString = '?q=album:' + this.props.albumName + ' artist:' + this.props.artistName;
	        queryString += '&type=album';
	        xhr.open('get', encodeURI(url + queryString));
	        xhr.onload = function () {
	            var response = JSON.parse(xhr.responseText);
	            if (response.albums.items.length > 0) {
	                that.fetchTracks(response.albums.items[0].id, function (data) {
	                    if (data.tracks.items.length > 0) {
	                        that.setState({ albumData: data });
	                    } else {
	                        that.setState({ playerPlaceholder: that.props.noDataFoundText });
	                    }
	                });
	            } else {
	                that.setState({ playerPlaceholder: that.props.noDataFoundText });
	            }
	        };
	        xhr.send();
	    },
	    fetchTracks: function fetchTracks(albumId, callback) {
	        var xhr = new XMLHttpRequest();
	        xhr.open('get', 'https://api.spotify.com/v1/albums/' + albumId);
	        xhr.onload = function () {
	            var response = JSON.parse(xhr.responseText);
	            callback(response);
	        };
	        xhr.send();
	    },
	    componentDidMount: function componentDidMount() {
	        this.fetchAlbumData();
	    },
	    render: function render() {
	        var that = this;
	        var playlistHeader = function playlistHeader() {
	            if (that.props.showHeader) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'media' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'media-left' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: that.state.albumData.external_urls.spotify },
	                            _react2.default.createElement('img', { className: 'media-object', width: '64', height: '64', src: that.state.albumData.images[0].url, alt: 'cover image' })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'media-body' },
	                        _react2.default.createElement(
	                            'h4',
	                            { className: 'media-heading' },
	                            that.state.albumData.name
	                        ),
	                        that.state.albumData.release_date
	                    )
	                );
	            }
	
	            return null;
	        };
	        if (this.state.albumData === null) {
	            return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.playerPlaceholder } });
	        } else {
	            return _react2.default.createElement(
	                'section',
	                { className: 'spotify-player' },
	                playlistHeader(),
	                _react2.default.createElement(TrackList, {
	                    tracks: this.state.albumData.tracks.items,
	                    previewWarningText: this.props.previewWarningText
	                })
	            );
	        }
	    }
	});
	
	var TrackList = _react2.default.createClass({
	    displayName: 'TrackList',
	
	    render: function render() {
	        var that = this;
	        var trackNodesData = this.props.tracks.map(function (track, index) {
	            return _react2.default.createElement(Track, {
	                key: index,
	                track: track,
	                tooltip: that.props.previewWarningText
	            });
	        });
	        return _react2.default.createElement(
	            'ul',
	            { className: 'list-group' },
	            trackNodesData
	        );
	    }
	});
	
	var Track = _react2.default.createClass({
	    displayName: 'Track',
	
	    getInitialState: function getInitialState() {
	        return { playingTrack: null, isPlaying: false };
	    },
	    getDuration: function getDuration(ms) {
	        var min = ms / 1000 / 60 << 0;
	        var sec = ms / 1000 % 60;
	
	        return Math.round(min, -2) + ':' + (Math.round(sec, -2) < 10 ? "0" + Math.round(sec, -2) : Math.round(sec, -2));
	    },
	    playTrack: function playTrack(event) {
	        var trackUrl = event.target.dataset.url;
	        this.setState({ isPlaying: true });
	        if (this.state.playingTrack === null) {
	            //first time track is played
	            var that = this;
	            this.setState({ isPlaying: true, playingTrack: new Audio(trackUrl) }, function () {
	                this.state.playingTrack.play();
	                this.state.playingTrack.addEventListener('ended', function () {
	                    that.setState({ isPlaying: false });
	                });
	            });
	        } else if (this.state.playingTrack.paused) {
	            this.state.playingTrack.play();
	            this.setState({ isPlaying: true });
	        } else {
	            this.state.playingTrack.pause();
	            this.setState({ isPlaying: false });
	        }
	    },
	    render: function render() {
	        var playButtonClassNames = this.state.isPlaying ? 'fa fa-pause' : 'fa fa-play';
	        var playButtonStyle = { cursor: 'default' };
	        return _react2.default.createElement(
	            'li',
	            {
	                className: 'list-group-item'
	            },
	            _react2.default.createElement(
	                'span',
	                { className: 'badge' },
	                _react2.default.createElement('i', {
	                    style: playButtonStyle,
	                    className: playButtonClassNames,
	                    'data-url': this.props.track.preview_url,
	                    onClick: this.playTrack,
	                    title: this.props.tooltip
	                })
	            ),
	            this.props.track.track_number,
	            '. ',
	            this.props.track.name,
	            ' (',
	            this.getDuration(this.props.track.duration_ms),
	            ')'
	        );
	    }
	});
	
	module.exports = SpotifyPlayer;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-spotify-album-player.js.map