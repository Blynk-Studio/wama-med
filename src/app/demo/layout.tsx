import type { Metadata } from "next";
import "./demo.css";

export const metadata: Metadata = {
  title: "WAMA MED — Mission Control",
  description: "Plateforme de coordination medicale internationale",
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
