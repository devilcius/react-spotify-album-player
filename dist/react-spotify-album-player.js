var SpotifyPlayer =
/******/ (function(modules) { // webpackBootstrap
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
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TrackList = __webpack_require__(3);
	
	var _TrackList2 = _interopRequireDefault(_TrackList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SpotifyPlayer = _react2.default.createClass({
		displayName: 'SpotifyPlayer',
	
		getInitialState: function getInitialState() {
			return {
				albumData: null,
				playerPlaceholder: '<i class="fa fa-spinner fa-spin"></i>',
				albumName: this.props.albumName,
				artistName: this.props.artistName
			};
		},
		getDefaultProps: function getDefaultProps() {
			return {
				noDataFoundText: 'No data found',
				previewWarningText: 'Only 20 seconds preview',
				onTrackPlayed: undefined,
				onTrackPaused: undefined
			};
		},
		propTypes: {
			albumName: _react2.default.PropTypes.string.isRequired,
			artistName: _react2.default.PropTypes.string.isRequired,
			noDataFoundText: _react2.default.PropTypes.string,
			onTrackPlayed: _react2.default.PropTypes.func,
			onTrackPaused: _react2.default.PropTypes.func,
			previewWarningText: _react2.default.PropTypes.string
		},
		fetchAlbumData: function fetchAlbumData() {
			var that = this;
			var xhr = new XMLHttpRequest();
			var url = 'https://api.spotify.com/v1/search';
			var queryString = '?q=album:' + this.state.albumName + ' artist:' + this.state.artistName;
			queryString += '&type=album';
			xhr.open('get', url + queryString);
			xhr.onload = function () {
				var response = JSON.parse(xhr.responseText);
				if (response.albums.items.length > 0) {
					that.fetchTracks(response.albums.items[0].id, function (data) {
						if (data.tracks.items.length > 0) {
							that.setState({ albumData: data });
						} else {
							that.setState({ albumData: null, playerPlaceholder: that.props.noDataFoundText });
						}
					});
				} else {
					that.setState({ albumData: null, playerPlaceholder: that.props.noDataFoundText });
				}
			};
			xhr.onerror = function () {
				that.setState({ albumData: null, playerPlaceholder: that.props.noDataFoundText });
			};
			xhr.send();
		},
		fetchTracks: function fetchTracks(albumId, callback) {
			var xhr = new XMLHttpRequest();
			var that = this;
			xhr.open('get', 'https://api.spotify.com/v1/albums/' + albumId);
			xhr.onload = function () {
				var response = JSON.parse(xhr.responseText);
				callback(response);
			};
			xhr.onerror = function () {
				that.setState({ albumData: null, playerPlaceholder: that.props.noDataFoundText });
			};
			xhr.send();
		},
		firePlayingStatusChangeEvent: function firePlayingStatusChangeEvent(isPlaying, audioTrack, spotifyTrack) {
			if (isPlaying && this.props.onTrackPlayed) {
				this.props.onTrackPlayed(audioTrack, spotifyTrack);
			} else if (!isPlaying && this.props.onTrackPaused) {
				this.props.onTrackPaused(audioTrack, spotifyTrack);
			}
		},
		componentDidMount: function componentDidMount() {
			this.fetchAlbumData();
		},
		componentWillUpdate: function componentWillUpdate(newProps) {
			if (newProps.albumName !== this.props.albumName || newProps.artistName !== this.props.artistName) {
				this.setState({ artistName: newProps.artistName, albumName: newProps.albumName }, this.fetchAlbumData);
			}
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
								_react2.default.createElement('img', {
									alt: 'cover image',
									className: 'media-object',
									height: '64',
									src: that.state.albumData.images[0].url,
									width: '64'
								})
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
				return _react2.default.createElement(
					'section',
					{ className: 'spotify-player' },
					_react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.playerPlaceholder } })
				);
			} else {
				return _react2.default.createElement(
					'section',
					{ className: 'spotify-player' },
					playlistHeader(),
					_react2.default.createElement(_TrackList2.default, {
						previewWarningText: this.props.previewWarningText,
						tracks: this.state.albumData.tracks.items,
						updateTrackPlayingStatus: this.firePlayingStatusChangeEvent
					})
				);
			}
		}
	});
	
	module.exports = SpotifyPlayer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = undefined;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Track = __webpack_require__(4);
	
	var _Track2 = _interopRequireDefault(_Track);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TrackList = _react2.default.createClass({
	  displayName: 'TrackList',
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      tracks: [],
	      updateTrackPlayingStatus: undefined
	    };
	  },
	  propTypes: {
	    tracks: _react2.default.PropTypes.array,
	    updateTrackPlayingStatus: _react2.default.PropTypes.func
	  },
	  trackChangedStatus: function trackChangedStatus(isPlaying, audioTrack, spotifyTrack) {
	    this.props.updateTrackPlayingStatus(isPlaying, audioTrack, spotifyTrack);
	  },
	  render: function render() {
	    var that = this;
	    var trackNodesData = this.props.tracks.map(function (track, index) {
	      return _react2.default.createElement(_Track2.default, {
	        key: index,
	        onPlayingStatusChange: that.trackChangedStatus,
	        tooltip: that.props.previewWarningText,
	        track: track
	      });
	    });
	    return _react2.default.createElement(
	      'ul',
	      { className: 'list-group' },
	      trackNodesData
	    );
	  }
	});
	module.exports = TrackList;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Track = _react2.default.createClass({
	  displayName: 'Track',
	
	  getInitialState: function getInitialState() {
	    return { playingTrack: null, isPlaying: false };
	  },
	  getDuration: function getDuration(ms) {
	    var min = ms / 1000 / 60 << 0;
	    var sec = ms / 1000 % 60;
	
	    return Math.round(min, -2) + ':' + (Math.round(sec, -2) < 10 ? '0' + Math.round(sec, -2) : Math.round(sec, -2));
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onPlayingStatusChange: undefined
	    };
	  },
	  propTypes: {
	    onPlayingStatusChange: _react2.default.PropTypes.func, //handler on playing status change, function(isPlaying, audioTrack, spotifyTrack),
	    tooltip: _react2.default.PropTypes.string.isRequired,
	    track: _react2.default.PropTypes.object.isRequired
	  },
	  playTrack: function playTrack(event) {
	    var trackUrl = event.target.dataset.url;
	    this.setState({ isPlaying: true });
	    var that = this;
	    if (this.state.playingTrack === null) {
	      //first time track is played
	      this.setState({ isPlaying: true, playingTrack: new Audio(trackUrl) }, function () {
	        this.state.playingTrack.play();
	        this.props.onPlayingStatusChange(true, this.state.playingTrack, this.props.track);
	        this.state.playingTrack.addEventListener('ended', function () {
	          that.setState({ isPlaying: false });
	          that.props.onPlayingStatusChange(false, that.state.playingTrack, that.props.track);
	        });
	      });
	    } else if (this.state.playingTrack.paused) {
	      this.state.playingTrack.play();
	      this.setState({ isPlaying: true }, function () {
	        that.props.onPlayingStatusChange(true, this.state.playingTrack, this.props.track);
	      });
	    } else {
	      this.state.playingTrack.pause();
	      this.setState({ isPlaying: false }, function () {
	        that.props.onPlayingStatusChange(false, this.state.playingTrack, this.props.track);
	      });
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
	          className: playButtonClassNames,
	          'data-url': this.props.track.preview_url,
	          onClick: this.playTrack,
	          style: playButtonStyle,
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
	module.exports = Track;

/***/ }
/******/ ]);
//# sourceMappingURL=react-spotify-album-player.js.map