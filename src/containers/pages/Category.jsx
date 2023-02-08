import { useEffect } from "react";
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Layout from "../../hocs/layouts/Layout";
import { connect } from "react-redux"
import { get_categories } from "../../redux/actions/category/categories";
import { get_blog_list_category, get_blog_list_category_page } from "../../redux/actions/blog/blog"
import CategoriesHeader  from "../../components/blog/CategoriesHeader";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogList from "../../components/blog/BlogLIst";


function Category({
    get_categories,
    categories,
    get_blog_list_category,
    get_blog_list_category_page,
    posts,
    count,
    next,
    previous
}) {

    const params = useParams()
    const slug = params.slug


    useEffect(() => {
        window.scrollTo(0,0)
        get_categories()
        console.log('gardus')
        get_blog_list_category(slug)

    }, [])

    

    return (
        <Layout>
            <Helmet>
            {console.log('posts', posts)}
            {console.log('slug', slug)}
                <title>Murkiva | Category: {slug}</title>
            </Helmet>
            <Navbar/>
            <div className="pt-24">
                <CategoriesHeader categories={categories&&categories}/>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <div className="mx-auto max-w-6xl my-10">
                    {/* Content goes here */}
                    <BlogList posts={posts&&posts} get_blog_list_page={get_blog_list_category_page} count={count&&count}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </Layout>
    )
}

const mapStateToProps = state => ({
    categories: state.categories.categories,
    posts: state.blog.blog_list_category,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,

})
// export default Blog
export default connect(mapStateToProps, {
    get_categories,
    get_blog_list_category,
    get_blog_list_category_page
}) (Category)