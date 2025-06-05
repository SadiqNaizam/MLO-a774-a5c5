import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UserCircle, ShieldCheck, Bell, Smartphone } from 'lucide-react';

const ProfileSettingsPage = () => {
  console.log('ProfileSettingsPage loaded');

  // Placeholder states for form fields - in a real app, use useState and handle changes
  const [fullName, setFullName] = React.useState("John Doe");
  const [email, setEmail] = React.useState("john.doe@example.com");
  const [phone, setPhone] = React.useState("+44 7700 900000");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [smsAlerts, setSmsAlerts] = React.useState(false);
  const [biometricAuth, setBiometricAuth] = React.useState(true);


  const handleSaveChanges = (section: string) => {
    console.log(`Saving changes for ${section}:`, {
        ...(section === 'personal' && { fullName, email, phone }),
        ...(section === 'password' && { currentPassword, newPassword }),
        ...(section === 'notifications' && { emailNotifications, pushNotifications, smsAlerts }),
        ...(section === 'security' && { biometricAuth }),
    });
    // Add API call logic here
    alert(`${section} settings saved!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow p-6">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Profile & Settings</CardTitle>
            <CardDescription>Manage your personal information, security, and notification preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    <div className="flex items-center"><UserCircle className="mr-3 h-5 w-5 text-blue-600" /> Personal Information</div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your.email@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your phone number" />
                  </div>
                  <Button onClick={() => handleSaveChanges('personal')}>Save Personal Info</Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    <div className="flex items-center"><ShieldCheck className="mr-3 h-5 w-5 text-green-600" /> Security Settings</div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                    <div className="space-y-4 p-4 border rounded-md">
                        <h4 className="font-semibold">Change Password</h4>
                        <div>
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                        <Button onClick={() => handleSaveChanges('password')}>Update Password</Button>
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-md">
                        <Label htmlFor="biometricAuth" className="flex flex-col space-y-1">
                            <span>Biometric Authentication</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                            Enable login with fingerprint or face recognition.
                            </span>
                        </Label>
                        <Switch id="biometricAuth" checked={biometricAuth} onCheckedChange={setBiometricAuth} />
                    </div>
                    <Button onClick={() => handleSaveChanges('security')} className="mt-2">Save Security Settings</Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    <div className="flex items-center"><Bell className="mr-3 h-5 w-5 text-yellow-600" /> Notification Preferences</div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="pushNotifications">Push Notifications (Mobile App)</Label>
                    <Switch id="pushNotifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="smsAlerts">SMS Alerts for Transactions</Label>
                    <Switch id="smsAlerts" checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                  </div>
                  <Button onClick={() => handleSaveChanges('notifications')}>Save Notification Preferences</Button>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    <div className="flex items-center"><Smartphone className="mr-3 h-5 w-5 text-purple-600" /> Linked Devices</div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                    <p className="text-sm text-gray-600">Manage devices linked to your account for security and quick access.</p>
                    {/* Placeholder for linked devices list */}
                    <div className="p-3 border rounded-md">
                        <p className="font-medium">iPhone 15 Pro Max <span className="text-xs text-green-600">(Active)</span></p>
                        <p className="text-xs text-gray-500">Last accessed: July 29, 2024</p>
                        <Button variant="link" className="p-0 h-auto text-red-500 text-xs">Unlink</Button>
                    </div>
                     <div className="p-3 border rounded-md">
                        <p className="font-medium">Desktop Browser - Chrome</p>
                        <p className="text-xs text-gray-500">Last accessed: July 28, 2024</p>
                         <Button variant="link" className="p-0 h-auto text-red-500 text-xs">Unlink</Button>
                    </div>
                    <Button variant="outline">Manage Devices</Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfileSettingsPage;