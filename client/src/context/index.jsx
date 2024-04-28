import { createContext, useState } from "react";

export const GlobalContext = createContext(null);
export default function GlobalState({ children }) {
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
  });

  const [blogList, setBlogList] = useState([]);
  const [pending, setPending] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        blogList,
        setBlogList,
        pending,
        setPending,
        formdata,
        setFormData,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
