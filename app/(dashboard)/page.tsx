import styles from "@/styles/DashboardItem.module.scss"
import React from 'react'
import randomstring from 'randomstring'
import {Card, CardFooter, Button, CardBody, CardHeader, Image as NextImage } from "@nextui-org/react";
import Image from "next/image"

import fruit1 from "@/assets/fruit-1.jpeg"
import fruit2 from "@/assets/fruit-3.jpeg"
import fruit3 from "@/assets/fruit-8.jpeg"
import fruit4 from "@/assets/fruit-7.jpeg"
import { FingerprintIcon } from 'lucide-react';
import BreadCrumbsComponent from '@/components/BreadCrumbsComponent';

export default async function Dashboard() {
    const randomString = randomstring.generate(64);
    // console.log(randomString)

    return (
        <div className={styles.itemContent}>
            <BreadCrumbsComponent />
            <h1 className={styles.title}>Dashboard</h1>

            <div className={styles.dashMain}>
                <Card isFooterBlurred className="w-full h-[300px] mb-[40px] col-span-12 sm:col-span-7">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">We recomended</p>
                        <h4 className="text-white/90 font-medium text-xl">Turning on passkey</h4>
                    </CardHeader>
                    <NextImage
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://www.itprotoday.com/sites/itprotoday.com/files/styles/article_featured_retina/public/biometrics%20authentication.jpg?itok=3akCiir-"
                        // src="https://www.outsourceitcorp.com/wp-content/uploads/2023/03/img-security-iStock-810808540.jpg"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <div className="flex items-center">
                                <FingerprintIcon size={16} className='mr-[10px]' />
                                <p className="text-bold text-white">Add a passkey (biometric authentication) to your account now to increase security</p>
                            </div>
                        </div>
                        <Button className="text-tiny text-white bg-black/30" variant="flat" color="default" radius="lg" size="sm">
                            Go to settings
                        </Button>
                    </CardFooter>
                    </Card>
                <div className={styles.cards}>
                    <Card
                        isFooterBlurred
                        radius="lg"
                        className={styles.card}
                    >
                        <Image
                            alt="Woman listing to music"
                            className={styles.cardImg}
                            src={fruit1}
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className={styles.text}>Products</p>
                            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                                Go
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card
                        isFooterBlurred
                        radius="lg"
                        className={styles.card}
                    >
                        <Image
                            alt="Woman listing to music"
                            className={styles.cardImg}
                            src={fruit2}
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className={styles.text}>Orders</p>
                            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                                Go
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card
                        isFooterBlurred
                        radius="lg"
                        className={styles.card}
                    >
                        <Image
                            alt="Woman listing to music"
                            className={styles.cardImg}
                            src={fruit3}
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className={styles.text}>Users</p>
                            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                                Go
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card
                        isFooterBlurred
                        radius="lg"
                        className={styles.card}
                    >
                        <Image
                            alt="Woman listing to music"
                            className={styles.cardImg}
                            src={fruit4}
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className={styles.text}>Settings</p>
                            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                                Go
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
