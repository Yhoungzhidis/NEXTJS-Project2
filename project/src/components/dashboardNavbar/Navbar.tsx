'use client';

import { usePathname } from "next/navigation";
import styles from "@/components/dashboardNavbar/Navbar.module.css"
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
     <div className={styles.name}>{pathname.split('/').pop()} </div>
      <div className={styles.menu}>
        <div className={styles.search}>
        <MdSearch />
        <input type="text" placeholder="Search..." className={styles.input}/>
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20}/>
          <MdNotifications size={20}/>
          <MdPublic size={20}/>
        </div>
      </div>
     
    </div>
  );
};

export default Navbar;
