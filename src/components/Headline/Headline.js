import React, { Component } from 'react';
import './Headline.css';

class Headline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedProvinceChange: -1,
        }
    }
    
    render() {
        return (
            <div className="Headline break-word text-xl font-semibold">
                ผลการค้นหาร้านอาหารและเครื่องดื่ม ทั้งหมด
            </div>
        )
    }
}

export default Headline