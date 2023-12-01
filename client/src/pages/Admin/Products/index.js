import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteProduct, fetchProducList } from '../../../api'
import {Table, Popconfirm} from "antd"
import { Text } from '@chakra-ui/react'
import {Link} from "react-router-dom"

const Products = () => {
  const {isLoading, isError,data} = useQuery('admin:products', fetchProducList)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation(deleteProduct)

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Action',
      key: 'action',
      render : (record) => (
        <>
          <Link to={`/admin/products/${record._id}`}>Edit</Link>
          <Popconfirm 
            title="Are you sure?"
            onConfirm={() => deleteMutation.mutate(record._id,  {
              onSuccess: () => {       queryClient.invalidateQueries('admin:products')
            }
            })}
            onCancel={() => console.log("kk")}
            okText="Yes"
            cancelText="No"
            placement='left'
          >
            <a href='/#' style={{marginLeft: 10}} >Delete</a>
          </Popconfirm>
        </>
      )
    },
  ]

  if(isLoading) return <div>Loading</div>
  if(isError) return <div>Error</div>




  return (
    <div>
          <Text fontSize="2xl" p="5" >Products</Text>

          <Table dataSource={data} columns={columns} rowKey="_id" >

          </Table>
    </div>


  )
}

export default Products