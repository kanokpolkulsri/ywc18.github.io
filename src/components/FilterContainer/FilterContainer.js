import React, { Component } from 'react';
import { EnvironmentFilled } from '@ant-design/icons';
import { Radio, Select } from 'antd';

import './FilterContainer.css';

const { Option } = Select;

class FilterContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCategory: 0,
            selectedProvince: -1,
            selectedPriceRange: 0,
            selectedSubCategory: null,
        }
      }

    componentDidMount = () => {
        this.setState({
            selectedCategory: this.props.selectedCategory || 0,
            selectedProvince: this.props.selectedProvince || -1,
            selectedPriceRange: this.props.selectedPriceRange || 0,
        });
    }

    renderOptions = (options) => {
        if(options && options.length > 0) {
            return options.map((province, index) => {
                return (<Option key={index} value={index}>{province}</Option>);
            });
        }
    }

    renderCategoryRadios = () => {
        return this.props.categories.map((category, index) => {
            return <Radio className="Radio" key={index} value={index}>{category.name}</Radio>;
        });
    }

    renderCategoryContainer = () => {
        const onCategoryFilterChange = (e) => {
            this.setState({ selectedCategory: e.target.value});
            this.props.onChangeSelectedCategory(e.target.value);
        };
        return this.props.categories && this.props.categories.length > 0 && (
            <div className="CategoryContainer">
                <div className="text-base font-semibold text-black">
                    ประเภทร้านค้า
                </div>
                <Radio.Group onChange={onCategoryFilterChange} value={this.state.selectedCategory}>
                    <div className="mt-2">
                        {this.renderCategoryRadios()}
                    </div>
                </Radio.Group>
            </div>
        );
    }

    renderMapSearch = () => {
        const onSelectedProvinceChange = (value) => {
            this.setState({ selectedProvince: value });
            this.props.onChangeSelectedProvince(value);
        };
        return (
            <div className="w-full h-10 mt-2">
                <Select
                    onChange={onSelectedProvinceChange}
                    size="middle"
                    value={this.state.selectedProvince}
                    className="SelectMap ant-select w-full ant-select-single ant-select-show-arrow"
                >
                    <Option value={-1}><EnvironmentFilled type="message" className="FilterContainerFirstOption" theme="outlined" />พื้นที่ใกล้ฉัน</Option>
                    {this.renderOptions(this.props.provinces)}
                </Select>
            </div>
        );
    }

    renderMapContainer = () => {
        return (
            <div className="MapContainer mt-8">
                <div className="text-base font-semibold text-black">
                    จังหวัด/ใกล้ฉัน
                </div>
                {this.renderMapSearch()}
            </div>
        );
    }

    renderPriceRangeSearch = () => {
        const onSelectedPriceRangeChange = (value) => {
            this.setState({ selectedPriceRange: value });
            this.props.onChangeSelectedPriceRange(value);
        };
        return (
            <div className="w-full h-10 mt-2">
                <Select
                    onChange={onSelectedPriceRangeChange}
                    size="middle"
                    placeholder="กรุณาเลือก"
                    value={this.state.selectedPriceRange}
                    className="SelectMap ant-select w-full ant-select-single ant-select-show-arrow"
                >
                    {this.renderOptions(this.props.priceRange)}
                </Select>
            </div>
        );
    }

    renderPriceRangeContainer = () => {
        return (
            <div className="PriceRangeContainer mt-8">
                <div className="text-base font-semibold text-black">
                    ราคา
                </div>
                {this.renderPriceRangeSearch()}
            </div>
        );
    }

    renderSubCategoryRadios = () => {
        return this.props.categories[this.state.selectedCategory].subcategories
        && this.props.categories[this.state.selectedCategory].subcategories.map((category, index) => {
            return <Radio className="Radio" key={index} value={index}>{category}</Radio>;
        });
    }

    renderSubCategoryContainer = () => {
        if (this.props.categories) {
            const subCateName = "ประเภท" + this.props.categories[this.state.selectedCategory].name;
            const onSubCategoryFilterChange = (e) => {
                this.setState({ selectedSubCategory: e.target.value});
            };
            return (
                <div className="SubCategoryContainer mt-8">
                    <div className="text-base font-semibold text-black">
                        {subCateName}
                    </div>
                    <Radio.Group onChange={onSubCategoryFilterChange} value={this.state.selectedSubCategory}>
                        <div className="mt-2">
                            {this.renderSubCategoryRadios()}
                        </div>
                    </Radio.Group>
                </div>
            );
        }
    }
    
    render() {
        return (
            <div className="bg-white p-4">
                {this.renderCategoryContainer()}
                {this.renderMapContainer()}
                {this.renderPriceRangeContainer()}
                {this.renderSubCategoryContainer()}
            </div>
        )
    }
}

export default FilterContainer