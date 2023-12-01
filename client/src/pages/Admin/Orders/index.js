import React from 'react'
import { useQuery } from 'react-query'
import { fetchOrders } from '../../../api'
import { Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'

const Orders = () => {
    const {data, isLoading, isError} = useQuery("admin:orders", fetchOrders)

    if(isLoading) return <div>Loading</div>
    if(isError) return <div>Error</div>


  return (
    <div>
        <Text fontSize="2xl" p={5} >Orders</Text>
        <Table variant="simple" width="full">
            <TableCaption></TableCaption>
            <Thead>
                <Tr>
                    <Th>User</Th>
                    <Th>Address</Th>
                    <Th>Items</Th>
                </Tr>
                <Tbody>
                    {
                        data.map(item => (
                            <Tr key={item._id}>
                                <Td> {item.user.email} </Td>
                                <Td> {item.adress} </Td>
                                <Td> {item.items.length} </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Thead>
        </Table>
    </div>
  )
}

export default Orders