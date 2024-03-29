
import styles from "../app/css/main.module.css";
import Link from "next/link";

export default function PageMenu({alignRight}){
    return (
        <div className={styles.header_menu_container} style={alignRight != null ? {alignItems: "right", position: "absolute"} : {width: "calc(100% - 10px)"}}>
          <div className={styles.flex + " " + styles.hide_on_mobile}  style={{justifyContent: "right", gap: "10px"}}>
            <Link href="/search">
              <div className={styles.header_menu_item}>
                <span>Scholarship Search</span>
              </div>
            </Link>
            <Link href="https://colorado.academicworks.com" target="_blank">
                <div className={styles.header_menu_item}>
                <span>CU Page</span>
                </div>
            </Link>
            <Link href="/">
                <div className={styles.header_menu_item}>
                <span>About</span>
                </div>
            </Link>
          </div>
        </div>
    )
}