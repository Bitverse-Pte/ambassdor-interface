import Home from "./home";
import {Toaster} from 'react-hot-toast'
import useBindWindowAction from "@/hooks/useBindWindowAction";

export default function HomePage() {
  useBindWindowAction()

  return (
   <>
    <Toaster/>
    <Home />
    </>
  );
}
