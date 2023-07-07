import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Shop2Icon from '@mui/icons-material/Shop2';
import ShopIcon from '@mui/icons-material/Shop';
import ApartmentIcon from '@mui/icons-material/Apartment';

export const dataAdmin = [

    {
        icon: <AccountCircleIcon style={{width: '18px'}} />,
        name: 'Người Dùng',
        path: '/user'
    },
    {
        icon: <ApartmentIcon style={{width: '18px'}}/>,
        name: 'Thành Phố',
        path: '/city'
    },
    {
        icon: <Shop2Icon style={{width: '18px'}}/>,
        name: 'Loại Sản Phẩm',
        path: '/typeproduct'
    },
    {
        icon: <ShopIcon style={{width: '18px'}}/>,
        name: 'Sản Phẩm',
        path: '/product'
    },
    {
        icon: <ShoppingCartIcon style={{width: '18px'}}/>,
        name: 'Khách Hàng',
        path: '/orderCart'
    },
];
