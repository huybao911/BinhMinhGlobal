import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateCity } from "../../redux/actions/admin";
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
    city: any;
};

interface IInitialValues {
    nameCity: string;
}

const UpdateCity: React.FC<Props> = ({ city }): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        nameCity: city?.nameCity ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(updateCity(values, city._id, setSubmitting));

    const validationSchema = Yup.object({
        nameCity: Yup.string().required("required!"),
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
                            <FormLabel classes={{ root: classes.formLabel }}>Tên thành phố</FormLabel>
                            <TextField
                                fullWidth
                                name='nameCity'
                                value={values.nameCity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Nhập tên thành phố'
                                helperText={touched.nameCity ? errors.nameCity : ""}
                                error={touched.nameCity ? Boolean(errors.nameCity) : false}
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
                            {isSubmitting ? <CircularProgress size='1rem' /> : "Cập nhật thành phố"}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default UpdateCity;
