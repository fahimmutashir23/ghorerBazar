import { createContext, useState } from "react";

export const OrderContext = createContext(null)
const OrderProvider = ({children}) => {
    const [cartCall, setCartCall] = useState(false)

    const info = {
        cartCall,
        setCartCall
    }
    return (
        <OrderContext.Provider value={info} >
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;