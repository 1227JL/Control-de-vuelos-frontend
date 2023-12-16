import useAuth from "../hooks/useAuth";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function Header() {
  const { auth, cerrarSesionAuth } = useAuth();

  const { username, email, rol } = auth;

  return (
    <div className="flex text-white justify-between gap-5 items-center px-8 py-5">
      <h1 className="text-text-100 m-0 font-black text-2xl md:text-4xl">
        Panel Administrativo
      </h1>
      <div className="flex justify-between items-center gap-4">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <div className="flex flex-col">
              <p>{username}</p>
              <small>{email}</small>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={cerrarSesionAuth}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
