import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Layout from "../../hocs/layouts/Layout";

function Blog() {
    return (
        <Layout>
            <Navbar/>
            <div className="pt-28">
                <div className="mt-10">
                    BLOG
                </div>
            </div>
            <Footer/>
        </Layout>
    )
}

export default Blog