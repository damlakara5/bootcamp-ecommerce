
import {Link} from "react-router-dom"
import styles from "./styles.module.css"
import { Button } from '@chakra-ui/react'
import { useAuth } from "../../contexts/AuthContexts"
import { useBaskets } from "../../contexts/BasketContext"
function NavBar() {
    const  {loggedIn, user} = useAuth()
    const {items} = useBaskets()

    
    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Link to="eCommerce" >eCommerce</Link>
                </div>

                <ul className={styles.menu}>
                    <li>
                        <Link to="/" >Products</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.rigth}>
               { 
                !loggedIn && <>
                    <Link to="/signin" ><Button colorScheme='pink'>Login</Button></Link>
                    <Link to="/signup" ><Button colorScheme='pink'>Register</Button></Link>
                </>
               }
               {
                loggedIn && <>
                    {
                        items?.length > 0 &&   
                        <Link to="/baskets"> 
                            <Button colorScheme="pink" variant="outline">Basket({items.length})</Button>
                        </Link>
                    }
                    {
                        user?.role === 'admin' && <Link to="admin"> <Button colorScheme="pink" variant="ghost">Admin</Button> </Link>
                    }
                    <Link to="/profile"> 
                        <Button >Profile</Button>
                    </Link>
                </>
               }
            </div>
        </nav>
    )
}

export default NavBar
