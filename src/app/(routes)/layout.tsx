import { AppLayout } from "@/components/AppLayout";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
