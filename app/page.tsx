"use client"

import Navbar from "@/components/nav"
import dynamic from "next/dynamic"
import { useState } from "react"
const Component = dynamic(() => import("@/app/file/file"), { ssr: false })

export default function Page() {

  const [props, setProps] = useState({
    name: "",
    age: ""
  })
  const [isTrue, setIsTrue] = useState(false)


  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col space-y-2 text-2xl">
      <Navbar />
      {!isTrue && <form className="flex flex-col space-y-3">
        <input type="text"
          placeholder="Name"
          className="rounded-xl p-2 border"
          value={props.name}
          onChange={(e) => setProps({ ...props, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          className="rounded-xl p-2 border"
          value={props.age}
          onChange={(e) => setProps({ ...props, age: e.target.value })} />
        <button type="submit" className="rounded-md p-3 bg-sky-500 text-white" onClick={() => setIsTrue(true)}>Submit</button>
      </form>}
      {/* <button className="rounded-md p-3 bg-sky-500 text-white" onClick={() => window.location.href = "/file"}>Submit</button> */}
      {isTrue && <Component props={props} />}
    </div>
  )
}