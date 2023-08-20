import { getPageById, queryDb } from "@/api/getPage";
import {
  Block,
  RichText as RichTextType,
  BlockDetails,
  BlockTypes,
  Page,
  DateCol
} from "../types";

export const RichText = (props: RichTextType) => {
  const annotations = props.annotations;
  let content = <>{props.text.content}</>;

  if (annotations.bold) {
    content = <strong>{content}</strong>;
  }

  if (annotations.italic) {
    content = <em>{content}</em>;
  }

  if (annotations.underline) {
    content = <u>{content}</u>;
  }

  if (annotations.strikethrough) {
    content = <s>{content}</s>;
  }

  if (annotations.color !== "default") {
    content = <span style={{ color: annotations.color }}>{content}</span>;
  }

  if (props.href) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export const RichTexts = (props: { rich_text?: RichTextType[] }) => {
  return (
    <>
      {props.rich_text?.map((text, i) => (
        <RichText key={`rich-text-${i}`} {...text} />
      ))}
    </>
  );
};

export const DateTag = (props: { date: DateCol }) => {
  return <div className="font-light text-sm">{new Date(props.date.date.start).toLocaleString("en-US", {
    year: "numeric", month: "short", day: "numeric", timeZone: "utc"
  })}</div>;
}

export const ColumnList = (props: { blocks?: Block[] }) => {

  if (!props.blocks?.length) {
    return <></>
  }

  return (
    <div className="container-lg clearfix">
      <div className="col-md-6 float-md-left pr-md-2">
        <Column blocks={props.blocks[0].children} />
      </div>
      <div className="col-md-6 float-md-left pl-md-2">
        <Column blocks={props.blocks[1].children} />
      </div>
    </div>
  );
};

export const Column = (props: { blocks?: Block[] }) => {
  return (
    <>
      {props.blocks?.map((block, i) => (
        <BlockComponent key={`column-block-${block.id}`} block={block} />
      ))}
    </>
  );
};

export const Paragraph = (props: BlockDetails) => {
  return (
    <p>
      <RichTexts rich_text={props.rich_text} />
    </p>
  );
};

export const Heading1 = (props: BlockDetails) => {
  return (
    <h1 className="h1">
      <RichTexts rich_text={props.rich_text} />
    </h1>
  );
};

export const Heading2 = (props: BlockDetails) => {
  return (
    <h2 className="h2">
      <RichTexts rich_text={props.rich_text} />
    </h2>
  );
};

export const Heading3 = (props: BlockDetails) => {
  return (
    <h3 className="h3">
      <RichTexts rich_text={props.rich_text} />
    </h3>
  );
};

export const Callout = (props: BlockDetails) => {
  return (
    <div className="callout">
      <RichTexts rich_text={props.rich_text} />
    </div>
  );
};

export const Quote = (props: BlockDetails) => {
  return (
    <blockquote
      style={{ borderWidth: "3px !important" }}
      className="my-2 pl-4 border-left text-italic color-border-default"
    >
      <RichTexts rich_text={props.rich_text} />
    </blockquote>
  );
};

export const BulletedList = (props: { list_items: Block["list_items"] }) => {
  return (
    <ul className="m-3">
      {props.list_items?.map((item, i) => (
        <li
          key={`bulleted-list-${new Date().toString()}-${i}`}
          className="mb-2"
        >
          <RichTexts rich_text={item} />
        </li>
      ))}
    </ul>
  );
};

export const NumberedList = (props: { list_items: Block["list_items"] }) => {
  return (
    <ol className="m-3">
      {props.list_items?.map((item, i) => (
        <li
          key={`numbered-list-${new Date().toString()}-${i}`}
          className="mb-2"
        >
          <RichTexts rich_text={item} />
        </li>
      ))}
    </ol>
  );
};

export const Image = (props: BlockDetails) => {
  return (
    <img
      style={{ maxWidth: "100%", maxHeight: "75vh" }}
      src={props.file?.url || props.external?.url}
    />
  );
};


export const ChildDatabase = async (props: { block_id: string }) => {
  // const { results } = await queryDb(
  //   props.block_id,
  //   undefined,
  // );


  return <></>;
};

export const Graphic = async (props: { link_to_page: Block["link_to_page"] }) => {
  return <a href={props.link_to_page.page.properties.src.rich_text[0].plain_text}>{props.link_to_page.page.properties.Page.title[0].plain_text}</a>
}

export const PageTitle = async (props: { title: Page["properties"]["Page"]["title"] }) => {
  return <div className="prose lg:prose-lg"><h1>{props.title[0].text.content}</h1></div>
}

const ComponentBlockTypeMap = {
  numbered_list_item: NumberedList,
  bulleted_list_item: BulletedList,
  paragraph: Paragraph,
  callout: Callout,
  heading_1: Heading1,
  heading_2: Heading2,
  heading_3: Heading3,
  column_list: ColumnList,
  quote: Quote,
  column: Column,
  image: Image,
  child_database: ChildDatabase,
  link_to_page: Graphic,
};

export default function BlockComponent(props: { block: Block }) {
  const { block } = props;
  const Component = ComponentBlockTypeMap[props.block.type];

  if (!Component) {
    return <></>;
  }

  return (
    <Component
      {...block[block.type]}
      block_id={block.id}
      list_items={block.list_items}
      blocks={block.children}
      link_to_page={block.link_to_page}
    />
  );
}
