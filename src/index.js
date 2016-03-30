'use strict';
import React from 'react';
var SpotifyPlayer = React.createClass({
    getInitialState: function () {
        return {
            albumData: null, 
            playerPlaceholder: '<i class="fa fa-spinner fa-spin"></li>'};
    },
    getDefaultProps: function() {
        return {
            noDataFoundText: 'No data found',
            previewWarningText: 'Only 20 seconds preview'
        }
    },    
    fetchAlbumData: function() {
        var that = this;
        var xhr = new XMLHttpRequest();
        var url = 'https://api.spotify.com/v1/search'
        var queryString = '?q=album:' + this.props.albumName + ' artist:' + this.props.artistName;
        queryString += '&type=album';
        xhr.open('get', url + queryString);
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            if(response.albums.items.length > 0) {                    
                that.fetchTracks(response.albums.items[0].id, function(data) {
                    if(data.tracks.items.length > 0){
                        that.setState({albumData: data})
                    } else {
                        that.setState({playerPlaceholder: that.props.noDataFoundText});
                    }
                });
            } else {
                that.setState({playerPlaceholder: that.props.noDataFoundText});
            }
        };
        xhr.send();
    },
    fetchTracks: function(albumId, callback){        
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://api.spotify.com/v1/albums/' + albumId);
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            callback(response);
        };
        xhr.send();   
    },     
    componentDidMount: function() {
      this.fetchAlbumData();
    },    
    render: function () {
        var that = this;
        var playlistHeader = function() {
            if(that.props.showHeader) {
                return(
                    <div className="media">
                      <div className="media-left">
                        <a href={that.state.albumData.external_urls.spotify}>
                          <img className="media-object" width="64"  height="64" src={that.state.albumData.images[0].url} alt="cover image" />
                        </a>
                      </div>
                      <div className="media-body">
                        <h4 className="media-heading">{that.state.albumData.name}</h4>
                        {that.state.albumData.release_date}
                      </div>
                    </div>                        
            );
        }             
            
            return null;
        };
        if(this.state.albumData === null) {
            return(
                    <div dangerouslySetInnerHTML={{__html: this.state.playerPlaceholder }} >
                    </div>
                    );            
        } else {
            return(
                <section className="spotify-player">
                    {playlistHeader()}                 
                    <TrackList
                        tracks={this.state.albumData.tracks.items}
                        previewWarningText={this.props.previewWarningText}
                    />
                </section>
                    );              
        }
    }
});

var TrackList = React.createClass({
    render: function () {   
        var that = this;
        var trackNodesData = this.props.tracks.map(function(track, index) {
            return(
                    <Track
                        key={index}
                        track={track}
                        tooltip={that.props.previewWarningText}
                    />
                    )
        });
        return (
                <ul className="list-group">
                    {trackNodesData}
                </ul>
        );        
    }    
});

var Track = React.createClass({
    getInitialState: function () {
        return {playingTrack: null, isPlaying: false};
    },
    getDuration: function(ms) {   
        var min = (ms/1000/60) << 0;
        var sec = (ms/1000) % 60;

        return Math.round(min, -2) + ':' + ((Math.round(sec, -2) < 10) ? ('0' + Math.round(sec, -2)) : Math.round(sec, -2));      
    },
    playTrack: function(event) {
        var trackUrl = event.target.dataset.url;
        this.setState({isPlaying: true});
        if(this.state.playingTrack === null) { //first time track is played
            var that = this;
            this.setState({isPlaying: true, playingTrack: new Audio(trackUrl)}, function() {
                this.state.playingTrack.play();  
                this.state.playingTrack.addEventListener('ended', function() {
                    that.setState({isPlaying: false});
                }); 
            });
            
        } else if(this.state.playingTrack.paused) {
                this.state.playingTrack.play();
                this.setState({isPlaying: true});
        } else {
                this.state.playingTrack.pause();
                this.setState({isPlaying: false});              
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
                            style={playButtonStyle}
                            className={playButtonClassNames}
                            data-url={this.props.track.preview_url}
                            onClick={this.playTrack}
                            title={this.props.tooltip}
                        >
                        </i>
                    </span>
                {this.props.track.track_number}. {this.props.track.name} ({this.getDuration(this.props.track.duration_ms)})
                </li>
                );        
    }
});

module.exports = SpotifyPlayer;

