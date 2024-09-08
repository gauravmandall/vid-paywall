import { Button } from "@/components/ui/button";
import { useCreateOrder } from "@/lib/hooks/users/use-create-order";
import { useVerifyPayment } from "@/lib/hooks/users/use-verify-order";
import { loadScript } from "@/lib/loadscript";
import React, { useEffect } from "react";

export default function Upgrade() {
  const createOrderMutation = useCreateOrder();
  const verifyOrderMutation = useVerifyPayment();

  const verifyPayment = async (orderData: any) => {
    verifyOrderMutation.mutate(
      {
        signature: orderData.razorpay_signature,
        orderId: orderData.razorpay_order_id,
        paymentId: orderData.razorpay_payment_id,
      },
      {
        onSuccess: () => {
          console.log("Payment verified successfully!");
        },
        onError: () => {
          console.log("Payment not verified");
        },
      }
    );
  };

  const onPayment = async () => {
    let orderData;
    createOrderMutation.mutate(
      {
        planId: "premium",
      },
      {
        onSuccess: async (data) => {
          const paymentObject = new (window as any).Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
            order_id: data.data.id,
            ...data.data,
            handler: async function (response: any) {
              console.log(response);
              orderData = response;
              await verifyPayment(orderData);
            },
          });

          await paymentObject.open();
        },
      }
    );
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);
  return (
    <Button onClick={onPayment} className="w-full mt-4">
      Subscribe
    </Button>
  );
}
