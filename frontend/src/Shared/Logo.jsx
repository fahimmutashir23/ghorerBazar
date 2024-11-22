import logo from "../assets/Logo/logo.jpg"

const Logo = ({w}) => {
    return (
        <div>
            <img src={logo} className={`w-${w}`} alt="" />
        </div>
    );
};

export default Logo;