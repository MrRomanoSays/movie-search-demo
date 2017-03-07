import React, { Component } from 'react'
import { path } from 'ramda'

class Search extends Component {
  constructor () {
    super()
    this.state={
      searchText: "",
      searchType: "Movie"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
handleChange (e) {
  //this.setState({searchText: e.target.value}) //for just using 1 input
  this.setState({[e.target.name]: e.target.value})  //for shared inputs
}

handleSubmit (e) {
  e.preventDefault()
  this.props.search(this.state)
  this.setState({ searchText: "" })
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
            <label htmlFor="searchText" className="db">Search</label>
            <input id="searchText" className="w-100" type="text"
              name="searchText"
              value={path(["state", "searchText"], this)}
              onChange={this.handleChange}
              autoComplete="off"
              autoFocus={true}
            />
          </fieldset>

          <fieldset>
              <label htmlFor="searchType" className="db">Type</label>
              <select id="searchType" className="w-100"
                name="searchType"
                value={path(['state', 'searchType'], this)}
                onChange={this.handleChange}
              >
                <option>Movie</option>
                <option>Series</option>
                // <option>Episode</option>
              </select>
          </fieldset>
          <button className="pa2 w-100 mt2 mb2">Search</button>
      </form>
    )
  }
}

export default Search
