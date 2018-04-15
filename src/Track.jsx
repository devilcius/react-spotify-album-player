'use strict';
import React from 'react';
class Track extends React.Component {
    
    static audio;
    
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        };
        this.audio = new Audio();
        this.getDuration = this.getDuration.bind(this);
        this.playTrack = this.playTrack.bind(this);
    }

    getDuration(ms) {
        var min = (ms / 1000 / 60) << 0;
        var sec = (ms / 1000) % 60;
        return Math.round(min, -2) + ':' + ((Math.round(sec, -2) < 10) ? ('0' + Math.round(sec, -2)) : Math.round(sec, -2));
    }

    componentDidMount() {

        this.audio.setAttribute('src', this.props.track.preview_url);
        this.audio.load();
    }
    componentWillUpdate(newProps) {
        if (newProps.track.preview_url !== this.props.track.preview_url) {
            this.audio.setAttribute('src', newProps.track.preview_url);
            this.audio.load();
        }
    }

    playTrack(event) {
        event.preventDefault();
        if (this.audio.paused) {
            this.setState({isPlaying: true}, function () {
                this.audio.play();
                this.props.onPlayingStatusChange(true, this.audio, this.props.track);
                this.audio.addEventListener('ended', function () {
                    this.setState({isPlaying: false});
                    this.props.onPlayingStatusChange(false, this.audio, this.props.track);
                });
            });
        } else {
            this.audio.pause();
            this.setState({isPlaying: false}, function () {
                this.props.onPlayingStatusChange(false, this.audio, this.props.track);
            }
            );
        }
    }
    render() {
        var playButtonClassNames = this.state.isPlaying ? 'fa fa-pause' : 'fa fa-play';
        var playButtonStyle = {cursor: 'default'};
        return(
                <div className={this.props.listGroupItemClassName} onClick={this.playTrack} >
                    <a href="#"                       
                       style={playButtonStyle}
                       title={this.props.tooltip}
                       >
                        {this.props.track.track_number}. {this.props.track.name} ({this.getDuration(this.props.track.duration_ms)})
                    </a>
                    <span className={this.props.listGroupItemBadgeClassName}>
                        <i
                            className={playButtonClassNames}
                            >
                        </i>
                    </span>                    
                </div>
                );
    }
}

Track.propTypes = {
    listGroupItemBadgeClassName: React.PropTypes.string,
    listGroupItemClassName: React.PropTypes.string,
    onPlayingStatusChange: React.PropTypes.func, //handler on playing status change, function(isPlaying, audioTrack, spotifyTrack),
    tooltip: React.PropTypes.string.isRequired,
    track: React.PropTypes.object.isRequired
};

Track.defaultProps = {    
    onPlayingStatusChange: undefined
};
module.exports = Track;
