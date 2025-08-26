import itinerary from "@/data/itinerary.json";
import RouteTimeline from "@/components/route/RouteTimeline";
import styles from "../page.module.css";

export const metadata = {
  title: "The Route | Sahara at Sea",
  openGraph: {
    title: "The Route | Sahara at Sea",
  },
};

export const revalidate = 3600; // revalidates every hour

export default async function RoutePage() {
  function groupItineraryByCountry(itinerary) {
    const grouped = [];

    let i = 0;
    while (i < itinerary.length) {
      const current = itinerary[i];
      let j = i + 1;
      let cities = [current.city];
      let arrivalDate = current.arrivalDate;
      let departureDate = current.departureDate;

      while (j < itinerary.length && itinerary[j].country === current.country) {
        cities.push(itinerary[j].city);
        departureDate = itinerary[j].departureDate;
        j++;
      }

      grouped.push({
        country: current.country,
        city: cities.join(" & "),
        arrivalDate,
        departureDate,
      });
      
      i = j;
    }
    return grouped;
  }

  return (
    <div className={styles.page}>
      <div>
        <h1>The Route</h1>
        <p>
          The complete 100-day itinerary. Click on any destination to explore
          the journey.
        </p>
      </div>
      <RouteTimeline itinerary={groupItineraryByCountry(itinerary)} />
    </div>
  );
}
