import React from "react";
import { Box, Button, CircularProgress, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actions/admin";
import FormTypeProduct from "../../pages/auth/FormTypeProduct";
import { makeStyles } from "@material-ui/core";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(1, 0),
    },
    placeholder: {
        color: "#aaa"
    },
    selectStyle: {
        fontSize: '13px',
        marginBottom: '28px',
        marginTop: 10,
        width: 300,
        "& fieldset": {
            borderRadius: "10px",
        },
    },
    btnLogin: {
        '&.MuiButton-root:hover': {
            backgroundColor: "transparent",
        }
    },
}));
type Props = {
    product: any;
};

interface IInitialValues {
    nameProduct: string;
    typeProduct: any;
    price: number;
    productDetail: string;
    productDescription: string;
    image: string;
}

const CreateProduct: React.FC<Props> = ({ product }): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        nameProduct: product?.nameProduct ?? "",
        typeProduct: product?.typeProduct ?? "",
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
        <Container style={{ maxWidth: 600 }}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values: any, { setSubmitting }) => {
                    let formData = new FormData();
                    formData.append("nameProduct", values.nameProduct);
                    formData.append("typeProduct", values.typeProduct);
                    formData.append("price", values.price);
                    formData.append("productDetail", values.productDetail);
                    formData.append("image", values.image);
                    formData.append("productDescription", values.productDescription);
                    dispatch(addProduct(formData, setSubmitting));
                }}
            >
                {({ values, handleChange, handleBlur, errors, touched, isSubmitting, handleSubmit, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
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
                            <FormTypeProduct isTypeProduct={true} />
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
                                <ReactQuill theme="snow" value={values.productDetail} onChange={(e: any) => {
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
                            <FormControl>
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
                            <Box marginTop={2}>
                                <Button
                                    type='submit'
                                    disabled={isSubmitting}
                                    style={{
                                        color: "rgb(33, 43, 54)",
                                        height: "34px",
                                        width: "120px",
                                        fontSize: "12px",
                                        borderRadius: "4px",
                                        fontWeight: 500,
                                        textTransform: "capitalize",
                                        border: '1px solid rgb(33, 43, 54)',
                                        marginRight: 10
                                    }}
                                >
                                    {isSubmitting ? <CircularProgress size='1rem' /> : "Thêm Sản Phẩm"}
                                </Button>

                                <Button style={{
                                    color: "#FF6969",
                                    height: "34px",
                                    width: "120px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    borderRadius: "4px",
                                    textTransform: "capitalize",
                                    border: '1px solid #FF6969',

                                }}
                                    onClick={history.goBack}
                                >Quay lại</Button>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
        </Container>
    );
};

export default CreateProduct;
