import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getCity, deleteCity } from "../../redux/actions/admin";
import { RootState } from "../../redux/reducers";
import { ICity } from "../../redux/types/city";
import { Box, TableSortLabel, Toolbar, OutlinedInput, InputAdornment, Button, Card, Container, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import UpdateCity from "../../pages/admin/UpdateCity";
// @mui
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
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
    _id: keyof ICity;
    nameCity: keyof ICity;
    update: keyof ICity;
    delete: keyof ICity;
}

interface HeadCell {
    _id: keyof DataUser;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {
        _id: 'nameCity',
        numeric: false,
        label: 'Tên Thành Phố',
    },
    {
        _id: 'update',
        numeric: false,
        label: '',
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

const City: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();


    const [cities, setCities] = React.useState<ICity[]>([]);
    const admin = useSelector((state: RootState) => state.admin);

    const [anchorEl, setAnchorEl] = React.useState([null]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filterName, setFilterName] = React.useState('');

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof DataUser>('nameCity');



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
            const results = admin?.cities?.filter((city: any) => {
                return city.nameCity.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setCities(results);
        } else {
            setCities(() => admin?.cities?.filter((city: any) => city.nameCity));
        }

        setFilterName(keyword);
    };

    const handleOpenMenu = (event: any, index: any) => {
        const newAnchorEls = [
            ...anchorEl.slice(0, index),
            event.currentTarget,
            ...anchorEl.slice(index + 1)
        ];
        setAnchorEl(newAnchorEls);
    };

    const handleCloseMenu = (index: any) => {
        const newAnchorEls = [
            ...anchorEl.slice(0, index),
            null,
            ...anchorEl.slice(index + 1)
        ];
        setAnchorEl(newAnchorEls);
    };

    const sortCity = stableSort(cities, getComparator(order, orderBy));

    React.useEffect(() => {
        dispatch(getCity());
    }, [dispatch]);

    React.useEffect(() => {
        setCities(() => admin?.cities?.filter((city: any) => city.nameCity));
    }, [admin]);

    React.useEffect(() => {
        document.title = "Thành phố";
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
                                Thành Phố
                            </Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row" }} >
                            <Box style={{ marginRight: "14px" }}>
                                <StyledSearch
                                    style={{ borderRadius: '30px', fontSize: '13px', height: "48px" }}
                                    value={filterName}
                                    onChange={handleFilterByName}
                                    placeholder="Tìm kiếm thành phố..."
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                                            <SearchIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Box component={Link} to="/addcity" style={{ fontSize: '14px', textDecoration: "none", color: "black" }}>
                                <Box style={{
                                    border: '1px solid rgba(158, 158, 158, 0.32)',
                                    borderRadius: '30px', textAlign: 'center',
                                    marginTop: '0.5px', padding: '11px', backgroundColor: "#f5f5f5",
                                    width: 140, display: 'flex', flexDirection: 'row', justifyContent: 'center'
                                }}>
                                    <AddIcon style={{ width: '14px', color: '#ee6f81', marginRight: "6px" }} />
                                    <Typography style={{ fontSize: '12px', paddingTop: "2.5px" }} >
                                        Thêm Thành Phố
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </StyledRoot>
                    <TableContainer>
                        {/* Table city */}
                        <Table >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            {cities && cities.length > 0 ? (
                                <TableBody>
                                    {sortCity.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((city: any, index) =>
                                        <TableRow key={city._id}>
                                            <TableCell align="left" sx={{ fontSize: '12px' }}>
                                                {city.nameCity}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button size="large" color="inherit" onClick={(city) => handleOpenMenu(city, index)} >
                                                    <EditIcon style={{ width: "16px" }} />
                                                </Button>
                                                <Popover
                                                    open={!!anchorEl[index]}
                                                    anchorEl={anchorEl[index]}
                                                    onClose={() => handleCloseMenu(index)}
                                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                    PaperProps={{
                                                        sx: {
                                                            p: 1,
                                                            width: 340,
                                                            '& .MuiMenuItem-root': {
                                                                px: 1,
                                                                typography: 'body2',
                                                                borderRadius: 0.75,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Box>
                                                        <UpdateCity city={city} key={city._id} />
                                                    </Box>
                                                </Popover>
                                            </TableCell>
                                            <TableCell >
                                                <Button style={{ color: "red" }} onClick={(e) => dispatch(deleteCity(city._id))} >
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
                                            count={cities.length}
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
                                                Không tồn tại thành phố
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

export default City;
