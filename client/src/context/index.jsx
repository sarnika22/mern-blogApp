import { createContext, useState } from "react";

export const GlobalContext = createContext(null);
export default function GlobalState({ children }) {

  const [formdata, setFormData] = useState({
    title: "",
    description : ""
  })

  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
}
