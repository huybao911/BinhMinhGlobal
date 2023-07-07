import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateTypeProduct } from "../../redux/actions/admin";
import { FormControl, FormLabel, TextField } from "@mui/material";

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
    typeproduct: any;
};

interface IInitialValues {
    nameTypeProduct: string;
}

const UpdateTypeProduct: React.FC<Props> = ({ typeproduct }): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        nameTypeProduct: typeproduct?.nameTypeProduct ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(updateTypeProduct(values, typeproduct._id, setSubmitting));

    const validationSchema = Yup.object({
        nameTypeProduct: Yup.string().required("required!"),
    });

    return (
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
                                placeholder='Nhập loại tên sản phẩm'
                                helperText={touched.nameTypeProduct ? errors.nameTypeProduct : ""}
                                error={touched.nameTypeProduct ? Boolean(errors.nameTypeProduct) : false}
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
                            {isSubmitting ? <CircularProgress size='1rem' /> : "Cập nhật loại sản phẩm"}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default UpdateTypeProduct;
