import type { Metadata } from "next";
import { ProfileForm } from "@/features/account";

export const metadata: Metadata = { title: "My account" };

export default function AccountPage() {
  return <ProfileForm />;
}
