import type { Metadata } from "next";
import { AddressList } from "@/features/account";

export const metadata: Metadata = { title: "Addresses" };

export default function AddressesPage() {
  return <AddressList />;
}
