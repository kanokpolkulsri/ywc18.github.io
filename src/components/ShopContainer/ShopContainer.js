import React from 'react';
import DOMPurify from 'dompurify'
import { Button, Tag } from 'antd';

import './ShopContainer.css';

class ShopContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
      }

    componentDidMount = () => {
    }

    renderShopCardTitle = (shopNameTH, isOpen) => {
        return (
            <div class="text-black text-xl font-semibold">
                <div class="flex justify-between">
                    <div class="tems-center">
                        {shopNameTH}
                        {isOpen === "Y" && <Tag className="ml-4" color="rgb(27, 195, 0)">เปิดให้บริการ</Tag>}
                        {isOpen === "N" && <Tag className="ml-4" color="rgb(153, 153, 153)">ปิดแล้ว</Tag>}
                    </div>
                </div>
            </div>
        );
    }

    renderShopCardSubTitle = (categoryName, priceLevel, addressDistrictName, addressProvinceName) => {
        const price = this.props.priceRange[priceLevel - 1];
        const address = addressDistrictName + " " + addressProvinceName;
        return (
            <div className="ShopCardSubTitle ShopCardGrayText flex font-sm flex-wrap mt-2">
                {categoryName && <div>{categoryName}</div>}
                {price && <><div className="mx-3">|</div><div>{price}</div></>}
                {address && <><div className="mx-3">|</div><div>{address}</div></>}
            </div>
        );
    }

    renderShopCardContent = (text) => {
        return (
            <div className="ShopCardGrayText ShopCardContent font-base mb-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
        );
    }

    renderShopCardRecommend = (items) => {
        if (items && items.length > 0) {
            const renderItems = items.map((item) => {
                return <div className="mr-1">{item}</div>;
            });
            return (
                <div className="ShopCardGrayText flex font-base flex-wrap items-center  mb-2">
                    <div className="ShopCardBoldText mr-2 font-medium">สินค้าแนะนำ:</div>
                    {renderItems}
                </div>
            );
        }
    }

    getIconUrl = (text) => {
        switch(text) {
            case "ที่จอดรถ":
                return "https://search-merchant.xn--42caj4e6bk1f5b1j.com/images/facilities/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%AD%E0%B8%94%E0%B8%A3%E0%B8%96.png";
            case "รับจองล่วงหน้า":
                return "https://search-merchant.xn--42caj4e6bk1f5b1j.com/images/facilities/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%88%E0%B8%AD%E0%B8%87%E0%B8%A5%E0%B9%88%E0%B8%A7%E0%B8%87%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2.png";
            case "สามารถนำสัตว์เลี้ยงเข้าได้":
                return "https://search-merchant.xn--42caj4e6bk1f5b1j.com/images/facilities/%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%96%E0%B8%99%E0%B8%B3%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A7%E0%B9%8C%E0%B9%80%E0%B8%A5%E0%B8%B5%E0%B9%89%E0%B8%A2%E0%B8%87%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B9%84%E0%B8%94%E0%B9%89.png";
            case "รับบัตรเครดิต":
                return "https://search-merchant.xn--42caj4e6bk1f5b1j.com/images/facilities/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%94%E0%B8%B4%E0%B8%95.png";
            case "จำหน่ายเครื่องดื่มแอลกอฮอล์":
                return "https://search-merchant.xn--42caj4e6bk1f5b1j.com/images/facilities/%E0%B8%88%E0%B8%B3%E0%B8%AB%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B9%81%E0%B8%AD%E0%B8%A5%E0%B8%81%E0%B8%AD%E0%B8%AE%E0%B8%AD%E0%B8%A5%E0%B9%8C.png";
            default:
                return;
        }
    }

    renderShopCardFacilities = (facilities) => {
        if (facilities && facilities.length > 0) {
            const renderFaciIcons = facilities.map((faci) => {
                return (
                    <div className="ShopCardFacilities">
                        <img className="ShopCardFaciIcon" alt="" src={this.getIconUrl(faci)} />
                    </div>
                );
            });
            return (
                <div className="ShopCardGrayText flex font-base flex-wrap mb-4 mt-4">
                    {renderFaciIcons}
                </div>
            );
        }
    }

    renderShopCard = () => {
        return this.props.merchants.map((merchant) => {
            return (
                (
                    <div className="grid grid-cols-1 gap-2 mb-2">
                        <div className="ShopCard lg:flex">
                            <div className="ShopCardImageContainer">
                                <div className="ShopCardImage w-full lg:max-w-xs" style={{ backgroundImage: 'url('+merchant.coverImageId+')'}}></div>
                            </div>
                            <div className="ShopCardContent p-4 flex-1">
                                {this.renderShopCardTitle(merchant.shopNameTH, merchant.isOpen)}
                                {this.renderShopCardSubTitle(merchant.categoryName, merchant.priceLevel, merchant.addressDistrictName, merchant.addressProvinceName)}
                                <div className="Divider"></div>
                                {this.renderShopCardContent(merchant.highlightText)}
                                {this.renderShopCardRecommend(merchant.recommendedItems)}
                                {this.renderShopCardFacilities(merchant.facilities)}
                            </div>
                        </div>
                    </div>
                )
            );
        });
    }

    renderLoadMoreButton = () => {
        return (
            <Button className="ButtonLoadMore mx-auto w-full max-w-sm block">ดูเพิ่มเติม</Button>
        );
    }
    
    render() {
        return (
            <div className="ShopContainer flex-1">
                <div className="flex-1">
                    {this.renderShopCard()}
                    {this.renderLoadMoreButton()}
                </div>
            </div>
        )
    }
}

export default ShopContainer