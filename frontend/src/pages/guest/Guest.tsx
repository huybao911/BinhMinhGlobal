import React from 'react';
import { useContext } from 'react';
import { styled, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getTypeProduct } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers";
import { AppBar, Box, Badge, Toolbar, Typography, InputAdornment, OutlinedInput, Button, TextField, Divider, List, ListItem, ListItemText, ListItemButton } from '@mui/material';

import { Link } from "react-router-dom";
import ImageSlider from './ImageSlider';
import { ImageData } from "./ImageData"
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

const Guest: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const [localItems, setLocalItems] = React.useState(JSON.parse(localStorage.getItem("productList")!) || []);
    const mapProductList = localItems.flatMap((arr: any) => arr)
    const classes = useStyles();
    const [filterName, setFilterName] = React.useState('');

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
            setLocalItems(mapProductList);
            // let arr = JSON.parse(productList);
            // arr.push([{
            //     id: id,
            //     nameProduct: nameProduct,
            //     image: image,
            //     price: price,
            //     quantity:(parseFloat(mapProductList.filter((get:any)=>get.id == id).map((item:any) => item.quantity + 1).toString())),
            // }])
            // localStorage.setItem("productList", JSON.stringify(arr));
            // setLocalItems([...localItems,{
            //     id: id,
            //     nameProduct: nameProduct,
            //     image: image,
            //     price: price,
            //     quantity:(parseFloat(mapProductList.filter((get:any)=>get.id == id).map((item:any) => item.quantity + 1).toString())),
            // }]);
            // mapProductList.splice(index, 1);
            // localStorage.setItem('productList', JSON.stringify(mapProductList));
            // setLocalItems(() => mapProductList.filter((product: any) => product.id != id));
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
                                        backgroundColor: "white",
                                        color: "#0066bf",
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
                            {/* <Box display={'flex'} flexDirection={'row'} flexGrow={1} sx={{ fontSize: "16px", fontFamily: "Roboto" }}>
                            <Box sx={{
                                padding: "0px 25px", height: "33px", paddingTop: "17px", backgroundColor: "white", color: "#0066bf"
                            }}>TRANG CHỦ</Box>
                            <Box sx={{
                                padding: "0px 25px", paddingTop: "17px",
                                '&: hover': {
                                    backgroundColor: "white",
                                    color: "#0066bf"
                                },
                            }}>SẢN PHẨM</Box>
                            <Box position={'absolute'} sx={{ width: "390px", height: "205px", backgroundColor: "white", margin: "50px 0px 0px 139px" }}>
                                {typeProducts.map((typeProduct: any) =>
                                    <Box sx={{ color: "#333333", fontWeight: 400, fontSize: 14, padding:"12px 22px" }}>{typeProduct.nameTypeProduct}</Box>
                                )}
                            </Box>
                            <Box sx={{
                                padding: "0px 25px", paddingTop: "17px",
                                '&: hover': {
                                    backgroundColor: "white",
                                    color: "#0066bf"
                                },
                            }}>TIN TỨC</Box>
                        </Box> */}
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
                <ImageSlider ImageData={ImageData} />
                <Box sx={{ textAlign: "center", marginTop: "50px" }}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Box display={'flex'} margin={'auto'}>
                            <Typography style={{ fontFamily: "Roboto", fontSize: "25px", fontWeight: "bold", color: "white", backgroundColor: "#0066BF", width: 370, height: 40, marginBottom: "20px", paddingTop: "4px" }}>
                                SẢN PHẨM CỦA CHÚNG TÔI
                            </Typography>
                        </Box>

                        <Box display={'flex'} flexDirection={'row'} sx={{ borderColor: "#0066BF", alignItems: "center", justifyContent: "center" }}>
                            <Box>
                                {typeProducts.filter((typeProduct: any) => typeProduct.nameTypeProduct === "Bồn Inox Bình Minh TITAN").map((typeProduct: any) =>
                                    <Box key={typeProduct._id} className={classes.typeProduct}>
                                        <Box className="photo">
                                            <img className="imgHover" style={{ width: "267px", height: "267px" }} src='/bonInox.jpg' />
                                        </Box>
                                        <Box key={typeProduct} className={classes.nameTypeProduct}>
                                            {typeProduct.nameTypeProduct}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                            <Box sx={{ padding: "0px 10px 0px 20px" }}>
                                {typeProducts.filter((typeProduct: any) => typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh TITAN").map((typeProduct: any) =>
                                    <Box key={typeProduct._id} className={classes.typeProduct}>
                                        <Box className="photo">
                                            <img className="imgHover" style={{ width: "267px", height: "267px" }} src='/NLMT_TITAN.png' />
                                        </Box>
                                        <Box key={typeProduct} className={classes.nameTypeProduct}>
                                            Máy NLMT Bình Minh TITAN
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                            <Box sx={{ padding: "0px 20px 0px 10px" }}>
                                {typeProducts.filter((typeProduct: any) => typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh NANO").map((typeProduct: any) =>
                                    <Box key={typeProduct._id} className={classes.typeProduct}>
                                        <Box className="photo">
                                            <img className="imgHover" style={{ width: "267px", height: "267px" }} src='/NLMT_NANO.png' />
                                        </Box>
                                        <Box key={typeProduct} className={classes.nameTypeProduct}>
                                            Máy NLMT Bình Minh NANO
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                            <Box sx={{ paddingRight: "20px" }}>
                                {typeProducts.filter((typeProduct: any) => typeProduct.nameTypeProduct === "Chậu Rửa TITAN").map((typeProduct: any) =>
                                    <Box key={typeProduct._id} className={classes.typeProduct}>
                                        <Box className="photo">
                                            <img className="imgHover" style={{ width: "267px", height: "267px" }} src='/ChauRua.jpg' />
                                        </Box>
                                        <Box key={typeProduct} className={classes.nameTypeProduct}>
                                            {typeProduct.nameTypeProduct}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                            <Box>
                                {typeProducts.filter((typeProduct: any) => typeProduct.nameTypeProduct === "Vòi sen").map((typeProduct: any) =>
                                    <Box key={typeProduct._id} className={classes.typeProduct}>
                                        <Box className="photo">
                                            <img className="imgHover" style={{ width: "267px", height: "267px" }} src='/voisen.jpg' />
                                        </Box>
                                        <Box key={typeProduct} className={classes.nameTypeProduct}>
                                            {typeProduct.nameTypeProduct}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>

                </Box>
                <Box display={'flex'} flexDirection={'column'} sx={{ textAlign: "center", marginTop: "60px" }}>
                    <Typography style={{ fontFamily: "Roboto", fontSize: "25px", fontWeight: "bold", color: "black", marginBottom: "10px" }}>
                        BỒN INOX BÌNH MINH TITAN
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Divider style={{ marginBottom: "20px", width: "200px", backgroundColor: "black" }} />
                    </Box>

                    <Box display={'flex'} flexDirection={'row'} sx={{ borderColor: "#0066BF", alignItems: "center", justifyContent: "center" }}>
                        {products.filter((product: any) => product.nameProduct === "Bồn inox Bình Minh nằm 500L" || product.nameProduct === "Bồn inox Bình Minh nằm 1000L" || product.nameProduct === "Bồn inox Bình Minh nằm 2000L" || product.nameProduct === "Bồn inox Bình Minh Đứng 300L" || product.nameProduct === "Bồn inox Bình Minh Đứng 500L").map((product: any) =>
                            <Box key={product._id} sx={{ margin: "0px 10px" }} >
                                <Box className="photo">
                                    <img className="imgHover" style={{ width: "270px", height: "240px" }} src={product.image} />
                                </Box>
                                <Box sx={{ fontSize: "16px", fontWeight: "bold", fontFamily: "Roboto" }}>
                                    {product.nameProduct}
                                </Box>
                                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "red", marginTop: "15px" }}>
                                    {new Intl.NumberFormat('de-DE').format(product.price)} VNĐ
                                </Box>
                                <Box display={'flex'} flexDirection={'row'} sx={{ marginTop: "10px", alignItems: "center", justifyContent: "center" }}>
                                    <Link to={`/chitietloaiSP/${product._id}`}>
                                        <Button style={{ color: "white", backgroundColor: "black", marginRight: "5px", height: "39px", padding: "0px 18px" }}>
                                            Chi Tiết
                                        </Button>
                                    </Link>
                                    <Button onClick={() => handleClick(products.filter((products: any) => products._id === product._id), product._id, product.nameProduct, product.image, product.price, product.typeProduct.nameTypeProduct)} style={{ color: "black", backgroundColor: "white", border: "1px solid black" }}>
                                        Mua Hàng
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Box display={'flex'} flexDirection={'column'} sx={{ textAlign: "center", marginTop: "60px" }}>
                    <Typography style={{ fontFamily: "Roboto", fontSize: "25px", fontWeight: "bold", color: "black", marginBottom: "10px" }}>
                        MÁY NLMT BÌNH MINH TITAN
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Divider style={{ marginBottom: "20px", width: "200px", backgroundColor: "black" }} />
                    </Box>
                    <Box display={'flex'} flexDirection={'row'} sx={{ borderColor: "#0066BF", alignItems: "center", justifyContent: "center" }}>
                        {products.filter((product: any) => product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh TITAN" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh 130L" || product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh TITAN" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh 160L" || product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh TITAN" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh 180L" || product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh TITAN" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh 210L" || product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh TITAN" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh 250L").map((product: any) =>
                            <Box key={product._id} sx={{ margin: "0px 10px" }} >
                                <Box className="photo">
                                    <img className="imgHover" style={{ width: "270px", height: "240px" }} src={product.image} />
                                </Box>
                                <Box sx={{ fontSize: "16px", fontWeight: "bold", fontFamily: "Roboto", maxWidth: "272px" }}>
                                    {product.nameProduct}
                                </Box>
                                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "red", marginTop: "15px" }}>
                                    {new Intl.NumberFormat('de-DE').format(product.price)} VNĐ
                                </Box>
                                <Box display={'flex'} flexDirection={'row'} sx={{ marginTop: "10px", alignItems: "center", justifyContent: "center" }}>
                                    <Link to={`/chitietloaiSP/${product._id}`}>
                                        <Button style={{ color: "white", backgroundColor: "black", marginRight: "5px", height: "39px", padding: "0px 18px" }}>
                                            Chi Tiết
                                        </Button>
                                    </Link>
                                    <Button onClick={() => handleClick(products.filter((products: any) => products._id === product._id), product._id, product.nameProduct, product.image, product.price, product.typeProduct.nameTypeProduct)} style={{ color: "black", backgroundColor: "white", border: "1px solid black" }}>
                                        Mua Hàng
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Box display={'flex'} flexDirection={'column'} sx={{ textAlign: "center", marginTop: "60px" }}>
                    <Typography style={{ fontFamily: "Roboto", fontSize: "25px", fontWeight: "bold", color: "black", marginBottom: "10px" }}>
                        MÁY NLMT BÌNH MINH NANO
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Divider style={{ marginBottom: "20px", width: "200px", backgroundColor: "black" }} />
                    </Box>
                    <Box display={'flex'} flexDirection={'row'} sx={{ borderColor: "#0066BF", alignItems: "center", justifyContent: "center" }}>
                        {products.filter((product: any) => product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh NANO" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh Ruột PPR 160L" || product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh NANO" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh Ruột PPR 180L" || product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh NANO" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh Ruột PPR 210L" || product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh NANO" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh Ruột PPR 250L" || product.typeProduct.nameTypeProduct === "Máy Nước Nóng Năng Lượng Mặt Trời Bình Minh NANO" && product.nameProduct === "Máy nước nóng năng lượng mặt trời Bình Minh Ruột PPR 300L").map((product: any) =>
                            <Box key={product._id} sx={{ margin: "0px 10px" }} >
                                <Box className="photo">
                                    <img className="imgHover" style={{ width: "270px", height: "240px" }} src={product.image} />
                                </Box>
                                <Box sx={{ fontSize: "16px", fontWeight: "bold", fontFamily: "Roboto", maxWidth: "272px" }}>
                                    {product.nameProduct}
                                </Box>
                                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "red", marginTop: "15px" }}>
                                    {new Intl.NumberFormat('de-DE').format(product.price)} VNĐ
                                </Box>
                                <Box display={'flex'} flexDirection={'row'} sx={{ marginTop: "10px", alignItems: "center", justifyContent: "center" }}>
                                    <Link to={`/chitietloaiSP/${product._id}`}>
                                        <Button style={{ color: "white", backgroundColor: "black", marginRight: "5px", height: "39px", padding: "0px 18px" }}>
                                            Chi Tiết
                                        </Button>
                                    </Link>
                                    <Button onClick={() => handleClick(products.filter((products: any) => products._id === product._id), product._id, product.nameProduct, product.image, product.price, product.typeProduct.nameTypeProduct)} style={{ color: "black", backgroundColor: "white", border: "1px solid black" }}>
                                        Mua Hàng
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Box display={'flex'} flexDirection={'column'} sx={{ textAlign: "center", marginTop: "60px" }}>
                    <Typography style={{ fontFamily: "Roboto", fontSize: "25px", fontWeight: "bold", color: "black", marginBottom: "10px" }}>
                        CHẬU RỬA TITAN
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Divider style={{ marginBottom: "20px", width: "200px", backgroundColor: "black" }} />
                    </Box>
                    <Box display={'flex'} flexDirection={'row'} sx={{ borderColor: "#0066BF", alignItems: "center", justifyContent: "center" }}>
                        {products.filter((product: any) => product.nameProduct === "CHẬU RỬA BÁT INOX TITANIUM S50" || product.nameProduct === "CHẬU RỬA BÁT INOX TITANIUM S82" || product.nameProduct === "CHẬU RỬA BÁT INOX TITANIUM S78" || product.nameProduct === "CHẬU RỬA INOX 2 HỘC ĐỀU S76S" || product.nameProduct === "CHẬU RỬA INOX 2 HỘC ĐỀU, CÓ BÀN").map((product: any) =>
                            <Box key={product._id} sx={{ margin: "0px 10px" }} >
                                <Box className="photo">
                                    <img className="imgHover" style={{ width: "270px", height: "270px" }} src={product.image} />
                                </Box>
                                <Box sx={{ fontSize: "16px", fontWeight: "bold", fontFamily: "Roboto", maxWidth: "272px" }}>
                                    {product.nameProduct}
                                </Box>
                                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "red", marginTop: "15px" }}>
                                    {new Intl.NumberFormat('de-DE').format(product.price)} VNĐ
                                </Box>
                                <Box display={'flex'} flexDirection={'row'} sx={{ marginTop: "10px", alignItems: "center", justifyContent: "center" }}>
                                    <Link to={`/chitietloaiSP/${product._id}`}>
                                        <Button style={{ color: "white", backgroundColor: "black", marginRight: "5px", height: "39px", padding: "0px 18px" }}>
                                            Chi Tiết
                                        </Button>
                                    </Link>
                                    <Button onClick={() => handleClick(products.filter((products: any) => products._id === product._id), product._id, product.nameProduct, product.image, product.price, product.typeProduct.nameTypeProduct)} style={{ color: "black", backgroundColor: "white", border: "1px solid black" }}>
                                        Mua Hàng
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>

                <Box display={'flex'} flexDirection={'column'} sx={{ textAlign: "center", marginTop: "60px" }}>
                    <Typography style={{ fontFamily: "Roboto", fontSize: "25px", fontWeight: "bold", color: "black", marginBottom: "10px" }}>
                        VÒI SEN
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Divider style={{ marginBottom: "20px", width: "200px", backgroundColor: "black" }} />
                    </Box>
                    <Box display={'flex'} flexDirection={'row'} sx={{ borderColor: "#0066BF", alignItems: "center", justifyContent: "center", marginRight: "900px" }}>
                        {products.filter((product: any) => product.nameProduct === "VÒI CHẬU CHÉN TITANIUM 3001" || product.nameProduct === "VÒI CHẬU CHÉN TITANIUM 3003").map((product: any) =>
                            <Box key={product._id} sx={{ margin: "0px 10px" }} >
                                <Box className="photo">
                                    <img className="imgHover" style={{ width: "270px", height: "270px" }} src={product.image} />
                                </Box>
                                <Box sx={{ fontSize: "16px", fontWeight: "bold", fontFamily: "Roboto", maxWidth: "272px" }}>
                                    {product.nameProduct}
                                </Box>
                                <Box sx={{ fontSize: "14px", fontWeight: "bold", color: "red", marginTop: "15px" }}>
                                    {new Intl.NumberFormat('de-DE').format(product.price)} VNĐ
                                </Box>
                                <Box display={'flex'} flexDirection={'row'} sx={{ marginTop: "10px", alignItems: "center", justifyContent: "center" }}>
                                    <Link to={`/chitietloaiSP/${product._id}`}>
                                        <Button style={{ color: "white", backgroundColor: "black", marginRight: "5px", height: "39px", padding: "0px 18px" }}>
                                            Chi Tiết
                                        </Button>
                                    </Link>
                                    <Button onClick={() => handleClick(products.filter((products: any) => products._id === product._id), product._id, product.nameProduct, product.image, product.price, product.typeProduct.nameTypeProduct)} style={{ color: "black", backgroundColor: "white", border: "1px solid black" }}>
                                        Mua Hàng
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
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

export default Guest;
