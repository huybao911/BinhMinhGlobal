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

const New2: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const [localItems, setLocalItems] = React.useState(JSON.parse(localStorage.getItem("productList")!) || []);
    const mapProductList = localItems.flatMap((arr: any) => arr)
    const productMap = mapProductList.map((product: any) => product.total)
    const classes = useStyles();
    const [filterName, setFilterName] = React.useState('');

    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [typeProducts, setTypeProducts] = React.useState<ITypeProduct[]>([]);
    const user = useSelector((state: RootState) => state.user);

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
    const isMobile = viewPort.width <= 1024;

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

    if (isMobile) {
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
                        <Box display={'flex'} flexDirection={'column'} sx={{ margin: "0 10px" }}>
                            <Box sx={{ fontSize: "25px", fontWeight: "bold", margin: "20px 0 40px 0" }}>NHỮNG ĐIỀU CẦN BIẾT KHI CHỌN MUA MÁY NƯỚC NÓNG NĂNG LƯỢNG MẶT TRỜI</Box>
                            <Box display={'flex'} margin={'auto'}>
                                <img src="/new2.jpg" style={{ width: "360px" }} alt="Ảnh NLMT" />
                            </Box>
                            <Box sx={{ fontSize: 14, margin: "25px 0", lineHeight: 1.5 }}>
                                Được xem là sản phẩm thân thiện với môi trường và tiết kiệm điện, tuy nhiên việc lựa chọn và lắp đặt máy nước nóng năng lượng mặt trời sai nguyên tắc sẽ không mang lại được những tiện ích và công dụng như mong muốn. Dưới đây là những điều bạn cần lưu ý:
                            </Box>
                            <Box sx={{ fontWeight: "bold" }}>
                                Ưu điểm của máy nước nóng năng lượng mặt trời
                            </Box>
                            <Box sx={{ margin: "10px 0 15px 15px", lineHeight: 1.5, listStyle: "none" }}>
                                <li>1. Máy nước nóng năng lượng mặt trời là sản phẩm thân thiện với môi trường và không phải sử dụng điện năng để làm nóng nước. Máy lợi dụng sức nóng của mặt trời để tạo thành nhiệt lượng làm nóng nguồn nước cung cấp nước ấm cho gia đình sử dụng.</li>
                                <li style={{ margin: "10px 0" }}>2. Ngoài lợi ích tiết kiệm điện, máy nước nóng còn có độ bền cao, không gây tiếng ồn và chi phí bảo trì thấp vừa bảo vệ môi trường.</li>
                                <li>3. Tiết kiệm chi phí cho gia đình: trên thực tế một máy nước nóng năng lượng mặt trời có giá cao gấp 5 lần máy nước nóng bằng điện. Tuy nhiên tính về lâu dài thì có lợi hơn vì nó giúp tiết kiệm một khoản chi phí không nhỏ cho cả gia đình, nhất là khi nhà bạn có từ 2 máy nước nóng trở lên.</li>
                                <li>4. Máy nước nóng năng lượng mặt trời có thể giữ được nhiệt ngay cả ban đêm thậm chí đến sáng hôm sau. Riêng ở khu vực thành phố Hồ Chí Minh có thể sử dụng bình năng lượng mặt trời suốt 365 ngày, ở Hà Nội và các tỉnh miền Trung sử dụng được trong vòng 300 ngày/năm.</li>
                            </Box>
                            <Box sx={{ fontWeight: "bold" }}>
                                Những lưu ý khi lựa chọn máy nước nóng năng lượng mặt trời
                            </Box>
                            <Box sx={{ marginTop: "15px" }}>1. Kiểm tra số lượng ống chân không: Nên lựa chọn ống chân không loại phi 58 – 1,8m với các thông số theo quy định chuẩn của các nhà sản xuất như sau:</Box>
                            <img style={{ width: "360px" }} src="/table_new2.jpg" alt="Ảnh bảng dung tích - quy cách - số lượng ống" />
                            <Box sx={{ margin: "15px 0", lineHeight: 1.5 }}>2. Không nên quá coi trọng thương hiệu, nguồn gốc xuất xứ hoặc những nhà sản xuất được quảng cáo rầm rộ trên các phương tiện truyền thông đại chúng mà tốt nhất nên tìm hiểu chất lượng của Inox, ống chân không, lớp vỏ cách nhiệt và công nghệ sản xuất mới là điều quan trọng hàng đầu. Và tốt nhất nên tham vấn ý kiến của các nhà chuyên môn hoặc những người có kinh nghiệm.</Box>
                            <Box>Thái Dương Năng Sơn Hà là một lựa chọn phù hợp</Box>

                            <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>
                                Hướng dẫn cách sử dụng máy nước nóng năng lượng mặt trời
                            </Box>
                            <Box>Nguyên lý hoạt động của máy nước nóng năng lượng mặt trời Thái dương năng</Box>
                            <Box sx={{ lineHeight: 1.5, listStyle: "none", marginTop: "15px" }}>
                                <li>- Máy vừa lắp đặt, bạn phải bơm nước sạch vào buổi sáng trước khi mặt trời mọc hoặc sau khi mặt trời lặn. Hoặc nếu có thể che ống chân không để nhiệt độ giảm bớt nhiệt, sau đó mới cho nước lạnh vào bình, tránh thay đổi nhiệt độ đột ngột sẽ làm vỡ ông chân không.</li>
                                <li style={{ margin: "15px 0" }}>- Nên lắp đường ống theo sơ đồ hướng dẫn, khi bơm nước mở đồng thời van I và van II. Sau đó đóng van II chỉ mở van I để điều tiết nước nóng ở vòi lấy nước cuối cùng.</li>
                                <li>- Thường xuyên vệ sinh và làm sạch máy nhằm tăng hiệu quả sử dụng.</li>
                                <li style={{ margin: "15px 0" }}>- Nên kiểm tra độ nóng của nước trước khi dùng.</li>
                            </Box>

                            <Box sx={{ fontWeight: "bold", marginBottom: "15px" }}>
                                Những điều cần lưu ý khi lắp đặt máy nước nóng năng lượng mặt trời
                            </Box>
                            <Box>Cách lắp đặt Thái dương năng đúng cách</Box>
                            <Box sx={{ lineHeight: 1.5, listStyle: "none", margin: "15px 0" }}>
                                <li>- Vị trí lắp máy năng lượng mặt trời phải luôn có ánh nắng mặt trời chiếu vào, không bị che khuất bởi những ngôi nhà xung quanh. Nếu nhà bạn nằm giữa những tòa cao ốc hoặc sống ở chung cư thì không nên lắp máy nước nóng năng lượng mặt trời mà nên chọn máy nước nóng bằng điện. Nếu nhà bạn cao hơn hoặc bằng so với các nhà hàng xóm xung quanh, nhà bạn có vị trí sân hoặc mái thoáng đãng không bị khuất nắng là đây là nơi lý tưởng nhất.</li>
                                <li style={{ margin: "15px 0" }}>- Nguồn cung cấp nước phải ổn định vì loại máy này chỉ hoạt động khi nguồn nước được cung cấp đều đặn và liên tục. Nước máy phải lên được mái nhà hoặc bồn chứa nước phải cao hơn mái nhà.</li>
                                <li>- Chi phí lắp đặt cao, đối với những ngôi nhà 4 tầng trở lên chi phí đường ống dẫn nước gần bằng tiền mua máy. Vì thế bạn nên bố trí ống dẫn nước càng ngắn càng tiết kiệm và ít bị rò rỉ. Nếu trong nhà có hộp kỹ thuật không bị bít kín hoặc có giếng trời trong nhà có không gian thoáng bên ngoài tiếp sát tường nhà đều có thể bố trí đường ống chạy suốt từ trên xuống dưới.</li>
                                <li style={{ margin: "15px 0" }}>- Ống dẫn nước nóng chỉ có thể dùng ống nhựa PPR hoặc ống kim loại.</li>
                                <li>- Với những khu vực nước ô nhiễm nặng thì không nên lắp máy năng lượng mặt trời. Vì ở nhiệt độ cao tính ăn mòn của nước tăng mạnh có thể ăn mòn và hư hại bồn inox. Nếu muốn sử dụng cần thêm bộ lọc phèn.</li>
                                <li style={{ margin: "15px 0" }}>- Nên chọn máy có bộ phận thu nhiệt được làm bằng ống đồng vì loại máy này có hiệu suất thu nhiệt cao hơn ống thu nhiệt thủy tinh, nhựa tuy nhiên giá thành theo đó cũng cao gấp nhiều lần so với ống thu nhiệt chân không thủy tinh và nhựa.</li>
                                <li>- Nếu vị trí đặt bình thái dương năng bị hạn chế về thời gian thu nhận nắng trong ngày thì tùy thuộc vào mức độ sẽ làm giảm khả năng làm nước nóng tương ứng. Thông thường nếu vị trí đặt bình thái dương năng dự kiến có thể thu nhận từ 3-4h chiếu sáng/ngày là bạn đã có lượng nước nóng thoải mái cho cả gia đình dùng.</li>
                                <li style={{ margin: "15px 0" }}>- Đối với nhà cũ, ngoài những yếu tố về vị trí mặt bằng lắp đặt thái dương năng bạn cũng cần phải đảm bảo lưu ý đến những giải pháp đấu, nối bổ sung đường ông nước nóng ghép với hệ thống ống nước cũ.</li>
                            </Box>

                            <Box sx={{ fontWeight: "bold", marginTop: "15px" }}>
                                Cách lựa chọn bình nước nóng sao cho phù hợp với gia đình bạn:
                            </Box>
                            <Box sx={{ lineHeight: 1.5, listStyle: "none", margin: "15px 0" }}>
                                <li>- Với gia đình có từ 2-3 người : Nên dùng loại máy nước nóng năng lượng mặt trời Thái dương năng 140 lít.</li>
                                <li style={{ margin: "15px 0" }}>- Với những gia đình có từ 3-4 người : Nên sử dụng máy nước nóng năng lượng mặt trời Thái dương năng 160 lít.</li>
                                <li>- Với gia đình có từ 4-5 người : Nên chọn sử dụng máy nước nóng năng lượng mặt trời Thái dương năng 180 lít.</li>
                                <li style={{ margin: "15px 0" }}>- Với gia đình có từ 6-8  người : Nên sử dụng máy nước nóng năng lượng mặt trời Thái dương năng 200 - 300 lít .</li>
                                <li>- Với gia đình có trên 10 người có thể sử dụng các bộ dân dụng mắc nối tiếp.</li>
                                <li style={{ margin: "15px 0" }}>- Với cơ quan, doanh nghiệp có thể sử dụng giàn nối tiếp hoặc giàn năng lượng mặt trời công nghiệp có dung tích mỗi máy là 500l.</li>
                            </Box>

                            <Box sx={{ lineHeight: 1.5, marginBottom:"30px" }}>Qua những lưu ý trên hy vọng khách hàng sẽ có được cái nhìn rõ hơn về sản phẩm máy nước nóng năng lượng mặt trời và qua đó chọn lựa được sản phẩm máy nước nóng năng lượng mặt trời phù hợp với gia đình mình.</Box>
                        </Box>
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
                    <Box sx={{ fontSize: "25px", fontWeight: "bold", margin: "80px 0 40px 0" }}>NHỮNG ĐIỀU CẦN BIẾT KHI CHỌN MUA MÁY NƯỚC NÓNG NĂNG LƯỢNG MẶT TRỜI</Box>
                    <Box display={'flex'} margin={'auto'}>
                        <img src="/new2.jpg" style={{ width: "726px" }} alt="Ảnh NLMT" />
                    </Box>
                    <Box sx={{ fontSize: 14, margin: "25px 0", lineHeight: 1.5 }}>
                        Được xem là sản phẩm thân thiện với môi trường và tiết kiệm điện, tuy nhiên việc lựa chọn và lắp đặt máy nước nóng năng lượng mặt trời sai nguyên tắc sẽ không mang lại được những tiện ích và công dụng như mong muốn. Dưới đây là những điều bạn cần lưu ý:
                    </Box>
                    <Box sx={{ fontWeight: "bold" }}>
                        Ưu điểm của máy nước nóng năng lượng mặt trời
                    </Box>
                    <Box sx={{ margin: "10px 0 15px 15px", lineHeight: 1.5, listStyle: "none" }}>
                        <li>1. Máy nước nóng năng lượng mặt trời là sản phẩm thân thiện với môi trường và không phải sử dụng điện năng để làm nóng nước. Máy lợi dụng sức nóng của mặt trời để tạo thành nhiệt lượng làm nóng nguồn nước cung cấp nước ấm cho gia đình sử dụng.</li>
                        <li style={{ margin: "10px 0" }}>2. Ngoài lợi ích tiết kiệm điện, máy nước nóng còn có độ bền cao, không gây tiếng ồn và chi phí bảo trì thấp vừa bảo vệ môi trường.</li>
                        <li>3. Tiết kiệm chi phí cho gia đình: trên thực tế một máy nước nóng năng lượng mặt trời có giá cao gấp 5 lần máy nước nóng bằng điện. Tuy nhiên tính về lâu dài thì có lợi hơn vì nó giúp tiết kiệm một khoản chi phí không nhỏ cho cả gia đình, nhất là khi nhà bạn có từ 2 máy nước nóng trở lên.</li>
                        <li>4. Máy nước nóng năng lượng mặt trời có thể giữ được nhiệt ngay cả ban đêm thậm chí đến sáng hôm sau. Riêng ở khu vực thành phố Hồ Chí Minh có thể sử dụng bình năng lượng mặt trời suốt 365 ngày, ở Hà Nội và các tỉnh miền Trung sử dụng được trong vòng 300 ngày/năm.</li>
                    </Box>
                    <Box sx={{ fontWeight: "bold" }}>
                        Những lưu ý khi lựa chọn máy nước nóng năng lượng mặt trời
                    </Box>
                    <Box sx={{ marginTop: "15px" }}>1. Kiểm tra số lượng ống chân không: Nên lựa chọn ống chân không loại phi 58 – 1,8m với các thông số theo quy định chuẩn của các nhà sản xuất như sau:</Box>
                    <img style={{ width: "600px" }} src="/table_new2.jpg" alt="Ảnh bảng dung tích - quy cách - số lượng ống" />
                    <Box sx={{ margin: "15px 0", lineHeight: 1.5 }}>2. Không nên quá coi trọng thương hiệu, nguồn gốc xuất xứ hoặc những nhà sản xuất được quảng cáo rầm rộ trên các phương tiện truyền thông đại chúng mà tốt nhất nên tìm hiểu chất lượng của Inox, ống chân không, lớp vỏ cách nhiệt và công nghệ sản xuất mới là điều quan trọng hàng đầu. Và tốt nhất nên tham vấn ý kiến của các nhà chuyên môn hoặc những người có kinh nghiệm.</Box>
                    <Box>Thái Dương Năng Sơn Hà là một lựa chọn phù hợp</Box>

                    <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>
                        Hướng dẫn cách sử dụng máy nước nóng năng lượng mặt trời
                    </Box>
                    <Box>Nguyên lý hoạt động của máy nước nóng năng lượng mặt trời Thái dương năng</Box>
                    <Box sx={{ lineHeight: 1.5, listStyle: "none", marginTop: "15px" }}>
                        <li>- Máy vừa lắp đặt, bạn phải bơm nước sạch vào buổi sáng trước khi mặt trời mọc hoặc sau khi mặt trời lặn. Hoặc nếu có thể che ống chân không để nhiệt độ giảm bớt nhiệt, sau đó mới cho nước lạnh vào bình, tránh thay đổi nhiệt độ đột ngột sẽ làm vỡ ông chân không.</li>
                        <li style={{ margin: "15px 0" }}>- Nên lắp đường ống theo sơ đồ hướng dẫn, khi bơm nước mở đồng thời van I và van II. Sau đó đóng van II chỉ mở van I để điều tiết nước nóng ở vòi lấy nước cuối cùng.</li>
                        <li>- Thường xuyên vệ sinh và làm sạch máy nhằm tăng hiệu quả sử dụng.</li>
                        <li style={{ margin: "15px 0" }}>- Nên kiểm tra độ nóng của nước trước khi dùng.</li>
                    </Box>

                    <Box sx={{ fontWeight: "bold", marginBottom: "15px" }}>
                        Những điều cần lưu ý khi lắp đặt máy nước nóng năng lượng mặt trời
                    </Box>
                    <Box>Cách lắp đặt Thái dương năng đúng cách</Box>
                    <Box sx={{ lineHeight: 1.5, listStyle: "none", margin: "15px 0" }}>
                        <li>- Vị trí lắp máy năng lượng mặt trời phải luôn có ánh nắng mặt trời chiếu vào, không bị che khuất bởi những ngôi nhà xung quanh. Nếu nhà bạn nằm giữa những tòa cao ốc hoặc sống ở chung cư thì không nên lắp máy nước nóng năng lượng mặt trời mà nên chọn máy nước nóng bằng điện. Nếu nhà bạn cao hơn hoặc bằng so với các nhà hàng xóm xung quanh, nhà bạn có vị trí sân hoặc mái thoáng đãng không bị khuất nắng là đây là nơi lý tưởng nhất.</li>
                        <li style={{ margin: "15px 0" }}>- Nguồn cung cấp nước phải ổn định vì loại máy này chỉ hoạt động khi nguồn nước được cung cấp đều đặn và liên tục. Nước máy phải lên được mái nhà hoặc bồn chứa nước phải cao hơn mái nhà.</li>
                        <li>- Chi phí lắp đặt cao, đối với những ngôi nhà 4 tầng trở lên chi phí đường ống dẫn nước gần bằng tiền mua máy. Vì thế bạn nên bố trí ống dẫn nước càng ngắn càng tiết kiệm và ít bị rò rỉ. Nếu trong nhà có hộp kỹ thuật không bị bít kín hoặc có giếng trời trong nhà có không gian thoáng bên ngoài tiếp sát tường nhà đều có thể bố trí đường ống chạy suốt từ trên xuống dưới.</li>
                        <li style={{ margin: "15px 0" }}>- Ống dẫn nước nóng chỉ có thể dùng ống nhựa PPR hoặc ống kim loại.</li>
                        <li>- Với những khu vực nước ô nhiễm nặng thì không nên lắp máy năng lượng mặt trời. Vì ở nhiệt độ cao tính ăn mòn của nước tăng mạnh có thể ăn mòn và hư hại bồn inox. Nếu muốn sử dụng cần thêm bộ lọc phèn.</li>
                        <li style={{ margin: "15px 0" }}>- Nên chọn máy có bộ phận thu nhiệt được làm bằng ống đồng vì loại máy này có hiệu suất thu nhiệt cao hơn ống thu nhiệt thủy tinh, nhựa tuy nhiên giá thành theo đó cũng cao gấp nhiều lần so với ống thu nhiệt chân không thủy tinh và nhựa.</li>
                        <li>- Nếu vị trí đặt bình thái dương năng bị hạn chế về thời gian thu nhận nắng trong ngày thì tùy thuộc vào mức độ sẽ làm giảm khả năng làm nước nóng tương ứng. Thông thường nếu vị trí đặt bình thái dương năng dự kiến có thể thu nhận từ 3-4h chiếu sáng/ngày là bạn đã có lượng nước nóng thoải mái cho cả gia đình dùng.</li>
                        <li style={{ margin: "15px 0" }}>- Đối với nhà cũ, ngoài những yếu tố về vị trí mặt bằng lắp đặt thái dương năng bạn cũng cần phải đảm bảo lưu ý đến những giải pháp đấu, nối bổ sung đường ông nước nóng ghép với hệ thống ống nước cũ.</li>
                    </Box>

                    <Box sx={{ fontWeight: "bold", marginTop: "15px" }}>
                        Cách lựa chọn bình nước nóng sao cho phù hợp với gia đình bạn:
                    </Box>
                    <Box sx={{ lineHeight: 1.5, listStyle: "none", margin: "15px 0" }}>
                        <li>- Với gia đình có từ 2-3 người : Nên dùng loại máy nước nóng năng lượng mặt trời Thái dương năng 140 lít.</li>
                        <li style={{ margin: "15px 0" }}>- Với những gia đình có từ 3-4 người : Nên sử dụng máy nước nóng năng lượng mặt trời Thái dương năng 160 lít.</li>
                        <li>- Với gia đình có từ 4-5 người : Nên chọn sử dụng máy nước nóng năng lượng mặt trời Thái dương năng 180 lít.</li>
                        <li style={{ margin: "15px 0" }}>- Với gia đình có từ 6-8  người : Nên sử dụng máy nước nóng năng lượng mặt trời Thái dương năng 200 - 300 lít .</li>
                        <li>- Với gia đình có trên 10 người có thể sử dụng các bộ dân dụng mắc nối tiếp.</li>
                        <li style={{ margin: "15px 0" }}>- Với cơ quan, doanh nghiệp có thể sử dụng giàn nối tiếp hoặc giàn năng lượng mặt trời công nghiệp có dung tích mỗi máy là 500l.</li>
                    </Box>

                    <Box sx={{ lineHeight: 1.5 }}>Qua những lưu ý trên hy vọng khách hàng sẽ có được cái nhìn rõ hơn về sản phẩm máy nước nóng năng lượng mặt trời và qua đó chọn lựa được sản phẩm máy nước nóng năng lượng mặt trời phù hợp với gia đình mình.</Box>
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

export default New2;
