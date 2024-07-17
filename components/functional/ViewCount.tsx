import React, { useEffect, useState } from 'react';

interface ViewCountProps {
  path: string;
}

const ViewCount: React.FC<ViewCountProps> = ({ path }) => {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await fetch(
          `/api/view-count?path=${encodeURIComponent(path)}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        }
        const data = await response.json();
        setViews(data.views);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchViewCount();
  }, [path]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (views === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Path: {path}</p>
      <p>Views: {views}</p>
    </div>
  );
};

export default ViewCount;
