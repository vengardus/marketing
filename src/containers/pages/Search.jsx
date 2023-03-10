import { useEffect } from "react";
import Footer from "../../components/navigation/Footer";
import Navbar from "../../components/navigation/Navbar";
import Layout from "../../hocs/layouts/Layout";
import { connect } from "react-redux"
import { useParams } from "react-router-dom";
import { search_blog} from "../../redux/actions/blog/blog"
import BlogList from "../../components/blog/search/BlogList";


function Search({
  posts,
  count,
  next,
  previous,
  search_blog,
}) {

  const params = useParams()
  const term = params.term

  useEffect(() => {
    window.scrollTo(0, 0)
    search_blog(term)
  }, [])

  return (
    <Layout>
      <Navbar />
      <div className="pt-28">
        <div className="mt-10">
          {/* <BlogList posts={posts} get_blog_list_page={search_blog_page} count={count && count} /> */}
          <BlogList posts={posts&&posts} get_blog_list_page={search_blog} term={term} count={count&&count}/>
        </div>
      </div>
      <Footer />
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
  search_blog,
})(Search)