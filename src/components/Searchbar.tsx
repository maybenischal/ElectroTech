import { Search } from "lucide-react"
import { Button } from "./ui/button"

const Searchbar = () => {
    return (
        <div className='w-[100%] h-[40px] bg-[#e5e5e5] rounded-[8px] relative p-2'>
            <input type="text" placeholder="Search your products"
                className="w-[100%] h-[30px] text-gray-600 focus:outline-none bg-inherit text-sm pr-10 px-2"
            />
            <Button
                type="submit"
                variant={"ghost"}
                size={"icon"}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:bg-transparent hover:text-gray-600 cursor-pointer"
            >
                <Search className="w-4 h-4" />
            </Button>
        </div>
    )
}

export default Searchbar