"use client";
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "@/components/dashboard/card/card.module.css";
import { useSession } from "next-auth/react";
import React from "react";

const Card = () => {
  const {data:session} = useSession();

  return (
    <>
    {session ? (
      <>
       <div className={styles.container}>
      <MdSupervisedUserCircle size={25}/>
      <div className={styles.texts}>
      <span className={styles.titles}>{session.user?.courseCode}</span>
      <span className={styles.number }>56</span>
      <span className={styles.detail}>
        <span className={styles.positive}>12%</span> more than previous week
      </span>
      </div>
    </div>
      </>
    ):(
      <>
      </>
    )}
    </>
  )
}

export default Card;
