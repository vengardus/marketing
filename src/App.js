import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import store from './store'
import { Provider } from "react-redux";
import Error404 from "./containers/errors/Error404";
import Home from "./containers/pages/Home";
import Cases from "./containers/pages/Cases";
import Services from "./containers/pages/Services";
import Blog from "./containers/pages/Blog"
import About from "./containers/pages/About";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/**Error display */}
          <Route path='*' element={<Error404 />}></Route>
          
          {/**Home display */}
          <Route path='/' element={<Home />}></Route>
          <Route path='/casos' element={<Cases />}></Route>
          <Route path='/servicios' element={<Services />}></Route>
          <Route path='/blog' element={<Blog />}></Route>
          <Route path='/nosotros' element={<About />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
