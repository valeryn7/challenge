"use client";
import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import {useSelectedLayoutSegment} from "next/navigation";

const Sidebar = () => {
  const activeSegment = useSelectedLayoutSegment();
  const sidebarOptions = [
    {
      title: "Home",
      href: "/",
      targetSegment: null,
    },
    {
      title: "Patiens",
      href: "/users",
      targetSegment: "users",
    },
  ];
  return (
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.title}>Challenge</div>
        {sidebarOptions.map(option => (
          <Link
            href={option.href}
            className={
              activeSegment === option.targetSegment
                ? styles.buttonActive
                : styles.button
            }
            key={option.href}>
            {option.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
