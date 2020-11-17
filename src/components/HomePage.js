import React from 'react';
import { HomePageData } from '../service/HomePageData';
import SearchBar from './SearchBar/SearchBar';
import NavigationBar from './NavigationBar/NavigationBar';
import FilterContainer from './FilterContainer/FilterContainer';
import RestaurantContainer from './RestaurantContainer/RestaurantContainer';

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            homePageData: HomePageData,
        }
      }

    componentDidMount = () => {
        console.log(HomePageData);
        console.log(HomePageData.categories);
    }
    
    render() {
        return (
            <div className="HomePage">
                <SearchBar provinces={this.state.homePageData.provinces} />
                <NavigationBar />
                <span>ผลการค้นหาร้านอาหารและเครื่องดื่ม ทั้งหมด</span>
                <FilterContainer />
                <RestaurantContainer />
            </div>
        )
    }
}

export default HomePage