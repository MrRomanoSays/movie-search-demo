import React, { Component } from 'react';
import 'tachyons/css/tachyons.css'
import Search from './components/search.js'
import Posters from './components/posters.js'
import fetch from 'isomorphic-fetch'

const url = 'http://www.omdbapi.com/'

class App extends Component {
  constructor () {
    super()
    this.state = {
      movies: [],
      error: '',
      searchedFor: ""
    }
    this.search = this.search.bind(this)
  }

  search ({searchText, searchType}) { //destructured the two terms to take out criteria
  //search (criteria) {
      // fetch('http://www.omdbapi.com/?
      //   s=${criteria.searchText}&type=${criteria.searchType}')
        fetch(`${url}?s=${searchText}&type=${searchType}`)
          .then(res => res.json())
          .then(json => this.setState({
            searchedFor: searchText,
            movies: json.Search,
            error: json.Error
        }))
        .catch(err =>
          this.setState({
            error: "Error Occurred.  Try Again",
            movies: [],
            searchedFor: ""
          }))
  }

  render() {
    return (
      <div className="pa4">
        <h1>Movie Search</h1>
        <Search search={this.search} />
        {this.state.error ? <h2>{this.state.error}</h2> : null}
        {this.state.searchedFor ? <p>Searched for: {this.state.searchedFor} </p> : null}
        <Posters movies={this.state.movies} />
      </div>
    );
  }
}

export default App
