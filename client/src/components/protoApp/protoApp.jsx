import React from 'react';
import axios from 'axios';
import Lyrics from './Lyrics.jsx';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      songName: '',
      lyrics: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //spotify provided hashing function
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const context = this;
    axios
      .get('/search', {
        params: {
          artist: this.state.artistName,
          song: this.state.songName,
        },
      })
      .then(response => {
        // console.log(' this the is the response');
        // console.log(response.data);
        let wordsToSong = response.data;
        if (wordsToSong.length > 30) {
          wordsToSong = wordsToSong.slice(35);
        }
        context.setState({ lyrics: wordsToSong });
      });
    // console.log(this.state.artistName, this.state.songName);
  }

  render() {
    return (
      <div className="search-container-center">
        <label>ArtistName</label>
        <input
          className="form-control
          mr-sm-2"
          type="text"
          value={this.state.value}
          name={'artistName'}
          onChange={this.handleChange}
        />
        <label>SongName</label>
        <input
          className="form-control mr-sm-2"
          type="text"
          value={this.state.value}
          name={'songName'}
          onChange={this.handleChange}
        />
        <button type="Submit" onClick={this.handleSubmit}>
          Hit IT
        </button>

        <Lyrics lyrics={this.state.lyrics} />
      </div>
    );
  }
}
export default App;
