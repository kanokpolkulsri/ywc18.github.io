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
            selectedPriceRange: 0,
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
                "categoryName": "ร้านอาหารและเครื่องดื่ม",
                "subcategoryName": "อาหารทั่วไป อาหารตามสั่ง อาหารจานเดียว",
                "coverImageId": "https://ywc18.ywc.in.th/_nuxt/img/ad2bf40.webp",
                "facilities": ["รับบัตรเครดิต", "จำหน่ายเครื่องดื่มแอลกอฮอล์"],
                "priceLevel": 3,
                "isOpen": "Y",
                "highlightText": "new normal, new web, new world!",
                "recommendedItems": ["งานร้อน", "งานคุณภาพ"],
                "addressProvinceName": "สมุทรปราการ",
                "addressDistrictName": ""
            },
            {
                "shopNameTH": "Kanysorn Cafe สาขา 2",
                "categoryName": "สินค้าทั้งหมด",
                "subcategoryName": "สินค้า และ บริการ เกี่ยวกับการตกแต่งบ้าน",
                "coverImageId": "https://images.unsplash.com/photo-1597227772909-a6d166b48b79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
                "facilities": ["ที่จอดรถ", "รับบัตรเครดิต"],
                "priceLevel": 1,
                "isOpen": "Y",
                "highlightText": "<strong>ร้านทุกอย่าง</strong> โต๊ะ ตู้ เตียง",
                "recommendedItems": ["แจกัน", "จานชาม", "เก้าอี้สามขา"],
                "addressProvinceName": "สมุทรปราการ",
                "addressDistrictName": "เขตธนบุรี"
            },
        ];
        return mockMerchants.concat(homePageData.merchants);
    }

    getMockPriceRange = (homePageData) => {
        const mockPriceRange = [
            "ทั้งหมด",
        ];
        return mockPriceRange.concat(homePageData.priceRange);
    }

    componentWillMount = async () => {
        let result = await axios.get('https://panjs.com/ywc18.json');
        let homePageData = result.status === 200 ? result.data : HomePageData;
        
        homePageData.categories = this.getMockCategories(homePageData);
        homePageData.merchants = this.getMockMerchants(homePageData);
        homePageData.priceRange = this.getMockPriceRange(homePageData);
        this.setState({ homePageData, merchants: homePageData.merchants });
    }

    onChangeSelectedCategory = (value) => {
        const selectedCategory = this.state.homePageData.categories[value].name;
        const merchants = selectedCategory === "สินค้าทั้งหมด"
            ? this.state.homePageData.merchants.filter(merchant => (
                (this.state.selectedProvince === -1 || merchant.addressProvinceName === this.state.homePageData.provinces[this.state.selectedProvince])
                && (this.state.selectedPriceRange === 0 || merchant.priceLevel === this.state.selectedPriceRange)
            ))
            : this.state.homePageData.merchants.filter(merchant => (
                merchant.categoryName === selectedCategory
                && (this.state.selectedProvince === -1 || merchant.addressProvinceName === this.state.homePageData.provinces[this.state.selectedProvince])
                && (this.state.selectedPriceRange === 0 || merchant.priceLevel === this.state.selectedPriceRange)
            ));
        this.setState({
            merchants,
            selectedCategory: value,
        });
    }

    onChangeSelectedProvince = (value) => {
        const selectedProvince = this.state.homePageData.provinces[value];
        const merchants = this.state.homePageData.merchants.filter(merchant => (
            (value === -1 || merchant.addressProvinceName === selectedProvince)
            && (this.state.selectedCategory === 0  || merchant.categoryName === this.state.homePageData.categories[this.state.selectedCategory].name)
            && (this.state.selectedPriceRange === 0 || merchant.priceLevel === this.state.selectedPriceRange)
        ));
        this.setState({
            merchants,
            selectedProvince: value,
        });
    }

    onChangeSelectedPriceRange = (value) => {
        const merchants = this.state.homePageData.merchants.filter(merchant => (
            (value === 0 || merchant.priceLevel === value)
            && (this.state.selectedProvince === -1 || merchant.addressProvinceName === this.state.homePageData.provinces[this.state.selectedProvince])
            && (this.state.selectedCategory === 0  || merchant.categoryName === this.state.homePageData.categories[this.state.selectedCategory].name)
        ));
        this.setState({
            merchants,
            selectedPriceRange: value,
        });
    }

    onSetBaseStages = () => {
        this.setState({
            merchants: this.state.homePageData.merchants,
            selectedCategory: 0,
            selectedProvince: -1,
            selectedPriceRange: 0,
        });
    }
    
    render() {
        return (
            <div className="HomePage">
                <SearchBar
                    provinces={this.state.homePageData.provinces}
                    categories={this.state.homePageData.categories}
                    priceRange={this.state.homePageData.priceRange}
                    selectedProvince={this.state.selectedProvince}
                    onChangeSelectedProvince={this.onChangeSelectedProvince}
                    onSetBaseStages={this.onSetBaseStages}
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
                            selectedPriceRange={this.state.selectedPriceRange}
                            onChangeSelectedPriceRange={this.onChangeSelectedPriceRange}
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