import React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { IProduct } from "../../redux/types/product";
import { ITypeProduct } from "../../redux/types/typeproduct";
import { getProduct, getTypeProduct } from "../../redux/actions/user";

import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import FormCity from "../../pages/auth/FormCity";

import "./SlideShow.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

import { addCart } from "../../redux/actions/user";

import { AppBar, Badge, Box, Divider, FormControl, FormLabel, InputAdornment, OutlinedInput, TextField, Toolbar, Typography } from "@mui/material";

import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    textfield: {
        '& .MuiSelect-select': {
            color: 'black', fontSize: '12px'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '20px', paddingRight: '2px'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '20px',
            },
            '&.Mui-focused fieldset': {
                border: "1px solid black",
            }
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& fieldset': {
            borderRadius: '30px',
            height: "46px"
        },

    },
    hoverDetail: {
        '&: hover': {
            color: 'green',
        },
    },
    typeProduct: {
        border: "2px solid #0066BF"
    },
    nameTypeProduct: {
        backgroundColor: "#0066BF",
        fontSize: "16px",
        fontFamily: "Roboto",
        color: "white",
        padding: "10px 0px"
    },
    formControl: {
        margin: "5px 0",
        width: 300,
    },
}))

const StyledRoot = styled(AppBar)(() => ({
    boxShadow: 'none',
    width: '100%',
    backgroundColor: 'white',
    fontWeight: 'bold',
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    borderRadius: '20px',
    fontSize: '13px',
    height: "42px",
    marginRight: '16px',
    backgroundColor: "white",
    marginTop: "4px",
    '& fieldset': {
        borderWidth: `1px !important`,
        // borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
        borderColor: '#rgba(0, 0, 0, 0.87)'
    },
}));

interface IInitialValues {
    product: any;
    fullName: string;
    nameCompany: string;
    address: string;
    city: any;
    sdt: string;
    email: string;
    note: string;
    date: string;
}

