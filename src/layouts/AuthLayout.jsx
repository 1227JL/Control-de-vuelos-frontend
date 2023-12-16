import React from "react";
import { Outlet } from "react-router-dom";
import LoaderPage from "../components/LoaderPage";
import useAuth from "../hooks/useAuth";

export default function AuthLayout() {
  const {loading} = useAuth()
  if(loading) return <LoaderPage/>
  return (
    <div className="flex items-center bg-white h-screen overflow-y-hidden">
      <main className="mx-10 sm:mx-auto sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <Outlet />
      </main>
    </div>
  );
}
