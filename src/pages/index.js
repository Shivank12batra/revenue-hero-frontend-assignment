import NavBar from "@/components/NavBar";
import Dashboard from "@/components/Dashboard";
import { generateRandomDataArray } from "@/randomData";

export default function Home() {
  return (
    <div>
      <NavBar/>
      <Dashboard/>
    </div>
  );
}

// export async function getStaticProps() {
//   // Fetch data from the separate API route
//   // const response = await fetch(process.env.NEXT_PUBLIC_API_KEY);
//   // const data = await response.json();
//   const data = generateRandomDataArray(25);
//   return {
//     props: {
//       data,
//     },
//   };
// }