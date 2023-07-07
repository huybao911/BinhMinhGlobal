import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/actions/admin";
import { FormControl, FormLabel, TextField } from "@mui/material";
import FormTypeProduct from "../../pages/auth/FormTypeProduct";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
    btnLogin: {
        '&.MuiButton-root:hover': {
            backgroundColor: "transparent",
        }
    },
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(2, 0),
    },
}));

type Props = {
    product: any;
};

interface IInitialValues {
    nameProduct: string;
    price: number;
    productDetail: string;
    productDescription: string;
    image: string;
}

const UpdateProduct: React.FC<Props> = ({ product }): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        nameProduct: product?.nameProduct ?? "",
        price: product?.price ?? "",
        productDetail: product?.productDetail ?? "",
        productDescription: product?.productDescription ?? "",
        image: product?.image ?? "",
    };

    const validationSchema = Yup.object({
        nameProduct: Yup.string().required("required!"),
        price: Yup.string().required("required!"),
        productDetail: Yup.string().required("required!"),
        productDescription: Yup.string().required("required!"),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: any, { setSubmitting }) => {
                let formData = new FormData();
                formData.append("nameProduct", values.nameProduct);
                formData.append("price", values.price);
                formData.append("productDetail", values.productDetail);
                formData.append("image", values.image);
                formData.append("productDescription", values.productDescription);
                dispatch(updateProduct(formData, product._id, setSubmitting));
            }}
        >
            {({ values, handleChange, handleBlur, errors, touched, isSubmitting, handleSubmit, setFieldValue }) => (
                <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                    <Box>
                        <FormControl fullWidth className={classes.formControl}>
                            <FormLabel classes={{ root: classes.formLabel }}>Tên Sản Phẩm</FormLabel>
                            <TextField
                                fullWidth
                                name='nameProduct'
                                value={values.nameProduct}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Nhập tên sản phẩm'
                                helperText={touched.nameProduct ? errors.nameProduct : ""}
                                error={touched.nameProduct ? Boolean(errors.nameProduct) : false}
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <FormLabel classes={{ root: classes.formLabel }}>Giá Tiền</FormLabel>
                            <TextField
                                fullWidth
                                name='price'
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Nhập giá sản phẩm'
                                helperText={touched.price ? errors.price : ""}
                                error={touched.price ? Boolean(errors.price) : false}
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <FormLabel classes={{ root: classes.formLabel }}>Chi Tiết Sản Phẩm</FormLabel>
                            <ReactQuill theme="snow" value={values.productDetail} onChange={(e: any) => {
                                setFieldValue('productDetail', e);
                            }} />
                            {/* <TextField
                                fullWidth
                                name='productDetail'
                                value={values.productDetail}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Nhập chi tiết sản phẩm'
                                helperText={touched.productDetail ? errors.productDetail : ""}
                                error={touched.productDetail ? Boolean(errors.productDetail) : false}
                            /> */}
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <FormLabel classes={{ root: classes.formLabel }}>Mô Tả Sản Phẩm</FormLabel>
                            <ReactQuill theme="snow" value={values.productDescription} onChange={(e: any) => {
                                setFieldValue('productDescription', e);
                            }} />
                            {/* <TextField
                                fullWidth
                                name='productDescription'
                                value={values.productDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Nhập mô tả sản phẩm'
                                helperText={touched.productDescription ? errors.productDescription : ""}
                                error={touched.productDescription ? Boolean(errors.productDescription) : false}
                            /> */}
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Hình ảnh</FormLabel>
                                <input
                                    accept="image/*"
                                    name='image'
                                    type='file'
                                    onChange={(e: any) => {
                                        setFieldValue('image', e.target.files[0]);
                                    }}
                                    onBlur={handleBlur}
                                />
                            </FormControl>
                        <Button
                            disableRipple
                            style={{ backgroundColor: "black", color: "white" }}
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='small'
                            className={classes.btnLogin}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size='1rem' /> : "Cập nhật sản phẩm"}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default UpdateProduct;
