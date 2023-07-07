import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, CircularProgress, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { loginAdmin } from "../../redux/actions/admin";

import { Container, Box, FormControl, FormLabel } from "@mui/material";
import { InputAdornment } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "0",
    left: "0",
    minHeight: "100vh",
  },
  btnLogin: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
  },
  formLabel: {
    marginBottom: theme.spacing(1.5),
    textAlign: 'left',
    fontSize: '13px',
    borderRadius: 10
  },
  formControl: {
    margin: theme.spacing(2, 0),
    width: 300,
  },
  textField: {
    "& .MuiInputBase-root": {
      "& fieldset": {
        borderRadius: "10px",
      },
    },
  }
}));

interface IInitialValues {
  username: string;
  password: string;
}

const Login: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues: IInitialValues = {
    username: "",
    password: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    dispatch(loginAdmin(values, setSubmitting))
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Invalid username!"),
    password: Yup.string().required("Invalid password!"),
  });

  React.useEffect(() => {
    document.title = "Đăng nhập | Admin";
  }, []);

  return (
    <Container style={{ maxWidth: 600 }}>
      <Box>
        <Box display={"flex"} flexDirection={'column'} justifyContent={'center'} style={{ backgroundColor: 'white', padding: '40px 0px', borderRadius: '20px' }}>
          <Box display={"flex"} flexDirection={'column'} justifyContent={'center'} textAlign={'center'}>
            <Box>
              <Box component={'img'} src="/logoBM.png" style={{ height: "70px", width: "70px" }} />
            </Box>
            <Typography style={{ fontWeight: "500", fontSize: "16px", margin: "14px 0px" }} >
              Đăng Nhập Quyền Cấp Cao
            </Typography>
          </Box>
          <Box textAlign={'center'} paddingBottom={'30px'}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onHandleSubmit}
            >
              {({ isSubmitting, values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                <form onSubmit={handleSubmit}>
                  <Box style={{ marginTop: '20px' }}>
                    <FormControl className={classes.formControl} >
                      <FormLabel classes={{ root: classes.formLabel }}>Tên đăng nhập</FormLabel>
                      <TextField
                        style={{ width: 300 }}
                        variant={'outlined'}
                        fullWidth
                        name='username'
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Nhập tên đăng nhập'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                              <PersonIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{
                          style: {
                            fontSize: '12px',
                          }
                        }}
                        helperText={touched.username ? errors.username : ""}
                        error={touched.username ? Boolean(errors.username) : false}
                      />
                    </FormControl>
                    <FormControl >
                      <FormLabel classes={{ root: classes.formLabel }}>Mật khẩu</FormLabel>
                      <TextField
                        style={{ paddingBottom: '50px', width: 300 }}
                        variant={'outlined'}
                        type='password'
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Nhập mật khẩu'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                              <PasswordIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                          )
                        }}
                        inputProps={{
                          style: {
                            fontSize: '12px',
                          }
                        }}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password ? Boolean(errors.password) : false}
                      />
                    </FormControl>
                  </Box>
                  <Button
                    disableRipple
                    type='submit'
                    style={{ color: "black", border: '1px solid black', width: 300, borderRadius: 10, textTransform: 'capitalize', fontWeight: 'normal' }}
                    className={classes.btnLogin}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Nhập"}
                  </Button>
                </form>
              )}
            </Formik>
          </Box>

        </Box>
      </Box>

    </Container>

  );
};

export default Login;
