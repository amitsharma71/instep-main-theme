import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homecategory } from "../../../../Redux/action/categoryWiseAction";
import { Link, useParams } from "react-router-dom";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import Subcaregoryfilter from "./subcaregoryfilter";

const Homecategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.homecategory?.listdata);
  const { categoryName } = useParams();
  useEffect(() => {
    dispatch(homecategory(categoryName));
  }, []);
  console.log(data, "goapl");
  console.log(categoryName);

  return (
    <>
      <Container>
        <div className=" slider_col ">
          <Row>
            {data?.map((item) => {
              return (
                <>
                  <Col lg={2} md={4}>
                    <Subcaregoryfilter />
                    <div className="leftfilter_bar">
                      <div className="margin_bottom">
                        <h4> Filters</h4>
                      </div>
                      <div className="categorieslefftfilter margin_bottom">
                        CATEGORIES
                      </div>
                      <div>
                        <div className="pricealign margin_bottom">
                          <div>Price</div>
                          <input className="pricerange_filter" type="range" />
                        </div>
                        <div className="d-flex  margin_bottom">
                          <div className="leftpricefilter_wid">
                            <select
                              className="pricefilter_left"
                              name="cars"
                              id="cars"
                            >
                              <option value="">Min</option>
                              <option value="">100</option>
                              <option value="">500</option>
                              <option value="">999</option>
                            </select>
                          </div>
                          <div className="priceoption"> to</div>
                          <div className="leftpricefilter_wid">
                            <select
                              className="pricefilter_left"
                              name="cars"
                              id="cars"
                            >
                              <option value="">700</option>
                              <option value="">1500</option>
                              <option value="">1999</option>
                              <option value="">2499+</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="brands_filters">
                          <Accordion defaultActiveKey={["0"]} alwaysOpen>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header className="leftbrand_filter">
                                BRAND
                              </Accordion.Header>
                              <Accordion.Body>
                                <from>
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">HAVELLES</lable>
                                  <br />
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">HAVELLES</lable>
                                  <br />
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">HAVELLES</lable>
                                  <br />
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">HAVELLES</lable>
                                  <br />
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">HAVELLES</lable>
                                </from>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>OFFERS</Accordion.Header>
                              <Accordion.Body>
                                <from>
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">
                                    Buy More, Save More
                                  </lable>
                                  <br />
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">
                                    No Cost EMI
                                  </lable>
                                  <br />
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">
                                    Special Price
                                  </lable>
                                </from>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>DISCOUNT</Accordion.Header>
                              <Accordion.Body>
                                <from>
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">
                                    50% or more
                                  </lable>
                                  <br />
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">
                                    40% or more
                                  </lable>
                                  <br />
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">
                                    20% or more
                                  </lable>
                                </from>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>
                                GST INVOICE AVAILABLE{" "}
                              </Accordion.Header>
                              <Accordion.Body>
                                <from>
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">
                                    GST Invoice Available
                                  </lable>
                                </from>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                              <Accordion.Header>
                                {" "}
                                AVAILABILITY{" "}
                              </Accordion.Header>
                              <Accordion.Body>
                                <from>
                                  <input
                                    type="checkbox"
                                    className="margin_right"
                                  />
                                  <lable className="fontweight">
                                    Include Out of Stock
                                  </lable>
                                </from>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <Link
                      className="carddecorationnone_cat"
                      to={`/productdetail/${item._id}`}
                    >
                      <Card className="shopping_card">
                        <div className="img_div">
                          <Card.Img
                            variant="top"
                            src={item?.image || item?.thumbnail}
                          />
                        </div>
                        <Card.Body>
                          <div className="item_rating">
                            <p className="homerating_cat"> {item?.rating}</p>
                            <p className="homerating_cat"> {item.category}</p>
                          </div>
                          <Card.Title className="crad_text">
                            {item.title}
                          </Card.Title>
                          <Card.Text className="crad_text">
                            {item?.description}
                          </Card.Text>
                          <Card.Text className="crad_text">
                            <h5> ₹ {item?.price}</h5>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                </>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Homecategory;
