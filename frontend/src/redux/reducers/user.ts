import types from "../../redux/actions/types";
import { IUserState, UserActions } from "../types/user";
import { IUser } from "../../redux/types/user";
import { IRole } from "../../redux/types/role";
import { ICart } from "../../redux/types/cart";
import { ICity } from "../../redux/types/city";
import { IProduct } from "../../redux/types/product";
import { ITypeProduct } from "../../redux/types/typeproduct";

const initialState: IUserState = {
    token: localStorage.getItem("user__token"),
    loading: false,
    isAuthenticated: null,
    user: {} as IUser,
    getRole: {} as IRole,
    cities: [] as ICity[],
    carts: [] as ICart[],
    products: [] as IProduct[],
    typeproducts: [] as ITypeProduct[],
    roles: [] as IRole[],
};

const userReducer = (state = initialState, action: UserActions): IUserState => {
    switch (action.type) {
        case types.USER_LOADED:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };

        case types.GET_CARTS:
            return {
                ...state,
                carts: action.payload,
            };

        case types.GET_CITIES:
            return {
                ...state,
                cities: action.payload,
            };

        case types.GET_PRODUCT:
            return {
                ...state,
                products: action.payload,
            };

        case types.GET_TYPEPRODUCT:
            return {
                ...state,
                typeproducts: action.payload,
            };

        case types.ADMIN_ADDCART_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };

        case types.ADMIN_ADDCART_FAIL:
        case types.USER_AUTH_ERROR:
            localStorage.removeItem("user__token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: {} as IUser,
            };

        default:
            return state;
    }
};

export default userReducer;
