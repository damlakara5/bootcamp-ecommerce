import {Grid, Box, Flex, Button} from "@chakra-ui/react"
import {useInfiniteQuery} from "react-query"
import { fetchProducList } from "../../api"
import Card from "../../components/Card/index"
function Products() {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery("products", fetchProducList, {
        getNextPageParam: (lastGroup, allGroups) => {
            const morePageExist = lastGroup?.length === 12

            if(!morePageExist) {
                return 
            }

            return allGroups.length + 1
        }
    })

    if(status === "loading") return <p>loading</p>

    if(status === "error" ) return "An error has occured" + error.message


    return (
        <div>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
               
                {
                    data.pages.map((group, i) => (
                        <>
                            {
                                group.map(item => (
                                    <Box w="100%" key={item._id} >
                                        <Card item={item} />
                                    </Box>
                                ))
                            }
                        </>
                    ))
                }
            </Grid>
            <Flex mt="10" justifyContent="center">
                <Button
                isLoading={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                >
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load More'
                    : 'Nothing more to load'}
                </Button>
            </Flex>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
    )
}

export default Products
