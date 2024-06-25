import { FC, ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "@/components/dashboard.module.css";
import Navbar from "@/components/dashboardNavbar/Navbar";



interface AuthLayoutProps {
    children: ReactNode;
    
}
const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
         <Sidebar />
      </div>

      <div className={styles.content}>
          <Navbar/>
        {children}
      </div>
      
      
    </div>
  );
};
export default AuthLayout;

