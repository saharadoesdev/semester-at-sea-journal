import { notFound } from "next/navigation";
import itinerary from "@/data/itinerary.json";
import { createClient } from "@/utils/supabase/server";
import styles from "@/app/page.module.css";
import CountryPageDisplay from "@/components/country/CountryPageDisplay";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const supabase = await createClient();
  const { data: country } = await supabase
    .from('Countries')
    .select('name')
    .eq('slug', resolvedParams.slug)
    .single();

  return {
    title: country?.name
      ? `${country.name} | Sahara at Sea`
      : "Country Not Found | Sahara at Sea",
  };
}

// this function runs once at build time to generate all the country pages
export async function generateStaticParams() {
  const countryNames = itinerary.filter(stop => stop.type === "port").map((stop) => stop.country);

  const uniqueCountries = [...new Set(countryNames)];

  return uniqueCountries.map((country) => ({
    slug: country.toLowerCase().replace(/ /g, "-"),
  }));
}

export default async function CountryPage({ params }) {
  // check to make sure you're actually at a valid country URL
  const countryNames = itinerary.filter(stop => stop.type === "port").map((stop) => stop.country);

  const validSlugs = [...new Set(countryNames)].map((country) =>
    country.toLowerCase().replace(/ /g, "-")
  );

  const resolvedParams = await params;
  if (!validSlugs.includes(resolvedParams.slug)) {
    notFound();
  }

  const supabase = await createClient();
  const { data: countryData } = await supabase
    .from('Countries')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  const { data: posts } = await supabase
    .from('JournalEntries')
    .select('*')
    .contains('tags', [countryData.name])
    .order('display_date', { ascending: true });

  const countryStop = itinerary.find(stop => stop.country === countryData.name);
  const arrivalDate = new Date(countryStop.arrivalDate);
  // const isUnlocked = new Date() >= arrivalDate;
  const isUnlocked = new Date("2025-10-15T19:00+00:00") >= arrivalDate;

  return (
    <div className={styles.page}>
      <CountryPageDisplay country={countryData} posts={posts || []} isUnlocked={isUnlocked} />
    </div>
  );
}