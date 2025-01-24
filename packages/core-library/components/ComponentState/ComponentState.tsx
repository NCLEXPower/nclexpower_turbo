import Image from 'next/image'
import { EmptyStateImage, ErrorStateImage } from '../../assets'
import { Box } from '@mui/material'
import { ComponentLoader } from '../ComponentLoader'
import { PropsWithChildren, useEffect, useState } from 'react'


export const ComponentState: React.FC<PropsWithChildren<unknown | any>> = ({ data, children }) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(false)

    useEffect(() => {
        if ((data.result?.length === 0 || data.result == null) && data.status === 'success') {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [data.result, data.status]);

    return (
        data.status == 'success' && isEmpty == false ?
            <>{children}</>
            :
            <Box sx={{
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
                <StateStatus status={data.status} isEmpty={isEmpty} />
            </Box>
    )
}

const StateStatus = ({ status, isEmpty }: { status: string, isEmpty: boolean }) => {
    if (isEmpty) {
        return (<>
            <Image src={EmptyStateImage} alt='Empty Data' />
            <Box>
                <p className='h-fit font-bold leading-3 w-full'>Empty!</p>
                <p className='h-fit text-[.8rem] leading-3 -mt-3 w-full'>No Data Available</p>
            </Box>
        </>)
    }
    switch (status) {
        case 'error':
            return (
                <>
                    <Image src={ErrorStateImage} alt='Error Occured' />
                    <Box>
                        <p className='h-fit font-bold leading-3 w-full'>Error!</p>
                        <p className='h-fit text-[.8rem] leading-3 -mt-3 w-full'>Something went wrong</p>
                    </Box>
                </>
            )
        case 'loading':
            return <ComponentLoader disableMarginBottom />
        default:
            return null
    }

}
