import getPageBlocks from "./getPageBlocks";
import notion from "./notion";

export const getPageBySlug = async (type: string, slug: string) => {
  const content = await getContent();

  const page = content[type].bySlug(slug);
  if (!page) return;

  const blocks = await getPageBlocks(page.id);

  return {
    ...page,
    blocks
  }
}

export async function getPageById(pageId: string) {
  if (pageId.length < 36) return null;

  const page = await notion.pages.retrieve({
    page_id: pageId,
  });

  const blocks = await getPageBlocks(page.id);

  return { ...page, blocks };

}

export async function getDatabaseById(pageId: string) {
  if (pageId.length < 36) return null;

  const page = await notion.databases.retrieve({
    database_id: pageId,
  });

  const blocks = await getPageBlocks(page.id);
  return { ...page, blocks };

}

const types = [
  ["root", "d49c4f64fc6e4f5eb19bad28a1ff62f4", "d49c4f64-fc6e-4f5e-b19b-ad28a1ff62f4"],
];

export async function getContent() {
  const final: Record<string, any> = {};
  for (const type of types) {
    const [name, dbId, pageId] = type;
    final[name] = {
      name,
      bySlug: function (slug: string) {
        return this.data?.find((r: any) => {
          return r.properties.slug.rich_text[0].plain_text === slug;
        });
      },
      data: (await queryDb(dbId,
        { property: "published", checkbox: { equals: true } },
        [{ property: "published_date", direction: "descending" }],
      ))?.results
    }
  }

  return final;
}

export async function queryDb<T>(
  table: string,
  filter?: {},
  sorts?: { property: string; direction: string }[],
  page_size?: number,
  start_cursor?: string
): Promise<{
  results: T[];
  hasMore: boolean | undefined;
  nextCursor: string | null | undefined;
}> {
  const database_id = table;

  let hasNext = true;
  let res;
  let results: T[] = [];

  while (hasNext) {
    res = await notion.databases.query({
      database_id,
      // @ts-ignore
      filter,
      // @ts-ignore
      sorts,
      start_cursor,
      page_size,
    });

    if (page_size && page_size > 100) {
      hasNext = res.has_more;
    } else {
      hasNext = false;
    }

    // @ts-ignore
    results = results.concat(res.results);
  }

  return {
    // @ts-ignore
    results,
    hasMore: res?.has_more,
    nextCursor: res?.next_cursor,
  };
}
