'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useCartStore from '@/store/cart';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Suspense } from 'react';

const CheckSuccessContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { resetCart } = useCartStore();

    const payment_status = searchParams.get('payment_status');
    const message = searchParams.get('message');
    // console.log(payment_status)
    // console.log(message)

    useEffect(() => {
        if (payment_status === 'success' && message === 'Thank_you_for_using_homiorentals') {
            const resetFunction = async () => {
                try {
                    await resetCart();
                } catch (error) {
                    console.log(error);
                }
            };
            resetFunction();
        } else {
            router.push('/'); // Redirect to home if the parameters don't match
        }
    }, [payment_status, message, resetCart, router]);

    const handleSuccess = () => {
        router.push('/property');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Dialog open={true} onOpenChange={() => { }}>
                <DialogContent className="max-w-[95%] sm:max-w-[425px]">
                    <DialogHeader className='w-full flex flex-col gap-3 items-center justify-center'>
                        <DialogTitle>Payment Successful</DialogTitle>
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        <DialogDescription className='text-center'>
                            Thank you for using HomioRentals! Your payment has been successfully processed.
                        </DialogDescription>
                    </DialogHeader>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <DialogFooter className='mt-2'>
                            <Button onClick={handleSuccess}>Explore More</Button>
                        </DialogFooter>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const CheckSuccessPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckSuccessContent />
        </Suspense>
    );
};

export default CheckSuccessPage;
