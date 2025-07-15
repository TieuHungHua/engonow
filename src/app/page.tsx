import Image from "next/image";
import IELTSReadingPage from "./components/ielts-json";

export default function Home() {
  return (
    <div className="font-sans w-full h-full">
        <IELTSReadingPage />
    </div>
  );
}
