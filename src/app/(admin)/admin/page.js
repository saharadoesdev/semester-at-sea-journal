'use client'
import { supabase } from '../../../utils/supabase/client'
import styles from "../page.module.css";

export default function AdminPage() {
  return (
    <div className={styles.page}>
        <br /><br /><br /><br /><br />
      <h1>Admin</h1>
      {/* <CounterButton /> */}
    </div>
  );
}