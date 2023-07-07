import { Dispatch } from "redux";
import axios from "axios";
import types from "./types";
import { setUserAuthToken } from "../../utils/headers";
import { UserActions } from "../../redux/types/user";

const URI = "http://localhost:5000/api/v1/user";

// LOAD USER
export const loadUser = () => async (dispatch: Dispatch<UserActions>) => {
    if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

    const config: any = {
        header: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.get(`${URI}/auth-user`, config);
        dispatch({ type: types.USER_LOADED, payload: data });
    } catch (error) {
        dispatch({ type: types.USER_AUTH_ERROR });
    }
};

// GET CART
export const getCart =
    () => async (dispatch: Dispatch<UserActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.get(`${URI}/cart`, config);
            dispatch({ type: types.GET_CARTS, payload: data });
        } catch (error: any) {
        }
    };

// ADD CART
export const addCart =
    (body: any, setSubmitting: any) =>
        async (dispatch: Dispatch<UserActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.post(`${URI}/addCart`, body, config);
                dispatch({
                    type: types.ADMIN_ADDCART_SUCCESS,
                    payload: data,
                });
                localStorage.clear()
                window.history.back()
            } catch (error: any) {
                dispatch({ type: types.ADMIN_ADDCART_FAIL });
            } finally {
                setSubmitting(false);
            }
        };

// GET CITY
export const getCity =
    () => async (dispatch: Dispatch<UserActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.get(`${URI}/citys`, config);
            dispatch({ type: types.GET_CITIES, payload: data });
        } catch (error: any) {
        }
    };

// GET PRODUCTS
export const getProduct =
    () => async (dispatch: Dispatch<UserActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.get(`${URI}/product`, config);
            dispatch({ type: types.GET_PRODUCT, payload: data });
        } catch (error: any) {
        }
    };

// GET TYPEPRODUCT
export const getTypeProduct =
    () => async (dispatch: Dispatch<UserActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.get(`${URI}/typeProduct`, config);
            dispatch({ type: types.GET_TYPEPRODUCT, payload: data });
        } catch (error: any) {
        }
    };
