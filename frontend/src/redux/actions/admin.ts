import axios from "axios";
import { Dispatch } from "redux";
import { setAdminAuthToken } from "../../utils/headers";
import { AdminActions } from "../types/admin";
import types from "./types";

const URI = "https://binhminhglobal-backend.onrender.com/api/v1/admin";

// LOAD ADMIN
export const loadAdmin = () => async (dispatch: Dispatch<AdminActions>) => {
    if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);

    const config: any = {
        header: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.get(`${URI}/auth-admin`, config);

        dispatch({ type: types.ADMIN_LOADED, payload: data });
    } catch (error) {
        dispatch({ type: types.ADMIN_AUTH_ERROR });
    }
};

// LOGIN ADMIN
export const loginAdmin =
    (body: any, setSubmitting: any) =>
        async (dispatch: Dispatch<AdminActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.post(`${URI}/login`, body, config);
                dispatch({
                    type: types.ADMIN_LOGIN_SUCCESS,
                    payload: data,
                });
                dispatch<any>(loadAdmin());
            } catch (error: any) {
                dispatch({ type: types.ADMIN_LOGIN_FAIL });
            } finally {
                setSubmitting(false);
            }
        };

// GET CART
export const getCart =
    () => async (dispatch: Dispatch<AdminActions>) => {
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
        async (dispatch: Dispatch<AdminActions>) => {
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

// DELETE CART
export const deleteCart =
    (id: number) => async (dispatch: Dispatch<AdminActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.delete(`${URI}/cart/${id}`, config);
            dispatch({ type: types.DELETE_CART, payload: id });
            dispatch<any>(loadAdmin());
        } catch (error: any) {
        }
    };

// GET CITY
export const getCity =
    () => async (dispatch: Dispatch<AdminActions>) => {
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

// ADD CITY
export const addCity =
    (body: any, setSubmitting: any) =>
        async (dispatch: Dispatch<AdminActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.post(`${URI}/addCity`, body, config);
                dispatch({
                    type: types.ADMIN_ADDCITY_SUCCESS,
                    payload: data,
                });
            } catch (error: any) {
                dispatch({ type: types.ADMIN_ADDCITY_FAIL });
            } finally {
                setSubmitting(false);
            }
        };

// UPDATE CITY
export const updateCity =
    (body: any, id: number, setSubmitting: any) =>
        async (dispatch: Dispatch<AdminActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.patch(`${URI}/city/${id}`, body, config);
                dispatch({
                    type: types.UPDATE_CITY,
                    payload: data,
                });
                dispatch<any>(getCity());
            } catch (error: any) {
            } finally {
                setSubmitting(false);
            }
        };

// DELETE CITY
export const deleteCity =
    (id: number) => async (dispatch: Dispatch<AdminActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.delete(`${URI}/city/${id}`, config);
            dispatch({ type: types.DELETE_CITY, payload: id });
            dispatch<any>(loadAdmin());
        } catch (error: any) {
        }
    };

// ADD PRODUCT
type formdata = FormData;
export const addProduct =
    (formData: formdata, setSubmitting: any) =>
        async (dispatch: Dispatch<AdminActions>) => {
            const config: any = {
                header: {
                    "Content-type": "multipart/form-data",
                },
            };

            try {
                const { data } = await axios.post(`${URI}/addProduct`, formData, config);
                dispatch({
                    type: types.ADMIN_ADDPRODUCT_SUCCESS,
                    payload: data,
                });
            } catch (error: any) {
                dispatch({ type: types.ADMIN_ADDPRODUCT_FAIL });
            } finally {
                setSubmitting(false);
            }
        };

// UPDATE PRODUCT
export const updateProduct =
    (formData: formdata, id: number, setSubmitting: any) =>
        async (dispatch: Dispatch<AdminActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "multipart/form-data",
                },
            };

            try {
                const { data } = await axios.put(`${URI}/product/${id}`, formData, config);
                dispatch({
                    type: types.UPDATE_PRODUCT,
                    payload: data,
                });
                dispatch<any>(getProduct());
            } catch (error: any) {
            } finally {
                setSubmitting(false);
            }
        };

// DELETE PRODUCT
export const deleteProduct =
    (id: number) => async (dispatch: Dispatch<AdminActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.delete(`${URI}/product/${id}`, config);
            dispatch({ type: types.DELETE_PRODUCT, payload: id });
            dispatch<any>(loadAdmin());
        } catch (error: any) {
        }
    };

// ADD TYPE PRODUCT
export const addTypeProduct =
    (body: any, setSubmitting: any) =>
        async (dispatch: Dispatch<AdminActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.post(`${URI}/addTypeProduct`, body, config);
                dispatch({
                    type: types.ADMIN_ADDTYPEPRODUCT_SUCCESS,
                    payload: data,
                });
            } catch (error: any) {
                dispatch({ type: types.ADMIN_ADDTYPEPRODUCT_FAIL });
            } finally {
                setSubmitting(false);
            }
        };

// UPDATE TYPE PRODUCT
export const updateTypeProduct =
    (body: any, id: number, setSubmitting: any) =>
        async (dispatch: Dispatch<AdminActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.patch(`${URI}/typeProduct/${id}`, body, config);
                dispatch({
                    type: types.UPDATE_TYPEPRODUCT,
                    payload: data,
                });
                dispatch<any>(getTypeProduct());
            } catch (error: any) {
            } finally {
                setSubmitting(false);
            }
        };

// DELETE TYPE PRODUCT
export const deleteTypeProduct =
    (id: number) => async (dispatch: Dispatch<AdminActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.delete(`${URI}/typeProduct/${id}`, config);
            dispatch({ type: types.DELETE_TYPEPRODUCT, payload: id });
            dispatch<any>(loadAdmin());
        } catch (error: any) {
        }
    };

// GET USERS
export const getUsers =
    () => async (dispatch: Dispatch<AdminActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.get(`${URI}/users`, config);
            dispatch({ type: types.GET_USERS, payload: data });
        } catch (error: any) {
        }
    };

// GET USER
export const getUser =
    () => async (dispatch: Dispatch<AdminActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.get(`${URI}/user`, config);
            dispatch({ type: types.GET_USER, payload: data });
        } catch (error: any) {
        }
    };

// GET PRODUCTS
export const getProduct =
    () => async (dispatch: Dispatch<AdminActions>) => {
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
    () => async (dispatch: Dispatch<AdminActions>) => {
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

// GET ROLES
export const getRoles =
    () => async (dispatch: Dispatch<AdminActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.get(`${URI}/roles`, config);
            dispatch({ type: types.GET_ROLES, payload: data });
        } catch (error: any) {
        }
    };

// UPDATE USER
export const updateUser =
    (body: any, id: number, setSubmitting: any) =>
        async (dispatch: Dispatch<AdminActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.patch(`${URI}/users/${id}`, body, config);
                dispatch({
                    type: types.UPDATE_USER,
                    payload: data,
                });
                dispatch<any>(getUsers());
            } catch (error: any) {
            } finally {
                setSubmitting(false);
            }
        };

// DELETE USER
export const deleteUser =
    (id: number) => async (dispatch: Dispatch<AdminActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.delete(`${URI}/users/${id}`, config);
            dispatch({ type: types.DELETE_USER, payload: id });
            dispatch<any>(loadAdmin());
        } catch (error: any) {
        }
    };

// LOGOUT ADMIN
export const logOutAdmin =
    () => (dispatch: Dispatch<AdminActions>) => {
        dispatch({ type: types.ADMIN_LOGOUT });
    };
