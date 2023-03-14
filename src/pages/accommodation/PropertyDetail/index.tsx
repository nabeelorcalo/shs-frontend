import React, { useState, useEffect } from "react";
import { Typography, Anchor, Collapse } from 'antd'
import PageHeader from "../../../components/PageHeader";
import ImageGallery from 'react-image-gallery';
import CancellationPolicy from "./CancellationPolicy";
import HowToBookPropperty from "./HowToBookPropperty";
import AgentDetail from "./AgentDetail";
import PropertyOverview from "./PropertyOverview";
import PropertyPricing from "./PropertyPricing";
import BookingRequest from "./BookingRequest";
import { IconWebLocation, IconArrowDown } from '../../../assets/images'
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.scss";

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
                <PropertyOverview />
              </div>
            </div>

            <div id="Pricing" className="property-card-section">
              <div className="section-content">
                <div className="card-section-title">
                  Pricing
                </div>
                <PropertyPricing />
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
        <div className="property-detail-content-right">
          <BookingRequest />

          <div className="booking-request-faq">
            <Collapse
              accordion={true}
              bordered={false}
              expandIcon={({ isActive }) => <IconArrowDown rotate={isActive ? 90 : 0} />}
              expandIconPosition="end"
            >
              <Collapse.Panel header="Verified landlord" key="1">
                Private landlord, with us since 2022 and has had 1 happy tenants.
              </Collapse.Panel>
              <Collapse.Panel header="Property not verified" key="2">
                We have not verified this property yet. You can check its availability and make a request for us to verify it soon. If you prefer, you can also book it directly.
              </Collapse.Panel>
              <Collapse.Panel header="Student help squad guarantee" key="3">
                <div>If the landlord cancels your booking within 48 hours of your move in date, we will either,</div>
                <div>1. Pay for a hotel and help you find somewhere new or,</div>
                <div>2. Refund your money in full.</div>
              </Collapse.Panel>
              <Collapse.Panel header="Property ready for you" key="4">
                Our check-in teams follows up with the property landlord to ensure you get no surprises upon your arrival.
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccPropertyDetail