import NavBar from "@/components/NavBar";
import Dashboard from "@/components/Dashboard";

export default function Home({data}) {
  console.log(data)
  return (
    <div>
      <NavBar/>
      <Dashboard data={data}/>
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