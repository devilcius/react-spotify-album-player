import React from 'react';
import SpotifyPlayer from '../dist-modules/index.js';

export default class Demo extends React.Component {
  render() {
    return	<SpotifyPlayer albumName="Milo Goes to College" artistName="Descendents" noDataFoundText="No data found" previewWarningText="Only 20 seconds preview" showHeader />;
  }
}
