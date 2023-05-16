import { Link } from "react-router-dom"

function NoFound() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold"><span className="sr-only">Error</span>404</h1>
          <p className="py-6">Sorry, we couldn't find this page.</p>
          <Link to='/' className="btn btn-primary">Back to homepage</Link>
        </div>
      </div>
    </div>
  )
}

export default NoFound