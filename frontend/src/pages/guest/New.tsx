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

const New: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const [localItems, setLocalItems] = React.useState(JSON.parse(localStorage.getItem("productList")!) || []);
    const mapProductList = localItems.flatMap((arr: any) => arr)
    const classes = useStyles();
    const [filterName, setFilterName] = React.useState('');

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
        document.title = "Chính sách thanh toán";
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
                                        backgroundColor: "white",
                                        color: "#0066bf", padding: "0 24px",
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
                <Box display={'flex'} flexDirection={'column'} sx={{ margin: "0 auto", width: "1200px" }}>
                    <Box sx={{ fontSize: "25px", fontWeight: "bold", margin: "80px 0 40px 0" }}>CHUYÊN MỤC: TIN TỨC</Box>
                    <Box display={'flex'} flexDirection={'row'}>
                        <Box component={Link} to={'/may-nuoc-nong-nang-luong-mat-troi-binh-minh-co-tot-khong'}>
                            <img style={{ width: "240px" }} src="/new1.jpg" alt="Ảnh MNLMT" />
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} sx={{ marginLeft: "25px" }}>
                            <Box component={Link} to={'/may-nuoc-nong-nang-luong-mat-troi-binh-minh-co-tot-khong'} sx={{ fontSize: "20px", fontWeight: "bold", color: "black", textDecoration: "none", '&:hover': { color: "#0066BF" } }}>
                                Máy nước nóng năng lượng mặt trời Bình Minh có tốt không?
                            </Box>
                            <Box sx={{ fontSize: "14px", lineHeight: 1.5 }}>
                                Ngày nay tốc độ xây dựng nhà ở ngày càng tăng, kéo theo đó nhu cầu dự trữ nước tăng cao khiến thị trường bồn chứa nước, đặc biệt là bồn inox càng trở nên tấp nập hơn bao giờ hết. Do đó mà tình trạng hàng nhái, hàng giả trà trộn là không ít..Vậy […]
                            </Box>
                            <Link to={'/may-nuoc-nong-nang-luong-mat-troi-binh-minh-co-tot-khong'}>
                                <Button style={{ backgroundColor: "#0066BF", color: "white", textTransform: "inherit", width: "100px", marginTop: "25px" }}>
                                    Xem thêm
                                </Button>
                            </Link>
                        </Box>
                    </Box>

                    <Box display={'flex'} flexDirection={'row'} sx={{ margin: "50px 0" }}>
                        <Box component={Link} to={'/nhung-dieu-can-biet-khi-chon-mua-may-nuoc-nong-nang-luong-mat-troi'}>
                            <img style={{ width: "240px" }} src="/new2.jpg" alt="Ảnh MNLMT" />
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} sx={{ marginLeft: "25px" }}>
                            <Box component={Link} to={'/nhung-dieu-can-biet-khi-chon-mua-may-nuoc-nong-nang-luong-mat-troi'} sx={{ fontSize: "20px", fontWeight: "bold", color: "black", textDecoration: "none", '&:hover': { color: "#0066BF" } }}>
                                Những điều cần biết khi chọn mua máy nước nóng năng lượng mặt trời
                            </Box>
                            <Box sx={{ fontSize: "14px", lineHeight: 1.5 }}>
                                Được xem là sản phẩm thân thiện với môi trường và tiết kiệm điện, tuy nhiên việc lựa chọn và lắp đặt máy nước nóng năng lượng mặt trời sai nguyên tắc sẽ không mang lại được những tiện ích và công dụng như mong muốn. Dưới đây là những điều bạn cần lưu ý: Ưu […]
                            </Box>
                            <Link to={'/nhung-dieu-can-biet-khi-chon-mua-may-nuoc-nong-nang-luong-mat-troi'}>
                                <Button style={{ backgroundColor: "#0066BF", color: "white", textTransform: "inherit", width: "100px", marginTop: "68px" }}>
                                    Xem thêm
                                </Button>
                            </Link>
                        </Box>
                    </Box>

                    <Box display={'flex'} flexDirection={'row'}>
                        <Box component={Link} to={'/cach-de-nhan-biet-va-lua-chon-bon-nuoc-inox-binh-minh-chinh-hang'}>
                            <img style={{ width: "240px" }} src="/new3.jpg" alt="Ảnh MNLMT" />
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} sx={{ marginLeft: "25px" }}>
                            <Box component={Link} to={'/cach-de-nhan-biet-va-lua-chon-bon-nuoc-inox-binh-minh-chinh-hang'} sx={{ fontSize: "20px", fontWeight: "bold", color: "black", textDecoration: "none", '&:hover': { color: "#0066BF" } }}>
                                Cách để nhận biết và lựa chọn Bồn nước Inox Bình Minh chính hãng
                            </Box>
                            <Box sx={{ fontSize: "14px", lineHeight: 1.5 }}>
                            Ngày nay tốc độ xây dựng nhà ở ngày càng tăng, kéo theo đó nhu cầu dự trữ nước tăng cao khiến thị trường bồn chứa nước, đặc biệt là bồn inox càng trở nên tấp nập hơn bao giờ hết. Do đó mà tình trạng hàng nhái, hàng giả trà trộn là không ít..Vậy […]
                            </Box>
                            <Link to={'/cach-de-nhan-biet-va-lua-chon-bon-nuoc-inox-binh-minh-chinh-hang'}>
                                <Button style={{ backgroundColor: "#0066BF", color: "white", textTransform: "inherit", width: "100px", marginTop: "71px" }}>
                                    Xem thêm
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box >
            <Box>
                <Box sx={{ marginTop: "100px" }} className="footer" display={'flex'} alignItems={'center'} justifyContent={'center'}>
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

export default New;
