import Link from "next/link";
import styles from "./navigation.module.css";
import Icon from "../../public/icon.svg";
import Image from "next/image";

type Props = {};

export default function Navigation({}: Props) {
  return (
    <nav className="block md:flex flex-row justify-between items-center text-white px-8 py-4 bg-primary">
      <input type="checkbox" id="navToggle" className={styles.input} hidden />
      <div className="flex justify-between flex-1 items-center">
        <Link
          href="/"
          className="text-xl font-semibold text-white no-underline"
        >
          <div className="flex items-center gap-4">
            <Image src={Icon} alt={"icon"} className="w-8 h-8" />
            Movie Match
          </div>
        </Link>
        <label
          htmlFor="navToggle"
          className="select-none cursor-pointer inline md:hidden"
        >
          <div className="h-5 w-6 relative">
            <div className="h-0.5 w-6 bg-white transition-all absolute top-0" />
            <div className="h-0.5 w-6 bg-white transition-all absolute translate-y-[-50%] top-1/2" />
            <div className="h-0.5 w-6 bg-white transition-all absolute bottom-0" />
          </div>
        </label>
      </div>
      <ul
        className={`${styles.menu} h-0 md:h-auto flex flex-col md:flex-row gap-x-6 transition-all overflow-hidden`}
      >
        <li className={styles.page}>
          <Link href="/about" className="text-white no-underline">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
