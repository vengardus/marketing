import { useEffect, useState } from "react";
import { connect } from "react-redux"
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Navigate } from "react-router-dom";
import {
  login, check_authenticated, 
  refresh, load_user
} from './../../../redux/actions/auth/auth'


function Home({
  login,
  isAuthenticated,
  loading,
  refresh,
  check_authenticated,
  load_user
}) {

  useEffect(() => {
    window.scrollTo(0, 0)
    isAuthenticated ? <></>:
      <>
      {refresh()}
      {check_authenticated()}
      {load_user()}
      </>
  }, [])

  const [formData, setFormData] = useState({
    email:'',
    password:''
  })

  const {
    email, 
    password
   } = formData

  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })

  const onSubmit = e => {
    e.preventDefault()
    console.log(formData)
    login(email, password)
  }

  console.log('isAuthenticated', isAuthenticated)

  if(isAuthenticated){
    return <Navigate to='/dashboard'/>
  } 

  return (
    // <Layout>
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              src={'https://bafybeiczl4dcxupma2zeyilkukfl4yge64axnhajd722wxgin62mtts6uy.ipfs.w3s.link/murkivamarketing.png'}
              width={160}
              height={160}
              className="mx-auto h-12 w-auto"
              alt=''
            />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          
          </div>
          <form 
            onSubmit={e=> onSubmit(e)}
            className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  value={email}
                  onChange={e=>onChange(e)}
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={e=>onChange(e)}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

             <div className="flex items-center justify-between">
              {/*
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              */}
              <div className="text-sm">
                <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div> 

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
    // </Layout>
  )
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})


export default connect(mapStateToProps, {
  login,
  refresh,
  check_authenticated,
  load_user,
})(Home)