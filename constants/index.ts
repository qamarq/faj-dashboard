import { ChipProps } from "@nextui-org/react";

export const paymentStatuses: Record<PaymentStatus, string> = {
    requires_confirmation: "Requires Confirmation",
    requires_action: "Requires Action",
    processing: "Processing",
    succeeded: "Payment successful",
    requires_payment_method: "Payment failed",
    canceled: "Payment canceled",
    incomplete: "Payment incomplete",
}

export const statusColorMap: Record<string, ChipProps["color"]>  = {
    succeeded: "success",
    requires_payment_method: "danger",
    incomplete: "warning",
    processing: "primary",
    requires_confirmation: "primary",
    requires_action: "primary",
    canceled: "danger",
};