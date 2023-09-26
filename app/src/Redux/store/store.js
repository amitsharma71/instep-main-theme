import { configureStore } from "@reduxjs/toolkit";
import registrationDataReducer from "../reducer/reducer";
import sliceviewReducer from "../reducer/sliceapicard";
import registerDataReducer from "../reducer/registerReducer";
import loginDataReducer from "../reducer/loginReducer";
import ProductDetailReducer from "../reducer/productDetailSlice";
import getProductActionReducer from "../reducer/getProductReducer";
import PostProductDataReducer from "../reducer/adminPostProductReducer";
import GetAdminProductListDataReducer from "../reducer/getProductAdminListReducer";
import FilterDataByCategoryReducer from "../reducer/getCategoryReducer";
import deleteProductReducer from "../reducer/deleteProductReducer";
import updateProductReducer from "../reducer/updateProductReducer";
import ProductsubcategoryReducer from "../reducer/subcategoryslice";
import searchProductReducer from "../reducer/searchProductReducer";
import AddToCartFileReducer from "../reducer/addToCartReducer";
import cartinfouserReducer from "../reducer/usercartslice";
import HomecategoryReducer from "../reducer/categoryWiseSlice";
import AddCategoryReducer from "../reducer/createNewCategoryReducer";
import AddSubCategoryReducer from "../reducer/createNewSubcategorySlice";
import AddNewBrandsReducer from "../reducer/createNewBrandsSlice";
import SelectCategoryFilterByIdReducer from "../reducer/filterCategorySlice";
import GetCategoryListDataReducer from "../reducer/getCategoryListReducer";
import GetSubsategoryListDataReducer from "../reducer/getSubcategoryListSlice";
import GetBrandsListDataReducer from "../reducer/getBrandSlice";
import SelectSubcategoryFilterByIdReducer from "../reducer/filterSubcategorySlice";
import SelectBrandFilterByIdReducer from "../reducer/filterBrand";
export const store = configureStore({
  reducer: {
    register: registrationDataReducer,
    slicedetails: sliceviewReducer,
    registerdetail: registerDataReducer,
    logindatacheck: loginDataReducer,
    productdetaildata: ProductDetailReducer,
    getproductdata: getProductActionReducer,
    postproductAdmindata: PostProductDataReducer,
    GetAdminProductAllListData: GetAdminProductListDataReducer,
    filtercategoryData: FilterDataByCategoryReducer,
    deleteProduct: deleteProductReducer,
    updateProductData: updateProductReducer,
    homesubcategoryapi: ProductsubcategoryReducer,
    Searchproduct: searchProductReducer,
    addToCartFile: AddToCartFileReducer,
    cartdetails: cartinfouserReducer,
    homecategory: HomecategoryReducer,
    AddCategory: AddCategoryReducer,
    addsubcategory: AddSubCategoryReducer,
    allnewbrands: AddNewBrandsReducer,
    selectcategoryfilterbyid: SelectCategoryFilterByIdReducer,
    getcategorylistdata: GetCategoryListDataReducer,
    getsubsategorylistdata: GetSubsategoryListDataReducer,
    getbrandslistdata: GetBrandsListDataReducer,
    subcategoryfilter: SelectSubcategoryFilterByIdReducer,
    brandfilter: SelectBrandFilterByIdReducer,
  },
});
