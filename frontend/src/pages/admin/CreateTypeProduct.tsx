import React from "react";
import { Box, Button, CircularProgress, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTypeProduct } from "../../redux/actions/admin";
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
    typeproduct: any;
};

interface IInitialValues {
    nameTypeProduct: string;
}

const CreateTypeProduct: React.FC<Props> = ({ typeproduct }): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        nameTypeProduct: typeproduct?.nameTypeProduct ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(addTypeProduct(values, setSubmitting));

    const validationSchema = Yup.object({
        nameTypeProduct: Yup.string().required("required!"),
    });

    return (
        <Container style={{ maxWidth: 600 }}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onHandleSubmit}
            >
                {({ values, handleChange, handleBlur, errors, touched, isSubmitting, handleSubmit }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Box>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Tên Loại Sản Phẩm</FormLabel>
                                <TextField
                                    fullWidth
                                    name='nameTypeProduct'
                                    value={values.nameTypeProduct}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập tên loại sản phẩm'
                                    helperText={touched.nameTypeProduct ? errors.nameTypeProduct : ""}
                                    error={touched.nameTypeProduct ? Boolean(errors.nameTypeProduct) : false}
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

export default CreateTypeProduct;
