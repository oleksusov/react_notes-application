type Props ={
  headers: string[];
};

export const TableHead: React.FC<Props> = ({
  headers,
}) => {
  return (
    <thead>
      <tr>
      {headers.map((header) => (
        <th key={header}>
          <span className="is-flex is-flex-wrap-nowrap">
            {header}
          </span>
        </th>
      ))}
      </tr>
    </thead>
  );
};
