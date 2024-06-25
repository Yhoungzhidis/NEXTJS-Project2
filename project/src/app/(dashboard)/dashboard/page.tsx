import Card from "@/components/dashboard/card/card";
import styles from "@/components/dashboard.module.css";
import Rightbar from "@/components/dashboard/rightbar/rightbar";

const page = () => {
  return (
   <div className={styles.wrapper}>
    <div className={styles.main}>
    <div className={styles.cards}>
      <Card />
      <Card />
      <Card />
    </div>
    </div>
    <div className={styles.side}>
      <Rightbar />
      </div>
        
   </div> 
    
  );
};

export default page;
