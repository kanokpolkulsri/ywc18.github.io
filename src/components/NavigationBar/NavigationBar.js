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
            <div className="NavigationBarContainer">
                <div className="NavigateBreadCrumb flex justify-start px-4 md:px-8 py-3 z-10 overflow-x-auto">
                    <span className="Underlined">หน้าแรก</span>
                    <span className="Seperator">/</span>
                    <span className="font-bold">ค้นหา</span>
                </div>
            </div>
        )
    }
}

export default NavigationBar