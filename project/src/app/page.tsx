import React from "react";
import car from "./pic.jpg";
import styles from "@/styles/layout.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

const Home = () => {
  return (
    <main>
    <div>
        <Navbar />
      <div className={styles.featuredImageWrapper}>
        <Image
        src={car}
        alt="background"
        fill
        priority
        /> 
      </div>
    </div>
    </main>
  );
};
 
export default Home;