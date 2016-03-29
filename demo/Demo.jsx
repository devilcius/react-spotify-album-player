// import React from 'react';

// export default class Demo extends React.Component {
  // render() {
    // return <div onClick={this.easterEgg}>click me</div>;
  // }
  // easterEgg() {
    // alert('easter egg');
  // }
// }
import React from 'react';
import SpotifyPlayer from '../dist/react-spotify-album-player.js';

export default class Demo extends React.Component {
  render() {
    return	<SpotifyPlayer albumName="Milo Goes to College" artistName="Descendents" noDataFoundText="No data found" previewWarningText="Only 20 seconds preview" showHeader />;
  }
}
