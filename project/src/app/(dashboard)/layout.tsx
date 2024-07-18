import { FC, ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "@/components/dashboard.module.css";
import Navbar from "@/components/dashboardNavbar/Navbar";
import SessionWrapper from "@/components/sessionWrapper";



interface AuthLayoutProps {
    children: ReactNode;
    
}
const AuthLayout: FC<AuthLayoutProps> = async ({children}) => {

  return (
      <SessionWrapper>
         <div className={styles.container}>
      <div className={styles.menu}>
         <Sidebar />
      </div>

      <div className={styles.content}>
        
          <Navbar/>
        {children}
      </div>
    </div>
      </SessionWrapper>
  );
};
export default AuthLayout;

