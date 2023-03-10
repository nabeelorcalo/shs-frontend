import { Col, Divider, Row, Typography } from "antd";
import React from "react";

const ListingDetails = () => {
  return (
    <div className="listing-details">
      <Row>
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
          <div>
            <Typography className="listing-styles-main">Location</Typography>
          </div>
          <div className="mt-3 mb-3">
            <Typography className="listing-styles-secondary">
              Address
            </Typography>
            <Typography className="listing-description">
              Near Giga Mall, Islamabad
            </Typography>
          </div>
          <div className="mt-4 mb-3">
            <Typography className="listing-styles-secondary">
              Postal Code
            </Typography>
            <Typography className="listing-description">4500</Typography>
          </div>
          <div className="mt-4 mb-3">
            <Typography className="listing-styles-secondary">
              Is it furnished
            </Typography>
            <Typography className="listing-description">Yes</Typography>
          </div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="border-solid border-1 ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7050661.956303704!2d69.34807160000001!3d30.3593034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1678279846720!5m2!1sen!2s"
              // width="365"
              height="250"
              style={{ border: "0" }}
              //   allowfullscreen=""
              loading="lazy"
              //   referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} >
          <div>
            <Typography className="listing-styles-main">
              Property Details
            </Typography>
          </div>
          <div className="mt-3 mb-3">
            <Typography className="listing-styles-secondary">
              How will you rent your property?
            </Typography>
            <Typography className="listing-description">
              Rooms in shared property
            </Typography>
          </div>
          <div>
            <Row gutter={15}>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Bedrooms in total
                  </Typography>
                  <Typography className="listing-description">2</Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Bedroom for rent
                  </Typography>
                  <Typography className="listing-description">1</Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Bathroom
                  </Typography>
                  <Typography className="listing-description">1</Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Air Conditioning
                  </Typography>
                  <Typography className="listing-description">Yes</Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Heating
                  </Typography>
                  <Typography className="listing-description">Yes</Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Water heating system
                  </Typography>
                  <Typography className="listing-description">Yes</Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Building has
                  </Typography>
                  <Typography className="listing-description">
                    Escalator
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Property
                  </Typography>
                  <Typography className="listing-description">
                    Balcony, Clothes Dryer, Dishwasher
                  </Typography>
                </div>
              </Col>

              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main mt-3 mb-3">
                  BedRoom Details
                </Typography>
                <div className="mt-3 mb-3">
                  <Typography className="listing-styles-secondary">
                    Bed Type
                  </Typography>
                  <Typography className="listing-description">
                    King Bed
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="mt-3 mb-3">
                  <Typography className="listing-styles-secondary">
                    Access to
                  </Typography>
                  <Typography className="listing-description">
                    Balcony
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className="mt-3 mb-3">
                  <Typography className="listing-styles-secondary">
                    Are two people allowed to live in this room
                  </Typography>
                  <Typography className="listing-description">Yes</Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main">
                  Rent and Billing
                </Typography>
              </Col>

              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Monthly Rent
                  </Typography>
                  <Typography className="listing-description">$9.28</Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Payment
                  </Typography>
                  <Typography className="listing-description">Cash</Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Is there any deposit?
                  </Typography>
                  <Typography className="listing-description">Yes</Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Kind of Deposit
                  </Typography>
                  <Typography className="listing-description">50%</Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Bills
                  </Typography>
                  <Typography className="listing-description">
                    Included
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Minimam Salary
                  </Typography>
                  <Typography className="listing-description">
                    2 Months
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    How do you charg for electricity bill
                  </Typography>
                  <Typography className="listing-description">
                    Included
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    How do you charge for gas bill
                  </Typography>
                  <Typography className="listing-description">Fixed</Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main">
                  Rules and Refrence
                </Typography>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Gender
                  </Typography>
                  <Typography className="listing-description">Male</Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Age Range
                  </Typography>
                  <Typography className="listing-description">25-40</Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Preferable
                  </Typography>
                  <Typography className="listing-description">
                    Stuents
                  </Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Couples
                  </Typography>
                  <Typography className="listing-description">
                    Allwoed
                  </Typography>
                </div>
              </Col>
              <Col xxl={4} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Allow to Registered
                  </Typography>
                  <Typography className="listing-description">Yes</Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Smoke
                  </Typography>
                  <Typography className="listing-description">
                    Not Allowed
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Pets
                  </Typography>
                  <Typography className="listing-description">
                    Allowed
                  </Typography>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={12} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Musical Instruments
                  </Typography>
                  <Typography className="listing-description">
                    Allowed
                  </Typography>
                </div>
              </Col>

              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main">
                  Documents for Tenants
                </Typography>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Proof of Income
                  </Typography>
                  <Typography className="listing-description">
                    Salary Salip or bank statement from the tenant of their
                    Sponsor
                  </Typography>
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main">
                  Rental Conditions
                </Typography>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div>
                  <Typography className="listing-styles-secondary">
                    Contract Type
                  </Typography>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div>
                      <Typography className="listing-styles-secondary">
                        Daily
                      </Typography>
                      <Typography className="listing-description">
                        In case a tenant moves in or moves out in the middle of
                        the month they will charge for each day during they live
                        in hostel
                      </Typography>
                    </div>
                  </Col>
                 
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography className="listing-styles-main">
                Cancelation Policy
                </Typography>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div>
                      <Typography className="listing-styles-secondary">
                        Standard Cancellation
                      </Typography>
                      <Typography className="listing-description">
                        In case a tenant moves in or moves out in the middle of
                        the month they will charge for each day during they live
                        in hostel
                      </Typography>
                    </div>
                  </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ListingDetails;
