import types from "../actions/types";
import { IRole } from "./role";
import { IProduct } from "./product";
import { ITypeProduct } from "./typeproduct";
import { ICity } from "./city";
import { ICart } from "./cart";

export interface IUser {
    _id: any;
    username: string;
    password: string | null;
    role: any;
    update: string;
    delete: string;
}

interface IUserLoaded {
    type: typeof types.USER_LOADED;
    payload: { getRole: IRole; user: IUser };
}

interface IGetCities {
    type: typeof types.GET_CITIES;
    payload: ICity[];
}

interface IGetCarts {
    type: typeof types.GET_CARTS;
    payload: ICart[];
}

interface IUserAddCartSuccess {
    type: typeof types.ADMIN_ADDCART_SUCCESS;
    payload: {
        cart: ICart;
        id: number;
    };
}

interface IGetProducts {
    type: typeof types.GET_PRODUCT;
    payload: IProduct[];
}

interface IGetTypeProducts {
    type: typeof types.GET_TYPEPRODUCT;
    payload: ITypeProduct[];
}

interface IUserAddCartFail {
    type: typeof types.ADMIN_ADDCART_FAIL;
}

interface IAdminAuthError {
    type: typeof types.USER_AUTH_ERROR;
}

export type UserActions =
    | IUserLoaded
    | IGetCities
    | IGetCarts
    | IUserAddCartSuccess
    | IUserAddCartFail
    | IGetProducts
    | IGetTypeProducts
    | IAdminAuthError;

export interface IUserState {
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean | null;
    user: IUser;
    getRole: IRole;
    roles: IRole[];
    cities: ICity[];
    carts: ICart[];
    products: IProduct[];
    typeproducts: ITypeProduct[];
}
