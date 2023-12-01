import React, { useRef, useState } from 'react'
import { Alert, Button, Image, Box , Text} from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea
  } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import { useBaskets } from '../../contexts/BasketContext'
import { postOrder } from '../../api'

const Basket = () => {
    const [adress, setAdress] = useState(   )
    
    const {items, removeFromBasket, emptyBasket} = useBaskets()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const total = items.reduce((acc,obj) => acc + obj.price, 0)


    const handleSubmitForm = async () => {
       const itemsId = items.map(item => item._id)

       const input = {
        address: adress,
        items: JSON.stringify(itemsId)
       }

       const res = await postOrder(input)
       
        emptyBasket()   
        onClose()
       console.log(res)
    }

  return (
    <Box p="5">
        {
            items?.length < 1 && <Alert  status='warning' >You have not any items in your baskets</Alert>
        }
        {
            items?.length > 0 &&
            <>
                <ul>
                    {
                        items.map(item => (
                            <li key={item._id} style={{marginBottom: 16}} >
                                <Link to={`/product/${item._id}`} >
                                    {item.title} - {item.price}TL
                                    <Image loading='lazy' htmlWidth={200} src={item.photos[0]}  alt='Basket item'></Image>
                                </Link>
                                <Button mt="2" colorScheme='pink' size="sm" onClick={() => removeFromBasket(item._id)} >Remove From Basket</Button>
                            </li>
                        ))
                    }
                </ul>
                <Box mt="10">
                    <Text fontSize="22"> Total {total}TL</Text>
                </Box>

                <Button mt="2" colorScheme='green' size="sm" onClick={onOpen}>Order</Button>

                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Textarea ref={initialRef} placeholder='Address'  value={adress} onChange={(e) => setAdress(e.target.value)}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmitForm} >
                        Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        }
        
    </Box>
  )
}

export default Basket