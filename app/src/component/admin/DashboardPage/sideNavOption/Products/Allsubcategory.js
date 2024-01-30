import React, { useEffect, useMemo, useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addsubcategory,
  removeFromSubcategory,
} from "../../../../../Redux/action/createNewSubcategoryAction";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import { allSubCategoryList } from "../../../../../Redux/action/getSubcategoryAction";

import Allpagination from "../../../Pagination/pagination";
import { MdDelete } from "react-icons/md";
import Delete from "../../../deleteModel/delete";
import { allCategoryList } from "../../../../../Redux/action/getCategoryAction";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

const Allsubcategory = () => {
  const dispatch = useDispatch();
  // const [selectedsubCategoryId, setselectedsubCategoryId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false); // State to store the selected category
  const [searchQuery, setSearchQuery] = useState("");
  const [edit, setEdit] = useState();

  const listCount = useSelector(
    (state) => state?.getsubsategorylistdata?.listdata?.totalDocs
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const getscat = useSelector(
    (state) => state?.getcategorylistdata?.listdata.data
  );
  console.log(getscat, "getscat");

  const getsubcat = useSelector(
    (state) => state?.getsubsategorylistdata?.listdata?.data
  );

  const isLoading = useSelector(
    (state) => state?.getsubsategorylistdata?.isLoading
  );

  // const getsubcate = useSelector(
  //   (state) => state?.getsubsategorylistdata?.listdata?.data
  // );

  const typesubcatgory = useSelector(
    (state) => state?.typesubcategory?.typesublist?.data?.data
  );
  console.log(typesubcatgory, "typesubcatgory");

  const onSubmit = (values, form) => {
    let asd = {
      subcategoryData: [
        {
          category_id: values.category,
          subcategory: values.subcategory,
        },
      ],
    };

    dispatch(addsubcategory(asd)).then((res) => {
      console.log(res, "gddgdfgfd")
    })
    toast.success("Successfuly added");
    form.reset();
    setSelectedCategoryId("");
  };

  useEffect(() => {
    dispatch(allCategoryList());
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(
      allSubCategoryList({
        search: searchQuery,
        page: currentPage,
        perPage: postPerPage,
      })
    ).then((res) => {
      // console.log(res,)
      setLoading(false);
    });
  }, [currentPage]);

  console.log(selectedCategoryId, "selectedCategoryId");
  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategoryId(selectedId);

    const selectedLabel =
      getscat.find((i) => i?._id === selectedId)?.category || "";
    setSelectedCategory(selectedLabel);
  };

  const handleClose = () => setShow(false);

  const handleDelete = (id) => {
    dispatch(removeFromSubcategory({ subcategoryid: id })).then((res) => {
      if (res?.payload?.success) {
        dispatch(
          allSubCategoryList({
            search: searchQuery,
            page: currentPage,
            perPage: postPerPage,
          })
        );
      }
      handleClose();
    });
  };
  const [show, setShow] = useState(false);
  const [categoryid, setCategoryid] = useState(null);
  const handleShow = (id) => {
    setCategoryid(id);
    setShow(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e?.target?.value);
    if (e?.target?.value) {
      dispatch(allSubCategoryList({ search: e?.target?.value }));
    } else {
      dispatch(
        allSubCategoryList({
          search: "",
          page: currentPage,
          perPage: postPerPage,
        })
      );
    }
  };
  const handleEdit = (id) => {
    console.log(id, "fdsfdssdgfsf");
    setEdit(id);
  };

  const initialValues = () => {
    let initialValues = {};
    if (edit) {
      initialValues = {
        subcategory: edit?.subcategory,
        category: edit?.category_id,
      };
    } else {
      initialValues = {
        subcategory: "",
        category: "",
      };
    }
    return initialValues;
  };
  return (
    <>
      <Row>
        <Col lg={12}>
          <div className="admin_toppadding">
            <Col className="Admin_dashboard" lg={12}>
              <h3> Add New Subcategory</h3>
            </Col>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Form
            onSubmit={onSubmit}
            initialValues={useMemo(() => initialValues(), [edit])}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <div className="cat_select">
                  <div>
                    <Field name="category">
                      {({ input, meta }) => (
                        <select
                          {...input}
                          className="subcategory_drop margin_bottom"
                          // onChange={handleCategoryChange}
                          // value={selectedCategoryId}
                        >
                          <option value="">Select a category</option>
                          {getscat &&
                            getscat?.map((i) => (
                              <option name="option" key={i?._id} value={i?._id}>
                                {i?.category}
                              </option>
                            ))}
                        </select>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="mb-2">
                  <Field
                    className="subcategory_drop"
                    name="subcategory"
                    component="input"
                    type="text"
                    placeholder="subcategory"
                    required
                    maxLength={30}
                  />
                </div>
                <div className="d-flex justify-content-end margin_bottom">
                  {!edit ? (
                    <button type="submit" className="addcatsubit_button">
                      Submit
                    </button>
                  ) : (
                    <button type="submit" className="addcatsubit_button">
                      update
                    </button>
                  )}
                </div>
              </form>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <div className="categoryadd_new margin_bottom">
            <div className="form_control_or_btngroup">
              <div className="all_product_search ">
                <FiSearch className="allproduct_searchicon " />
                <input
                  type="search"
                  className=" mr-sm-2 adminsearch_bar"
                  value={searchQuery}
                  // onKeyDown={onKeyDownHandler}
                  onChange={(e) => handleSearch(e)}
                />
              </div>
              {/* <div className="btngroup">
                <Button className="select_button " type="submit" onClick={handleSearch}>
                  <AiOutlineSearch /> search
                </Button>
              </div> */}
            </div>
            {isLoading ? (
              <div className="table_Spinner">
                <Spinner animation="border" variant="dark" />
              </div>
            ) : (
              <>
                {getsubcat && getsubcat.length > 0 ? (
                  <>
                    <Table responsive="md" className="position-relative">
                      <thead>
                        <tr>
                          <th>S/L</th>
                          <th> Subcategory Name</th>
                          <th className="d-flex justify-content-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getsubcat &&
                          getsubcat?.map((e, index) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    {(currentPage - 1) * postPerPage +
                                      (index + 1)}
                                  </td>
                                  <td>{e.subcategory}</td>
                                  <td>
                                    <div className="d-flex justify-content-end">
                                      <CiEdit
                                        className="editic_on"
                                        onClick={() => {
                                          handleEdit(e);
                                        }}
                                      />
                                      <MdDelete
                                        className="deleteicn_forpro"
                                        onClick={() => {
                                          handleShow(e?._id);
                                        }}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </Table>
                  </>
                ) : (
                  <>
                    <Table>
                      <thead>
                        <tr>
                          <th>S/L</th>
                          <th> Subcategory Name</th>
                          <th className="d-flex justify-content-end">Action</th>
                        </tr>
                      </thead>
                    </Table>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="">Result not found</div>
                    </div>
                  </>
                )}
              </>
            )}
            {searchQuery && searchQuery?.length !== 10 ? (
              <div className="d-flex justify-content-end"></div>
            ) : (
              <div className="d-flex justify-content-end">
                <Allpagination
                  currentPage={currentPage}
                  postPerPage={postPerPage}
                  setPostPerPage={setPostPerPage}
                  setCurrentPage={setCurrentPage}
                  listCount={listCount}
                />
              </div>
            )}
          </div>
        </Col>
      </Row>
      {show && (
        <Delete
          handleDelete={handleDelete}
          handleClose={handleClose}
          show={show}
          categoryId={categoryid}
        />
      )}
    </>
  );
};

export default Allsubcategory;
