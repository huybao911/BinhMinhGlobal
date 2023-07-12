import React from 'react';
import { styled } from "@material-ui/core/styles";
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
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


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

const StyledSearchMobile = styled(OutlinedInput)(({ theme }) => ({
    width: 340,
    borderRadius: '0px',
    fontSize: '13px',
    height: "42px",
    backgroundColor: "white",
    marginTop: "4px",
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: '#rgba(0, 0, 0, 0.87)'
    },
}));

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

    const useViewport = () => {
        const [width, setWidth] = React.useState(window.innerWidth);

        React.useEffect(() => {
            const handleWindowResize = () => setWidth(window.innerWidth);
            window.addEventListener("resize", handleWindowResize);
            return () => window.removeEventListener("resize", handleWindowResize);
        }, []);

        return { width };
    };
    const viewPort = useViewport();
    const isIpad = viewPort.width <= 1024;
    const isMobile = viewPort.width <= 420

    const [showNavbar, setShowNavbar] = React.useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    const [showProduct, setShowProduct] = React.useState(false)

    const handleShowProduct = () => {
        setShowProduct(!showProduct)
    }

    const menuProduct = !showProduct ? (
        <Box sx={{ height: 0, transition: "all 0.5s ease-in-out" }} />
    ) : (
        <Box className={`nav-products  ${showProduct && 'active'}`}>
            {typeProducts.map((typeProduct: any) =>
                <li>
                    <Link style={{ textDecoration: "none" }} to={`/loaiSP1/${typeProduct._id}`}>
                        <Box sx={{ color: "white", fontWeight: 400, fontSize: 13, fontFamily: "Roboto", display: "flex", flexDirection: "row", margin: "15px 0" }}>
                            <Box sx={{ width: "9px", height: "9px", borderRadius: "50%", border: "1px solid white", margin: "3px 5px 0 0" }} />{typeProduct.nameTypeProduct}
                        </Box>
                    </Link>

                </li>
            )}
        </Box>
    )

    const menuProductArrow = !showProduct ? (
        <KeyboardArrowDownIcon onClick={handleShowProduct} style={{ color: "white", margin: "-2px 19px 0 0" }} />
    ) : (
        <ExpandLessIcon onClick={handleShowProduct} style={{ color: "white", margin: "-2px 19px 0 0" }} />
    )

    const menu = showNavbar ? (
        <Box sx={{ height: 0, transition: "all 0.5s ease-in-out" }} />
    ) : (
        <Box className={`nav-elements  ${showNavbar && 'active'}`}>
            <Divider style={{ height: 1 }} />
            <ul style={{ marginLeft: "-20px" }}>
                <li>
                    <Link style={{ textDecoration: "none", fontWeight: "bold", color: "white" }} to="/">TRANG CHỦ</Link>
                </li>
                <li style={{ margin: "23px 0" }}>
                    <Box display={'flex'} flexDirection={'row'}>
                        <Link style={{ textDecoration: "none", fontWeight: "bold", color: "white" }} to="/LoaiSP">SẢN PHẨM</Link>
                        <Box flexGrow={1} />
                        {menuProductArrow}
                    </Box>
                    {menuProduct}
                </li>
                <li>
                    <Link style={{ textDecoration: "none", fontWeight: "bold", color: "white" }} to="/tintuc">TIN TỨC</Link>
                </li>
            </ul>
        </Box>
    )

    if (isIpad) {
        return (
            <Box >
                <Box>
                    <Box>
                        <Box sx={{ backgroundImage: "url(/backgroundHeader.jpg)", height: "234px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Link style={{ textDecoration: 'none', margin: "10px auto" }} to={'/'}>
                                <img src="/logoBM.png" style={{ height: "90px", width: "90px" }}></img>
                            </Link>
                            <Box sx={{ fontSize: "30px", fontWeight: "bold", color: "red", textAlign: "center" }}>BÌNH MINH GLOBAL</Box>
                            <Box sx={{ fontSize: "19px", fontWeight: "bold", color: "#0066BF", textAlign: "center" }}> NHÀ CUNG CẤP SỐ 1 VỀ BỒN NƯỚC VÀ NĂNG LƯỢNG MẶT TRỜI</Box>
                        </Box>
                        <Box sx={{ backgroundColor: "#0066BF", maxHeight: "600px", display: "flex", flexDirection: "column" }}>
                            <Box display={'flex'} flexDirection={'row'} sx={{ margin: "15px 20px" }} >
                                <MenuIcon onClick={handleShowNavbar} style={{ color: "white" }} />
                                <Box flexGrow={1} />
                                <Box component={Link} to={"/order"} >
                                    <Badge color="error" badgeContent={mapProductList.length}>
                                        <ShoppingCartIcon style={{ color: "white" }} />{" "}
                                    </Badge>
                                </Box>
                            </Box>
                            {menu}
                            <Box display={'flex'} justifyContent={'center'}>
                                <StyledSearchMobile
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
                        </Box>
                        <Box sx={{ fontSize: "25px", fontWeight: "bold", margin: "30px 15px 0 15px" }}>GIỎ HÀNG</Box>
                        {mapProductList && mapProductList.length > 0 ? (
                            <Box display={'flex'} flexDirection={'column'} sx={{ margin: "30px 15px 0 15px" }}>
                                {mapProductList.map((product: any, index: number) =>
                                    <Box>
                                        <Box display={'flex'} flexDirection={'row'} sx={{ margin: "30px 0" }}>
                                            <Box>
                                                <img src={product.image} style={{ width: "150px", height: "120px" }} />
                                            </Box>
                                            <Box display={'flex'} flexDirection={'column'} sx={{ marginLeft: "15px" }}>
                                                <Box style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>{product.nameProduct}</Box>
                                                <Box>{product.nameTypeProduct}</Box>
                                                <Box flexGrow={1} />
                                                <Box display={'flex'} flexDirection={'row'}>
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
                                            </Box>
                                            <Box flexGrow={1} />
                                            <Box display={'flex'} flexDirection={'column'}>
                                                <Button style={{ color: "red", display: "flex", justifyContent: "right" }} onClick={() => handleClick(product._id, index)} >
                                                    <ClearIcon style={{ width: "20px" }} />
                                                </Button>
                                                <Box flexGrow={1} />
                                                <Box>
                                                    {new Intl.NumberFormat('de-DE').format(product.total)} VNĐ
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Divider style={{ backgroundColor: "rgba(112, 112, 112, 0.3)", height: 1 }} />
                                    </Box>
                                )}
                                <Box display={'flex'} flexDirection={'row'} sx={{ margin: "20px 15px" }}>
                                    <Box>
                                        Tạm tính
                                    </Box>
                                    <Box flexGrow={1} />
                                    <Box sx={{ fontWeight: "bold" }}>
                                        {new Intl.NumberFormat('de-DE').format(productMap.reduce((a: any, b: any) => a + b))} VNĐ
                                    </Box>
                                </Box>
                                <Box display={'flex'} justifyContent={'center'} sx={{ margin: "20px 15px" }}>
                                    <Link to={"/cart"}>
                                        <Button style={{ textTransform: "inherit", color: "white", backgroundColor: "#0066bf", borderRadius: "2px", width: "300px" }}>Thanh toán</Button>
                                    </Link>
                                </Box>
                            </Box>
                        ) : (
                            <Box>
                                <Box sx={{ marginTop: "50px", fontSize: "25px", textAlign: "center", fontWeight: "bold", color: "#0066BF" }}>Hiện tại không có sản phẩm trong giỏ hàng</Box>
                                <Box display={'flex'} justifyContent={'center'}>
                                     <img style={{width:"300px"}} src="/no-product.gif" />
                                </Box>
                               
                            </Box>
                        )}
                    </Box>
                    <Box className="footer">
                        <Box sx={{ display: "flex", flexDirection: "column", margin: "0 10px" }}>
                            <Box sx={{ fontSize: "16px", fontWeight: "bold", color: "white", margin: "20px 0" }}>
                                THÔNG TIN LIÊN HỆ
                            </Box>
                            <Divider style={{ height: 1, backgroundColor: "white" }} />
                            <Box style={{ fontWeight: "bold", fontSize: "14px", float: "left", letterSpacing: 0.5, marginTop: "20px" }}>
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

                            <Box sx={{ fontSize: "16px", fontWeight: "bold", color: "white", margin: "20px 0" }}>
                                ĐƯỜNG DẪN NHANH
                            </Box>
                            <Divider style={{ height: 1, backgroundColor: "white" }} />
                            <Box component={Link} to={'/'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                TRANG CHỦ
                            </Box>
                            <Box component={Link} to={'/LoaiSP'} style={{ fontSize: "14px", float: "left", textAlign: "left", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                SẢN PHẨM
                            </Box>
                            <Box style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5 }}>
                                TIN TỨC
                            </Box>
                            <img src='/BoCongThuong.png' style={{ width: "200px", height: "76px" }} />

                            <Box sx={{ fontSize: "16px", fontWeight: "bold", color: "white", margin: "20px 0" }}>
                                CHÍNH SÁCH
                            </Box>
                            <Divider style={{ height: 1, backgroundColor: "white" }} />
                            <Box component={Link} to={'/chinh-sach-thanh-toan'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                Chính sách thanh toán
                            </Box>
                            <Box component={Link} to={'/chinh-sach-giao-hang'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                Chính sách giao hàng
                            </Box>
                            <Box component={Link} to={'/chinh-sach-bao-hanh'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                Chính sách bảo hành
                            </Box>
                            <Box component={Link} to={'/chinh-sach-bao-mat-thong-tin'} style={{ fontSize: "14px", float: "left", margin: "0 0 20px -2px", textAlign: "left", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                Chính sách bảo mật thông tin
                            </Box>
                        </Box>
                    </Box>
                    <a href="tel:0799177960" className="hotlinemp all" rel="nofollow">
                        <div className="mypage-alo-phone" style={{ left: "0px" }}>
                            <div className="animated infinite zoomIn mypage-alo-ph-circle"></div>
                            <div className="animated infinite pulse mypage-alo-ph-circle-fill"></div>
                            <div className="animated infinite tada mypage-alo-ph-img-circle" style={{ backgroundColor: "red" }}></div>
                            <span>0799177960</span>
                        </div>
                    </a>
                </Box>
            </Box>
        )
    }
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
                                        <Link to="/loaiSP" style={{ padding: "0 24px", }}>
                                            SẢN PHẨM
                                        </Link>
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
                                    <li><Link to={'/tintuc'} style={{
                                        padding: "0 24px",
                                    }}>TIN TỨC</Link></li>
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
                            <Box component={Link} to={"/order"} sx={{ padding: "12px 0px", marginLeft: "20px", color: "white" }}>
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
                        <Box>
                            <Box sx={{ marginTop: "50px", fontSize: "30px", textAlign: "center", fontWeight: "bold", color: "#0066BF" }}>Hiện tại không có sản phẩm trong giỏ hàng</Box>
                            <img src="/no-product.gif" />
                        </Box>
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
                                <Box component={Link} to={'/'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                    TRANG CHỦ
                                </Box>
                                <Box component={Link} to={'/LoaiSP'} style={{ fontSize: "14px", float: "left", textAlign: "left", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
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
                                <Box component={Link} to={'/chinh-sach-thanh-toan'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                    Chính sách thanh toán
                                </Box>
                                <Box component={Link} to={'/chinh-sach-giao-hang'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                    Chính sách giao hàng
                                </Box>
                                <Box component={Link} to={'/chinh-sach-bao-hanh'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                    Chính sách bảo hành
                                </Box>
                                <Box component={Link} to={'/chinh-sach-bao-mat-thong-tin'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", letterSpacing: 0.5, textDecoration: "none", color: "white" }}>
                                    Chính sách bảo mật thông tin
                                </Box>
                            </Box>
                        </Box>
                        <a href="tel:0799177960" className="hotlinemp all" rel="nofollow">
                            <div className="mypage-alo-phone" style={{ left: "0px" }}>
                                <div className="animated infinite zoomIn mypage-alo-ph-circle"></div>
                                <div className="animated infinite pulse mypage-alo-ph-circle-fill"></div>
                                <div className="animated infinite tada mypage-alo-ph-img-circle" style={{ backgroundColor: "red" }}></div>
                                <span>0799177960</span>
                            </div>
                        </a>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Order;
