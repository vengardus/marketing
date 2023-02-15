import { useEffect } from "react";
import { connect } from "react-redux"
import LayoutSidebar from "../../../hocs/layouts/LayoutSidebar";


function Blog({
}) {

    useEffect(() => {
        window.scrollTo(0,0)

    }, [])

    return (
        <LayoutSidebar>
            BLOG
        </LayoutSidebar>
    )
}


const mapStateToProps = state => ({
})


export default connect(mapStateToProps, {
}) (Blog)