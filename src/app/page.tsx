import { getContent } from "@/api/getPage";
import { ArticleBlock } from "@/components/ArticleBlock";
import Blocks from "@/components/Blocks";
import { Page } from "@/types";

export default async function Home() {
  const content = await getContent();
  if (!content?.root) return;

  return (
    <main className="max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
      {content.root.data.map((page: Page, i: number) => (
        <ArticleBlock key={i} page={page} />
      ))}
    </main>
  )
}
