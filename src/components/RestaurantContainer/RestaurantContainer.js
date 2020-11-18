import React from 'react';
import './RestaurantContainer.css';

class RestaurantContainer extends React.Component {
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
            <div className="RestaurantContainer flex-1">
                RestaurantContainer
            </div>
        )
    }
}

export default RestaurantContainer