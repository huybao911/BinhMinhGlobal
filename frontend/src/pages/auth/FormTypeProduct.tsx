import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useFormikContext } from "formik";
import { FormControl, FormLabel, Select } from "@mui/material";

import { MenuItem } from "@material-ui/core";

import { getTypeProduct } from "../../redux/actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { ITypeProduct } from "../../redux/types/typeproduct";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(0, 0),
        width: 302,
    },
    placeholder: {
        color: "#aaa"
    },
    selectStyle: {
        fontSize: '13px',
        marginBottom: '28px',
        marginTop: 10,
        "& fieldset": {
            borderRadius: "10px",
        },
    },
}));

type Props = {
    isTypeProduct?: boolean;
};

interface IInitialValues {
    typeProduct: any;
}

// const Placeholder = ({ children }: { children: any }) => {
//     const classes = useStyles();
//     return <div className={classes.placeholder}>{children}</div>;
// };

const FormTypeProduct: React.FC<Props> = ({ isTypeProduct = false }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { values, handleChange, handleBlur, touched, errors } =
        useFormikContext<IInitialValues>();

    const [typeProducts, setTypeProducts] = React.useState<ITypeProduct[]>([]);
    const TypeProduct = useSelector((state: RootState) => state.admin);


    React.useEffect(() => {
        dispatch(getTypeProduct());
    }, [dispatch]);

    React.useEffect(() => {
        setTypeProducts(() => TypeProduct?.typeproducts?.filter((typeproduct: any) => typeproduct.nameTypeProduct));
    }, [TypeProduct]);

    return (
        <>

            {isTypeProduct ? (
                <FormControl className={classes.formControl}>
                    <Select
                        name="typeProduct._id"
                        labelId="demo-simple-select-label"
                        id="handle-city"
                        value={values.typeProduct._id}
                        className={classes.selectStyle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.typeProduct ? Boolean(errors.typeProduct) : false}
                        variant={'outlined'}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    fontSize: 10,
                                },
                            },
                        }}
                    >
                        {typeProducts?.map((typeProduct: any) => (
                            <MenuItem value={typeProduct._id} key={typeProduct._id}>
                                {typeProduct.nameTypeProduct}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}

        </>
    );
};

export default FormTypeProduct;