const Cart: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [localItems, setLocalItems] = React.useState(JSON.parse(localStorage.getItem("productList")!) || []);
    const mapProductList = localItems.flatMap((arr: any) => arr)
    const productMap = mapProductList.map((product: any) => product.quantity)
    const productMapPrice = mapProductList.map((product: any) => product.total)

    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [typeProducts, setTypeProducts] = React.useState<ITypeProduct[]>([]);
    const [filterName, setFilterName] = React.useState('');
    const Cart = useSelector((state: RootState) => state.user);

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB')
    const currTime = new Date().toLocaleTimeString();

    const initialValues: IInitialValues = {
        product: mapProductList,
        fullName: "",
        nameCompany: "",
        address: "",
        city: "",
        sdt: "",
        email: "",
        note: "",
        date: formattedDate + " " + currTime,
    };

    const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
        dispatch(addCart({ ...values }, setSubmitting))
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Vui lòng nhập họ tên"),
        nameCompany: Yup.string().required("Vui lòng nhập tên công ty"),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
        sdt: Yup.string().required("Vui lòng nhập số điện thoại"),
        email: Yup.string().required("Vui lòng nhập email"),
        city: Yup.object().required("Vui lòng thêm thành phố"),
    });

    React.useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getTypeProduct());
    }, [dispatch]);

    React.useEffect(() => {
        setProducts(() =>
            Cart?.products?.filter((product: any) =>
                product.nameProduct
            ));
    }, [Cart]);
    React.useEffect(() => {
        setTypeProducts(() => Cart?.typeproducts?.filter((typeproduct: any) => typeproduct.nameTypeProduct));
    }, [Cart]);

    const handleFilterByName = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = Cart?.products?.filter((product: any) => {
                return product.nameProduct.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setProducts(results);
        } else {
            setProducts(() => Cart?.products?.filter((product: any) => product.nameProduct));
        }

        setFilterName(keyword);
    };


    return (
        <Box>
            <Box>
                <StyledRoot style={{ boxShadow: "none", overflowX: "hidden", backgroundImage: "url(/backgroundHeader.jpg)", height: "110px" }}>
                    <Toolbar>
                        <Link style={{ textDecoration: 'none', marginTop: "10px" }} to={'/'}>
                            <img src="/logoBM.png" style={{ height: "90px", width: "90px" }}></img>
                        </Link>
                        <Box textAlign={"center"} display={'flex'} flexDirection={'column'} flexGrow={1}>
                            <Typography style={{ color: "#dd3333", fontWeight: 700, fontStyle: "normal", fontSize: "30px" }}>
                                BÌNH MINH GLOBAL
                            </Typography>
                            <Typography style={{ color: "#0066bf", fontSize: "19px", fontWeight: 700, fontStyle: "normal" }}>
                                NHÀ CUNG CẤP SỐ 1 VỀ BỒN NƯỚC VÀ NĂNG LƯỢNG MẶT TRỜI
                            </Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'row'}>
                            <Box component={"img"} src="/call.gif" style={{ width: "58px", height: "45px", paddingRight: "15px" }} />
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                                    Hotline:
                                </Typography>
                                <Typography style={{ fontSize: "16px", color: "#ff0000", fontWeight: "bold" }}>
                                    0362.526.678
                                </Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </StyledRoot>
                <StyledRoot style={{ backgroundColor: "#0066bf", marginTop: "110px", height: "50px" }}>
                    <Box display={'flex'} flexDirection={'row'} sx={{ padding: "0px 170px" }}>
                        <Box flexGrow={1}>
                            <ul id="nav">
                                <li><a style={{
                                    padding: "0 24px",
                                }} href="#">TRANG CHỦ</a></li>
                                <li>
                                    <a href="#" style={{ padding: "0 24px", }}>
                                        SẢN PHẨM
                                    </a>
                                    <Box className="subnav">
                                        {typeProducts.map((typeProduct: any) =>
                                            <li>
                                                <Link to={`/loaiSP1/${typeProduct._id}`}>
                                                    <Box className="boxA" sx={{ color: "#333333", fontWeight: 400, fontSize: 14, fontFamily: "Roboto" }}>
                                                        {typeProduct.nameTypeProduct}
                                                    </Box>
                                                </Link>

                                            </li>
                                        )}
                                    </Box>
                                </li>
                                <li><a style={{ padding: "0 24px", }} href="#contact">TIN TỨC</a></li>
                            </ul>
                        </Box>
                        <Box>
                            <StyledSearch
                                value={filterName}
                                onChange={handleFilterByName}
                                placeholder="Tìm kiếm sản phẩm..."
                                startAdornment={
                                    <InputAdornment position="start" style={{ paddingLeft: 1.3 }}>
                                        <SearchIcon style={{ width: '16px' }} sx={{ color: 'rgba(0, 0, 0, 0.87)' }} />
                                    </InputAdornment>
                                }
                            />
                        </Box>
                        <Box sx={{ padding: "12px 0px", marginLeft: "20px" }}>
                            <Badge color="error" badgeContent={localItems.length}>
                                <ShoppingCartIcon />{" "}
                            </Badge>
                        </Box>
                    </Box>
                </StyledRoot>
            </Box>
            <Box sx={{ marginTop: "30px" }}>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onHandleSubmit}
                >
                    {({ isSubmitting, handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Box display={'flex'} flexDirection={'row'}>
                                <Box display={"flex"}
                                    flexDirection={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    style={{ backgroundColor: 'white', borderRadius: '20px', margin: "auto" }}>
                                    <Typography style={{ fontWeight: "bold", fontSize: "19px", margin: "50px 115px 0 0" }} >
                                        Thông tin thanh toán
                                    </Typography>

                                    <FormControl className={classes.formControl}>
                                        <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                            Họ tên
                                        </FormLabel>

                                        <TextField
                                            style={{ width: 500 }}
                                            fullWidth
                                            variant={'outlined'}
                                            name='fullName'
                                            value={values.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Nhập họ tên'
                                            inputProps={{
                                                style: {
                                                    fontSize: '12px',
                                                }
                                            }}
                                            helperText={touched.fullName ? errors.fullName : ""}
                                            error={touched.fullName ? Boolean(errors.fullName) : false}
                                        />
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                            Tên công ty
                                        </FormLabel>

                                        <TextField
                                            style={{ width: 500 }}
                                            fullWidth
                                            variant={'outlined'}
                                            name='nameCompany'
                                            value={values.nameCompany}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Nhập tên công ty'
                                            inputProps={{
                                                style: {
                                                    fontSize: '12px',
                                                }
                                            }}
                                            helperText={touched.nameCompany ? errors.nameCompany : ""}
                                            error={touched.nameCompany ? Boolean(errors.nameCompany) : false}
                                        />
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                            Địa chỉ
                                        </FormLabel>
                                        <TextField
                                            style={{ width: 500 }}
                                            fullWidth
                                            variant="outlined"
                                            name='address'
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Nhập địa chỉ'
                                            helperText={touched.address ? errors.address : ""}
                                            error={touched.address ? Boolean(errors.address) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '12px',
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>Thành phố</FormLabel>
                                        <FormCity isCity={true} />
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                            Số điện thoại
                                        </FormLabel>
                                        <TextField
                                            style={{ width: 500 }}
                                            fullWidth
                                            variant="outlined"
                                            name='sdt'
                                            value={values.sdt}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Nhập số điện thoại'
                                            helperText={touched.sdt ? errors.sdt : ""}
                                            error={touched.sdt ? Boolean(errors.sdt) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '12px',
                                                }
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                        <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                            Địa chỉ email
                                        </FormLabel>
                                        <TextField
                                            style={{ width: 500 }}
                                            fullWidth
                                            variant="outlined"
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Nhập email'
                                            helperText={touched.email ? errors.email : ""}
                                            error={touched.email ? Boolean(errors.email) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '12px',
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                            Ghi chú (tùy chọn)
                                        </FormLabel>
                                        <textarea style={{ width: 500, height: 80, fontFamily: "Roboto", marginBottom:"50px" }}
                                            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            datatype={values.note}
                                            name="note"
                                        />
                                    </FormControl>
                                </Box>
                                <Box sx={{ margin: "0 auto", borderLeft: "1px solid #e1e1e1", width: "750px" }}>
                                    <Box>
                                        <Box sx={{ borderBottom: "1px solid #e1e1e1" }}>
                                            <Typography style={{ fontWeight: "bold", fontSize: "19px", margin: "50px 0 10px 30px" }} >
                                                Đơn hàng của bạn ({productMap.reduce((a: any, b: any) => a + b)} sản phẩm)
                                            </Typography>
                                        </Box>
                                        <Box display={'flex'} flexDirection={'column'} sx={{ boxShadow: "none", overflowX: "hidden", height: "400px", borderBottom: "1px solid #e1e1e1", marginLeft: "25px", fontSize: 14 }}>
                                            {mapProductList.map((product: any) =>
                                                <Box display={'flex'} flexDirection={'row'} sx={{ marginTop: "20px" }}>
                                                    <Box>
                                                        <Box sx={{ width: "20px", height: "20px", borderRadius: "50%", color: "white", backgroundColor: "#0066BF", margin: "0 0 -10px 65px", position: "relative" }}>
                                                            <Typography sx={{ fontFamily: "Roboto", fontSize: "12px", padding: "2px 0 0 7px" }}>
                                                                {product.quantity}
                                                            </Typography>
                                                        </Box>
                                                        <img style={{ width: 60, height: 54, margin: "0px 20px 10px 20px" }} src={product.image} />
                                                    </Box>
                                                    <Box>
                                                        <Box sx={{ maxWidth: "300px", margin: "15px 0 10px 0", fontWeight: "bold" }}>
                                                            {product.nameProduct}
                                                        </Box>
                                                        <Box sx={{ fontFamily: "Roboto" }}>
                                                            {product.nameTypeProduct}
                                                        </Box>
                                                    </Box>
                                                    <Box flexGrow={1} />
                                                    <Box sx={{ marginTop: "10px" }}>
                                                        {new Intl.NumberFormat('de-DE').format(product.total)} VNĐ
                                                    </Box>
                                                </Box>
                                            )}
                                        </Box>
                                        <Box sx={{ margin: "30px 0 0 20px", borderBottom: "1px solid #e1e1e1" }} display={'flex'} flexDirection={'row'}>
                                            <Box sx={{ fontSize: 14 }}>
                                                <Box sx={{ marginBottom: "15px" }}>
                                                    Tạm tính
                                                </Box>
                                                <Box>
                                                    Phí vận chuyển
                                                </Box>
                                            </Box>
                                            <Box flexGrow={1} />
                                            <Box sx={{ marginBottom: "30px" }}>
                                                <Box sx={{ fontSize: "14px" }}>
                                                    {new Intl.NumberFormat('de-DE').format(productMapPrice.reduce((a: any, b: any) => a + b))} VNĐ
                                                </Box>
                                                <Box sx={{ float: "right", marginTop: "10px" }}>
                                                    -
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ margin: "20px 0 0 20px" }} display={'flex'} flexDirection={'row'}>
                                            <Box>Tổng cộng</Box>
                                            <Box flexGrow={1} />
                                            <Box sx={{ color: "#0066BF" }}>
                                                {new Intl.NumberFormat('de-DE').format(productMapPrice.reduce((a: any, b: any) => a + b))} VNĐ
                                            </Box>
                                        </Box>
                                        <Box sx={{ margin: "20px 0 0 20px" }}  display={'flex'} flexDirection={'row'}>
                                            <Box>
                                                <Button style={{
                                                    color: "#0066BF",
                                                    height: "34px",
                                                    width: "150px",
                                                    fontSize: "14px",
                                                    fontWeight: 500,
                                                    borderRadius: "4px",
                                                    textTransform: "inherit",
                                                }}
                                                    onClick={history.goBack}
                                                >  <ArrowBackIosIcon style={{color: "#0066BF", width:"13px", marginBottom:"1px"}}/>Quay về giỏ hàng</Button>
                                            </Box>
                                            <Box flexGrow={1} />
                                            <Box sx={{marginBottom:"30px"}}>
                                                <Button
                                                    type='submit'
                                                    style={{
                                                        color: "white",
                                                        backgroundColor:"#0066BF",
                                                        height: "34px",
                                                        width: "120px",
                                                        fontSize: "12px",
                                                        borderRadius: "4px",
                                                        fontWeight: 500,
                                                    }}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? <CircularProgress size='1rem' /> : "Đặt hàng"}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    )}
                </Formik>

            </Box >
            <Box>
                <Box className="footer" display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Box display={'flex'} flexDirection={'row'} sx={{ padding: "30px 160px 0px 160px" }}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Box sx={{ fontSize: "16px", fontFamily: "Roboto", fontWeight: "bold", color: "white", float: "left" }}>THÔNG TIN LIÊN HỆ</Box>
                            <Divider style={{ border: "1px solid white", marginTop: "20px", width: "370px", float: "left" }} />
                            <Box display={'flex'} flexDirection={'column'} sx={{ marginTop: "20px", fontFamily: "Roboto", float: "left" }}>
                                <Box style={{ fontWeight: "bold", fontSize: "14px", float: "left", letterSpacing: 0.5 }}>
                                    Hệ Thống Chi Nhánh Bình Minh Solar
                                </Box>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "10px 0px", letterSpacing: 0.5, lineHeight: 1.8 }}>
                                    Chi Nhánh 1: 369C Tân Thới Hiệp 21, P. Tân Thới Hiệp, Q.12, Tp. Hồ Chí Minh
                                </Box>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", letterSpacing: 0.5, lineHeight: 1.8 }}>
                                    Chi Nhánh 2: 196 Nguyễn Tri Phương, Thành phố Biên Hòa, Đồng Nai
                                </Box>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "10px 0px", letterSpacing: 0.5, lineHeight: 1.8 }}>
                                    Chi Nhánh 3: Mỹ Phước Tân Vạn, TP. Thủ Dầu Một, Bình Dương
                                </Box>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", letterSpacing: 0.5, lineHeight: 1.8 }}>
                                    Chi Nhánh 4: KCN Đức Hòa – Long An
                                </Box>
                            </Box>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} sx={{ padding: "0px 240px" }}>
                            <Box sx={{ fontSize: "16px", fontFamily: "Roboto", fontWeight: "bold", color: "white", float: "left" }}>ĐƯỜNG DẪN NHANH</Box>
                            <Divider style={{ border: "1px solid white", marginTop: "20px", width: "370px", float: "left" }} />
                            <Box sx={{ fontFamily: "Roboto", float: "left", display: "flex", flexDirection: "column" }}>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5 }}>
                                    TRANG CHỦ
                                </Box>
                                <Box style={{ fontSize: "14px", float: "left", textAlign: "left", letterSpacing: 0.5 }}>
                                    SẢN PHẨM
                                </Box>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5 }}>
                                    TIN TỨC
                                </Box>
                                <img src='/BoCongThuong.png' style={{ marginTop: "50px", width: "200px", height: "76px" }} />
                            </Box>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Box sx={{ fontSize: "16px", fontFamily: "Roboto", fontWeight: "bold", color: "white", float: "left" }}>CHÍNH SÁCH</Box>
                            <Divider style={{ border: "1px solid white", marginTop: "20px", width: "370px", float: "left" }} />
                            <Box sx={{ fontFamily: "Roboto", float: "left", display: "flex", flexDirection: "column" }}>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5 }}>
                                    Chính sách thanh toán
                                </Box>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", letterSpacing: 0.5 }}>
                                    Chính sách giao hàng
                                </Box>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5 }}>
                                    Chính sách bảo hành
                                </Box>
                                <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", letterSpacing: 0.5 }}>
                                    Chính sách bảo mật thông tin
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>

    );
};
export default Cart;
