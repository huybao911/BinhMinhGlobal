import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/admin";
import { RootState } from "../../redux/reducers";
import { IAdmin } from "../../redux/types/admin";
import { Box } from "@mui/material";
import CreateTypeProduct from "./CreateTypeProduct";
const NewTypeProduct: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [Admins, setAdmins] = React.useState<IAdmin[]>([]);
    const admin = useSelector((state: RootState) => state.admin);

    React.useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    React.useEffect(() => {
        setAdmins(() =>
            admin?.users?.filter((user: any) =>
                user.role.keyRole === "admin"
            ));
    }, [admin]);

    React.useEffect(() => {
        document.title = "Loại Sản Phẩm";
    }, []);

    return (

        <>
            {Admins.map((typeproduct: any) =>
                <Box key={typeproduct._id} >
                    <CreateTypeProduct typeproduct={typeproduct} />
                </Box>
            )}
        </>
    );
};

export default NewTypeProduct;
