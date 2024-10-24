import moment from "moment";


const Copyright = () => {
    const year = moment().format('YYYY');
    return (
        <div className="bg-gray-100 py-7 px-2 lg:px-0">
            <div className="max-w-7xl mx-auto flex items-center flex-col lg:flex-row justify-between">
                <p className="text-black text-center">
                &copy; {year} All right reserved by Tech Hub. | Developed & Design by Fahim Muntashir.
                </p>
                <p className="text-black">
                    Sitemap | privacy policy
                </p>
            </div>
        </div>
    );
};

export default Copyright;