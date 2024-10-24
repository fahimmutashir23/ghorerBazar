import { FaFacebookSquare, FaLinkedin, FaTwitterSquare, FaWhatsappSquare } from "react-icons/fa";

const StickySideBar = () => {
    return (
        <div className=' w-12 flex justify-center bg-text_secondary text-white px-pl_primary py-pl_secondary'>
            <ul className="space-y-1 flex flex-col items-center">
                <li className="text-[10px] font-semibold uppercase">Share</li>
                <li><FaFacebookSquare className="text-text_xl" /></li>
                <li><FaWhatsappSquare className="text-text_xl" /></li>
                <li><FaTwitterSquare className="text-text_xl" /></li>
                <li><FaLinkedin className="text-text_xl" /></li>
            </ul>
        </div>
    );
};

export default StickySideBar;