import React from "react";
import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { allCategoryList } from "../../../../../Redux/action/getCategoryAction";
import { Col, Dropdown, Row, Table } from "react-bootstrap";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { allSubCategoryList } from "../../../../../Redux/action/getSubcategoryAction";
import {
  typesubcategoryget,
  typesubcategorypost,
} from "../../../../../Redux/action/typesubcatpost";
import Allpagination from "../../../Pagination/pagination";
const Alltypesubcategory = () => {
  const dispatch = useDispatch();
  const [selectedsubCategoryId, setselectedsubCategoryId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store the selected category

  const listCount = useSelector(
    (state) => state?.typesubcategory?.typesublist?.data?.totalDocs
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const getscat = useSelector(
    (state) => state?.getcategorylistdata?.listdata.data
  );

  // const getsubcat = useSelector(
  //   (state) => state?.getsubsategorylistdata?.listdata?.data
  // );

  const getsubcate = useSelector(
    (state) => state?.getsubsategorylistdata?.listdata?.data
  );

  const typesubcatgory = useSelector(
    (state) => state?.typesubcategory?.typesublist?.data?.data
  );
  console.log(typesubcatgory, "typesubcatgory");

  useEffect(() => {
    dispatch(allCategoryList());
    dispatch(allSubCategoryList());
    dispatch(allSubCategoryList());
    dispatch(typesubcategoryget({ page: currentPage, perPage: postPerPage }));
  }, [currentPage]);

  console.log(selectedCategoryId, "selectedCategoryId");
  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategoryId(selectedId);

    const selectedLabel =
      getscat.find((i) => i._id === selectedId)?.category || "";
    setSelectedCategory(selectedLabel);
  };
  var selectedId;
  const handleCategoryChange2 = (event) => {
    selectedId = event.target.value;
    setselectedsubCategoryId(selectedId);
  };
  console.log(
    selectedsubCategoryId,
    "selectedSubcategoryId",
    selectedCategoryId
  );

  const onSubmittype = (value) => {
    console.log(value, "dssdsdsS");

    let typesub = {
      category_id: selectedCategoryId,
      subcategory_id: selectedsubCategoryId,
      typesubcategory: value.typesubcategory,
    };
    dispatch(typesubcategorypost(typesub)).then((res) => {
      if (res.payload.data.sucess) {
        dispatch(typesubcategoryget());
      }
    });
  };
  return (
    <div>
      {" "}
      <Row>
        <Col lg={12}>
          <div className="admin_toppadding ">
            <Col className="Admin_dashboard " lg={12}>
              <h3> Add New TypeSubcategory</h3>
            </Col>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Form
            onSubmit={onSubmittype}
            initialValues={{}}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <div className="cat_select">
                  <div>
                    <select
                      className="subcategory_drop margin_bottom"
                      onChange={handleCategoryChange}
                      value={selectedCategoryId}
                    >
                      <option value="">Select a category</option>
                      {getscat?.map((i) => (
                        <option name="option" key={i._id} value={i._id}>
                          {i.category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="cat_select">
                  <div>
                    <select
                      className="subcategory_drop margin_bottom"
                      onChange={handleCategoryChange2}
                      value={selectedsubCategoryId}
                    >
                      <option value="">Select a subcategory</option>
                      {getsubcate?.map((i) => (
                        <option name="option" key={i._id} value={i._id}>
                          {i.subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <Field
                    className="subcategory_drop"
                    name="typesubcategory"
                    component="input"
                    type="text"
                    placeholder="typesubcategory"
                    required
                  />
                </div>
                <div className="d-flex justify-content-end margin_bottom">
                  <button type="submit" className="addcatsubit_button">
                    Submit
                  </button>
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
                  <th> Subcategory Name</th>
                  <th className="d-flex justify-content-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {typesubcatgory && typesubcatgory.length > 0 && (
                  <>
                    {typesubcatgory.map((e, index) => (
                      <tr key={index}>
                        <td>{(currentPage -1) * postPerPage +(index + 1)}</td>
                        <td>{e.typesubcategory}</td>
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
                              <Dropdown.Item href="#/action-2">
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end">
              <Allpagination
                currentPage={currentPage}
                postPerPage={postPerPage}
                setPostPerPage={setPostPerPage}
                setCurrentPage={setCurrentPage}
                listCount={listCount}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Alltypesubcategory;
