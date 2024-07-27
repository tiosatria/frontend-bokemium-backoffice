import { UserPayload } from "@/api/objects/UserPayload"
import { RootState } from "@/store/reducers"
import Image from "next/image"
import { FaUser } from "react-icons/fa"
import { useSelector } from "react-redux"

export const TopNavUserActionCard = ({currentUser}:{currentUser? : UserPayload}) : JSX.Element=>{

    return(
        <div className="flex flex-col shadow-md p-2 rounded-sm cursor-pointer">
            <div className="flex flex-row justify-center space-x-2">
                {
                currentUser?.profilePic 
                ? <Image src={currentUser?.profilePic} alt="profile pic"/>
                : <FaUser className="my-auto"/>
                }
            <p>{currentUser?.username}</p>
            </div>
        </div>
    )

}