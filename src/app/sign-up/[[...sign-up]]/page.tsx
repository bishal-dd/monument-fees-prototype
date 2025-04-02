import { Loader } from "@/components/shared/loader";
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<Loader />}>
        <SignUp />
      </Suspense>
    </div>
  );
}
