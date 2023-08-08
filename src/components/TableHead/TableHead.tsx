type Props ={
  headers: string[];
};

export const TableHead: React.FC<Props> = ({
  headers,
}) => {
  return (
    <thead className="bg-gray-100">
      <tr>
      {headers.map((header) => (
        <th
          key={header}
          className="py-2 px-4 font-medium text-left border"
        >
          {header}
        </th>
      ))}
      </tr>
    </thead>
  );
};
