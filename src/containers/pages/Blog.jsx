import { useEffect } from "react";
import { connect } from "react-redux"

import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Layout from "../../hocs/layouts/Layout";
import BlogList from "../../components/blog/BlogLIst";
import CategoriesHeader  from "../../components/blog/CategoriesHeader";

import { get_categories } from "../../redux/actions/category/categories";
import { get_blog_list } from "../../redux/actions/blog/blog"

//
function Blog({
    get_categories,
    categories,
    get_blog_list,
    posts,
    count,
    next,
    previous
}) {

    useEffect(() => {
        window.scrollTo(0,0)
        get_categories()
        console.log('gardus')
        get_blog_list()

    }, [])

    console.log('2)', posts)
    return (
        <Layout>
            <Navbar/>
            <div className="pt-28">
                <div className="mt-10">
                    <CategoriesHeader categories={categories&&categories}/>
                    <BlogList posts={posts} get_blog_list_page={get_blog_list} count={count&&count}/>
                </div>
            </div>
            <Footer/>
        </Layout>
    )
}

const mapStateToProps = state => ({
    categories: state.categories.categories,
    posts: state.blog.blog_list,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,

})
// export default Blog
export default connect(mapStateToProps, {
    get_categories,
    get_blog_list,
}) (Blog)