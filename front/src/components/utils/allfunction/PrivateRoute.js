import { getToken } from "../localStorageUtil";
import {Route, Navigate} from "react-router-dom";

export const PrivateRoute = ({ Component, ...rest }) => {
    let token = getToken();
    return (
        <Route 
            {...rest}
            render= { (props) => 
            token() ? (
                <Component {...props} />
            ) : (
                <Navigate to="/"/>
                    
            )
        }
        />
    );
}