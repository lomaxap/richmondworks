import { getContent, getPageBySlug } from "@/api/getPage";
import { DateTag, PageTitle } from "@/components/Block";
import Blocks from "@/components/Blocks";
import { Block, Page } from "@/types";
import Image from "next/image";

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const content = await getContent();

  return content.root.data.map((page: Page) => ({
    slug: page.properties.slug.rich_text[0].plain_text,
  }));
}

export default async function Page(props: Props) {
  const page: Page = await getPageBySlug("root", props.params.slug)

  return (
    <>
      <main className="max-w-2xl lg:max-w-3xl mx-auto lg:mx-0 flex flex-col gap-y-2">
        <div className="relative h-64 lg:h-96 w-full overflow-hidden mb-8 clipped-image">
          <Image className="object-cover" fill alt="" src={page.cover[page.cover.type].url} />
        </div>
        <PageTitle title={page.properties.Page.title} />
        <DateTag date={page.properties.published_date} />
        <div className="prose lg:prose-lg mt-8">
          <Blocks blocks={page.blocks as Block[]} />
        </div>
      </main>
    </>
  )
}
