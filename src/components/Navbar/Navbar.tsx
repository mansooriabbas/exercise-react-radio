import "./Navbar.css";

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
  ];

  return (
    <header className="navbar">
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.channels}>{link.name}</a>
        </li>
      ))}
    </header>
  );
};
