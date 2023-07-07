import types from "../actions/types";
import { IProduct } from "./product";
import { ITypeProduct } from "./typeproduct";
import { IRole } from "./role";
import { ICity } from "./city";
import { IUser } from "./user"
import { ICart } from "./cart"


export interface IAdmin {
    _id: any;
    username: string;
    password: string | null;
    role: any;
}

interface IAdminLoaded {
    type: typeof types.ADMIN_LOADED;
    payload: { getRole: IRole; admin: IAdmin };
}

interface IAdminLoginSuccess {
    type: typeof types.ADMIN_LOGIN_SUCCESS;
    payload: { token: string; admin: IAdmin };
}

interface IGetUsers {
    type: typeof types.GET_USERS;
    payload: IUser[];
}

interface IGetUser {
    type: typeof types.GET_USER;
    payload: IUser[];
}

interface IGetCities {
    type: typeof types.GET_CITIES;
    payload: ICity[];
}

interface IGetCarts {
    type: typeof types.GET_CARTS;
    payload: ICart[];
}

interface IAdminAddCartSuccess {
    type: typeof types.ADMIN_ADDCART_SUCCESS;
    payload: {
        cart: ICart;
        id: number;
    };
}

interface IDeleteCart {
    type: typeof types.DELETE_CART;
    payload: number;
}

interface IAdminAddCitySuccess {
    type: typeof types.ADMIN_ADDCITY_SUCCESS;
    payload: {
        city: ICity;
        id: number;
    };
}

interface IUpdateCity {
    type: typeof types.UPDATE_CITY;
    payload: {
        city: ICity;
        id: number;
    };
}

interface IDeleteCity {
    type: typeof types.DELETE_CITY;
    payload: number;
}

interface IAdminAddProductSuccess {
    type: typeof types.ADMIN_ADDPRODUCT_SUCCESS;
    payload: {
        name: IProduct;
        id: number;
    };
}

interface IUpdateProduct {
    type: typeof types.UPDATE_PRODUCT;
    payload: {
        product: IProduct;
        id: number;
    };
}

interface IDeleteProduct {
    type: typeof types.DELETE_PRODUCT;
    payload: number;
}

interface IAdminAddTypeProductSuccess {
    type: typeof types.ADMIN_ADDTYPEPRODUCT_SUCCESS;
    payload: {
        name: ITypeProduct;
        id: number;
    };
}

interface IUpdateTypeProduct {
    type: typeof types.UPDATE_TYPEPRODUCT;
    payload: {
        typeproduct: ITypeProduct;
        id: number;
    };
}

interface IDeleteTypeProduct {
    type: typeof types.DELETE_TYPEPRODUCT;
    payload: number;
}

interface IGetProducts {
    type: typeof types.GET_PRODUCT;
    payload: IProduct[];
}

interface IGetTypeProducts {
    type: typeof types.GET_TYPEPRODUCT;
    payload: ITypeProduct[];
}

interface IGetRoles {
    type: typeof types.GET_ROLES;
    payload: IRole[];
}

interface IUpdateUser {
    type: typeof types.UPDATE_USER;
    payload: {
        user: IUser;
        id: number;
    };
}

interface IDeleteUser {
    type: typeof types.DELETE_USER;
    payload: number;
}

interface IAdminAddCartFail {
    type: typeof types.ADMIN_ADDCART_FAIL;
}

interface IAdminAddCityFail {
    type: typeof types.ADMIN_ADDCITY_FAIL;
}

interface IAdminAddProductFail {
    type: typeof types.ADMIN_ADDPRODUCT_FAIL;
}

interface IAdminAddTypeProductFail {
    type: typeof types.ADMIN_ADDTYPEPRODUCT_FAIL;
}

interface IAdminLoginFail {
    type: typeof types.ADMIN_LOGIN_FAIL;
}

interface IAdminAuthError {
    type: typeof types.ADMIN_AUTH_ERROR;
}

interface IAdminLogout {
    type: typeof types.ADMIN_LOGOUT;
}

export type AdminActions =
    | IAdminLoaded
    | IAdminLoginSuccess
    | IAdminLoginFail
    | IAdminAddProductSuccess
    | IAdminAddProductFail
    | IAdminAddTypeProductSuccess
    | IAdminAddTypeProductFail
    | IAdminAddCitySuccess
    | IAdminAddCityFail
    | IAdminAddCartSuccess
    | IAdminAddCartFail
    | IAdminAuthError
    | IAdminLogout
    | IGetUsers
    | IGetUser
    | IGetProducts
    | IGetTypeProducts
    | IGetCities
    | IGetCarts
    | IUpdateCity
    | IDeleteCity
    | IUpdateProduct
    | IDeleteProduct
    | IUpdateTypeProduct
    | IDeleteTypeProduct
    | IGetRoles
    | IUpdateUser
    | IDeleteUser
    | IDeleteCart;

export interface IAdminState {
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean | null;
    admin: IAdmin;
    getRole: IRole;
    users: IUser[];
    roles: IRole[];
    cities: ICity[];
    carts: ICart[];
    products: IProduct[];
    typeproducts: ITypeProduct[];
}
