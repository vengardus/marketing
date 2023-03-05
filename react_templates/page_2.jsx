import { useEffect } from "react";
import { connect } from "react-redux"


function Page_2({

}) {

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])

    return (
        <Layout>

        </Layout>
    )
}


const mapStateToProps = state => ({

})


export default connect(mapStateToProps, {

})(Page_2)