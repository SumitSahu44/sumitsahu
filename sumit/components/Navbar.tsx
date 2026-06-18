export default function Navbar() {
  return (
    <nav className="flex justify-between p-6">
      <div>Dharmraj</div>

      <div className="flex gap-6">
        <a href="/about">About</a>
        <a href="/projects">Projects</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}