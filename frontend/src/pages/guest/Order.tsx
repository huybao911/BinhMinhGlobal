import React from 'react';
import { useContext } from 'react';
import { styled, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getTypeProduct } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers";
import { AppBar, Box, Badge, Toolbar, Typography, InputAdornment, OutlinedInput, Button, TextField, Divider, List, ListItem, ListItemText, ListItemButton, IconButton } from '@mui/material';

import { Link } from "react-router-dom";
import "./SlideShow.css";

import { IProduct } from "../../redux/types/product";
import { ITypeProduct } from "../../redux/types/typeproduct";

import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


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
}))

const StyledRoot = styled(AppBar)(() => ({
    boxShadow: 'none',
    width: '100%',
    backgroundColor: 'white',
    fontWeight: 'bold',
}));

const Order: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const [localItems, setLocalItems] = React.useState(JSON.parse(localStorage.getItem("productList")!) || []);
    const mapProductList = localItems.flatMap((arr: any) => arr)
    const productMap = mapProductList.map((product: any) => product.total)
    const classes = useStyles();
    const [filterName, setFilterName] = React.useState('');

    // Increase Quantity
    const AddItems = (id: any) => {
        var match = mapProductList.find(function (item: any) {
            return item['id'] === id;
        });
        match['quantity'] = (parseFloat(mapProductList.filter((get: any) => get.id == id).map((item: any) => item.quantity + 1).toString()));
        match['total'] = (parseFloat(mapProductList.filter((get: any) => get.id == id).map((item: any) => item.quantity * item.price).toString()));
        localStorage.setItem('productList', JSON.stringify(mapProductList));
        setLocalItems(mapProductList);
    };
    const DeleteItems = (id: any) => {
        const productMap = parseFloat(mapProductList.filter((get: any) => get.id == id).map((product: any) => product.quantity).toString())
        var match = mapProductList.find(function (item: any) {
            return item['id'] === id;
        });
        if (productMap > 1)
            match['quantity'] = (parseFloat(mapProductList.filter((get: any) => get.id == id).map((item: any) => item.quantity - 1).toString()));
        match['total'] = (parseFloat(mapProductList.filter((get: any) => get.id == id).map((item: any) => item.quantity * item.price).toString()));
        localStorage.setItem('productList', JSON.stringify(mapProductList));
        setLocalItems(mapProductList);
    };

    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [typeProducts, setTypeProducts] = React.useState<ITypeProduct[]>([]);
    const user = useSelector((state: RootState) => state.user);

    const handleClick = (id: any, index: any) => {
        mapProductList.splice(index, 1);
        localStorage.setItem('productList', JSON.stringify(mapProductList));
        setLocalItems(() => mapProductList.filter((product: any) => product.id != id));
    }

    React.useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getTypeProduct());
    }, [dispatch]);

    React.useEffect(() => {
        setProducts(() =>
            user?.products?.filter((product: any) =>
                product.nameProduct
            ));
    }, [user]);
    React.useEffect(() => {
        setTypeProducts(() => user?.typeproducts?.filter((typeproduct: any) => typeproduct.nameTypeProduct));
    }, [user]);

    const handleFilterByName = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = user?.products?.filter((product: any) => {
                return product.nameProduct.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setProducts(results);
        } else {
            setProducts(() => user?.products?.filter((product: any) => product.nameProduct));
        }

        setFilterName(keyword);
    };

    React.useEffect(() => {
        document.title = "Trang Chủ";
    }, []);
    return (
        <Box>
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
                                    <li><Link style={{
                                        padding: "0 24px",
                                    }} to="/">TRANG CHỦ</Link></li>
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
                                <Badge color="error" badgeContent={mapProductList.length}>
                                    <ShoppingCartIcon />{" "}
                                </Badge>
                            </Box>
                        </Box>
                    </StyledRoot>
                </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} sx={{ margin: "0 300px" }}>
                    <Box sx={{ fontSize: "25px", fontWeight: "bold", margin: "80px 0 0 -1060px" }}>GIỎ HÀNG</Box>
                    {mapProductList && mapProductList.length > 0 ? (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className='th'>Hình ảnh</th>
                                    <th className='th'>Sản phẩm</th>
                                    <th className='th'>Giá</th>
                                    <th className='th'>Số lượng</th>
                                    <th className='th'>Tạm tính</th>
                                    <th className='th'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {mapProductList.map((product: any, index: number) =>
                                    <tr>
                                        <td className='td' style={{ paddingLeft: "20px" }}>
                                            <img style={{ width: 100, padding: "20px 0px" }} src={product.image} />
                                        </td>
                                        <td className='td' style={{ textAlign: "center" }}>
                                            {product.nameProduct}
                                        </td>
                                        <td className='td' style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
                                            {new Intl.NumberFormat('de-DE').format(product.price)} VNĐ
                                        </td>
                                        <td className='td'>
                                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                                                <IconButton style={{ color: "black", border: "1px solid black", width: "20px", height: "20px" }} onClick={() => DeleteItems(product.id)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Box sx={{ padding: "0 10px" }}>
                                                    {product.quantity}
                                                </Box>
                                                <IconButton style={{ color: "black", border: "1px solid black", width: "20px", height: "20px" }} onClick={() => AddItems(product.id)}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </td>
                                        <td className='td' style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
                                            {new Intl.NumberFormat('de-DE').format(product.total)} VNĐ
                                        </td>
                                        <td className='td'>
                                            <Button style={{ color: "red" }} onClick={() => handleClick(product._id, index)} >
                                                <DeleteForeverIcon style={{ width: "20px" }} />
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td className='td' colSpan={6} style={{ padding: "10px 0", fontWeight: "bold" }}>
                                        <Box display={'flex'} flexDirection={'row'} sx={{ float: "right", marginRight: "10px" }}>
                                            <Box sx={{ margin: "10px 10px 0 0" }}>Tổng: {new Intl.NumberFormat('de-DE').format(productMap.reduce((a: any, b: any) => a + b))} VNĐ</Box>
                                            <Link to={"/cart"}>
                                                <Button style={{ textTransform: "inherit", color: "white", backgroundColor: "#0066bf" }}>Tiến hành thanh toán</Button>
                                            </Link>
                                        </Box>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <Box sx={{ marginTop: "50px" }}>Không có sản phẩm trong giỏ hàng</Box>
                    )}
                </Box>

            </Box >
            <Box>
                <Box sx={{ marginTop: "150px" }} className="footer" display={'flex'} alignItems={'center'} justifyContent={'center'}>
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

export default Order;
