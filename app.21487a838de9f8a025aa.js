webpackJsonp([0,3],{0:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var s=a("./node_modules/react/react.js"),n=r(s),o=a("./node_modules/react-dom/index.js"),i=r(o),l=a("./demo/App.jsx"),u=r(l),c=document.getElementsByClassName("demonstration")[0];i["default"].render(n["default"].createElement(u["default"],null),c)},"./node_modules/react-dom/index.js":function(e,t,a){"use strict";e.exports=a("./node_modules/react/lib/ReactDOM.js")},"./demo/App.jsx":function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),l=a("./node_modules/react/react.js"),u=r(l),c=a("./node_modules/react-ghfork/dist/react-ghfork.js"),p=r(c),d=a("./package.json"),f=r(d),m=a("./demo/Demo.jsx"),h=r(m),y=function(e){function t(){return s(this,t),n(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),i(t,[{key:"render",value:function(){return u["default"].createElement("div",null,u["default"].createElement(p["default"],{className:"right",project:f["default"].user+"/"+f["default"].name}),u["default"].createElement("p",null,"Click on play button to preview a song."),u["default"].createElement(h["default"],null))}}]),t}(u["default"].Component);t["default"]=y},"./node_modules/react-ghfork/dist/react-ghfork.js":function(e,t,a){!function(t,r){e.exports=r(a("./node_modules/react/react.js"))}(this,function(e){return function(e){function t(r){if(a[r])return a[r].exports;var s=a[r]={exports:{},id:r,loaded:!1};return e[r].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";function r(e,t){var a={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(a[r]=e[r]);return a}var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},n=a(1);e.exports=n.createClass({displayName:"exports",render:function(){var e=this.props,t=e.text,a=e.style,o=e.className,i=r(e,["text","style","className"]);return o=o||"",o+=" github-fork-ribbon-wrapper",t=this.props.text||"Fork me on GitHub",n.createElement("div",{className:o},n.createElement("div",{className:"github-fork-ribbon",style:a},n.createElement("a",s({href:"https://github.com/"+this.props.project},i),t)))}})},function(t,a){t.exports=e}])})},"./package.json":function(e,t){e.exports={name:"react-spotify-album-player",description:"Spotify player for a specific artist's album",author:"Marcos",user:"devilcius",version:"0.0.4",scripts:{start:"webpack-dev-server",test:"karma start","test:tdd":"karma start --auto-watch --no-single-run","test:lint":"eslint src/** --ext .js --ext .jsx --ignore-path .gitignore --ignore-pattern dist","gh-pages":"webpack","gh-pages:deploy":"gh-pages -d gh-pages","gh-pages:stats":"webpack --profile --json > stats.json",dist:"webpack --display-error-details","dist:min":"webpack","dist:modules":"babel ./src --out-dir ./dist-modules",pretest:"npm run test:lint",preversion:'npm run test && npm run dist && npm run dist:min && git commit --allow-empty -am "Update dist"',prepublish:"npm run dist:modules",postpublish:"npm run gh-pages && npm run gh-pages:deploy",postinstall:"node lib/post_install.js"},main:"dist-modules",dependencies:{react:"^0.14.7","react-dom":"^0.14.7"},devDependencies:{"babel-cli":"^6.6.5","babel-core":"^6.7.4","babel-eslint":"^6.0.0","babel-loader":"^6.2.4","babel-preset-es2015":"^6.6.0","babel-preset-react":"^6.5.0","babel-preset-react-hmre":"^1.1.1","babel-register":"^6.7.2",chai:"^3.5.0","clean-webpack-plugin":"^0.1.8","css-loader":"^0.23.1",eslint:"2.5.x","eslint-loader":"^1.3.0","eslint-plugin-react":"^4.2.3","extract-text-webpack-plugin":"^1.0.1","file-loader":"^0.8.5","gh-pages":"^0.11.0","git-prepush-hook":"^1.0.1","highlight.js":"^9.2.0","html-webpack-plugin":"^2.14.0","isparta-instrumenter-loader":"^1.0.0","json-loader":"^0.5.4",karma:"^0.13.22","karma-chai":"^0.1.0","karma-coverage":"^0.5.5","karma-mocha":"^0.2.2","karma-phantomjs-launcher":"^1.0.0","karma-sourcemap-loader":"^0.3.7","karma-spec-reporter":"0.0.24","karma-webpack":"^1.7.0",mocha:"^2.4.5","phantomjs-polyfill":"0.0.2","phantomjs-prebuilt":"^2.1.7",purecss:"^0.6.0","react-addons-test-utils":"^0.14.7","react-ghfork":"^0.3.2",remark:"^4.1.2","remark-react":"^2.0.0","style-loader":"^0.13.1","sync-exec":"^0.6.2","system-bell-webpack-plugin":"^1.0.0","url-loader":"^0.5.7",webpack:"^1.12.14","webpack-dev-server":"^1.14.1","webpack-merge":"^0.8.4"},repository:{type:"git",url:"https://github.com/devilcius/react-spotify-album-player.git"},homepage:"https://github.com/devilcius/react-spotify-album-player/",bugs:{url:"https://github.com/devilcius/react-spotify-album-player/issues"},keywords:["react","reactjs","spotify","player"],license:"MIT","pre-push":["test","test:lint"]}},"./demo/Demo.jsx":function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),l=a("./node_modules/react/react.js"),u=r(l),c=a("./dist-modules/SpotifyPlayer.js"),p=r(c),d=function(e){function t(e){s(this,t);var a=n(this,Object.getPrototypeOf(t).call(this,e));return a.updateRecord=a.updateRecord.bind(a),a.state={albumName:"Milo Goes to College",artistName:"Descendents",spotifyUri:null},a}return o(t,e),i(t,[{key:"updateRecord",value:function(e){e.preventDefault();var t=u["default"].findDOMNode(this.refs.artist).value,a=u["default"].findDOMNode(this.refs.release).value;this.setState({artistName:t,albumName:a})}},{key:"setTrackInfo",value:function(e,t){this.setState({spotifyUri:t.uri})}},{key:"clearTrackInfo",value:function(){this.setState({spotifyUri:null})}},{key:"render",value:function(){return u["default"].createElement("div",{className:"demo-container"},u["default"].createElement(p["default"],{albumName:this.state.albumName,artistName:this.state.artistName,noDataFoundText:"No data found",onTrackPaused:this.clearTrackInfo.bind(this),onTrackPlayed:this.setTrackInfo.bind(this),previewWarningText:"Only 20 seconds preview",showHeader:!0}),u["default"].createElement("div",{className:"form-container"},u["default"].createElement("form",{onSubmit:this.updateRecord},u["default"].createElement("input",{placeholder:"artist name",ref:"artist",required:!0,type:"text"}),u["default"].createElement("input",{placeholder:"release name",ref:"release",required:!0,type:"text"}),u["default"].createElement("button",null,"Update")),u["default"].createElement("div",{className:"extra-info"},u["default"].createElement("hr",null),u["default"].createElement("h5",null,"On playing event:"),"Spotify URI: ",u["default"].createElement("strong",null,this.state.spotifyUri))))}}]),t}(u["default"].Component);t["default"]=d},"./dist-modules/SpotifyPlayer.js":function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var s=a("./node_modules/react/react.js"),n=r(s),o=a("./dist-modules/TrackList.js"),i=r(o),l=n["default"].createClass({displayName:"SpotifyPlayer",getInitialState:function(){return{albumData:null,playerPlaceholder:'<i class="fa fa-spinner fa-spin"></i>',albumName:this.props.albumName,artistName:this.props.artistName}},getDefaultProps:function(){return{noDataFoundText:"No data found",previewWarningText:"Only 20 seconds preview",onTrackPlayed:void 0,onTrackPaused:void 0}},propTypes:{albumName:n["default"].PropTypes.string.isRequired,artistName:n["default"].PropTypes.string.isRequired,noDataFoundText:n["default"].PropTypes.string,onTrackPlayed:n["default"].PropTypes.func,onTrackPaused:n["default"].PropTypes.func,previewWarningText:n["default"].PropTypes.string},fetchAlbumData:function(){var e=this,t=new XMLHttpRequest,a="https://api.spotify.com/v1/search",r="?q=album:"+this.state.albumName+" artist:"+this.state.artistName;r+="&type=album",t.open("get",a+r),t.onload=function(){var a=JSON.parse(t.responseText);a.albums.items.length>0?e.fetchTracks(a.albums.items[0].id,function(t){t.tracks.items.length>0?e.setState({albumData:t}):e.setState({albumData:null,playerPlaceholder:e.props.noDataFoundText})}):e.setState({albumData:null,playerPlaceholder:e.props.noDataFoundText})},t.onerror=function(){e.setState({albumData:null,playerPlaceholder:e.props.noDataFoundText})},t.send()},fetchTracks:function(e,t){var a=new XMLHttpRequest,r=this;a.open("get","https://api.spotify.com/v1/albums/"+e),a.onload=function(){var e=JSON.parse(a.responseText);t(e)},a.onerror=function(){r.setState({albumData:null,playerPlaceholder:r.props.noDataFoundText})},a.send()},firePlayingStatusChangeEvent:function(e,t,a){e&&this.props.onTrackPlayed?this.props.onTrackPlayed(t,a):!e&&this.props.onTrackPaused&&this.props.onTrackPaused(t,a)},componentDidMount:function(){this.fetchAlbumData()},componentWillUpdate:function(e){e.albumName===this.props.albumName&&e.artistName===this.props.artistName||this.setState({artistName:e.artistName,albumName:e.albumName},this.fetchAlbumData)},render:function(){var e=this,t=function(){return e.props.showHeader?n["default"].createElement("div",{className:"media"},n["default"].createElement("div",{className:"media-left"},n["default"].createElement("a",{href:e.state.albumData.external_urls.spotify},n["default"].createElement("img",{alt:"cover image",className:"media-object",height:"64",src:e.state.albumData.images[0].url,width:"64"}))),n["default"].createElement("div",{className:"media-body"},n["default"].createElement("h4",{className:"media-heading"},e.state.albumData.name),e.state.albumData.release_date)):null};return null===this.state.albumData?n["default"].createElement("section",{className:"spotify-player"},n["default"].createElement("div",{dangerouslySetInnerHTML:{__html:this.state.playerPlaceholder}})):n["default"].createElement("section",{className:"spotify-player"},t(),n["default"].createElement(i["default"],{previewWarningText:this.props.previewWarningText,tracks:this.state.albumData.tracks.items,updateTrackPlayingStatus:this.firePlayingStatusChangeEvent}))}});e.exports=l},"./dist-modules/TrackList.js":function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var s=a("./node_modules/react/react.js"),n=r(s),o=a("./dist-modules/Track.js"),i=r(o),l=n["default"].createClass({displayName:"TrackList",getDefaultProps:function(){return{tracks:[],updateTrackPlayingStatus:void 0}},propTypes:{tracks:n["default"].PropTypes.array,updateTrackPlayingStatus:n["default"].PropTypes.func},trackChangedStatus:function(e,t,a){this.props.updateTrackPlayingStatus(e,t,a)},render:function(){var e=this,t=this.props.tracks.map(function(t,a){return n["default"].createElement(i["default"],{key:a,onPlayingStatusChange:e.trackChangedStatus,tooltip:e.props.previewWarningText,track:t})});return n["default"].createElement("ul",{className:"list-group"},t)}});e.exports=l},"./dist-modules/Track.js":function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var s=a("./node_modules/react/react.js"),n=r(s),o=n["default"].createClass({displayName:"Track",getInitialState:function(){return{playingTrack:null,isPlaying:!1}},getDuration:function(e){var t=e/1e3/60<<0,a=e/1e3%60;return Math.round(t,-2)+":"+(Math.round(a,-2)<10?"0"+Math.round(a,-2):Math.round(a,-2))},getDefaultProps:function(){return{onPlayingStatusChange:void 0}},propTypes:{onPlayingStatusChange:n["default"].PropTypes.func,tooltip:n["default"].PropTypes.string.isRequired,track:n["default"].PropTypes.object.isRequired},playTrack:function(e){var t=e.target.dataset.url;this.setState({isPlaying:!0});var a=this;null===this.state.playingTrack?this.setState({isPlaying:!0,playingTrack:new Audio(t)},function(){this.state.playingTrack.play(),this.props.onPlayingStatusChange(!0,this.state.playingTrack,this.props.track),this.state.playingTrack.addEventListener("ended",function(){a.setState({isPlaying:!1}),a.props.onPlayingStatusChange(!1,a.state.playingTrack,a.props.track)})}):this.state.playingTrack.paused?(this.state.playingTrack.play(),this.setState({isPlaying:!0},function(){a.props.onPlayingStatusChange(!0,this.state.playingTrack,this.props.track)})):(this.state.playingTrack.pause(),this.setState({isPlaying:!1},function(){a.props.onPlayingStatusChange(!1,this.state.playingTrack,this.props.track)}))},render:function(){var e=this.state.isPlaying?"fa fa-pause":"fa fa-play",t={cursor:"default"};return n["default"].createElement("li",{className:"list-group-item"},n["default"].createElement("span",{className:"badge"},n["default"].createElement("i",{className:e,"data-url":this.props.track.preview_url,onClick:this.playTrack,style:t,title:this.props.tooltip})),this.props.track.track_number,". ",this.props.track.name," (",this.getDuration(this.props.track.duration_ms),")")}});e.exports=o}});