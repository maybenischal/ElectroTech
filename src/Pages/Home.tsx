import { Button } from '../components/ui/button';
import HomeBanner from '../Image_Assests/HomeBanner.png';
const Home = () => {
  return (
    <div>
      <div className=" w-full bg-red-400 h-120 flex flex-col items-center justify-center my-5">
       <img src= {HomeBanner} alt=""  className='h-full w-full rounded-2xl'/>
       <Button>Buy Now</Button>
        </div>
    </div>
  )
}

export default Home