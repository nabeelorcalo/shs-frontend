import React, { useState, useEffect } from "react";
import { Typography, Anchor } from 'antd'
import "./style.scss";
import { IconWebLocation, IconStatusCheck } from '../../../assets/images'
import PageHeader from "../../../components/PageHeader";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import CancellationPolicy from "./CancellationPolicy";
import HowToBookPropperty from "./HowToBookPropperty";
import AgentDetail from "./AgentDetail";

// Temporary
import thumb1 from '../../../assets/images/gallery/thumb1.png'
import thumb2 from '../../../assets/images/gallery/thumb2.png'
import thumb3 from '../../../assets/images/gallery/thumb3.png'
import thumb4 from '../../../assets/images/gallery/thumb4.png'
import thumb5 from '../../../assets/images/gallery/thumb5.png'
import gal1 from '../../../assets/images/gallery/gal1.png'

const images = [
  {
    original: gal1,
    thumbnail: thumb1,
  },
  {
    original: gal1,
    thumbnail: thumb2,
  },
  {
    original: gal1,
    thumbnail: thumb3,
  },
  {
    original: gal1,
    thumbnail: thumb4,
  },
  {
    original: gal1,
    thumbnail: thumb5,
  },
];

const AccPropertyDetail = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const anchorItems = [
    {
      key: 'Overview',
      href: '#Overview',
      title: 'Overview',
    },
    {
      key: 'Pricing',
      href: '#Pricing',
      title: 'Pricing',
    },
    {
      key: 'Cancellation-Policy',
      href: '#Cancellation-Policy',
      title: 'Cancellation Policy',
    },
    {
      key: 'HowtoBookThisProperty',
      href: '#HowtoBookThisProperty',
      title: 'How to Book This Property',
    },
    {
      key: 'AgentDetail',
      href: '#AgentDetail',
      title: 'Agent Detail',
    },
  ]



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="property-detail">
      <PageHeader
        title="Accommodation"
        bordered
      />
      <div className="property-detail-content">
        <div className="property-detail-content-left">
          <div className="property-gallery">
            <ImageGallery
              items={images}
              showNav={false}
              thumbnailPosition={'left'}
              showFullscreenButton={false}
              useBrowserFullscreen={false}
              showPlayButton={false}
              showBullets={true}
              autoPlay={false}
              disableThumbnailScroll={false}
              slideDuration={450}
              slideInterval={3000}
              onImageError={() => console.log('image error')}
              onThumbnailError={() => console.log('thumbanil errror')}
            />
          </div>

          <div className="property-heading">
            <Typography.Title level={3}>
              {`Black horse Lane, London, E17 6DS`}
            </Typography.Title>

            <div className="property-heading-location">
              <IconWebLocation />
              Location On Map
            </div>
          </div>

          <div className="property-detail-description">
            <Typography>
              Your Nest in Mitte - an all-inclusive one-bedroom apartment directly in the heart of Berlin at Rosenthaler Platz. High-quality furnishings characterize the apartment, first move after renovation—ideal apartment for singles or couples looking for a plug-and-play solution in the best location in Berlin.
            </Typography>
          </div>

          <div className="property-detial-card">
            <Anchor
              offsetTop={80}
              direction="horizontal"
              items={anchorItems}
            />
            <div id="Overview" className="property-card-section">
              <div className="section-content">
                <div className="card-section-title">
                  Overview
                </div>
                <div className="overview-content">
                  <div className="overview-facilities">
                    <div className="overview-section-label">Facilities</div>
                    <ul className="overview-list facilities-list">
                      <li>Living room</li>
                      <li>Toilet</li>
                      <li>Kitchen</li>
                      <li>Basement</li>
                      <li>Parking</li>
                    </ul>
                  </div>
                </div>

                <div className="overview-content">
                  <div className="overview-amenities">
                    <div className="overview-section-label">Amenities</div>
                    <ul className="overview-list amenities-list">
                      <li>WiFi</li>
                      <li>Living Room Furniture</li>
                      <li>Bed</li>
                      <li>TV</li>
                      <li>Private Kitchenware</li>
                      <li>Washing machine</li>
                      <li>Closet</li>
                      <li>Central Heating</li>
                      <li>Wood flooring</li>
                      <li>Desk</li>
                      <li>Air Conditioning</li>
                      <li>Dryer</li>
                      <li>Dishwasher</li>
                      <li>Access Friendly</li>
                      <li>Bedroom Lock</li>
                    </ul>
                  </div>
                </div>

                <div className="overview-content">
                  <div className="overview-amenities">
                    <div className="overview-section-label">House Rules</div>
                    <ul className="overview-list house-rules">
                      <li>Playing Musical Instruments Negotiable</li>
                      <li>Pets Not Allowed</li>
                      <li>Smoking Not Allowed </li>
                    </ul>
                  </div>
                </div>

                <div className="overview-content">
                  <div className="overview-amenities">
                    <div className="overview-section-label">Preferred tenant</div>
                    <ul className="overview-list preferred-tenant">
                      <li>
                        <span>Age</span>
                        <span>No Preference</span>
                      </li>
                      <li>
                        <span>Gender</span>
                        <span>No Preference</span>
                      </li>
                      <li>
                        <span>Tenant Type</span>
                        <span>Working professionals only</span>
                      </li>
                      <li>
                        <span>Suitable for couples</span>
                        <span>Yes</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div id="Pricing" className="property-card-section">
              <div className="section-content">
                <div className="card-section-title">
                  Pricing
                </div>

                <div className="pricing-content">
                  <div className="pricint-content-subtitle">
                    Add your booking dates to see what you'll pay
                  </div>
                  <div className="pricing-content-card">
                    <ul className="pricing-card-list">
                      <li>
                        <div className="pricing-item-title">Contract Type</div>
                        <div className="pricing-item-value monthly">Monthly</div>
                      </li>
                      <li>
                        <div className="pricing-item-title">Minimum stay</div>
                        <div className="pricing-item-value monthly">3 months</div>
                      </li>
                      <li>
                        <div className="pricing-item-title">Deposits</div>
                        <div className="pricing-item-value monthly">£3000</div>
                      </li>
                      <li>
                        <div className="pricing-item-title">During your stay</div>

                        <div className="during-your-stay">
                          <div className="during-your-stay-inner monthly-rent">
                            <div className="during-your-stay-title">Rent</div>
                            <div className="monthly-rent-row">
                              <span className="monthly-rent-month">Monthly</span>
                              <span className="monthly-rent-rent">£1990</span>
                            </div>
                          </div>

                          <div className="during-your-stay-inner utilities">
                            <div className="during-your-stay-title">Utilities</div>
                            <ul className="utilities-list">
                              <li>
                                <div className="utilities-list-title">
                                  Electricity
                                </div>
                                <div className="utilities-list-right">
                                  <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                                  <div className="utilities-list-item-value">Included</div>
                                </div>
                              </li>
                              <li>
                                <div className="utilities-list-title">
                                  Water
                                </div>
                                <div className="utilities-list-right">
                                  <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                                  <div className="utilities-list-item-value">Included</div>
                                </div>
                              </li>
                              <li>
                                <div className="utilities-list-title">
                                  Gas
                                </div>
                                <div className="utilities-list-right">
                                  <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                                  <div className="utilities-list-item-value">Included</div>
                                </div>
                              </li>
                              <li>
                                <div className="utilities-list-title">
                                  Internet
                                </div>
                                <div className="utilities-list-right">
                                  <div className="utilities-list-item-satus"><IconStatusCheck /></div>
                                  <div className="utilities-list-item-value">Included</div>
                                </div>
                              </li>
                              <li>
                                <div className="utilities-list-title">
                                  Broadcasting fee
                                </div>
                                <div className="utilities-list-right">
                                  <div className="utilities-list-item-value">£19 monthly(est.)</div>
                                </div>
                              </li>
                              <li>
                                <div className="utilities-list-title">
                                  Cleaning
                                </div>
                                <div className="utilities-list-right">
                                  <div className="utilities-list-item-value">£100 at move-out</div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="pricing-table-discount-offer">
                        15 % off between 1 and 6 months Bookings
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div id="Cancellation-Policy" className="property-card-section">
              <div className="section-content">
                <div className="card-section-title">
                  Cancellation Policy
                </div>

                <CancellationPolicy />

              </div>
            </div>

            <div id="HowtoBookThisProperty" className="property-card-section">
              <div className="section-content">
                <div className="card-section-title">
                  How To Book This Property
                </div>

                <HowToBookPropperty />

              </div>
            </div>

            <div id="AgentDetail" className="property-card-section">
              <div className="section-content">
                <div className="card-section-title">
                  Agent Detail
                </div>

                <AgentDetail />

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AccPropertyDetail