import TicketBookingForm from "@/components/ticket-booking-form";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-800 md:text-4xl">
            Bhutan Monument Tickets
          </h1>
          <p className="mt-2 text-gray-600">
            Book tickets to visit Bhutan's beautiful monuments and dzongs
          </p>
        </header>
        <main>
          <TicketBookingForm />
        </main>
        <footer className="mt-16 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Bhutan Monument Tickets. All rights
            reserved.
          </p>
          <p>
            <Link href={"/staff"}>Staff Login</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
