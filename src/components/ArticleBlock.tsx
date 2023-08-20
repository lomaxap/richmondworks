import { Page } from "@/types";
import { DateTag, RichTexts } from "./Block";
import Link from "next/link";
import Image from "next/image";

export const ArticleBlock = (props: { page: Page }) => {
    return (
        <div className="mx-auto border-b-2 border-gray-200 pb-8 mb-8">
            <Link href={props.page.properties.slug.rich_text[0].plain_text} className="flex gap-x-8">
                <div className="h-48 w-48 basis-1/3 overflow-hidden relative clipped-image">
                    <Image fill className="object-cover" src={props.page.cover[props.page.cover.type].url} alt="" />
                </div>
                <div className="flex flex-col gap-y-1 basis-2/3">
                    <div className="text-2xl font-semibold mt-2"><RichTexts rich_text={props.page.properties.Page.title}></RichTexts></div>
                    <div className="text-lg font-light"><RichTexts rich_text={props.page.properties.description.rich_text}></RichTexts></div>
                    <DateTag date={props.page.properties.published_date} />
                </div>
            </Link>
        </div>
    );
};