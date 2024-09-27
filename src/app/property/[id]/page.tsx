import PropertyDetail from '@/components/shared/Property/PropertyDetail'
import React from 'react'

const Page = ({ params }: { params: any }) => {
    return (
        <PropertyDetail id={params?.id} />
    )
}

export default Page