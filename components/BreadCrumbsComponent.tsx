"use client"

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function BreadCrumbsComponent() {
    const pathname = usePathname()
    const pathSegments = pathname.slice(1).split('/')
    let cumulativePath = ''

    return (
        <div className='flex flex-col flex-wrap gap-4 mb-[10px]'>
            <Breadcrumbs radius={"full"}>
                {pathSegments.map((path, index) => {
                    cumulativePath += `/${path}`
                    return (
                        <BreadcrumbItem key={index} href={cumulativePath} className='capitalize'>{path}</BreadcrumbItem>
                    )
                })}
            </Breadcrumbs>
        </div>
    )
}