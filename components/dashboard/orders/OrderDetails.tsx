"use client"

import React from 'react'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'

export default function OrderDetails() {
    return (
        <Tabs aria-label="Dynamic tabs">
            <Tab key="order" title={"Payment details"}>
                <Card>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card> 
            </Tab>
            <Tab key="tickets" title={"Ordered tickets"}>
                <Card>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience2.</p>
                    </CardBody>
                </Card> 
            </Tab>
        </Tabs>
    )
}
