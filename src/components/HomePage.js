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
            merchants: [],

            //filters
            selectedCategory: 0,
            selectedProvince: -1,
        }
    }

    getMockCategories = (homePageData) => {
        const mockSubCategories = [
            {
                name: "สินค้าทั้งหมด",
                subcategories: ["ร้านเว็บตามสั่ง"],
            },
            {
                name: "แฟชั่น",
                subcategories: ["ร้านขายเสื้อผ้า / เครื่องประดับ / สินค้าแฟชั่น"],
            },
            {
                name: "ร้านอาหาร",
                subcategories: ["อาหารทั่วไป อาหารตามสั่ง อาหารจานเดียว"],
            },
        ];
        return mockSubCategories.concat(homePageData.categories);
    }

    getMockMerchants = (homePageData) => {
        const mockMerchants = [
            {
                "shopNameTH": "YWC Chiang Mai",
                "categoryName": "ร้านเว็บตามสั่ง",
                "subcategoryName": "",
                "coverImageId": "https://ywc18.ywc.in.th/_nuxt/img/ad2bf40.webp",
                "facilities": ["รับบัตรเครดิต", "จำหน่ายเครื่องดื่มแอลกอฮอล์"],
                "priceLevel": 3,
                "isOpen": "Y",
                "highlightText": "new normal, new web, new world!",
                "recommendedItems": ["งานร้อน", "งานคุณภาพ"],
                "addressProvinceName": "สมุทรปราการ",
                "addressDistrictName": ""
              }
        ];
        return mockMerchants.concat(homePageData.merchants);
    }

    componentWillMount = async () => {
        let result = await axios.get('https://panjs.com/ywc18.json');
        let homePageData = result.status === 200 ? result.data : HomePageData;
        
        homePageData.categories = this.getMockCategories(homePageData);
        homePageData.merchants = this.getMockMerchants(homePageData);
        this.setState({ homePageData, merchants: homePageData.merchants });
    }

    onChangeSelectedCategory = (value) => {
        const selectedCategory = this.state.homePageData.categories[value].name;
        const merchants = selectedCategory === "สินค้าทั้งหมด"
            ? this.state.homePageData.merchants.filter(merchant => (
                this.state.selectedProvince === -1 || merchant.addressProvinceName === this.state.homePageData.provinces[this.state.selectedProvince]
            ))
            : this.state.homePageData.merchants.filter(merchant => (
                merchant.categoryName === selectedCategory
                && (this.state.selectedProvince === -1 || merchant.addressProvinceName === this.state.homePageData.provinces[this.state.selectedProvince])
            ));
        this.setState({
            merchants,
            selectedCategory: value,
        });
    }

    onChangeSelectedProvince = (value) => {
        const selectedProvince = this.state.homePageData.provinces[value];
        const merchants = this.state.homePageData.merchants.filter(merchant => (
            merchant.addressProvinceName === selectedProvince
            && merchant.categoryName === this.state.homePageData.categories[this.state.selectedCategory].name
        ));
        this.setState({
            merchants,
            selectedProvince: value,
        });
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
                            selectedCategory={this.state.selectedCategory}
                            onChangeSelectedCategory={this.onChangeSelectedCategory}
                            selectedProvince={this.state.selectedProvince}
                            onChangeSelectedProvince={this.onChangeSelectedProvince}
                        />
                    </div>
                    <ShopContainer
                        priceRange={this.state.homePageData.priceRange}
                        merchants={this.state.merchants}
                    />
                </div>
            </div>
        )
    }
}

export default HomePage