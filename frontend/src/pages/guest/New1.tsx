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

const New1: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const [localItems, setLocalItems] = React.useState(JSON.parse(localStorage.getItem("productList")!) || []);
    const mapProductList = localItems.flatMap((arr: any) => arr)
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
                            <Box sx={{ fontSize: "25px", fontWeight: "bold", margin: "20px 0 40px 0" }}>MÁY NƯỚC NÓNG NĂNG LƯỢNG MẶT TRỜI BÌNH MINH CÓ TỐT KHÔNG?</Box>
                            <Box display={'flex'} margin={'auto'}>
                                <img src="/new1.jpg" style={{ width: "360px" }} alt="Ảnh NLMT" />
                            </Box>
                            <Box sx={{ fontSize: 14, margin: "25px 0", lineHeight: 1.5 }}>
                                Để lựa chọn bình năng lượng mặt trời Bình Minh có tốt tốt và hiệu quả là điều không dễ dàng chút nào. Với loại máy sử dụng nhiệt năng chuyển đổi thành điện năng để tạo ra nước nóng, giúp cung cấp nước ấm cho các nhằm mục đích thương mại hoặc phục vụ sinh hoạt gia đình, thì các tiêu chí dưới đây sẽ giúp bạn chọn ra máy năng lượng mặt trời lên hay không lên nhé.
                            </Box>
                            <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                                Máy nước nóng năng lượng mặt trời Bình Minh có tốt không?
                            </Box>
                            <Box sx={{ margin: "10px 0 25px 15px" }}>
                                <li>Máy nước nóng năng lượng mặt trời BÌNH MINH được  sản xuất trên dây chuyền công nghệ, máy móc thiết bị hiện đại của Nhật Bản.</li>
                                <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Với dây chuyền sản xuất khép kín và hiện đại hàng đầu Việt Nam và hơn 10 năm kinh nghiệm trong việc nghiên cứu, luôn nỗ lực sáng tạo, đổi mới công nghệ sản xuất nhằm mang lại các sản phẩm và dịch vụ hiện đại, thân thiện với môi trường.</li>
                                <li>Luôn cung cấp ra thị trường các sản phẩm chất lượng cao, giá thành cạnh tranh - Với tiêu chí: hàng Việt Nam chất lượng cao. Người Việt Nam dùng hàng Việt Nam.</li>
                                <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Máy nước nóng năng lượng mặt trời BÌNH MINH sản xuất tại Việt Nam của công ty BÌNH MINH đã đạt nhiều chứng nhận và giải thưởng cao quý trong nước như : Hàng Việt Nam chất lượng cao, Cúp vàng ngành xây dựng, Thương hiệu uy tín chất lượng, … .</li>
                                <li style={{ lineHeight: 1.5 }}>Ngoài các sản phẩm máy nước nóng năng lượng mặt trời dạng ống thủy tinh sản xuất tại Việt Nam –  và nhập khẩu và phân phối sản phẩm dạng máy nước nóng tấm phẳng được nhập khẩu từ Nhật Bản phù hợp cho các nhà biệt thự, sử dụng bơm chịu áp…  </li>
                            </Box>
                            <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                                Đánh giá linh kiện máy nước nóng năng lượng mặt trời Bình Minh có tốt không?
                            </Box>

                            <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>Chất liệu bồn bảo ôn Bình Minh</Box>
                            <Box sx={{ marginLeft: "15px" }}>
                                <li style={{ lineHeight: 1.5 }}>Đây là lớp bảo vệ bên ngoài thường xuyên phải chịu những tác động xấu của khí hậu nên đòi hỏi nó phải có chất lượng tốt, độ bền cao, không bị oxy hóa…chỉ như thế thì nó mới có thể chống chịu lại được những ảnh hưởng lớn mà thời tiết gây ra.</li>
                                <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Do đó chất liệu mà vỏ bồn bảo ôn đang sử dụng cũng được quan tâm rất lớn, chất liệu được đánh giá là cao cấp nhất hiện nay chính là inox 304 hoặc hợp kim nhôm có phủ một lớp sơn tĩnh điện. Đây là 2 chất liệu cứng cáp có khả năng chống chịu va đập và ăn mòn cực tốt.</li>
                            </Box>

                            <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>Lõi bồn bảo ôn Bình Minh</Box>
                            <Box sx={{ marginLeft: "15px" }}>
                                <li style={{ lineHeight: 1.5 }}>Cũng giống như lớp vỏ bồn bảo ôn thì lõi bồn bảo ôn cũng là bộ phận rất quan trọng, vì là bộ phận tiếp xúc trực tiếp với nước nên để đảm bảo an toàn cho sức khỏe người sử dụng thì bắt buộc phải sử dụng các chất liệu cao cấp, bền bỉ, không bị oxy hóa hay gỉ sét.</li>
                            </Box>

                            <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>Lớp cách nhiệt Polyurethane Bình Minh</Box>
                            <Box sx={{ marginLeft: "15px" }}>
                                <li style={{ lineHeight: 1.5 }}>Đây là lớp cách nhiệt có nhiệm vụ chính là duy trì nhiệt độ nước nóng có bên trong bồn bảo ôn, lớp cách nhiệt này muốn hoạt động tốt thì yêu cầu tối thiểu độ dày phải là 5cm, có độ cứng lớn, bề mặt phải trơn mịn và không bị khuyết những lỗ nhỏ.</li>
                            </Box>

                            <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>Ống thu nhiệt của Bình Minh</Box>
                            <Box sx={{ marginLeft: "15px", lineHeight: 1.5 }}>
                                <li >Khả năng hấp thụ nhiệt mạnh hay yếu của máy nước nóng năng lượng mặt trời đều phụ thuộc vào bộ phận ống thu nhiệt này. Ống thu nhiệt có hiệu suất hấp thụ nhiệt cao thì sẽ nâng cao tuổi thọ và độ bền cho máy.</li>
                                <li style={{ margin: "10px 0 25px 0" }}>Nếu bạn tìm hiểu trên thị trường thì bạn sẽ thấy có 2 loại ống thu nhiệt phổ biến là ống lõi titan và ống lõi dầu, trong đó ống lõi titan được ưa chuộng nhiều hơn cả do có chất lượng ổn định và giá thành cũng khá rẻ.</li>
                            </Box>

                            <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                                Thông số kĩ thuật máy nước nóng năng lượng Bình Minh
                            </Box>
                            <Box sx={{ lineHeight: 1.5 }}>
                                <li style={{ margin: "10px 0" }}>Võ bồn chứa làm bằng Inox 304-2B theo tiêu chuẩn an toàn vệ sinh thực phẩm.</li>
                                <li>Ruột bồn là bằng Inox 304/BA.</li>
                                <li style={{ margin: "10px 0" }}>Bồn chứa nước nóng được cách nhiệt với môi trường bên ngoài bởi lớp polymethane dày 5,5cm giữ nhiệt trong thời gian 96 giờ.</li>
                                <li>Chân bồn được làm bằng Inox 201.</li>
                                <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Hệ thống ống thu nhiệt 5 lớp colector (chân Không tím ) ϕ 58mm x 1800mm lõi đỏ được thiết kế đặc biệt để chuyển hóa quang năng thành nhiệt năng làm nóng nước trong bình đồng thời không làm thất thoát nhiệt ra ngoài.</li>
                                <li>Nhiệt độ làm nóng nước trung bình 35-80ºC . Máy nước nóng có thể làm nóng nước trên 90ºC trong điều kiện thời gian hấp thụ nhiệt kéo dài.</li>
                                <li style={{ margin: "10px 0 25px 0" }}> Trong điều kiện ít nắng, mưa nhiều thì nhiệt độ của nước được máy đun nóng khoảng 40ºC (theo khảo sát thí nghiệm ở khu vực phía nam) .</li>
                            </Box>

                            <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                                Chế độ bảo hành bình nước nóng mặt trời có tốt không?
                            </Box>
                            <Box sx={{ lineHeight: 1.5 }}>
                                <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Điểm mà mình đánh giá cao ở các dòng máy nước nóng năng lượng mặt trời bình minh chính là thời gian bảo hành lâu dài, hầu hết các sản phẩm đều có thời gian bảo hành trung bình từ 7 – 10 năm, một số thương hiệu cao cấp, máy còn có thời gian bảo hành lên đến 20 năm.</li>
                                <li style={{ marginBottom: "25px", lineHeight: 1.5 }}>Với những thiết bị có thời gian bảo hành càng dài thì càng chứng minh được rằng nhà sản xuất máy nước nóng năng lượng mặt trời đang tự tin vào những sản phẩm mà họ bán ra trên thị trường. Từ đó, người tiêu dùng cũng hoàn toàn yên tâm về chất lượng cũng như độ bền của máy.</li>
                            </Box>

                            <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                                Giá máy nước nóng năng lượng mặt trời Bình Minh có ưu đãi tốt không?
                            </Box>
                            <Box sx={{ margin: "10px 0", lineHeight: 1.5 }}>
                                Về phần giá của máy nước nóng năng lượng mặt trời Bình Minh hiện nay trên thị trường có mức giá tương đối cao, dao động từ 3 - 80 triệu đồng/máy. Dưới đây là mức giá cụ thể hơn của từng loại máy:
                            </Box>
                            <Box sx={{ lineHeight: 1.5 }}>
                                <li style={{ margin: "10px 0" }}>Máy nước nóng năng lượng mặt trời ống dẫn chân không: Mức giá từ 5 - 10 triệu đồng. Đây cũng là loại máy nước nóng năng lượng mặt trời được người tiêu dùng ưa chuộng nhiều nhất.</li>
                                <li>Máy nước nóng năng lượng mặt trời dạng ống dầu: Giá từ 8 - 20 triệu đồng</li>
                                <li style={{ margin: "10px 0" }}>Máy nước nóng năng lượng mặt trời tấm phẳng (loại cao cấp): Giá dao động trong khoảng từ 20 - 80 triệu đồng.</li>
                                <li style={{ marginBottom: "25px" }}>Tùy thuộc vào nhu cầu sử dụng và điều kiện tài chính của gia đình mà bạn quyết định xem đâu là sản phẩm phù hợp nhất với gia đình của bạn.</li>
                            </Box>

                            <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                                Có nên chọn máy nước nóng năng lượng mặt trời Bình Minh hay không?
                            </Box>
                            <Box sx={{ lineHeight: 1.5, listStyle: "none" }}>
                                <li style={{ margin: "10px 0" }}>Đánh giá người tiêu dùng: 4 sao. Đây là sản phẩm được những nhà ven biển ưa chuộng, bởi chúng được làm từ vật liệu Inox 304 chống oxy hoá cao của khí hậu biển, bền lâu và không bị gỉ sét.</li>
                                <li>Giá cả máy nước nóng Bình minh cực kỳ ưu đãi và cạnh tranh nhất hiện nay, với hàng trăm hệ thống phân phối ở các tỉnh thành cả nước..</li>
                                <li style={{ margin: "10px 0 30px 0" }}>Bài viết trên đã cung cấp ngắn gọn thông tin về các dòng máy nước nóng năng lượng mặt trời Bình Minh tốt nhất, và uy tín trên thị trường hiện nay. Hy vọng bài viết này sẽ giúp bạn lựa chọn được một sản phẩm máy nước nóng năng lượng mặt trời loại nào tốt nhất và giá cả phải chăng nhé! </li>
                            </Box>
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
                    <Box sx={{ fontSize: "25px", fontWeight: "bold", margin: "80px 0 40px 0" }}>MÁY NƯỚC NÓNG NĂNG LƯỢNG MẶT TRỜI BÌNH MINH CÓ TỐT KHÔNG?</Box>
                    <Box display={'flex'} margin={'auto'}>
                        <img src="/new1.jpg" style={{ width: "726px" }} alt="Ảnh NLMT" />
                    </Box>
                    <Box sx={{ fontSize: 14, margin: "25px 0", lineHeight: 1.5 }}>
                        Để lựa chọn bình năng lượng mặt trời Bình Minh có tốt tốt và hiệu quả là điều không dễ dàng chút nào. Với loại máy sử dụng nhiệt năng chuyển đổi thành điện năng để tạo ra nước nóng, giúp cung cấp nước ấm cho các nhằm mục đích thương mại hoặc phục vụ sinh hoạt gia đình, thì các tiêu chí dưới đây sẽ giúp bạn chọn ra máy năng lượng mặt trời lên hay không lên nhé.
                    </Box>
                    <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                        Máy nước nóng năng lượng mặt trời Bình Minh có tốt không?
                    </Box>
                    <Box sx={{ margin: "10px 0 25px 15px" }}>
                        <li>Máy nước nóng năng lượng mặt trời BÌNH MINH được  sản xuất trên dây chuyền công nghệ, máy móc thiết bị hiện đại của Nhật Bản.</li>
                        <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Với dây chuyền sản xuất khép kín và hiện đại hàng đầu Việt Nam và hơn 10 năm kinh nghiệm trong việc nghiên cứu, luôn nỗ lực sáng tạo, đổi mới công nghệ sản xuất nhằm mang lại các sản phẩm và dịch vụ hiện đại, thân thiện với môi trường.</li>
                        <li>Luôn cung cấp ra thị trường các sản phẩm chất lượng cao, giá thành cạnh tranh - Với tiêu chí: hàng Việt Nam chất lượng cao. Người Việt Nam dùng hàng Việt Nam.</li>
                        <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Máy nước nóng năng lượng mặt trời BÌNH MINH sản xuất tại Việt Nam của công ty BÌNH MINH đã đạt nhiều chứng nhận và giải thưởng cao quý trong nước như : Hàng Việt Nam chất lượng cao, Cúp vàng ngành xây dựng, Thương hiệu uy tín chất lượng, … .</li>
                        <li style={{ lineHeight: 1.5 }}>Ngoài các sản phẩm máy nước nóng năng lượng mặt trời dạng ống thủy tinh sản xuất tại Việt Nam –  và nhập khẩu và phân phối sản phẩm dạng máy nước nóng tấm phẳng được nhập khẩu từ Nhật Bản phù hợp cho các nhà biệt thự, sử dụng bơm chịu áp…  </li>
                    </Box>
                    <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                        Đánh giá linh kiện máy nước nóng năng lượng mặt trời Bình Minh có tốt không?
                    </Box>

                    <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>Chất liệu bồn bảo ôn Bình Minh</Box>
                    <Box sx={{ marginLeft: "15px" }}>
                        <li style={{ lineHeight: 1.5 }}>Đây là lớp bảo vệ bên ngoài thường xuyên phải chịu những tác động xấu của khí hậu nên đòi hỏi nó phải có chất lượng tốt, độ bền cao, không bị oxy hóa…chỉ như thế thì nó mới có thể chống chịu lại được những ảnh hưởng lớn mà thời tiết gây ra.</li>
                        <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Do đó chất liệu mà vỏ bồn bảo ôn đang sử dụng cũng được quan tâm rất lớn, chất liệu được đánh giá là cao cấp nhất hiện nay chính là inox 304 hoặc hợp kim nhôm có phủ một lớp sơn tĩnh điện. Đây là 2 chất liệu cứng cáp có khả năng chống chịu va đập và ăn mòn cực tốt.</li>
                    </Box>

                    <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>Lõi bồn bảo ôn Bình Minh</Box>
                    <Box sx={{ marginLeft: "15px" }}>
                        <li style={{ lineHeight: 1.5 }}>Cũng giống như lớp vỏ bồn bảo ôn thì lõi bồn bảo ôn cũng là bộ phận rất quan trọng, vì là bộ phận tiếp xúc trực tiếp với nước nên để đảm bảo an toàn cho sức khỏe người sử dụng thì bắt buộc phải sử dụng các chất liệu cao cấp, bền bỉ, không bị oxy hóa hay gỉ sét.</li>
                    </Box>

                    <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>Lớp cách nhiệt Polyurethane Bình Minh</Box>
                    <Box sx={{ marginLeft: "15px" }}>
                        <li style={{ lineHeight: 1.5 }}>Đây là lớp cách nhiệt có nhiệm vụ chính là duy trì nhiệt độ nước nóng có bên trong bồn bảo ôn, lớp cách nhiệt này muốn hoạt động tốt thì yêu cầu tối thiểu độ dày phải là 5cm, có độ cứng lớn, bề mặt phải trơn mịn và không bị khuyết những lỗ nhỏ.</li>
                    </Box>

                    <Box sx={{ fontWeight: "bold", margin: "15px 0" }}>Ống thu nhiệt của Bình Minh</Box>
                    <Box sx={{ marginLeft: "15px", lineHeight: 1.5 }}>
                        <li >Khả năng hấp thụ nhiệt mạnh hay yếu của máy nước nóng năng lượng mặt trời đều phụ thuộc vào bộ phận ống thu nhiệt này. Ống thu nhiệt có hiệu suất hấp thụ nhiệt cao thì sẽ nâng cao tuổi thọ và độ bền cho máy.</li>
                        <li style={{ margin: "10px 0 25px 0" }}>Nếu bạn tìm hiểu trên thị trường thì bạn sẽ thấy có 2 loại ống thu nhiệt phổ biến là ống lõi titan và ống lõi dầu, trong đó ống lõi titan được ưa chuộng nhiều hơn cả do có chất lượng ổn định và giá thành cũng khá rẻ.</li>
                    </Box>

                    <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                        Thông số kĩ thuật máy nước nóng năng lượng Bình Minh
                    </Box>
                    <Box sx={{ lineHeight: 1.5 }}>
                        <li style={{ margin: "10px 0" }}>Võ bồn chứa làm bằng Inox 304-2B theo tiêu chuẩn an toàn vệ sinh thực phẩm.</li>
                        <li>Ruột bồn là bằng Inox 304/BA.</li>
                        <li style={{ margin: "10px 0" }}>Bồn chứa nước nóng được cách nhiệt với môi trường bên ngoài bởi lớp polymethane dày 5,5cm giữ nhiệt trong thời gian 96 giờ.</li>
                        <li>Chân bồn được làm bằng Inox 201.</li>
                        <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Hệ thống ống thu nhiệt 5 lớp colector (chân Không tím ) ϕ 58mm x 1800mm lõi đỏ được thiết kế đặc biệt để chuyển hóa quang năng thành nhiệt năng làm nóng nước trong bình đồng thời không làm thất thoát nhiệt ra ngoài.</li>
                        <li>Nhiệt độ làm nóng nước trung bình 35-80ºC . Máy nước nóng có thể làm nóng nước trên 90ºC trong điều kiện thời gian hấp thụ nhiệt kéo dài.</li>
                        <li style={{ margin: "10px 0 25px 0" }}> Trong điều kiện ít nắng, mưa nhiều thì nhiệt độ của nước được máy đun nóng khoảng 40ºC (theo khảo sát thí nghiệm ở khu vực phía nam) .</li>
                    </Box>

                    <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                        Chế độ bảo hành bình nước nóng mặt trời có tốt không?
                    </Box>
                    <Box sx={{ lineHeight: 1.5 }}>
                        <li style={{ margin: "10px 0", lineHeight: 1.5 }}>Điểm mà mình đánh giá cao ở các dòng máy nước nóng năng lượng mặt trời bình minh chính là thời gian bảo hành lâu dài, hầu hết các sản phẩm đều có thời gian bảo hành trung bình từ 7 – 10 năm, một số thương hiệu cao cấp, máy còn có thời gian bảo hành lên đến 20 năm.</li>
                        <li style={{ marginBottom: "25px", lineHeight: 1.5 }}>Với những thiết bị có thời gian bảo hành càng dài thì càng chứng minh được rằng nhà sản xuất máy nước nóng năng lượng mặt trời đang tự tin vào những sản phẩm mà họ bán ra trên thị trường. Từ đó, người tiêu dùng cũng hoàn toàn yên tâm về chất lượng cũng như độ bền của máy.</li>
                    </Box>

                    <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                        Giá máy nước nóng năng lượng mặt trời Bình Minh có ưu đãi tốt không?
                    </Box>
                    <Box sx={{ margin: "10px 0", lineHeight: 1.5 }}>
                        Về phần giá của máy nước nóng năng lượng mặt trời Bình Minh hiện nay trên thị trường có mức giá tương đối cao, dao động từ 3 - 80 triệu đồng/máy. Dưới đây là mức giá cụ thể hơn của từng loại máy:
                    </Box>
                    <Box sx={{ lineHeight: 1.5 }}>
                        <li style={{ margin: "10px 0" }}>Máy nước nóng năng lượng mặt trời ống dẫn chân không: Mức giá từ 5 - 10 triệu đồng. Đây cũng là loại máy nước nóng năng lượng mặt trời được người tiêu dùng ưa chuộng nhiều nhất.</li>
                        <li>Máy nước nóng năng lượng mặt trời dạng ống dầu: Giá từ 8 - 20 triệu đồng</li>
                        <li style={{ margin: "10px 0" }}>Máy nước nóng năng lượng mặt trời tấm phẳng (loại cao cấp): Giá dao động trong khoảng từ 20 - 80 triệu đồng.</li>
                        <li style={{ marginBottom: "25px" }}>Tùy thuộc vào nhu cầu sử dụng và điều kiện tài chính của gia đình mà bạn quyết định xem đâu là sản phẩm phù hợp nhất với gia đình của bạn.</li>
                    </Box>

                    <Box sx={{ fontWeight: "bold", fontSize: "30px" }}>
                        Có nên chọn máy nước nóng năng lượng mặt trời Bình Minh hay không?
                    </Box>
                    <Box sx={{ lineHeight: 1.5, listStyle: "none" }}>
                        <li style={{ margin: "10px 0" }}>Đánh giá người tiêu dùng: 4 sao. Đây là sản phẩm được những nhà ven biển ưa chuộng, bởi chúng được làm từ vật liệu Inox 304 chống oxy hoá cao của khí hậu biển, bền lâu và không bị gỉ sét.</li>
                        <li>Giá cả máy nước nóng Bình minh cực kỳ ưu đãi và cạnh tranh nhất hiện nay, với hàng trăm hệ thống phân phối ở các tỉnh thành cả nước..</li>
                        <li style={{ margin: "10px 0" }}>Bài viết trên đã cung cấp ngắn gọn thông tin về các dòng máy nước nóng năng lượng mặt trời Bình Minh tốt nhất, và uy tín trên thị trường hiện nay. Hy vọng bài viết này sẽ giúp bạn lựa chọn được một sản phẩm máy nước nóng năng lượng mặt trời loại nào tốt nhất và giá cả phải chăng nhé! </li>
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

export default New1;
