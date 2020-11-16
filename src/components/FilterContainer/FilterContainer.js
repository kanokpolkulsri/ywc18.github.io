import React from 'react';
import './FilterContainer.css';

class FilterContainer extends React.Component {
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
            <div className="FilterContainer">
                FilterContainer
            </div>
        )
    }
}

export default FilterContainer