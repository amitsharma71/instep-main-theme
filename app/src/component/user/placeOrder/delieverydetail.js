import React, { useEffect, useState, useCallback } from "react";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import { TiTick } from "react-icons/ti";
import { FaTruckLoading } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi";
import { getUserId } from "../../../utils/auth";
import { BsColumnsGap, BsPlusCircleFill, BsTags } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import {
  deliveryGetAction,
  deliveryaddress,
} from "../../../Redux/action/deliveryAddress";
import RadioInput from "./radioButton";
import { singleproduct } from "../../../Redux/action/getsingleProduct";
import { CiLocationOn } from "react-icons/ci";
import { paymentOrder } from "../../../Redux/action/paymentOrderAction";
// import { options } from "../../../../../api/router/razorpay";
import useRazorpay from "react-razorpay";

const Delieverydetail = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [showCol, setShowCol] = useState("login");
  const [imageState, setImageState] = useState();
  const [hidedata, setHidata] = useState("");
  const data = useSelector((state) => state?.deliveraddress?.listdata);
  console.log(data, "address");

  // const addressClick = (e) => {
  //   dispatch(deliveryaddress());
  //   console.log(e, "addressClick");
  // };

  const navigate = useNavigate();
  const userLogin = getUserId();
  const dataId = userLogin.id;
  console.log(dataId, "dataId");
  console.log(userLogin, "userLogin");
  const { _id } = useParams();
  const dispatch = useDispatch();
  const myCartL = useSelector((state) => state?.cartdetails.listdata);
  console.log(_id, "gggggg");
  const addressdata = useSelector(
    (state) => state?.deliveryaddressget?.listdata?.data
  );
  console.log(addressdata, "addressdata");

  const getTotalPrice = () => {
    let count = 0;
    if (myCartL && myCartL.length > 0) {
      count = myCartL?.reduce((accumulator, currentValue, index) => {
        return (
          accumulator +
          currentValue?.productDetails[0]?.price * currentValue?.quantity
        );
      }, 0);
    }

    return count;
  };
  console.log(myCartL, "mycartL");

  const getTotalDiscount = () => {
    let count = 0;
    if (myCartL && myCartL.length > 0) {
      count = myCartL?.reduce((accumulator, currentValue, index) => {
        let discountprice =
          (currentValue?.productDetails[0]?.discountpercentage / 100) *
          currentValue?.productDetails[0]?.price *
          currentValue?.quantity;
        console.log(discountprice, "disc");
        return accumulator + discountprice;
      }, 0);

      return count;
    }
  };

  const getDiscountPercentage = () => {
    let count = 0;
    if (myCartL && myCartL.length > 0) {
      count = myCartL?.reduce((accumulator, currentValue, index) => {
        console.log(
          currentValue?.productDetails[0]?.discountpercentage,
          "fwkoejoiwejl"
        );
        return (
          accumulator + currentValue?.productDetails[0]?.discountpercentage
        );
      }, 0);

      console.log(count / myCartL?.length, "ekrfioejroij");
      return count / myCartL?.length;
    }
  };
  useEffect(() => {
    dispatch(
      deliveryGetAction({
        userID: dataId,
      })
    ).then((res) => {
      if (res && res.payload && res.payload.success) {
        setFormVisible(false);
      } else {
        setFormVisible(true);
      }
    });
  }, [dataId]);

  const handleSubmit = (values) => {
    values.userID = dataId;

    dispatch(deliveryaddress(values)).then((res) => {
      if (res) {
        dispatch(deliveryGetAction(values));
      }
    });
    console.log(values, "values");
  };

  const addNewClick = () => {};
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.mobilenumber) {
      errors.mobilenumber = "Required";
    }
    if (!values.pincode) {
      errors.pincode = "Required";
    }
    if (!values.Locality) {
      errors.Locality = "Required";
    }
    if (!values.addresstype) {
      errors.addresstype = "Required";
    }
    if (!values.address) {
      errors.address = "Required";
    }
    if (!values.state) {
      errors.state = "Required";

      if (!values.landmark) {
        errors.landmark = "Required";
      }
      if (!values.AlternateNumber) {
        errors.AlternateNumber = "Required";
      }
    }
    return errors;
  };

  // For radio button

  const [selectedAddressType, setSelectedAddressType] = useState("Home");

  const handleRadioChange = (event, value) => {
    setSelectedAddressType(event.target.value);
    console.log(value, "valuess ", event);
  };

  const handleSubmitradio = (event) => {
    event.preventDefault();
    console.log("Selected address type:", selectedAddressType);

    // You can perform further actions or submit the data to an API here
  };

  const dData = useSelector((state) => state?.singleproduct?.listdata);
  console.log(dData?.price, "dDatadData");

  useEffect(() => {
    dispatch(singleproduct({ _id }));
  }, [_id]);

  // delivery Click

  const deliverClick = (e) => {
    navigate("/allproduct");
    console.log(e, "eeeeee");
  };

  const handleChange = (e) => {
    console.log(e, "aaasss");
  };

  const order = useSelector((state) => state?.paymentorderdata?.listdata);
  // console.log(order?.data?.order?.amount, "orderdata");
  console.log(order, "orderdata");
  console.log(order?.data?.order?.amount, "orderdatasa");

  // const handlePayment = () => {
  //   const load = { amount: "10000" };

  //   dispatch(paymentOrder(load));
  // };
  const [Razorpay, isLoaded] = useRazorpay();

  // useEffect(() => {
  //   // const load = { amount: order?.data?.order?.amount };
  //   // console.log(load, "loaad");
  //   const amount = { amount: dData?.price };
  //   console.log(amount, "loaad");
  //   dispatch(paymentOrder(amount));
  // }, []);

  //

  // const handlePayment = useCallback(() => {
  //   dispatch(paymentOrder())
  //     .then(
  //       (res) => {
  //         // Handle the success scenario here
  //         // console.log("Payment successful", data);

  //         const options = {
  //           key: "rzp_test_Nfb5anftyihnMA",
  //           // amount: Number(order?.data?.order?.amount),
  //           amount: "",
  //           // amount: Number(dData?.price),
  //           currency: "INR",
  //           name: "live's",
  //           description: "Test Transaction",
  //           image:
  //             "https://insteptechnologies.com/wp-content/uploads/2022/04/main-logo.png",
  //           order_id: order?.data?.id,
  //           // order_id: "order_N3rlrwXLpwJZeP",
  //           handler: (res) => {
  //             console.log(res);
  //           },
  //           prefill: {
  //             name: "Amit",
  //             email: "amit71instep@gmail.com",
  //             contact: "9988071171",
  //           },
  //           notes: {
  //             address: "Razorpay Corporate Office",
  //           },
  //           theme: {
  //             color: "#3399cc",
  //           },
  //         };
  //         const rzpay = new Razorpay(options);
  //         rzpay.open();
  //       },
  //       [dispatch, order, dData]
  //     )
  //     .catch((error) => {
  //       // Handle the error scenario here
  //       console.error("Payment failed", error);
  //     });
  // });

  // const handlePayment = useCallback(() => {
  //   const load = { amount: dData?.price };
  //   console.log(load);
  //   dispatch(paymentOrder(load));
  //   const options = {
  //     key: "rzp_test_Nfb5anftyihnMA",
  //     // amount: Number(order?.data?.order?.amount),
  //     // amount: "",
  //     // amount: Number(dData?.price),
  //     currency: "INR",
  //     name: "live's",
  //     description: "Test Transaction",
  //     image:
  //       "https://insteptechnologies.com/wp-content/uploads/2022/04/main-logo.png",
  //     order_id: order?.data?.id,
  //     // order_id: "order_N3rlrwXLpwJZeP",
  //     handler: (res) => {
  //       console.log(res);
  //     },
  //     prefill: {
  //       name: "Amit",
  //       email: "amit71instep@gmail.com",
  //       contact: "9988071171",
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const rzpay = new Razorpay(options);
  //   rzpay.open();
  // }, [dispatch, order, dData]);

  const handlePayment = useCallback(() => {
    const load = { amount: dData?.price };
    console.log(load);
    dispatch(paymentOrder(load));

    // dispatch(paymentOrder(load)).then((res) => {
    //   if (res) {
    //     console.log(res);
    //     console.log(res.payload.data.success, " Success");
    //     if (res.payload.data.success == true) {
    //       const orderAmount = order?.data?.order?.amount;
    //       if (orderAmount) {
    //         const options = {
    //           key: "rzp_test_Nfb5anftyihnMA", // Replace with your actual Razorpay key
    //           amount: orderAmount,

    //           currency: "INR",
    //           name: "instep cart",
    //           description: "Test Transaction",
    //           image:
    //             "https://insteptechnologies.com/wp-content/uploads/2022/04/main-logo.png",
    //           order_id: order?.data?.order?.id, // This is a sample Order ID, replace with a real one
    //           handler: async (response) => {
    //             try {
    //               const verifyUrl = "http://localhost:5000/api/capture";
    //               const { data } = await axios.post(verifyUrl, response);
    //               console.log("Payment response:", data);
    //             } catch (error) {
    //               console.error("Payment error:", error);
    //             }
    //           },
    //         };

    //         const rzp = new window.Razorpay(options);
    //         rzp.open();
    //         // }
    //       }
    //     }
    //   }
    // });
  }, [dispatch, order, dData]);

  if (order) {
    const orderAmount = order?.data?.order?.amount;
    if (orderAmount) {
      const options = {
        key: "rzp_test_Nfb5anftyihnMA",
        amount: orderAmount,
        currency: "INR",
        name: "Instep Cart",
        description: "Test Transaction",
        image:
          "https://insteptechnologies.com/wp-content/uploads/2022/04/main-logo.png",
        order_id: order?.data?.id,
        handler: (res) => {
          console.log(res);
        },
        prefill: {
          name: "Amit",
          email: "amit71instep@gmail.com",
          contact: "9988071171",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    }
  }
  // const options = {
  //   key: "rzp_test_Nfb5anftyihnMA",
  //   amount: order?.data?.order?.amount,
  //   // amount: "",
  //   // amount: Number(dData?.price),
  //   currency: "INR",
  //   name: "live's",
  //   description: "Test Transaction",
  //   image:
  //     "https://insteptechnologies.com/wp-content/uploads/2022/04/main-logo.png",
  //   order_id: order?.data?.id,
  //   // order_id: "order_N3rlrwXLpwJZeP",
  //   handler: (res) => {
  //     console.log(res);
  //   },
  //   prefill: {
  //     name: "Amit",
  //     email: "amit71instep@gmail.com",
  //     contact: "9988071171",
  //   },
  //   notes: {
  //     address: "Razorpay Corporate Office",
  //   },
  //   theme: {
  //     color: "#3399cc",
  //   },
  // };

  // const rzpay = new Razorpay(options);
  // rzpay.open();

  useEffect(() => {
    if (isLoaded) {
      handlePayment();
    }
  }, [isLoaded, handlePayment]);

  return (
    <>
      <div className="container">
        <div className=" slider_col margin_bottom">
          <Accordion defaultActiveKey="2">
            <Row>
              <Col lg={9}>
                <div className=" margin_bottom">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div className="loginmain_align ">
                        <div className="">
                          <div className="d-flex mx-2">
                            <div className="logindetail">1</div>
                            <p>LOGIN</p>
                            <p>
                              <TiTick className="logindetail_icon" />
                            </p>
                          </div>
                          <div className="individual_info">
                            <p>{userLogin.username}</p>
                            <p>Contact No.</p>
                          </div>
                        </div>
                        {/* <div>
                        <button
                          className="infochange_button"
                          value="change"
                          onClick={() => setShowCol("login")}
                        >
                          CHANGE
                        </button>
                      </div> */}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col lg={6}>
                          <div className="individual_info login_contalign ">
                            <Link className="loginandsignout" to="./..">
                              Logout & Sign in to another account
                            </Link>
                            <button
                              value="continue checkout"
                              className="logincont"
                              onClick={() => setShowCol("delivery")}
                            >
                              CONTINUE CHECKOUT
                            </button>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div>
                            <p className="advantag_es my-2">
                              Advantage of our secure login
                            </p>
                            <p className="my-1">
                              <FaTruckLoading className="logindel" />
                              Easily Track Orders, Hassle free Returns
                            </p>
                            <p className="my-1">
                              <MdOutlineNotificationsActive className="logindel" />
                              Get Relevant Alerts and Recommendation
                            </p>
                            <p>
                              <BiSolidStarHalf className="logindel" />
                              Wishlist, Reviews, Ratings and more.
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
                <Row>
                  <Col lg={12}>
                    <div className="margin_bottom">
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <div className="loginmain_align">
                            <div className="d-flex my-3">
                              <div className="logindetail">2</div>
                              <div className="d-flex mx-2">
                                <p>DELIVERY ADDRESS</p>
                              </div>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          {/* <div className="formalign"> */}
                          {/* <div className="d-flex  margin_bottom">
                              <MdRadioButtonChecked className="logindetail_icon" />
                              <p>ADD A NEW ADDRESS</p>
                            </div>
                            <div className=" margin_bottom">
                              <button
                                value="use my current location"
                                className="addresslocation"
                              >
                                use my current location
                              </button>
                            </div> */}
                          {addressdata &&
                            addressdata?.map((e) => {
                              console.log(e, "mnsdnsfnsj");
                              return (
                                <>
                                  <div className="d-flex mb-3 ">
                                    <div className="">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="addresstype"
                                        value="Home"
                                        id="flexRadioDefault1"
                                        checked={selectedAddressType === "Home"}
                                        onChange={() => handleRadioChange(e)}
                                      />
                                    </div>
                                    <div>
                                      <div className="selectadressdetail">
                                        <p>{e.name}</p>
                                        <div>{e.addresstype}</div>
                                        <p>{e.mobilenumber}</p>
                                        {/* {e.AlternateNumber} */}
                                      </div>
                                      <div className="bottomdivaddress">
                                        <p>{e.address}</p>
                                        <p>{e.pincode}</p>,<p>{e.landmark}</p>,
                                        <p>{e.Locality}</p>
                                        <p>{e.state}</p>,
                                      </div>
                                      <button
                                        className="readbuttommore mt-2"
                                        onClick={() => deliverClick()}
                                      >
                                        Delivery Here
                                      </button>
                                    </div>
                                  </div>
                                  {/* <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="addresstype"
                                      value="Home"
                                      id="flexRadioDefault1"
                                      checked={selectedAddressType === "Home"}
                                      onChange={handleRadioChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault1"
                                    >
                                      Home (All day delivery)
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="addresstype"
                                      value="Work"
                                      id="flexRadioDefault2"
                                      checked={selectedAddressType === "Work"}
                                      onChange={handleRadioChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault2"
                                    >
                                      Work (Delivery between 10 AM-5 PM)
                                    </label>
                                    <span>hlo baby</span>
                                  </div>
                                  <button type="submit">Submit</button> */}
                                </>
                              );
                            })}
                          <form onSubmit={handleSubmitradio}></form>
                          {isFormVisible && (
                            <Form
                              onSubmit={handleSubmit}
                              validate={validate}
                              render={({
                                handleSubmit,
                                form,
                                submitting,
                                pristine,
                                values,
                              }) => (
                                <form onSubmit={handleSubmit}>
                                  <div className="adsressmaindiv_top margin_bottom">
                                    {/* <Field name="userID">
                                    {({ input, meta }) => (
                                      <div className="fields">
                                        <input
                                          {...input}
                                          type="hidden"
                                          placeholder="Name"
                                          className="inputfiels_place"
                                        />
                                      </div>
                                    )}
                                  </Field> */}
                                    <Field name="name">
                                      {({ input, meta }) => (
                                        <div className="fields">
                                          <input
                                            {...input}
                                            type="text"
                                            placeholder="Name"
                                            className="inputfiels_place"
                                          />
                                          {meta.error && meta.touched && (
                                            <span>{meta.error}</span>
                                          )}
                                        </div>
                                      )}
                                    </Field>
                                    <Field name="mobilenumber">
                                      {({ input, meta }) => (
                                        <div className="fields">
                                          <input
                                            {...input}
                                            type="number"
                                            placeholder="10-digit mobile number"
                                            className="inputfiels_place"
                                          />
                                          {meta.error && meta.touched && (
                                            <span>{meta.error}</span>
                                          )}
                                        </div>
                                      )}
                                    </Field>
                                  </div>
                                  <div className="adsressmaindiv_top margin_bottom">
                                    <Field name="pincode">
                                      {({ input, meta }) => (
                                        <div className="fields">
                                          <input
                                            {...input}
                                            type="number"
                                            placeholder="pincode"
                                            className="inputfiels_place"
                                          />
                                          {meta.error && meta.touched && (
                                            <span>{meta.error}</span>
                                          )}
                                        </div>
                                      )}
                                    </Field>
                                    <Field name="Locality">
                                      {({ input, meta }) => (
                                        <div className="fields">
                                          <input
                                            {...input}
                                            type="text"
                                            placeholder="locality"
                                            className="inputfiels_place"
                                          />
                                          {meta.error && meta.touched && (
                                            <span>{meta.error}</span>
                                          )}
                                        </div>
                                      )}
                                    </Field>
                                  </div>
                                  {/* <Field name="addresstype">
                                  {({ input, meta }) => (
                                    <div className="addressbottommain margin_bottom">
                                      <input
                                        {...input}
                                        type="text"
                                        placeholder="address"
                                        className="addressmaininput"
                                      />
                                      {meta.error && meta.touched && (
                                        <span>{meta.error}</span>
                                      )}
                                    </div>
                                  )}
                                </Field> */}
                                  <Field name="address">
                                    {({ input, meta }) => (
                                      <div className="addressbottommain margin_bottom">
                                        <input
                                          {...input}
                                          type="text"
                                          placeholder="address"
                                          className="addressmaininput"
                                        />
                                        {meta.error && meta.touched && (
                                          <span>{meta.error}</span>
                                        )}
                                      </div>
                                    )}
                                  </Field>
                                  <div className="adsressmaindiv_top margin_bottom">
                                    <Field name="state">
                                      {({ input, meta }) => (
                                        <div className="fields">
                                          <input
                                            {...input}
                                            type="text"
                                            placeholder="City/District/Town"
                                            className="inputfiels_place"
                                          />
                                          {meta.error && meta.touched && (
                                            <span>{meta.error}</span>
                                          )}
                                        </div>
                                      )}
                                    </Field>
                                  </div>
                                  <div className="adsressmaindiv_top margin_bottom">
                                    <Field name="landmark">
                                      {({ input, meta }) => (
                                        <div className="fields">
                                          <input
                                            {...input}
                                            type="text"
                                            placeholder="landmark"
                                            className="inputfiels_place"
                                          />
                                          {meta.error && meta.touched && (
                                            <span>{meta.error}</span>
                                          )}
                                        </div>
                                      )}
                                    </Field>

                                    <Field name="AlternateNumber">
                                      {({ input, meta }) => (
                                        <div className="fields">
                                          <input
                                            {...input}
                                            type="number"
                                            placeholder="Alternate phone (optinal)"
                                            className="inputfiels_place"
                                          />
                                          {meta.error && meta.touched && (
                                            <span>{meta.error}</span>
                                          )}
                                        </div>
                                      )}
                                    </Field>
                                  </div>
                                  {/* <div className="buttons">
                                  <button type="submit" disabled={submitting}>
                                    Submit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                  >
                                    Reset
                                  </button>
                                </div> */}
                                  <p>Address Type</p>
                                  <div className="delivery_place margin_bottom">
                                    {/* <div>
                                    <p>
                                      {" "}
                                      <input type="radio" />
                                      Home (All day delivery)
                                    </p>
                                  </div>
                                  <div>
                                    <p>
                                      <input type="radio" />
                                      Work (Delivery between 10 AM-5 PM)
                                    </p>
                                  </div> */}
                                    <div className="form-check">
                                      <Field
                                        name="addresstype"
                                        type="radio"
                                        value="Home"
                                        id="flexRadioDefault1"
                                        component={RadioInput}
                                        label="Home (All day delivery)"
                                      />
                                    </div>
                                    <div className="form-check">
                                      <Field
                                        name="addresstype"
                                        type="radio"
                                        value="Work"
                                        id="flexRadioDefault2"
                                        component={RadioInput}
                                        label="Work (Delivery between 10 AM-5 PM)"
                                      />
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    value="use my current location"
                                    className="addresslocation"
                                  >
                                    SAVE AND DELIVER HERE
                                  </button>
                                  {/* <Field
                                      name="addresstype"
                                      type="radio"
                                      value="Home"
                                      id="flexRadioDefault1"
                                      component={RadioInput}
                                      label="Home (All day delivery)"
                                    >
                                      <input>
                                      </input>
                                    </Field> */}
                                </form>
                              )}
                            />
                          )}
                          {/* </div> */}
                          <Row>
                            <Col>
                              <div
                                className="addnew_address"
                                onClick={() => setFormVisible(!isFormVisible)}
                              >
                                <div>
                                  <BsPlusCircleFill className="logindetail_icon" />
                                </div>
                                <div>
                                  <p>Add New</p>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                    <div className=" margin_bottom">
                      <Accordion.Item
                        eventKey="2"
                        onChange={() => handleChange()}
                      >
                        <Accordion.Header>
                          <div id="collapseOne" className="loginmain_align">
                            <div className="d-flex my-3">
                              <div className="logindetail">3</div>
                              <div className="d-flex mx-2">
                                <p>ORDER SUMMARY</p>
                              </div>
                            </div>
                          </div>
                        </Accordion.Header>

                        <Accordion.Body>
                          <Row>
                            <Col lg={4}>
                              <img
                                className="subcatkitchen_image"
                                variant="top"
                                // src={item?.image || item?.thumbnail}
                                src={
                                  dData.thumbnail
                                    ? `http://localhost:5000/uploads/${dData.thumbnail}`
                                    : ""
                                }
                                alt=""
                              />
                            </Col>
                            <Col lg={8}>
                              <Card className="shoppingcard_bor">
                                <Card.Body>
                                  <Card.Title>
                                    <h4>{dData.title}</h4>
                                  </Card.Title>
                                  <Card.Subtitle className="mb-2 text-muted">
                                    <h5>
                                      Extra ₹ {dData.discountPercentage}..Off
                                    </h5>
                                  </Card.Subtitle>
                                  <Card.Subtitle className="mb-2">
                                    <h1>₹ {dData.price}</h1>
                                  </Card.Subtitle>
                                  {/* <Card.Subtitle className="mb-2 discriptionoffers_product text-muted">
                                    <h6> Available offers</h6>
                                    <p>
                                      {" "}
                                      <BsTags className="validpffers_icon" />
                                      <span>Bank Offer10%</span> off on Axis
                                      Bank Credit Card and EMI Transactions, up
                                      to ₹1000, on orders of ₹5,000 and above
                                      <span>T&C</span>
                                    </p>
                                    <p>
                                      {" "}
                                      <BsTags className="validpffers_icon" />
                                      <span>Special Price</span>Get extra ₹15901
                                      off (price inclusive of cashback/coupon)
                                      <span>T&C</span>
                                    </p>
                                    <p>View 10 more offers</p>
                                  </Card.Subtitle> */}
                                  {/* <div className="delivery_code margin_bottom">
                                    <h5>Delivery</h5>
                                    <div>
                                      <CiLocationOn className="deliverylocationcode" />
                                      <input
                                        type="text"
                                        placeholder="Enter Delivery Pincode"
                                        className="pincode_bar"
                                      />
                                    </div>
                                  </div> */}
                                  <Card.Text>
                                    <div className="d-flex ">
                                      <h6 className=" ">Description:</h6>
                                      <p className="mainpro_rightdescrip margin_bottom">
                                        {dData.description}
                                      </p>
                                    </div>
                                  </Card.Text>
                                  <div className="d-flex ">
                                    <h6>Highlights</h6>
                                    <div className="d-flex px-5">
                                      <ul className="specification">
                                        <td>{dData?.brand?.[0]?.brand}</td>
                                        <td>
                                          {dData?.category?.[0]?.category}
                                        </td>
                                        <td>
                                          {dData?.subcategory?.[0]?.subcategory}
                                        </td>
                                        <li>{dData.title}</li>
                                      </ul>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                    {/* <div className="borderforall_detail"> */}

                    {/* </div> */}
                    {/* <Row>
                      <Col lg={12}>
                        <div
                          className="addnew_address"
                          onClick={() => {
                            setShowCol("delivery");
                          }}
                        >
                          {/* <div>
                            <BsPlusCircleFill className="logindetail_icon" />
                          </div> */}
                    <div>
                      Order Confirmation email <space />
                      <strong>{userLogin?.userEmail}</strong>
                    </div>
                    <Button onClick={(e) => handlePayment()}>Continue</Button>
                  </Col>
                </Row>
              </Col>
              <Col lg={3}>
                <div className="rightpricedetail margin_bottom">
                  <div className="addcartpricede_tail margin_bottom ">
                    <h5>PRICE DETAIL</h5>
                  </div>
                  <div className="d-flex justify-content-between  margin_bottom">
                    <p className="totalamountright_">Price</p>
                    <p>₹{getTotalPrice()}</p>
                  </div>
                  <div className="d-flex justify-content-between margin_bottom">
                    <p className="totalamountright_">Discount</p>
                    <span className="discountpercentage_">
                      {getDiscountPercentage()?.toFixed(0)}%
                    </span>
                  </div>
                  <div className="d-flex justify-content-between margin_bottom addcart_delivery">
                    <p className="totalamountright_">Delivery Charges</p>
                    <p>-----------</p>
                  </div>
                  <div className="d-flex justify-content-between margin_bottom addcart_delivery">
                    <h5>Total Amount</h5>
                    <p>₹{getTotalPrice() - getTotalDiscount()?.toFixed(0)}</p>
                  </div>
                  <h6 className="discountpercentage_">
                    Your Will save ₹{getTotalDiscount()?.toFixed(0)} on this
                    order
                  </h6>
                  <div></div>
                  {/* <div className="securityline">
                <SiSpringsecurity className="securepayment_icon" />
                <div>
                  Safe and Secure Payments.Easy returns.100% Authentic products.
                </div>
              </div> */}
                </div>
              </Col>
            </Row>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Delieverydetail;
