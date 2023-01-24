import Header from "../../components/home/Header"
import Footer from "../../components/navigation/Footer"
import Nabvar from "../../components/navigation/Navbar"
import Layout from "../../hocs/layouts/Layout"

function Home() {
    return (
        <Layout >
            <Nabvar/>
            <Header/>
            <Footer/>
        </Layout>
    )
}

export default Home