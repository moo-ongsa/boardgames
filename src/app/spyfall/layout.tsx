"use client";
import { SpyfallProvider } from "./SpyfallContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpyfallProvider> {children}</SpyfallProvider>;
}
