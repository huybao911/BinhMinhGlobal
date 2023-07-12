import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useFormikContext } from "formik";
import { FormControl, FormLabel, Select } from "@mui/material";

import { MenuItem } from "@material-ui/core";

import { getCity } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { ICity } from "../../redux/types/city";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(0, 0),
        width: 770,
        height: 60,
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
    isCity?: boolean;
};

interface IInitialValues {
    city: any;
}

// const Placeholder = ({ children }: { children: any }) => {
//     const classes = useStyles();
//     return <div className={classes.placeholder}>{children}</div>;
// };

const FormCity: React.FC<Props> = ({ isCity = false }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { values, handleChange, handleBlur, touched, errors } =
        useFormikContext<IInitialValues>();

    const [cities, setCities] = React.useState<ICity[]>([]);
    const City = useSelector((state: RootState) => state.user);


    React.useEffect(() => {
        dispatch(getCity());
    }, [dispatch]);

    React.useEffect(() => {
        setCities(() => City?.cities?.filter((city: any) => city.nameCity));
    }, [City]);

    return (
        <>

            {isCity ? (
                <FormControl className={classes.formControl}>
                    <Select
                        name="city._id"
                        labelId="demo-simple-select-label"
                        id="handle-city"
                        value={values.city._id}
                        defaultValue={'64a67186e2b288d3b57ee1c0'}
                        className={classes.selectStyle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.city ? Boolean(errors.city) : false}
                        variant={'outlined'}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    fontSize: 10,
                                    height:"200px"
                                },
                            },
                        }}
                    >
                        {cities?.map((city: any) => (
                            <MenuItem value={city._id} key={city._id}>
                                {city.nameCity}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}

        </>
    );
};

export default FormCity;
