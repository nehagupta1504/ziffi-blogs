import React from "react";
import styles from "@/styles/draft.module.css";
interface Props {
  content: string;
}

export default function Draft(props: Readonly<Props>) {
  const { content } = props;

  return (
    <div className={styles["draft-preview"]}>
      <div className={styles["draft__container-wrapper"]}>
        <div className={styles["draft__container"]} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
