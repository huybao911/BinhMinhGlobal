import types from "../actions/types";
import { IAdmin } from "../types/admin";
import { IUser } from "../types/user";
import { IProduct } from "../types/product";
import { ITypeProduct } from "../types/typeproduct";
import { IRole } from "../types/role";
import { ICity } from "../types/city";
import { ICart } from "../types/cart";
import { IAdminState, AdminActions } from "../types/admin";

const initialState: IAdminState = {
    token: localStorage.getItem("admin__token"),
    loading: false,
    isAuthenticated: null,
    admin: {} as IAdmin,
    getRole: {} as IRole,
    cities: [] as ICity[],
    carts: [] as ICart[],
    products: [] as IProduct[],
    typeproducts: [] as ITypeProduct[],
    roles: [] as IRole[],
    users: [] as IUser[],
};

const adminReducer = (
    state = initialState,
    action: AdminActions
): IAdminState => {
    switch (action.type) {
        case types.ADMIN_LOADED:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case types.ADMIN_ADDCITY_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case types.UPDATE_CITY:
            return {
                ...state,
                cities: state.cities.map((city) =>
                    city._id === action.payload.id ? { ...action.payload.city } : city
                ),
            };

        case types.DELETE_CITY:
            return {
                ...state,
                cities: state.cities.filter((city) => city._id !== action.payload),
            };
        case types.ADMIN_ADDPRODUCT_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case types.UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product._id === action.payload.id ? { ...action.payload.product } : product
                ),
            };

        case types.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product._id !== action.payload),
            };

        case types.ADMIN_ADDTYPEPRODUCT_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case types.UPDATE_TYPEPRODUCT:
            return {
                ...state,
                typeproducts: state.typeproducts.map((typeproduct) =>
                    typeproduct._id === action.payload.id ? { ...action.payload.typeproduct } : typeproduct
                ),
            };

        case types.DELETE_TYPEPRODUCT:
            return {
                ...state,
                typeproducts: state.typeproducts.filter((typeproduct) => typeproduct._id !== action.payload),
            };

        case types.UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) =>
                    user._id === action.payload.id ? { ...action.payload.user } : user
                ),
            };

        case types.ADMIN_LOGIN_SUCCESS:
            localStorage.setItem("admin__token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };

        case types.ADMIN_ADDCART_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };

        case types.DELETE_CART:
            return {
                ...state,
                carts: state.carts.filter((cart) => cart._id !== action.payload),
            };

        case types.GET_CARTS:
            return {
                ...state,
                carts: action.payload,
            };

        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
            };

        case types.GET_USER:
            return {
                ...state,
                users: action.payload,
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

        case types.GET_ROLES:
            return {
                ...state,
                roles: action.payload,
            };

        case types.DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user._id !== action.payload),
            };

        case types.ADMIN_ADDCART_FAIL:
        case types.ADMIN_ADDCITY_FAIL:
        case types.ADMIN_ADDPRODUCT_FAIL:
        case types.ADMIN_ADDTYPEPRODUCT_FAIL:
        case types.ADMIN_LOGIN_FAIL:
        case types.ADMIN_AUTH_ERROR:
        case types.ADMIN_LOGOUT:
            localStorage.removeItem("admin__token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                admin: {} as IAdmin,
                users: [],
            };

        default:
            return state;
    }
};

export default adminReducer;
