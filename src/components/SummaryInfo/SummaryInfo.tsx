import React from "react";
import { Info } from "../../types/Info";

type Props = {
  info: Info;
};

export const SummaryInfo: React.FC<Props> = React.memo(({
  info,
}) => {
  const {
    category,
    activeCount,
    archivedCount,
  } = info;
  return (
    <>
      <td>{category}</td>
      <td>{activeCount}</td>
      <td>{archivedCount}</td>
    </>
  );
});
