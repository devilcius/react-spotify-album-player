'use strict';
import React from 'react';
var Track = React.createClass({
  audio: null,
  getInitialState: function () {
    return {isPlaying: false};
  },
  getDuration: function(ms) {
    var min = (ms/1000/60) << 0;
    var sec = (ms/1000) % 60;

    return Math.round(min, -2) + ':' + ((Math.round(sec, -2) < 10) ? ('0' + Math.round(sec, -2)) : Math.round(sec, -2));
  },
  getDefaultProps: function() {
    return {
      onPlayingStatusChange: undefined
    }
  },
  componentDidMount: function() {
    this.audio = new Audio();
    this.audio.setAttribute('src', this.props.track.preview_url);
    this.audio.load();
  },
  componentWillUpdate: function(newProps) {
    if(newProps.track.preview_url !== this.props.track.preview_url) {
      this.audio.setAttribute('src', newProps.track.preview_url);
      this.audio.load();
    }
  },
  propTypes: {
    onPlayingStatusChange: React.PropTypes.func, //handler on playing status change, function(isPlaying, audioTrack, spotifyTrack),
    tooltip: React.PropTypes.string.isRequired,
    track: React.PropTypes.object.isRequired
  },
  playTrack: function() {
    var that = this;
    if(this.audio.paused) {
      this.setState({isPlaying: true}, function() {
        this.audio.play();
        this.props.onPlayingStatusChange(true, this.audio, this.props.track);
        this.audio.addEventListener('ended', function() {
          that.setState({isPlaying: false});
          that.props.onPlayingStatusChange(false, that.audio, that.props.track);
        });
      });

    } else  {
      this.audio.pause();
      this.setState({isPlaying: false}, function() {
          that.props.onPlayingStatusChange(false, this.audio, this.props.track);
        }
      );
    }
  },
  render: function(){
    var playButtonClassNames = this.state.isPlaying ? 'fa fa-pause' : 'fa fa-play';
    var playButtonStyle = {cursor: 'default'};
    return(
      <li
        className="list-group-item"
        onClick={this.playTrack}
        style={playButtonStyle}
        title={this.props.tooltip}
        >
        <span className="badge">
          <i
            className={playButtonClassNames}
            >
          </i>

        </span>
        {this.props.track.track_number}. {this.props.track.name} ({this.getDuration(this.props.track.duration_ms)})
      </li>
    );
  }
});
module.exports = Track;
