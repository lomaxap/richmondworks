type DBRow = {
  id: string;
  created_time: string;
  last_edited_time: string;

  icon: {
    emoji: string;
    type: string;
  };
};

type DBCol = {
  type: string;
  id: string;
};

type TitleCol = DBCol & {
  title: RichText[];
};

type RichTextCol = DBCol & {
  rich_text: RichText[];
};

type CheckboxCol = DBCol & {
  checkbox: boolean;
};

export type DateCol = DBCol & {
  date: {
    start: string;
    end: string;
    timezone: string;
  };
};

type NumberCol = DBCol & {
  number: number;
};

export type SelectCol = DBCol & {
  select: {
    id: string;
    name: string;
    color: string;
  };
};

type MultiSelectCol = DBCol & {
  multi_select: SelectCol["select"][];
};

type UrlCol = DBCol & {
  url: string;
};

export type PageCol = DBCol & {
  title: RichText[]
}

export type Page = DBRow & {
  cover: {
    type: "file" | "external";
    file: {
      url: string;
      expiry_time: string;
    };
    external: {
      url: string;
    }
  };
  properties: {
    Page: PageCol;
    Name: TitleCol;
    slug: RichTextCol;
    Tags: MultiSelectCol;
    tagline: RichTextCol;
    description: RichTextCol;
    published: CheckboxCol;
    published_date: DateCol;
  };
  Verification: {
    id: string;
    type: "verification";
    verification: {
      state: "unverified" | "verified";
      verified_by: any;
      date: string | null;
    }
  };
  blocks?: Block[]
}

export type RichText = {
  type: "text";
  text: {
    content: string;
    link: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string;
};

export type BlockTypes =
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "paragraph"
  | "column_list"
  | "quote"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "callout"
  | "column"
  | "image"
  | "child_database"
  | "link_to_page"

export type BlockDetails = {
  rich_text?: RichText[];
  text?: RichText[];
  icon?: {
    type: "emoji";
    emoji: string;
  };
  color: string;
  caption?: string[];
  type?: string;
  external?: {
    url: string;
  };
  file?: {
    url: string;
  };
  title?: string;
};

type BlockTypeDetails = {
  [key in BlockTypes]: BlockDetails;
};

export type Block = BlockTypeDetails & {
  object: "block";
  id: string;
  has_children: boolean;
  archived: boolean;
  type: BlockTypes;
  children?: Block[];
  list_items?: RichText[][];
  link_to_page?: {
    type: string;
    page_id: string;
    page: any;
  };
};
