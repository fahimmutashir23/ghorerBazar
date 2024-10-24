import useUser from "./useUser";

const CheckAdmin = ({children}) => {
    const [userData] = useUser();
    if(userData.email !== 'mdfahim.muntashir28@gmail.com'){
        return 'you are not admin'
    } else{
        return children
    }
};

export default CheckAdmin;