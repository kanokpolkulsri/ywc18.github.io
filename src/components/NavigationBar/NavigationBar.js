import React from 'react';
import './NavigationBar.css';

class NavigationBar extends React.Component {
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
            <div className="NavigationBar">
                NavigationBar
            </div>
        )
    }
}

export default NavigationBar