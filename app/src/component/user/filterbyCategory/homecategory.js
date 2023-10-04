import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homecategory } from "../../../Redux/action/categoryWiseAction";
import { Link, useParams } from "react-router-dom";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import Subcaregoryfilter from "./SubcaregoryMobilefilter";
import { BiChevronRight } from "react-icons/bi";
import SubCategoryfilter from "./subCategoryfilter";

const Homecategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.homecategory.listdata);
  const { categoryName } = useParams();
  useEffect(() => {
    dispatch(homecategory(categoryName));
  }, [categoryName]);
  console.log(data, "goapl");
  console.log(categoryName);

  return (
    <>
      <div className="slider_col ">
        <Row>
          <Col lg={2}>
            {" "}
            <Subcaregoryfilter />
            <SubCategoryfilter />
          </Col>
          <Col lg={10}>
            <div className="subcarhide">
              <div className="subcategory_topcontent">
                <div>
                  <Link className="home_link" to="/">
                    Home{" "}
                  </Link>
                  <BiChevronRight />
                </div>
              </div>
              <div className="margin_bottom">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <div></div>
              <div className="righthome_filter">
                <h4>Sort By</h4>
                <h4>Popularity</h4>
                <h4>Price--Low to High</h4>
                <h4>Price--High to Low </h4>
                <h4>Newest First </h4>
              </div>
            </div>
            <Row>
              {data &&
                data?.map((item) => {
                  return (
                    <>
                      <Link
                        className="carddecorationnone_cat text_edit"
                        reloadDocumen={true}
                        to={`/productdetail/${item._id}`}
                      >
                        <div className="subcatkitechenmaindiv margin_bottom">
                          <Col lg={3}>
                            <div>
                              <img
                                className="subcatkitchen_image"
                                variant="top"
                                // src={item?.image || item?.thumbnail}
                                src={
                                  item?.image
                                    ? item?.image
                                    : item?.thumbnail.split(":").length > 1
                                    ? item?.thumbnail
                                    : `http://localhost:5000/uploads/${item.thumbnail}`
                                }
                                alt=""
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="p-4">
                              <div className="subcatitem_cont">
                                {" "}
                                {item.title}
                              </div>
                              <div> {item?.description}</div>
                              <div className="kit_homestarticon">
                                {item?.rating}
                              </div>
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="p-4">
                              <h5> ₹{item?.price}</h5>
                            </div>
                          </Col>
                        </div>
                      </Link>
                    </>
                  );
                })}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Homecategory;
