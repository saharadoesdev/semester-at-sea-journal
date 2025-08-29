import LoginForm from "@/components/admin/LoginForm";
// import styles from "@/app/page.module.css";

export const metadata = {
  title: "Login | Sahara at Sea",
  openGraph: {
    title: "Login | Sahara at Sea",
  },
};

export default function LoginPage() {
  return (
    <div>
      <h1>Admin Login</h1>
      <LoginForm />
    </div>
  );
}