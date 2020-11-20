import React from 'react';
import axios from 'axios';
import { HomePageData } from '../service/HomePageData';
import SearchBar from './SearchBar/SearchBar';
import NavigationBar from './NavigationBar/NavigationBar';
import FilterContainer from './FilterContainer/FilterContainer';
import ShopContainer from './ShopContainer/ShopContainer';
import Headline from './Headline/Headline';

import './HomePage.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            homePageData: {},
        }
      }

    componentWillMount = async () => {
        let result = await axios.get('https://panjs.com/ywc18.json');
        this.setState({ homePageData: result.status === 200 ? result.data : HomePageData });
    }
    
    render() {
        return (
            <div className="HomePage">
                <SearchBar
                    provinces={this.state.homePageData.provinces}
                    categories={this.state.homePageData.categories}
                    priceRange={this.state.homePageData.priceRange}
                />
                <NavigationBar />
                <Headline />
                <div className="ContentContainer flex items-start">
                    <div className="FilterContainer hidden fixed md:relative md:mr-2 md:block border border-gray-500 rounded-sm">
                        <FilterContainer
                            categories={this.state.homePageData.categories}
                            provinces={this.state.homePageData.provinces}
                            priceRange={this.state.homePageData.priceRange}
                        />
                    </div>
                    <ShopContainer
                        priceRange={this.state.homePageData.priceRange}
                        merchants={this.state.homePageData.merchants}
                    />
                </div>
            </div>
        )
    }
}

export default HomePage