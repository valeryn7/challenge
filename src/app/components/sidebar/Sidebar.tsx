"use client";
import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import {useSelectedLayoutSegment} from "next/navigation";
import {Button} from "reactstrap";
import {FaBars} from "react-icons/fa";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({children}: SidebarProps) => {
  const activeSegment = useSelectedLayoutSegment();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div>
      <div className={styles.headerContainer}>
        <div>
          <Button className={styles.buttonSidebar} onClick={toggleSidebar}>
            {isSidebarOpen ? <FaBars /> : <FaBars />}
          </Button>
        </div>
        <div className={styles.alignEnd}>
          <div className={styles.title}>Challenge</div>
        </div>
      </div>
      <div
        className={`${styles.sidebar} ${
          isSidebarOpen ? `${styles.show}` : `${styles.hidden}`
        }`}>
        {isSidebarOpen && (
          <div className={styles.content}>
            {sidebarOptions.map(option => (
              <Link
                onClick={toggleSidebar}
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
        )}
      </div>
      <div
        className={`${styles.children} ${
          isSidebarOpen ? `${styles.childrenShow}` : `${styles.childrenHidden}`
        }`}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
