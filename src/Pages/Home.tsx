import { Button } from '../components/ui/button';
import HomePageBanner from '../Image_Assests/HomePageBanner.jpeg';
const Home = () => {
  return (
    <div>
      <div className="relative w-[95%] m-auto pt-2 h-120 flex flex-col items-center justify-center my-5">
        <img src={HomePageBanner} alt="" className='h-full w-full rounded-2xl' />
        <h1 className='absolute font-bold text-xl text-white bottom-16 left-5'>New Laptop Launched</h1>
        <Button
        variant={"secondary"}
          className="absolute bottom-5 left-5 ">Buy Now</Button>
      </div>
      <div className='w-[95%] h-[40px] m-auto flex flex-col items-center justify-center my-5 bg-gradient-to-r from gray-300/80 to-gray-100 rounded-2xl p-5'>
Hi
      </div>
    </div>
  )
}

export default Home