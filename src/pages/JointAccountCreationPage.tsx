import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import JointAccountStepper from '@/components/JointAccountStepper';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, UserPlus, FileText, PartyPopper, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Schemas for each step
const primaryApplicantSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Valid phone number is required."),
});
type PrimaryApplicantData = z.infer<typeof primaryApplicantSchema>;

const partnerInviteSchema = z.object({
  partnerFullName: z.string().min(2, "Partner's full name is required."),
  partnerEmail: z.string().email("Invalid partner email address."),
});
type PartnerInviteData = z.infer<typeof partnerInviteSchema>;

const reviewSchema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});
type ReviewData = z.infer<typeof reviewSchema>;


const JointAccountCreationPage = () => {
  console.log('JointAccountCreationPage loaded');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [applicationData, setApplicationData] = useState<{primary?: PrimaryApplicantData, partner?: PartnerInviteData}>({});
  const [invitationSent, setInvitationSent] = useState(false);

  const primaryForm = useForm<PrimaryApplicantData>({ resolver: zodResolver(primaryApplicantSchema) });
  const partnerForm = useForm<PartnerInviteData>({ resolver: zodResolver(partnerInviteSchema) });
  const reviewForm = useForm<ReviewData>({ resolver: zodResolver(reviewSchema) });

  const handlePrimarySubmit = (data: PrimaryApplicantData) => {
    console.log('Primary Applicant Data:', data);
    setApplicationData(prev => ({ ...prev, primary: data }));
    // In a real app, this would trigger moving to the next step in JointAccountStepper
    // For this example, we'll assume the stepper handles its own internal state progression on button click
    return true; // Indicate success for stepper
  };

  const handlePartnerInviteSubmit = (data: PartnerInviteData) => {
    console.log('Partner Invite Data:', data);
    setApplicationData(prev => ({ ...prev, partner: data }));
    setInvitationSent(true);
    // Simulate API call and success
    return true;
  };

  const handleFinalSubmit = (data: ReviewData) => {
    console.log('Final Review Data:', data);
    console.log('Full Application Data:', applicationData);
    // API call to submit application
    setShowSuccessDialog(true);
  };

  const steps = [
    {
      id: 1,
      title: "Your Details",
      icon: User,
      content: (
        <Form {...primaryForm}>
          <form onSubmit={primaryForm.handleSubmit(handlePrimarySubmit)} className="space-y-4">
            <FormField
              control={primaryForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={primaryForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={primaryForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl><Input type="tel" placeholder="+44 000 000 0000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit button handled by Stepper */}
          </form>
        </Form>
      ),
    },
    {
      id: 2,
      title: "Invite Partner",
      icon: UserPlus,
      content: (
        <>
          {invitationSent && (
             <Alert variant="default" className="mb-4 bg-green-50 border-green-300">
                <PartyPopper className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-700">Invitation Sent!</AlertTitle>
                <AlertDescription className="text-green-600">
                Your partner has been invited. They will need to accept and complete their details. You can proceed to review your part.
                </AlertDescription>
            </Alert>
          )}
          <Form {...partnerForm}>
            <form onSubmit={partnerForm.handleSubmit(handlePartnerInviteSubmit)} className="space-y-4">
              <p className="text-sm text-gray-600 mb-2">Enter the details of the person you'd like to share this joint account with. They will receive an invitation to complete their part of the application.</p>
              <FormField
                control={partnerForm.control}
                name="partnerFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner's Full Name</FormLabel>
                    <FormControl><Input placeholder="e.g., John Smith" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={partnerForm.control}
                name="partnerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner's Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="partner@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!invitationSent && <Button type="submit" className="w-full">Send Invitation</Button>}
               {/* "Next" button to proceed after sending invite will be part of stepper logic */}
            </form>
          </Form>
        </>
      ),
    },
    {
      id: 3,
      title: "Review & Confirm",
      icon: FileText,
      content: (
        <Form {...reviewForm}>
          <form onSubmit={reviewForm.handleSubmit(handleFinalSubmit)} className="space-y-6">
            <h4 className="font-semibold text-lg">Application Summary</h4>
            <Card className="bg-gray-50">
                <CardContent className="pt-4 space-y-2">
                    <p><strong>Your Name:</strong> {applicationData.primary?.fullName || 'N/A'}</p>
                    <p><strong>Your Email:</strong> {applicationData.primary?.email || 'N/A'}</p>
                    <p><strong>Invited Partner:</strong> {applicationData.partner?.partnerFullName || 'N/A'}</p>
                    <p><strong>Partner's Email:</strong> {applicationData.partner?.partnerEmail || 'N/A'}</p>
                </CardContent>
            </Card>
            <FormField
              control={reviewForm.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I confirm that the information provided is accurate and I agree to the <a href="/terms" target="_blank" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</a>.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
             {/* Submit button handled by Stepper as "Complete" */}
          </form>
        </Form>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="flex-grow p-6">
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center">Open a Joint Account</CardTitle>
                <CardDescription className="text-center text-gray-600">
                A few simple steps to set up your shared finances.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <JointAccountStepper
                    steps={steps}
                    onComplete={() => {
                        // This onComplete is for the stepper itself.
                        // The final form submission is handled by the Review & Confirm step's content.
                        // We'll trigger the form submission here IF it's the last step.
                        // For robust solution, stepper "Next" on last step should trigger form submission.
                        console.log("Stepper reached final step. Attempting final form submission.");
                        reviewForm.handleSubmit(handleFinalSubmit)();
                    }}
                 />
            </CardContent>
        </Card>

        <Alert open={!invitationSent && applicationData.primary && !applicationData.partner} className="mt-6 max-w-3xl mx-auto bg-blue-50 border-blue-300">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-700">Next Step: Invite Your Partner</AlertTitle>
            <AlertDescription className="text-blue-600">
            Please proceed to the next step in the form above to invite the second applicant for the joint account.
            </AlertDescription>
        </Alert>
      </main>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
                <PartyPopper className="mr-2 h-6 w-6 text-green-500" />
                Application Submitted!
            </DialogTitle>
            <DialogDescription>
              Your joint account application has been successfully submitted. We will review your application and notify you within 2-3 business days regarding the status. You will receive an email confirmation shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => {
                setShowSuccessDialog(false);
                // Potentially navigate to dashboard: history.push('/dashboard');
            }}>
                Back to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JointAccountCreationPage;