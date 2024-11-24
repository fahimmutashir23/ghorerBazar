
const PageHeader = ({name}) => {
    return (
        <div className="bg-color_3 text-white py-1 lg:py-5">
            <div className="">
                <h1 className="lg:text-3xl font-semibold text-center">{name}</h1>
            </div>
        </div>
    );
};

export default PageHeader;