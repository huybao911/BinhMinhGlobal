import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteCart } from "../../redux/actions/admin";
import { RootState } from "../../redux/reducers";
import { ICart } from "../../redux/types/cart";
import { Box, TableSortLabel, Toolbar, OutlinedInput, InputAdornment, Card, Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Divider, Button } from "@mui/material";
// @mui
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { visuallyHidden } from '@mui/utils';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
        width: 320,
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface DataUser {
    _id: keyof ICart;
    date: keyof ICart;
    fullName: keyof ICart;
    nameCompany: keyof ICart;
    address: keyof ICart;
    city: keyof ICart;
    sdt: keyof ICart;
    email: keyof ICart;
    note: keyof ICart;
    product: keyof ICart;
    delete: keyof ICart;
}

interface HeadCell {
    _id: keyof DataUser;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {
        _id: 'date',
        numeric: false,
        label: 'Ngày Đặt Hàng',
    },
    {
        _id: 'fullName',
        numeric: false,
        label: 'Tên Khách Hàng',
    },
    {
        _id: 'nameCompany',
        numeric: false,
        label: 'Tên Công Ty',
    },
    {
        _id: 'address',
        numeric: false,
        label: 'Địa Chỉ',
    },
    {
        _id: 'city',
        numeric: false,
        label: 'Thành Phố',
    },
    {
        _id: 'sdt',
        numeric: false,
        label: 'SĐT',
    },
    {
        _id: 'email',
        numeric: false,
        label: 'Email',
    },
    {
        _id: 'note',
        numeric: false,
        label: 'Ghi Chú',
    },
    {
        _id: 'product',
        numeric: false,
        label: 'Sản Phẩm',
    },
    {
        _id: 'delete',
        numeric: false,
        label: '',
    },
];


interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataUser) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof DataUser) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    return (
        <TableHead style={{ backgroundColor: "#f4f5f5" }}
            sx={{
                '& th:first-child': {
                    borderRadius: '1em 0 0 0'
                },
                '& th:last-child': {
                    borderRadius: '0 1em 0 0'
                }
            }}>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell._id}
                        align={headCell.numeric ? 'right' : 'left'}
                        style={{ fontSize: '13px' }}
                        sortDirection={orderBy === headCell._id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell._id}
                            direction={orderBy === headCell._id ? order : 'asc'}
                            onClick={createSortHandler(headCell._id)}
                        >
                            {headCell.label}
                            {orderBy === headCell._id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const OrderCart: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();


    const [carts, setCarts] = React.useState<ICart[]>([]);
    const admin = useSelector((state: RootState) => state.admin);

    const [anchorEl, setAnchorEl] = React.useState([null]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filterName, setFilterName] = React.useState('');

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof DataUser>('date');



    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof DataUser,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleFilterByName = (event: any) => {
        setPage(0);
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = admin?.carts?.filter((cart: any) => {
                return cart.city.nameCity.toLowerCase().startsWith(keyword.toLowerCase()) || cart.nameCompany.toLowerCase().startsWith(keyword.toLowerCase()) || cart.fullName.toLowerCase().startsWith(keyword.toLowerCase()) ;
            });
            setCarts(results);
        } else {
            setCarts(() => admin?.carts?.filter((cart: any) => cart.nameCompany));
        }

        setFilterName(keyword);
    };

    const sortCart = stableSort(carts, getComparator(order, orderBy));

    React.useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    React.useEffect(() => {
        setCarts(() => admin?.carts?.filter((cart: any) => cart.nameCompany));
    }, [admin]);

    React.useEffect(() => {
        document.title = "Khách Hàng";
    }, []);

    return (

        <>
            <Container>
                <Card style={{ padding: "20px", marginTop: "20px", paddingBottom: "40px", borderRadius: "22px" }}>
                    <StyledRoot
                        style={{ display: "flex", flexDirection: "row" }}
                        sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter',
                        }}
                    >
                        <Box>
                            <Typography gutterBottom style={{ color: "black", fontSize: "22px" }}>
                                Danh Sách Khách Hàng
                            </Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row" }} >
                            <Box style={{ marginRight: "14px" }}>
                                <StyledSearch
                                    style={{ borderRadius: '30px', fontSize: '13px', height: "48px" }}
                                    value={filterName}
                                    onChange={handleFilterByName}
                                    placeholder="Tìm kiếm..."
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                                            <SearchIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                        </Box>
                    </StyledRoot>
                    <TableContainer>
                        <Table >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            {carts && carts.length > 0 ? (
                                <TableBody>
                                    {sortCart.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cart: any, index) =>
                                        <TableRow key={cart._id}>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {cart.date}
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {cart.fullName}
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {cart.nameCompany}
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {cart.address}
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {cart.city.nameCity}
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {cart.sdt}
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {cart.email}
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {cart.note}
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {cart.product.map((product: any) =>
                                                    <Box>
                                                        <Box>
                                                            <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>Tên sản phẩm: </Typography>{product.nameProduct}
                                                        </Box>
                                                        <Box>
                                                            <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>Loại sản phẩm: </Typography> {product.nameTypeProduct}
                                                        </Box>
                                                        <Box>
                                                            <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>Đơn giá: </Typography> {new Intl.NumberFormat('de-DE').format(product.price)} VNĐ
                                                        </Box>
                                                        <Box>
                                                            <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>Số lượng: </Typography> {product.quantity}
                                                        </Box>
                                                        <Box>
                                                            <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>Thành tiền: </Typography> {new Intl.NumberFormat('de-DE').format(product.total)} VNĐ
                                                        </Box>
                                                        <Divider style={{backgroundColor:"black", height:"2px"}} />
                                                    </Box>
                                                )}
                                                <Box display={'flex'} flexDirection={'row'} sx={{marginTop:"10px"}}>
                                                    <Box sx={{ fontWeight: "bold", fontSize: "14px", color:"#0066BF" }}>Tổng tiền: </Box> 
                                                    <Box flexGrow={1}/>
                                                    <Box sx={{marginTop:"2px", fontWeight: "bold"}}>
                                                         {new Intl.NumberFormat('de-DE').format(cart.product.map((product: any) => product.total).reduce((a: any, b: any) => a + b))} VNĐ
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell >
                                                <Button style={{ color: "red" }} onClick={(e) => dispatch(deleteCart(cart._id))} >
                                                    <DeleteForeverIcon style={{ width: "16px" }} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    <TableRow>
                                        <TablePagination
                                            style={{ fontSize: "12px" }}
                                            sx={{
                                                '& .MuiTablePagination-selectLabel': {
                                                    fontSize: "12px"
                                                },
                                                '& .MuiTablePagination-selectIcon': {
                                                    width: "16px"
                                                },
                                                '& .MuiInputBase-root': {
                                                    fontSize: "12px"
                                                },
                                                '& .MuiTablePagination-displayedRows': {
                                                    fontSize: "12px"
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: "16px"
                                                },
                                            }}
                                            rowsPerPageOptions={[5, 10, 25, 70]}
                                            labelRowsPerPage={"Số lượng hàng:"}
                                            count={carts.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            SelectProps={{
                                                MenuProps: {
                                                    sx: {
                                                        "&& .MuiTablePagination-menuItem": {
                                                            fontSize: "12px"
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <Typography variant="h6" paragraph>
                                                Không tồn tại khách hàng
                                            </Typography>

                                            <Typography variant="body2">
                                                Không tìm thấy kết quả &nbsp;
                                                <strong>&quot;{filterName}&quot;</strong>.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </>
    );
};

export default OrderCart;
