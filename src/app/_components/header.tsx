import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-xl md:text-3xl font-bold mb-20 mt-8 flex items-center">
      <Link href="/" className="hover:underline">
        홈
      </Link>
    </h2>
  );
};

export default Header;
