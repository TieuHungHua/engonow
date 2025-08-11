"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { RiAddBoxLine } from 'react-icons/ri';

// Sample data for the table, now with a schedule
const products = [
  { id: "1", classCode: "A01", className: "IELTS 6.5-7.0", tuitionFee: "15,000,000", status: "Open", studentCount: 25, classSize: 30, createdOn: "23.12.21", lastUpdate: "12.12.22", schedule: "Mon-Wed-Fri, 7-9 PM" },
  { id: "2", classCode: "B02", className: "TOEIC 800+", tuitionFee: "10,500,000", status: "Open", studentCount: 28, classSize: 35, createdOn: "24.01.22", lastUpdate: "13.01.23", schedule: "Tue-Thu-Sat, 7-9 PM" },
  { id: "3", classCode: "C03", className: "Tiếng Anh Giao Tiếp", tuitionFee: "8,000,000", status: "Full", studentCount: 20, classSize: 20, createdOn: "15.05.22", lastUpdate: "15.05.23", schedule: "Mon-Wed, 5-7 PM" },
  { id: "4", classCode: "D04", className: "IELTS Căn Bản", tuitionFee: "12,000,000", status: "Open", studentCount: 18, classSize: 25, createdOn: "01.07.23", lastUpdate: "01.07.23", schedule: "Tue-Thu, 5-7 PM" },
];

export default function App() {
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
  const isAllSelected = selectedProducts.length === products.length;
  const isSomeSelected = selectedProducts.length > 0 && !isAllSelected;

  const handleSelectAll = (checked: boolean) => {
    setSelectedProducts(checked ? products.map(product => product.id) : []);
  };

  const handleSelectProduct = (id: string, checked: boolean) => {
    setSelectedProducts(prev =>
      checked ? [...prev, id] : prev.filter(productId => productId !== id)
    );
  };

  return (
    // Change main background to light blue
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Class Manager</h1>
          <div className="flex space-x-2">
            {/* Change button colors */}
            <Button variant="ghost" className="text-blue-700 hover:bg-blue-100">Filter</Button>
            <Button variant="ghost" className="text-blue-700 hover:bg-blue-100">Composite</Button>
            {/* Change primary button color */}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"><RiAddBoxLine/> Add a new Class</Button>
          </div>
        </header>

        {/* Main content section with table */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          {/* Search bar and filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Input placeholder="Search..." className="pl-8" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Popover for Filters */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="relative text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100">
                    Filters <span className="ml-2 px-2 py-1 bg-blue-200 text-xs font-semibold rounded-full">3</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 rounded-md shadow-lg">
                  <h4 className="font-semibold text-lg mb-4">Filters</h4>
                  <div className="flex flex-col space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="trade-name-filter" />
                        <label htmlFor="trade-name-filter" className="text-sm font-medium">Class Name</label>
                      </div>
                      <div className="ml-6 flex flex-col space-y-1 text-sm text-gray-500">
                        {["IELTS 6.5-7.0", "TOEIC 800+", "Tiếng Anh Giao Tiếp", "IELTS Căn Bản"].map(item => (
                          <div key={item} className="flex items-center space-x-2">
                            <Checkbox id={item} />
                            <label htmlFor={item}>{item}</label>
                          </div>
                        ))}
                        <a href="#" className="text-blue-500 hover:underline mt-2">View all...</a>
                      </div>
                    </div>
                    {/* Other filters */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="status-filter" />
                        <label htmlFor="status-filter" className="text-sm font-medium">Status</label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tuition-fee-filter" />
                        <label htmlFor="tuition-fee-filter" className="text-sm font-medium">Tuition Fee</label>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <span className="text-sm text-gray-500">6 records found</span>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline">Columns <ChevronDown className="ml-2 h-4 w-4" /></Button>
              <Button variant="outline">Export</Button>
              <Button variant="outline"><svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              </Button>
            </div>
          </div>

          {/* Data table */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="w-[50px] text-center">CLASS CODE</TableHead>
                  <TableHead className="text-center">CLASS NAME</TableHead>
                  <TableHead className="text-center">TUITION FEE</TableHead>
                  <TableHead className="text-center">STATUS</TableHead>
                  <TableHead className="text-center">STUDENT COUNT</TableHead>
                  <TableHead className="text-center">CLASS SIZE</TableHead>
                  <TableHead className="text-center">CREATED ON</TableHead>
                  <TableHead className="text-center">LAST UPDATE</TableHead>
                  <TableHead className="text-center">SCHEDULE</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                        aria-label="Select row"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-center">{product.classCode}</TableCell>
                    <TableCell className="text-center">{product.className}</TableCell>
                    <TableCell className="text-center">{product.tuitionFee}</TableCell>
                    <TableCell className="text-center">{product.status}</TableCell>
                    <TableCell className="text-center">{product.studentCount}</TableCell>
                    <TableCell className="text-center">{product.classSize}</TableCell>
                    <TableCell className="text-center">{product.createdOn}</TableCell>
                    <TableCell className="text-center">{product.lastUpdate}</TableCell>
                    <TableCell className="text-center">{product.schedule}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Class</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              1-20 of 97
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">Rows per page:</div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
