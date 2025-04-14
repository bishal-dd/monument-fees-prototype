"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Printer, FileDown } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
// Define booking data type
interface Ticket {
  monument: string;
  quantity: number;
  price: number;
  total: number;
}

interface BookingData {
  bookingId: string;
  customerName: string;
  email: string;
  purchaseDate: string;
  tickets: Ticket[];
  totalAmount: number;
}

export default function ReceiptPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "UNKNOWN";
  const [currentDate] = useState(new Date());
  const [validUntilDate] = useState(
    new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)
  ); // Valid for 30 days
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  useEffect(() => {
    // Try to get booking data from sessionStorage
    const storedData = sessionStorage.getItem("bookingData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setBookingData(parsedData);
      } catch (error) {
        console.error("Error parsing booking data:", error);
      }
    }
  }, []);
  const handleDownloadPdf = useCallback(async () => {
    if (!receiptRef.current) return;

    setIsGeneratingPdf(true);

    try {
      const receiptElement = receiptRef.current;

      const imgData = await domtoimage.toPng(receiptElement, {
        quality: 1,
        bgcolor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight =
        (receiptElement.clientHeight * imgWidth) / receiptElement.clientWidth;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Bhutan_Monument_Ticket_${bookingId}.pdf`);

      setPdfDownloaded(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [receiptRef, bookingId]); // Only include necessary dependencies

  // Auto-download PDF on page load
  useEffect(() => {
    if (bookingData && !pdfDownloaded) {
      // Add a slightly longer delay to ensure the receipt is fully rendered
      const timer = setTimeout(() => {
        handleDownloadPdf();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [handleDownloadPdf, bookingData, pdfDownloaded]);

  const handlePrint = () => {
    window.print();
  };

  // Fallback data if no booking data is available
  const fallbackData: BookingData = {
    bookingId,
    customerName: "Tour Agency",
    email: "t.dorji@example.com",
    purchaseDate: currentDate.toISOString(),
    tickets: [
      { monument: "Tashichho Dzong", quantity: 2, price: 500, total: 1000 },
      { monument: "Memorial Chorten", quantity: 1, price: 300, total: 300 },
    ],
    totalAmount: 1300,
  };

  // Use booking data from state or fallback
  const displayData = bookingData || fallbackData;
  const purchaseDate = new Date(displayData.purchaseDate);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-red-800">
              Booking Confirmed!
            </h1>
            {pdfDownloaded ? (
              <div className="mt-2 rounded-md bg-green-100 p-2 text-green-800">
                <p>
                  Your PDF ticket has been downloaded. If the download
                  didn&apos;t start automatically, please click the
                  &quot;Download PDF&quot; button below.
                </p>
              </div>
            ) : (
              <p className="mt-2 text-gray-600">
                Your tickets have been booked successfully. Your PDF receipt
                will download automatically.
              </p>
            )}
            {isGeneratingPdf && (
              <div className="mt-4 flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-red-800 border-t-transparent"></div>
                <span>Generating your receipt PDF...</span>
              </div>
            )}
          </div>

          <Card
            className="border-2 border-red-800 print:border-none"
            ref={receiptRef}
            id="printable-ticket"
          >
            <CardHeader className="border-b border-gray-200 bg-red-50 print:bg-white">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div>
                  <CardTitle className="text-2xl text-red-800">
                    Bhutan Monument Ticket
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Booking ID: {displayData.bookingId}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Customer Information
                  </h3>
                  <p className="text-sm">{displayData.customerName}</p>
                  <p className="text-sm">{displayData.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Tour Duration</h3>
                  <p className="text-sm">
                    Start: {purchaseDate.toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    End: {validUntilDate.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">
                    Booking Details
                  </h3>
                  <p className="text-sm">
                    Purchase Date: {purchaseDate.toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    Valid Until: {validUntilDate.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">
                  Ticket Details
                </h3>
                <div className="rounded-md border border-gray-200">
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-200 bg-gray-50 p-3 text-sm font-medium text-gray-700">
                    <div className="col-span-6">Monument</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Price</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                  {displayData.tickets.map((ticket, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-2 p-3 text-sm"
                    >
                      <div className="col-span-6">{ticket.monument}</div>
                      <div className="col-span-2 text-center">
                        {ticket.quantity}
                      </div>
                      <div className="col-span-2 text-right">
                        Nu. {ticket.price}
                      </div>
                      <div className="col-span-2 text-right">
                        Nu. {ticket.total}
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-12 gap-2 border-t border-gray-200 bg-gray-50 p-3 text-sm font-medium">
                    <div className="col-span-10 text-right">Total Amount:</div>
                    <div className="col-span-2 text-right">
                      Nu. {displayData.totalAmount}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-amber-50 p-4 text-sm">
                <h3 className="font-semibold text-gray-700">
                  Important Information:
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-gray-600">
                  <li>
                    Please present this ticket (printed or digital) at the
                    entrance.
                  </li>
                  <li>Tickets are valid for one-time entry only.</li>
                  <li>Tickets are non-refundable and non-transferable.</li>
                  <li>
                    Please follow all monument rules and regulations during your
                    visit.
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="text-center text-xs text-gray-500">
                <p>© {new Date().getFullYear()} Bhutan Monument Tickets</p>
                <p>
                  For any inquiries, please contact support@bhutantickets.com
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center gap-4 border-t border-gray-200 bg-gray-50 print:hidden">
              <Button
                variant="outline"
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Print Ticket
              </Button>
              <Button
                className="flex items-center gap-2 bg-red-800 hover:bg-red-700"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FileDown className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center print:hidden">
            <Button variant="link" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
