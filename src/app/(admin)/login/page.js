import LoginForm from "@/components/admin/LoginForm";
import styles from "@/app/page.module.css";

export const metadata = {
  title: "Login | Sahara at Sea",
  openGraph: {
    title: "Login | Sahara at Sea",
  },
};

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <h1>Admin Login</h1>
      <LoginForm />
    </div>
  );
}