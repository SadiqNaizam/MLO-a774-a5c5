import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Filter, Search, Download, PlusCircle } from 'lucide-react';

// Placeholder data
const transactions = [
  { id: 't1', date: '2024-07-28', description: 'Online Shopping - Tech Gadgets', type: 'Debit', amount: '£129.99', balance: '£5,120.76' },
  { id: 't2', date: '2024-07-27', description: 'Restaurant - Dinner with Friends', type: 'Debit', amount: '£75.50', balance: '£5,250.75' },
  { id: 't3', date: '2024-07-25', description: 'Salary Payment - July', type: 'Credit', amount: '£2,500.00', balance: '£5,326.25' },
  { id: 't4', date: '2024-07-22', description: 'Utility Bill - Electricity', type: 'Debit', amount: '£65.00', balance: '£2,826.25' },
  { id: 't5', date: '2024-07-20', description: 'Gym Membership Fee', type: 'Debit', amount: '£30.00', balance: '£2,891.25' },
  { id: 't6', date: '2024-07-18', description: 'Transfer to Savings Account', type: 'Debit', amount: '£500.00', balance: '£2,921.25' },
];

const AccountDetailsPage = () => {
  console.log('AccountDetailsPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'debit', 'credit'

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || txn.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow p-6">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Current Account Transactions</CardTitle>
            <CardDescription>Detailed history of your transactions for account ending **** 1234.</CardDescription>
            <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Download Statement</Button>
                <Button variant="default" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> New Transfer</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 bg-white text-sm"
                >
                    <option value="all">All Types</option>
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                </select>
              </div>
            </div>

            <ScrollArea className="h-[400px] border rounded-md">
              <Table>
                <TableHeader className="bg-gray-100 sticky top-0">
                  <TableRow>
                    <TableHead className="w-[120px]">Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead className="text-right w-[120px]">Amount</TableHead>
                    <TableHead className="text-right w-[120px]">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((txn) => (
                      <TableRow key={txn.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{txn.date}</TableCell>
                        <TableCell>{txn.description}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            txn.type === 'Credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {txn.type}
                          </span>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${txn.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>{txn.type === 'Credit' ? '+' : '-'}{txn.amount}</TableCell>
                        <TableCell className="text-right">{txn.balance}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500 py-10">
                        No transactions found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AccountDetailsPage;