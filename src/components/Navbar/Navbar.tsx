import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const links = [
    {
      id: 1,
      channels: "/",
      name: "Home",
    },
    {
      id: 2,
      channels: "/channels",
      name: "Channels",
    },
    {
      id: 3,
      channels: "/schedules",
      name: "Schedules",
    },
  ];

  return (
    <header className="navbar">
      {links.map((link) => (
        <Link key={link.id} to={link.channels}>
          {link.name}
        </Link>
      ))}
    </header>
  );
};
