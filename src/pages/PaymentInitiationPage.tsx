import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const paymentSchema = z.object({
  payee: z.string().min(1, "Please select a payee."),
  amount: z.coerce.number().positive("Amount must be positive."),
  reference: z.string().max(50, "Reference too long.").optional(),
  accountFrom: z.string().min(1, "Please select an account to pay from."),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const payees = [
  { id: 'p1', name: 'John Doe (Savings)' },
  { id: 'p2', name: 'Utility Company Ltd.' },
  { id: 'p3', name: 'Landlord Rentals' },
];

const accounts = [
  { id: 'acc1', name: 'Current Account (Balance: £5,250.75)' },
  { id: 'acc2', name: 'Savings Account (Balance: £12,800.20)' },
];

const PaymentInitiationPage = () => {
  console.log('PaymentInitiationPage loaded');
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Confirm
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payee: '',
      amount: 0,
      reference: '',
      accountFrom: '',
    },
  });

  const onSubmitDetails = (data: PaymentFormData) => {
    console.log('Payment details submitted:', data);
    setPaymentData(data);
    setCurrentStep(2);
  };

  const handleConfirmPayment = () => {
    console.log('Payment confirmed:', paymentData);
    // Actual payment processing logic would go here
    setShowConfirmationDialog(false);
    // Potentially navigate to a success page or show a toast
    alert('Payment Successful!');
    form.reset();
    setCurrentStep(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="flex-grow flex items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Make a Payment</CardTitle>
            <CardDescription>Securely send money to your payees.</CardDescription>
            <Progress value={(currentStep / 2) * 100} className="mt-4" />
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitDetails)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="accountFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Account</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account to pay from" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {accounts.map(acc => (
                              <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="payee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To Payee</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a payee" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {payees.map(p => (
                              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                             <SelectItem value="new">Add New Payee...</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (£)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Invoice #123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Continue to Confirmation</Button>
                </form>
              </Form>
            )}

            {currentStep === 2 && paymentData && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Confirm Payment Details</h3>
                <div className="space-y-2 text-sm p-4 border rounded-md bg-gray-50">
                  <p><strong>From:</strong> {accounts.find(acc => acc.id === paymentData.accountFrom)?.name.split('(')[0].trim()}</p>
                  <p><strong>To:</strong> {payees.find(p => p.id === paymentData.payee)?.name}</p>
                  <p><strong>Amount:</strong> £{paymentData.amount.toFixed(2)}</p>
                  {paymentData.reference && <p><strong>Reference:</strong> {paymentData.reference}</p>}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>Back to Edit</Button>
                  <Button onClick={() => setShowConfirmationDialog(true)}>Confirm & Pay</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <AlertDialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to authorize a payment of £{paymentData?.amount.toFixed(2)} to {payees.find(p => p.id === paymentData?.payee)?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPayment}>Proceed with Payment</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentInitiationPage;