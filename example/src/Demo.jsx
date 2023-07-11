import React, { useState, useEffect, useRef } from 'react';
import { SpotifyPlayer } from 'react-spotify-album-player';



export default function Demo() {
    const clientId = '0454e14b019d4236b4cf5fd4fd9525ee';
    const scopes = 'user-top-read';
    // const redirectUri = 'http://localhost:3000/';
	const redirectUri = 'https://devilcius.github.io/react-spotify-album-player/';
    const [spotifyToken, setSpotifyToken] = useState(null);
    const [spotifyUser, setSpotifyUser] = useState(null);
    const [spotifyUri, setSpotifyUri] = useState(null);
    const [artistName, setArtistName] = useState('Descendents');
    const [albumName, setAlbumName] = useState('Milo Goes to College');
    const artistRef = useRef(null);
    const releaseRef = useRef(null);

    useEffect(() => {
        let spotifyToken = window.location.hash.substr(1).split('&')[0].split("=")[1];
        if (spotifyToken) {
            window.opener.spotifyCallback(spotifyToken)
        }
    }, []);

    const login = () => {
        const popup = window.open(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')

        window.spotifyCallback = (payload) => {
            popup.close()

            fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${payload}`
                }
            }).then(response => {
                return response.json()
            }).then(data => {
                setSpotifyToken(payload);
                setSpotifyUser(data);
            })
        }
    }

    const updateRecord = (event) => {
        event.preventDefault();
        setArtistName(artistRef.current.value);
        setAlbumName(releaseRef.current.value);
    }

    const setTrackInfo = (audioTrack, spotifyTrack) => {
        setSpotifyUri(spotifyTrack.uri);
    }

    const clearTrackInfo = () => {
        setSpotifyUri(null);
    }

    return (
        <div>
            {spotifyToken !== null &&
                <div className="demo-container">
                    <p>Click on a song to preview it</p>
                    <SpotifyPlayer
                        albumName={albumName}
                        artistName={artistName}
                        listGroupClassName="pure-menu-list"
                        listGroupItemClassName="pure-menu-item"
                        listGroupItemLink="pure-menu-link"
                        noDataFoundText="No data found"
                        onTrackPaused={clearTrackInfo}
                        onTrackPlayed={setTrackInfo}
                        previewWarningText="Only 30 seconds preview"
                        showHeader
                        token={spotifyToken}
                    />
                    <div className="form-container">
                        <form className="pure-form" onSubmit={updateRecord}>
                            <fieldset>
                                <legend>Find another album</legend>
                                <input
                                    placeholder="artist name"
                                    ref={artistRef}
                                    required
                                    type="text"
                                />
                                <input
                                    placeholder="release name"
                                    ref={releaseRef}
                                    required
                                    type="text"
                                />
                                <button className="pure-button" >Search</button>
                            </fieldset>
                        </form>
                        <div className="extra-info">
                            <hr />
                            <h5>
                                On playing event:
                            </h5>
                            Spotify URI: <strong>
                                {spotifyUri}
                            </strong>

                        </div>
                    </div>
                </div>}
            {spotifyToken === null &&
                <div>
                    <p><strong>You must authorize this app</strong></p>
                    <button className="pure-button" onClick={login}>authorize</button>
                </div>
            }
        </div>
    );
}
