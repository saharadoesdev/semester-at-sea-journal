import { notFound } from "next/navigation";
import itinerary from "@/data/itinerary.json";
import styles from "@/app/page.module.css";

// this function runs once at build time to generate all the country pages
export async function generateStaticParams() {
  const countryNames = itinerary.map((stop) => stop.country);
  // note - i'll have to change this line ^^ to filter for ports only
  // (later, after i add waypoint stops to the itinerary)

  const uniqueCountries = [...new Set(countryNames)];

  return uniqueCountries.map((country) => ({
    slug: country.toLowerCase().replace(/ /g, "-"),
  }));
}

export default async function CountryPage({ params }) {
  // check to make sure you're actually at a valid country URL
  const countryNames = itinerary.map((stop) => stop.country);

  const validSlugs = [...new Set(countryNames)].map((country) =>
    country.toLowerCase().replace(/ /g, "-")
  );

  const resolvedParams = await params;
  if (!validSlugs.includes(resolvedParams.slug)) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <h1> hey is this thing on ? </h1>
    </div>
  );
}