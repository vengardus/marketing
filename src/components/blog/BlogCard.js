import { Link } from "react-router-dom"
import moment from 'moment'


function BlogCard({ post, index }) {
  console.log(post)
  return (
    <li key={index}
    >
      <Link id={index} to={`/blog/${post.slug}`}
        onMouseEnter={() => {
          // const img = document.getElementById(index)
          // img.classList.add('object-fill')
          const title = document.getElementById(`title` + post.id)
          title.classList.add('text-orange-500')
        }}
        onMouseLeave={() => {
          // const img = document.getElementById(index)
          // img.classList.remove('object-fill')
          const title = document.getElementById(`title` + post.id)
          title.classList.remove('text-orange-500')
        }}
        className="block relative hover:shadow-card rounded-md transition duration-300 ease-in-out">
        <div className="flex items-center   my-10 ">
          <div className="lg:flex min-w-0 lg:flex-1 items-center">
            <figure className="lg:flex-shrink-0">
              <img id={index} className="h-64 lg:w-96 w-full object-cover rounded" 
                src={`${process.env.REACT_APP_API_URL}/${decodeURI(post.thumbnail)}`}
                alt={decodeURI(post.thumbnail)} 
              />
            </figure>
            <div className="min-w-0 flex-1 px-8 p-4 ">
              <p 
                id={`title` + post.id} 
                className=" lg:mt-0 lg:absolute lg:top-4 leading-10 text-3xl pb-4 font-semibold transition duration-300 ease-in-out">
                {post.title.length > 80 ? post.title.slice(0, 79) : post.title}
              </p>
              <div className="lg:absolute lg:top-20">

                <span className=" hover:text-orange-500  mx-1 font-medium text-gray-800 text-sm ">
                  <Link 
                    to={`/category/${post.category.slug}`}>
                    {post.category.name}
                  </Link>
                </span> 
                <span className="text-gray-300">&middot;
                </span>
                <span 
                  className="mt-2 ml-2 mr-1 font-medium text-gray-800 text-sm">
                  {moment(post.published).format('LL')}
                </span> 
                <span className="text-gray-300">&middot;</span>
                <span 
                  className="mt-2 mx-2 font-medium text-gray-800 text-sm">
                  {post.time_read} min read
                </span>
                <p 
                  className="mt-4 text-lg font-regular text-gray-800 leading-8">
                  {post.description.length > 150 ? post.description.slice(0, 149) : post.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default BlogCard