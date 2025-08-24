import itinerary from '@/data/itinerary.json';
// import RouteTimeline from '@/components/route/RouteTimeline';
import styles from "../page.module.css";

export default async function RoutePage() {
  return (
    <div className={styles.page}>
      <div>
        <h1>The Route</h1>
        <p>The complete 100-day itinerary. Click on any destination to explore the journey.</p>
      </div>
      {/* <RouteTimeline itinerary={itinerary} /> */}
    </div>
  );
}