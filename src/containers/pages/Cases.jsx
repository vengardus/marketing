import Footer from "../../components/navigation/Footer"
import Nabvar from "../../components/navigation/Navbar"
import Layout from "../../hocs/layouts/Layout"
import Header from "../../components/cases/Header"
import CaseList from "../../components/cases/CaseList"

function Cases() {
    return (
        <Layout >
            <Nabvar/>
            <Header></Header>
            <CaseList/>
            <Footer/>
        </Layout>
    )
}

export default Cases