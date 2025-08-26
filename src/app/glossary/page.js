import { createClient } from "@/utils/supabase/server";
import GlossaryDisplay from "@/components/glossary/GlossaryDisplay";

export const metadata = {
  title: "Ship Lingo | Sahara at Sea",
  openGraph: {
    title: "Ship Lingo | Sahara at Sea",
  },
};

export default async function GlossaryPage() {
  const supabase = await createClient();
  const { data: terms, error } = await supabase
    .from("Glossary")
    .select()
    .order("term", { ascending: true });

  return <GlossaryDisplay terms={terms || []} />;
}
