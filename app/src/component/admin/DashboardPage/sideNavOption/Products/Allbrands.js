import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { addbrands } from "../../../../../Redux/action/createNewBrandsAction";
import { allSubCategoryList } from "../../../../../Redux/action/getSubcategoryAction";
import { Col, Dropdown, Row, Table } from "react-bootstrap";
import { BiDotsVerticalRounded } from "react-icons/bi";

const Allsubcategory = () => {
  const dispatch = useDispatch();
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
  const [selectedBrand, setSelectedBrands] = useState(""); // State to store the selected category

  // const handleCategoryChange = (e) => {
  //   setSelectedBrands(e.target.value); // Update the state when the select value changes
  // };

  const getbrand = useSelector(
    (state) => state?.getsubsategorylistdata?.listdata
  );

  console.log(getbrand, "zzz");
  const onSubmit = (values) => {
    console.log(values.brand, "dddddddddddd");
    // let scategorynew = { brand: "values" };

    let asd = {
      subcategory_id: selectedSubcategoryId,
      brand: values.brand,
    };

    dispatch(addbrands(asd));
  };
  useEffect(() => {
    dispatch(allSubCategoryList());
  }, []);

  var selectedId;
  const handleCategoryChange2 = (event) => {
    selectedId = event.target.value;
    console.log(selectedId, "selectedSubcategoryId");
    setSelectedSubcategoryId(selectedId);
  };
  console.log(selectedSubcategoryId, "selectedSubcategoryId");

  return (
    <>
      <Row>
        <Col lg={12}>
          <div className="admin_toppadding ">
            <Col className="Admin_dashboard " lg={12}>
              <h3> Add New Brands</h3>
            </Col>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Form
            onSubmit={onSubmit}
            initialValues={{ brand: "" }}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <select
                    className="subcategory_drop margin_bottom"
                    onChange={handleCategoryChange2}
                    value={selectedSubcategoryId}
                  >
                    <option value="">Select a Subcategory</option>
                    {getbrand?.map((i) => (
                      <option key={i._id} value={i._id}>
                        {i.subcategory}
                      </option>
                    ))}
                  </select>
                  {/* <input
                    type="text"
                    value={selectedBrand}
                    readOnly
                    className="addnewproduct_changes right_Addnew"
                  /> */}
                  <div className="margin_bottom">
                    <Field
                      className="subcategory_drop"
                      name="brand"
                      component="input"
                      type="text"
                      placeholder="brand"
                      required
                    />
                  </div>
                </div>
              </form>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <div className="categoryadd_new margin_bottom">
            <Table responsive="md">
              <thead>
                <tr>
                  <th>S/L</th>
                  <th> Brand Name</th>
                  <th className="d-flex justify-content-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td className="d-flex justify-content-end">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant=""
                        id="dropdown-basic"
                        className="focusotoggle"
                      >
                        <BiDotsVerticalRounded className="threedot_tog_gle" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {/* <Dropdown.Item href="#/action-1">
                        {" "}
                        <LuEdit3 /> Edit
                      </Dropdown.Item> */}
                        <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="addcatsubit_button">
              Submit
            </button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Allsubcategory;
