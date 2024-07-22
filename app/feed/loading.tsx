import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
function page() {

  return (
    <div className="skele">
      <Skeleton width={370} className="flex" count={3} height={400}/>
    </div>
  )
}

export default page
