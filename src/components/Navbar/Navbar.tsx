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
    {
      id: 4,
      channels: "/categories",
      name: "Categories",
    },
    {
      id: 5,
      channels: "/searchpage",
      name: "Search",
    },
    {
      id: 6,
      channels: "/favorites",
      name: "Favorites",
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
