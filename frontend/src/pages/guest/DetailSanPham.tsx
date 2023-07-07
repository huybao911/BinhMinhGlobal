import React from 'react';
import { styled, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getTypeProduct } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers";
import { AppBar, Box, Badge, Toolbar, Typography, InputAdornment, OutlinedInput, Button, Divider } from '@mui/material';

import { Link, useParams } from "react-router-dom";
import "./SlideShow.css";
import { IProduct } from "../../redux/types/product";
import { ITypeProduct } from "../../redux/types/typeproduct";

import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

interface RouteParams {
    id: string
}

const DetailSanPham: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const [filterName, setFilterName] = React.useState('');
    const params = useParams<RouteParams>();

    const [localItems, setLocalItems] = React.useState(JSON.parse(localStorage.getItem("productList")!) || []);
    const mapProductList = localItems.flatMap((arr: any) => arr)
    const productMap = mapProductList.map((product: any) => product.total)
    const productMapQuantity = mapProductList.map((product: any) => product.quantity)

    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [typeProducts, setTypeProducts] = React.useState<ITypeProduct[]>([]);
    const user = useSelector((state: RootState) => state.user);

    const handleClick = (product: any, id: any, nameProduct: any, image: any, price: any, nameTypeProduct: any) => {
        let productList = localStorage.getItem("productList");
        var sameProduct = product.map((product: any) => product.nameProduct)
        if (productList && !mapProductList.some((product: any) => product.nameProduct.includes(sameProduct))) {
            let arr = JSON.parse(productList);
            arr.push({
                id: id,
                nameProduct: nameProduct,
                nameTypeProduct: nameTypeProduct,
                image: image,
                price: price,
                quantity: 1,
                total: price * 1,
            })
            localStorage.setItem("productList", JSON.stringify(arr));
            setLocalItems([...localItems, {
                id: id,
                nameProduct: nameProduct,
                nameTypeProduct: nameTypeProduct,
                image: image,
                price: price,
                quantity: 1,
                total: price * 1,
            }]);
        } else if (!productList) {
            localStorage.setItem("productList", JSON.stringify([{
                id: id,
                nameProduct: nameProduct,
                nameTypeProduct: nameTypeProduct,
                image: image,
                price: price,
                quantity: 1,
                total: price * 1,
            }]))
            setLocalItems([...localItems, {
                id: id,
                nameProduct: nameProduct,
                nameTypeProduct: nameTypeProduct,
                image: image,
                price: price,
                quantity: 1,
                total: price * 1,
            }]);
        } else {
            var match = mapProductList.find(function (item: any) {
                return item['id'] === id;
            });
            if (match) {
                match['quantity'] = (parseFloat(mapProductList.filter((get: any) => get.id == id).map((item: any) => item.quantity + 1).toString()));
                match['total'] = (parseFloat(mapProductList.filter((get: any) => get.id == id).map((item: any) => item.quantity * item.price).toString()));
            }
            localStorage.setItem('productList', JSON.stringify(mapProductList));
        }
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
                product._id == params.id
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
                                    }} to={"/"}>TRANG CHỦ</Link></li>
                                    <li>
                                        <Link style={{
                                            backgroundColor: "white",
                                            color: "#0066bf",
                                            padding: "0 24px",
                                        }} to={"/loaiSP"}>SẢN PHẨM</Link>
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
                            <Box component={Link} to={"/order"} sx={{ padding: "12px 0px", marginLeft: "20px", color: "white" }}>
                                <Badge color="error" badgeContent={mapProductList.length}>
                                    <ShoppingCartIcon />{" "}
                                </Badge>
                            </Box>
                        </Box>
                    </StyledRoot>
                </Box>
                <Box sx={{ marginTop: "100px" }}>
                    {products.map((product: any) =>
                        <Box key={product._id} display={'flex'} flexDirection={'column'}>
                            <Box key={product._id} display={'flex'} flexDirection={'row'} sx={{ margin: "auto" }}>
                                <Box sx={{ marginRight: "50px", border: "1px solid #eaeaea", padding: "20px" }}>
                                    <Box className="photo">
                                        <img className="imgHover" style={{ transition: '0.5s all ease-in-out', width: "400px" }} src={product.image} />
                                    </Box>
                                    <Box sx={{ margin: "15px 0px 5px 50px" }}>
                                        <img style={{ width: "90px", border: "1px solid #0066bf" }} src={product.image} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: "350px", marginTop: "20px" }}>
                                    <Box sx={{ fontSize: "24px", fontFamily: "Roboto" }}>
                                        {product.nameProduct}
                                    </Box>
                                    <Box sx={{ fontSize: "22px", fontFamily: "Roboto", color: "#DD0000", fontWeight: "bold", paddingTop: "10px", paddingBottom: "30px" }}>
                                        {new Intl.NumberFormat('de-DE').format(product.price)} VNĐ
                                    </Box>
                                    <Box sx={{ fontSize: "14px", fontFamily: "Roboto", color: "#333333", lineHeight: 1.5, letterSpacing: 0.7 }} dangerouslySetInnerHTML={{ __html: product.productDetail }} />
                                    <Box display={'flex'} flexDirection={'row'} sx={{ marginTop: "40px", alignItems: "center", justifyContent: "center" }}>
                                        <Link to={"/order"}>
                                            <Button onClick={() => handleClick(products.filter((products: any) => products._id === product._id), product._id, product.nameProduct, product.image, product.price, product.typeProduct.nameTypeProduct)} style={{ color: "white", backgroundColor: "black", marginRight: "10px", height: "39px", padding: "0px 18px", fontSize: "15px", width: "165px" }}>
                                                MUA HÀNG
                                            </Button>
                                        </Link>
                                        <Button onClick={() => handleClick(products.filter((products: any) => products._id === product._id), product._id, product.nameProduct, product.image, product.price, product.typeProduct.nameTypeProduct)} style={{ color: "white", backgroundColor: "#3CB371", fontSize: "15px" }}>
                                            THÊM VÀO GIỎ HÀNG
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                            <Box display={'flex'} flexDirection={'column'} sx={{ margin: "auto" }}>
                                <Box sx={{ margin: "20px 0px 0px 8px" }} >
                                    <Typography style={{ fontWeight: "bold", color: "#0066bf" }}>
                                        MÔ TẢ
                                    </Typography>
                                    <Divider style={{ border: "1px solid #0066bf", width: "1000px" }} />
                                    <Box sx={{ marginTop: "20px", maxWidth: "1000px", lineHeight: 1.8, letterSpacing: 0.7 }} dangerouslySetInnerHTML={{ __html: product.productDescription }} />
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
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
                                <Box component={Link} to={'/'} style={{ fontSize: "14px", float: "left", marginLeft: "-2px", textAlign: "left", margin: "20px 0px", letterSpacing: 0.5, textDecoration:"none", color:"white" }}>
                                    TRANG CHỦ
                                </Box>
                                <Box component={Link} to={'/LoaiSP'} style={{ fontSize: "14px", float: "left", textAlign: "left", letterSpacing: 0.5, textDecoration:"none", color:"white" }}>
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

export default DetailSanPham;
