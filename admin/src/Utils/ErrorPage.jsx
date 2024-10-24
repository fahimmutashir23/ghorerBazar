import { Link } from "react-router-dom";
import img from "../assets/asset/page-underConstruction.jpg"

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex items-center flex-col justify-center">
                <img src={img} className="w-full" alt="" />
                <Link to='/admin' className="button_primary">Go to Dashboard</Link>
            </div>
        </div>
    );
};

export default ErrorPage;