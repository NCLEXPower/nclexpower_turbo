import Image from 'next/image'
import { EmptyStateImage, ErrorStateImage } from '../../assets'
import { Box } from '@mui/material'
import { ComponentLoader } from '../ComponentLoader'
import { PropsWithChildren, useEffect, useState } from 'react'


export const ComponentState: React.FC<PropsWithChildren<unknown | any>> = ({ data, isSuccess, isError, isLoading, children }) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(false)


    useEffect(() => {
        if ((data.result?.length === 0 || data.result == null) && isSuccess) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [data.result, data.status]);

    if (isSuccess && !isEmpty) {
        return <>{children}</>
    }

    return (
        <Box data-testid="component-states-id" sx={{
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: '15px',
            minWidth: '250px',
            width: "350px",
            height: '400px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxShadow: 2
        }}>
            <StateStatus isError={isError} isLoading={isLoading} isEmpty={isEmpty} />
        </Box>
    )


}

const StateStatus = ({ isError, isLoading, isEmpty }: { isError: boolean, isLoading: boolean, isEmpty: boolean }) => {
    if (isEmpty) {
        return (<>
            <Image src={EmptyStateImage} alt='Empty Data' />
            <Box data-testid="component-is-empty-id">
                <p className='h-fit font-bold leading-3 w-full'>Empty!</p>
                <p className='h-fit text-[.8rem] leading-3 -mt-3 w-full'>No Data Available</p>
            </Box>
        </>)
    }
    if (isError) {
        return (
            <>
                <Image src={ErrorStateImage} alt='Error Occured' />
                <Box data-testid="component-is-error-id">
                    <p className='h-fit font-bold leading-3 w-full'>Error!</p>
                    <p className='h-fit text-[.8rem] leading-3 -mt-3 w-full'>Something went wrong</p>
                </Box>
            </>
        )
    }
    if (isLoading) {
        return (
            <Box data-testid="component-is-loading-id">
                <ComponentLoader disableMarginBottom />
                <Box sx={{ bgcolor: 'Background' }}>
                    <p className='h-fit font-bold leading-3 w-full'>Loading</p>
                    <p className='h-fit text-[.8rem] leading-3 -mt-3 w-full'>Please Wait...</p>
                </Box>
            </Box>)
    }

}
