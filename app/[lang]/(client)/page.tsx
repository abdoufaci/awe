import { getDictionary } from "../dictionaries";

export default async function Home({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <main>home</main>;
}
