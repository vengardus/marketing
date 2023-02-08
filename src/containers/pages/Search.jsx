import { useEffect } from "react";
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Layout from "../../hocs/layouts/Layout";
import { connect } from "react-redux"
import { get_categories } from "../../redux/actions/category/categories";
import { search_blog, get_blog_list, get_blog_list_page } from "../../redux/actions/blog/blog"
import CategoriesHeader  from "../../components/blog/CategoriesHeader";
import { useParams } from "react-router-dom";


function Search({
    posts,
    count,
    next,
    previous,
    search_blog
}) {

    const params = useParams()
    const term = params.term

    useEffect(() => {
        window.scrollTo(0,0)
        search_blog(term)
    }, [])

    return (
        <Layout>
            <Navbar/>
            <div className="pt-28">
                <div className="mt-10">
                    {/* <CategoriesHeader categories={categories&&categories}/> */}
                    SEARCH POSTS
                </div>
            </div>
            <Footer/>
        </Layout>
    )
}

const mapStateToProps = state => ({
    posts: state.blog.filtered_posts,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,

})
// export default Search
export default connect(mapStateToProps, {
    search_blog
}) (Search)