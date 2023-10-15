import NavBar from "@/components/NavBar";
import Dashboard from "@/components/Dashboard";
import { generateRandomDataArray } from "@/utils/randomData";

export default function Home({data}) {
  return (
    <div>
      <NavBar/>
      <Dashboard data={data}/>
    </div>
  );
}

export async function getServerSideProps() {
  const data = generateRandomDataArray(25);
  return {
    props: {
      data,
    },
  };
}