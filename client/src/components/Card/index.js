import {Box, Image, Button} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import moment from "moment"
import { useBaskets } from "../../contexts/BasketContext"

function Card({item}) {
    const {addToBasket, items} = useBaskets()

    const findBasketItem = items.find(basket_item => basket_item._id === item._id)

    return (
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p={3}>
            <Link to={`/product/${item._id}`} >
                <Image src={item.photos[0]} loading="lazy" alt="Product"></Image>

                <Box p={6}> 
                    <Box display='flex' alignItems='baseline' > {moment(item.createdAt).format('DD/MM/YYYY')} </Box>
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" > {item.title} </Box>
                </Box>
            </Link>
            <Button colorScheme={findBasketItem ? "pink": "green"} variant="solid" onClick={() => addToBasket(item, findBasketItem)}>
            {
                    findBasketItem ? 'Remove from basket' : "Add to basket"
                }
            </Button>
        </Box>
    )
}

export default Card
