import PageHeader from "@/Shared/PageHeader";
import Card from "./Partial/Card";


const Blog = () => {
    return (
        <div>
            <PageHeader name='Help Post' />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Blog;