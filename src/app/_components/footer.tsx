import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="border-neutral-200 dark:border-neutral-800 py-4">
      <Container>
            <a
              target="_blank"
              href={`https://github.com/superfly9/superfly9.io`}
              className="border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600 
              dark:text-white dark:border-gray-500 dark:hover:border-white "
            >
              Source
            </a>
      </Container>
    </footer>
  );
}

export default Footer;
