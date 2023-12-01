import {Button} from "@chakra-ui/react"
import { useAuth } from "../../contexts/AuthContexts"

function Profile({history}) {
    const {user, logout} = useAuth()

    async function handleLogout () {
        logout(() => {
            history.push("/")
        })
    }
    
    return (
        <div>
            <h2>Profile</h2>
            <code> {JSON.stringify(user)} </code>
            <br />
            <br />
            <Button colorScheme="pink" variant="solid" onClick={handleLogout} >Logout</Button>
        </div>
    )
}

export default Profile
