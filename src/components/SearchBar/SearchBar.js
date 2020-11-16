import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filters: [],
        }
      }

    componentDidMount = () => {
    }
    
    render() {
        return (
            <div className="SearchBar">
                SearchBar
            </div>
        )
    }
}

export default SearchBar