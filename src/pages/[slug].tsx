import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <div>
      <h1>Page : {router.query.slug}</h1>
      <div>
        <button
          type="button"
          onClick={() =>
            router.push({ pathname: "/[slug]", query: { slug: "push" } })
          }
        >
          PUSH
        </button>
      </div>
      <div>
        <Link href="/hello">HELLO</Link>
        <Link href="/bye">BYE</Link>
      </div>
    </div>
  );
}
