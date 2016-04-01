'use strict';
import React from 'react';
var Track = React.createClass({
  getInitialState: function () {
    return {playingTrack: null, isPlaying: false};
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
  propTypes: {
    onPlayingStatusChange: React.PropTypes.func, //handler on playing status change, function(isPlaying, audioTrack, spotifyTrack),
    tooltip: React.PropTypes.string.isRequired,
    track: React.PropTypes.object.isRequired
  },
  playTrack: function(event) {
    var trackUrl = event.target.dataset.url;
    this.setState({isPlaying: true});
    var that = this;
    if(this.state.playingTrack === null) { //first time track is played
      this.setState({isPlaying: true, playingTrack: new Audio(trackUrl)}, function() {
        this.state.playingTrack.play();
        this.props.onPlayingStatusChange(true, this.state.playingTrack, this.props.track);
        this.state.playingTrack.addEventListener('ended', function() {
          that.setState({isPlaying: false});
          that.props.onPlayingStatusChange(false, that.state.playingTrack, that.props.track);
        });
      });

    } else if(this.state.playingTrack.paused) {
      this.state.playingTrack.play();
      this.setState({isPlaying: true}, function() {
          that.props.onPlayingStatusChange(true, this.state.playingTrack, this.props.track);
        }
      );
    } else {
      this.state.playingTrack.pause();
      this.setState({isPlaying: false}, function() {
          that.props.onPlayingStatusChange(false, this.state.playingTrack, this.props.track);
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
        >
        <span className="badge">
          <i
            className={playButtonClassNames}
            data-url={this.props.track.preview_url}
            onClick={this.playTrack}
            style={playButtonStyle}
            title={this.props.tooltip}
            >
          </i>

        </span>
        {this.props.track.track_number}. {this.props.track.name} ({this.getDuration(this.props.track.duration_ms)})
      </li>
    );
  }
});
module.exports = Track;