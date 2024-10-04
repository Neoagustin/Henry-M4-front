"use client";

import React, { useEffect } from "react";
import styles from "./Profile.module.css";
import Image from "next/image";
import userImg from "@/assets/img/user.jpg";
import { useUser } from "@/context/UserContext/UserContext";
import { useRouter } from "next/navigation";
import useUserMenu from "@/hooks/useLoggedInUserMenu";
import Link from "next/link";

const Profile: React.FC = () => {
  const { user } = useUser();
  const { handleLogOut } = useUserMenu();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }
  return (
    <main className={styles.main}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <Image src={userImg} alt={user.name} className={styles.profileImage} />
          <h1 className={styles.profileName}>{user.name}</h1>
          <p className={styles.profileRole}>Software Engineer</p>
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.profileItem}>
            <strong>Email:</strong> {user.email}
          </div>
          <div className={styles.profileItem}>
            <strong>Address:</strong> {user.address}
          </div>
          <div className={styles.profileItem}>
            <strong>Phone:</strong> {user.phone}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonLogout} onClick={handleLogOut}>
            Cerrar sesión
          </button>
          <Link href={"/profile/orders"} className={styles.buttonOrders}>
            Ver órdenes
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Profile;
