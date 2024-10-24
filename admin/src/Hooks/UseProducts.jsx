import { useEffect, useState } from "react";

const UseProducts = () => {

    const [products, setproducts] =useState([]);
    const [loading, setLoading] = useState(true);
    useEffect (() => {
    
        fetch('data.json')
        .then(res => res.json())
        .then(data => setproducts(data))
        setLoading(false);
    }, [])

        
return[products, loading]

}
export default UseProducts;