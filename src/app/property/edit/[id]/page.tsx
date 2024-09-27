import EditProperty from '@/components/shared/Property/EditProperty'
import React from 'react'

const Page = ({ params }: { params: any }) => {
    return (
        <EditProperty id={params?.id} />
    )
}

export default Page