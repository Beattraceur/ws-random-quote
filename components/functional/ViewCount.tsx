//Fuctional react component that fetches the number of views for a given path
import React, { useEffect, useState } from 'react';

export default function ViewCount({ path }: { path: string }) {
  //State to hold the number of views
  const [views, setViews] = useState<number | null>(null);
  //Async API calls inside useEffect scope to prevent unnecessary re-fetchings
  useEffect(() => {
    const fetchViewCount = async () => {
      //Fetch inside a try-catch block
      try {
        //Fetching by calling the API route with the path as a query parameter
        const response = await fetch(
          `/api/view-count?path=${encodeURIComponent(path)}`
        );
        //Parsing the response as JSON
        const data = await response.json();
        //Store the number of views in the state
        setViews(data.views);
      } catch (error: any) {
        console.error('Failed to fetch view count:', error);
      }
    };

    fetchViewCount();
    //Call the fetch function on page load and every time the path changes
  }, [path]);
  //Display Loading as long as the state is null
  if (views === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>
        {/*Display the number of views with the corresponding path*/}
        {views} views in total on path: {path}
      </p>
    </div>
  );
}
