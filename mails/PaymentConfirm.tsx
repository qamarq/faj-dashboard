import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';
import * as React from 'react';

const PaymentConfirmEmail = ({
    username = 'newuser',
    email = 'rtset@test.pl',
    orderId = '123456789',
    orderDate = '2021-01-01',
    orderTotal = '1000 PLN',
    paymentStatus = 'Paid',
    tickets = [
        {
            name: 'Ticket name',
            quantity: 1,
        },
        {
            name: 'Ticket name',
            quantity: 2,
        },
        {
            name: 'Ticket name',
            quantity: 3,
        },
    ],
    invoiceLink = '#',
}: PaymentConfirmEmailProps) => {
    const previewText = `We just received your payment, ${username}!`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="my-10 mx-auto p-5 w-[465px]">
                        <Section className="mt-8">
                            <Img
                                src={`https://tcs.islandhouse.it/loga/tcs-logo.svg`}
                                width="180"
                                height="auto"
                                alt="Logo FAJ"
                                className="my-0 mx-auto"
                            />
                        </Section>
                        <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
                            Your payment has been confirmed!
                        </Heading>
                        <Text className="text-sm">Hello <strong>{username}</strong>,</Text>
                        <Text className="text-sm">
                            We&apos;re excited to tell you that your payment has
                            been confirmed! Below you&apos;ll find the details
                            of your purchase and tickets. If you have any
                            questions, please contact us at{' '}
                            <Link
                                className="text-blue-500"
                                href="mailto:kontakt@faj.org.pl">
                                kontakt@faj.org.pl
                            </Link>
                            . We&apos;re happy to help!
                        </Text>
                        <Hr className="my-8" />
                        <Text className="text-sm">
                            <b>Buyer data:</b> {username} ({email})
                        </Text>
                        <Text className="text-sm">
                            <b>Order ID:</b> {orderId}
                        </Text>
                        <Text className="text-sm">
                            <b>Order date:</b> {orderDate}
                        </Text>
                        <Text className="text-sm">
                            <b>Order total:</b> {orderTotal}
                        </Text>
                        <Text className="text-sm">
                            <b>Payment status:</b> {paymentStatus}
                        </Text>
                        <Hr className="my-8" />
                        <Text className="text-sm">
                            <b>Tickets:</b>
                        </Text>
                        {tickets.map((ticket) => (
                            <Text key={ticket.name} className="text-sm">
                                <b>{ticket.name}:</b> x{ticket.quantity}
                            </Text>
                        ))}
                        <Hr className="my-8" />
                        <Text className="text-sm">
                            <b>Link to invoice: </b>
                            <Link href={invoiceLink}>Download</Link>
                        </Text>
                        <Text className="text-sm">
                            Cheers,
                            <br />
                            The FAJ Team
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

interface PaymentConfirmEmailProps {
    username?: string;
    email?: string;
    orderId?: string;
    orderDate?: string;
    orderTotal?: string;
    paymentStatus?: string;
    tickets?: {
        name: string;
        quantity: number;
    }[];
    invoiceLink?: string;
}

const baseUrl = process.env.URL ? `https://${process.env.URL}` : '';

export default PaymentConfirmEmail;
