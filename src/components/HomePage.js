import React from 'react';
import { HomePageData } from '../service/HomePageData';

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filters: [],
        }
      }

    componentDidMount = () => {
        console.log(HomePageData);
        console.log(HomePageData.categories);
    }
    
    render() {
        return (
            <div className="container">
                import data
            </div>
        )
    }
}

export default HomePage