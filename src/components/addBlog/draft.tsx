import React from "react";
import styles from "@/styles/draft.module.css";
interface Props {
  content: string;
}

export default function Draft(props: Props) {
  const { content } = props;

  return (
    <>
      <div className={styles['draft-preview']}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
}
