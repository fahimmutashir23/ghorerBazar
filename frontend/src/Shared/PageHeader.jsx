
const PageHeader = ({name}) => {
    return (
        <div className="bg-gradient-to-r from-white via-color_3 to-white text-white lg:py-1">
            <div className="">
                <h1 className="lg:text-2xl font-semibold text-center">{name}</h1>
            </div>
        </div>
    );
};

export default PageHeader;