import React, { Component } from 'react';
import './SearchBar.css';
import { EnvironmentFilled } from '@ant-design/icons';

import { Select } from 'antd';
import { Input } from 'antd';

const { Option } = Select;
const { Search } = Input;

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedProvinceChange: -1,
        }
    }

    componentDidMount() {
        this.props.provinces.map((province) => {
            console.log(province);
        })
    }

    renderProvinceOptions() {
        return this.props.provinces.map((province, index) => {
            return (<Option value={index}>{province}</Option>);
        });
    }
    
    render() {
        const onSelectedProvinceChange = (value) => {
            this.setState({ selectedProvinceChange: value });
        }
        return (
            <div className="SearchBar flex justify-between items-center bg-white">
                <div className="LogoContainer px-4 md:px-8 px-4 md:px-8">
                    <a href="/">
                        <img alt="" src="https://search-merchant.คนละครึ่ง.com/images/halfhalf-logo.png" className="LogoImage hidden md:block" />
                        <img alt="" src="https://search-merchant.คนละครึ่ง.com/images/halfhalf-logo-mini.png" className="LogoImage block md:hidden" />
                    </a>
                </div>
                <div className="SearchContainer flex h-full ml-auto h-auto above-the-fold-input items-center rounded-lg overflow-hidden mr-4 md:mr-8">
                    <div className="w-full sm:w-48 h-10 md:mt-0 hidden md:block">
                        <Select
                            onChange={onSelectedProvinceChange}
                            size="large"
                            value={this.state.selectedProvinceChange}
                            className="SelectMap ant-select w-full sm:w-48 h-10 h-10 md:h-10 text-sm ant-select-single ant-select-show-arrow"
                        >
                            <Option value={-1}><EnvironmentFilled type="message" className="FirstOption" theme="outlined" />พื้นที่ใกล้ฉัน</Option>
                            {this.renderProvinceOptions()}
                        </Select>
                    </div>
                    
                    <Search
                        className="TextSearch"
                        placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
                        allowClear
                        size="large"
                    />
                </div>
            </div>
        )
    }
}

export default SearchBar