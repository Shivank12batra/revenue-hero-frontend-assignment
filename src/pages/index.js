import Image from 'next/image'

export default function Home({data}) {
  return (
    <div>
      {console.log(JSON.stringify(data))}
      <h1>Random Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <h1>{item.name}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from the separate API route
  const response = await fetch('http://localhost:3000/api/hello');
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}