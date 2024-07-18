import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "@/components/dashboard/card/card.module.css";
import React from "react";

const card = () => {
 

  return (
   
       <div className={styles.container}>
      <MdSupervisedUserCircle size={25}/>
      <div className={styles.texts}>
      <span className={styles.titles}>Courses</span>
      <span className={styles.number }>56</span>
      <span className={styles.detail}>
        <span className={styles.positive}>12%</span> more than previous week
      </span>
      </div>
    </div>

   
  )
}

export default card;
