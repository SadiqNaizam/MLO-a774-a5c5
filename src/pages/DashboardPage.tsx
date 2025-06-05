import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import FinancialOverviewChart from '@/components/FinancialOverviewChart';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, TrendingUp, DollarSign, Users } from 'lucide-react';

// Placeholder data
const accountSummaries = [
  { id: 'acc1', name: 'Current Account', balance: '£5,250.75', type: 'current' },
  { id: 'acc2', name: 'Savings Account', balance: '£12,800.20', type: 'savings' },
  { id: 'acc3', name: 'Joint Account', balance: '£3,150.00', type: 'joint' },
];

const recentTransactions = [
  { id: 'txn1', description: 'Tesco Superstore', amount: '-£45.60', date: '2024-07-28' },
  { id: 'txn2', description: 'Salary Deposit', amount: '+£2,500.00', date: '2024-07-25' },
  { id: 'txn3', description: 'Netflix Subscription', amount: '-£10.99', date: '2024-07-20' },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <ScrollArea className="flex-grow">
        <main className="p-6 space-y-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back, User!</h1>
            <p className="text-gray-600">Here's your financial overview for today.</p>
          </header>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£21,200.95</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" onClick={() => console.log('Navigate to payment initiation')}>Make a Payment</Button>
                <Button variant="outline" size="sm" onClick={() => console.log('Navigate to account details')}>View All Accounts</Button>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Linked Accounts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accountSummaries.length}</div>
                <p className="text-xs text-muted-foreground">Active and accessible</p>
              </CardContent>
            </Card>
          </div>

          {/* Financial Overview Chart */}
          <FinancialOverviewChart title="Monthly Spending Trends" description="Visualizing your income vs. expenses." />

          {/* Account Summaries and Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Balances</CardTitle>
                <CardDescription>Overview of your accounts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {accountSummaries.map(acc => (
                  <div key={acc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-200 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-700">{acc.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{acc.type} Account</p>
                    </div>
                    <p className="font-bold text-lg text-gray-800">{acc.balance}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="link" className="text-blue-600">View All Accounts <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activities.</CardDescription>
              </CardHeader>
              <CardContent>
                {recentTransactions.map(txn => (
                  <div key={txn.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-700">{txn.description}</p>
                      <p className="text-sm text-gray-500">{txn.date}</p>
                    </div>
                    <p className={`font-semibold ${txn.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{txn.amount}</p>
                  </div>
                ))}
              </CardContent>
               <CardFooter>
                <Button variant="link" className="text-blue-600">View All Transactions <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </ScrollArea>
    </div>
  );
};

export default DashboardPage;