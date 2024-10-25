
const PageHeader = ({name}) => {
    return (
        <div className="bg-color_1 text-white py-5 md:py-10">
            <div className="">
                <h1 className="text-3xl font-semibold text-center">{name}</h1>
            </div>
        </div>
    );
};

export default PageHeader;