import type { Metadata } from "next";
import { ChangePasswordForm } from "@/features/account";

export const metadata: Metadata = { title: "Security" };

export default function SecurityPage() {
  return <ChangePasswordForm />;
}
