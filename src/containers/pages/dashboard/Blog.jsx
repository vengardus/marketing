import { useEffect } from "react";
import { connect } from "react-redux"
import LayoutSidebar from "../../../hocs/layouts/LayoutSidebar";
import {get_blog_author_list} from "../../../redux/actions/blog/blog"
import BlogList from "../../../components/blog/BlogLIst";
import Footer from "../../../components/navigation/Footer";
//

function Blog({
    get_blog_author_list,
    posts,
    count,
    next,
    previous
}) {

    useEffect(() => {
        window.scrollTo(0,0)
        get_blog_author_list()
    }, [])

    return (
        <LayoutSidebar>
            <div className="pt-28">
                <div className="mt-10">
                    <BlogList posts={posts} get_blog_list_page={get_blog_author_list} count={count&&count}/>
                </div>
            </div>
            <Footer/>
        </LayoutSidebar>
    )
}


const mapStateToProps = state => ({
    posts: state.blog.blog_list,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,
})


export default connect(mapStateToProps, {
    get_blog_author_list,
}) (Blog)