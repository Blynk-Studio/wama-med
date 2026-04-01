import { DemoApp } from "./_components/DemoApp";
import { parseDemoView } from "./_lib/utils";

export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string | string[] }>;
}) {
  const { view } = await searchParams;
  const initialView = parseDemoView(view) ?? "overview";

  return <DemoApp initialView={initialView} />;
}
