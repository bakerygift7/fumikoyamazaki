import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  label?: string;
}

export interface UltraCCardData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  highlight?: boolean;
}

export interface MythicLogData {
  id: string;
  author: string;
  title: string;
  description: string;
  url: string;
  image: string;
  date?: string;
  category?: string;
  videoUrl?: string;
  audioUrl?: string;
}

export interface PortfolioProjectData {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

export async function getMythicLogs() {
  const logsDirectory = path.join(contentDirectory, "logs");
  if (!fs.existsSync(logsDirectory)) return [];
  
  const fileNames = fs.readdirSync(logsDirectory);
  const allLogsData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(logsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as Omit<MythicLogData, "id">),
    };
  }));

  return allLogsData.sort((a, b) => ((a.date || "") < (b.date || "") ? 1 : -1));
}

export async function getMythicLogData(id: string) {
  const fullPath = path.join(contentDirectory, `logs/${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as Omit<MythicLogData, "id">),
  };
}

export async function getPostData(fileName: string) {
  const fullPath = path.join(contentDirectory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...(matterResult.data as {
      title: string;
      subtitle: string;
      slogan: string;
      heroDescription: string;
      srsDefinition: string;
      ultraCIntroTitle: string;
      ultraCIntroSubtitle: string;
      ultraCIntroMain: string;
      ultraCMainTitle: string;
      ultraCMainDescription: string;
      ultraCOutroTitle: string;
      ultraCOutroDescription: string;
      architectsTitle: string;
      architectsDescription: string;
      ruiProfile: string;
      kanakoProfile: string;
      combatPower: string;
      status: string;
      architectName: string;
      noteUrl: string;
      noteRuiUrl: string;
      noteKanakoUrl: string;
      noteRuiText: string;
      noteKanakoText: string;
      servicesLabel: string;
      servicesTitle: string;
      services: ServiceData[];
      ultraCCards: UltraCCardData[];
      mythicLogsLabel: string;
      mythicLogsTitle: string;
      mythicLogs: MythicLogData[];
      portfolioLabel: string;
      portfolioTitle: string;
      portfolioProjects: PortfolioProjectData[];
      companyName?: string;
      representatives?: string;
      establishment?: string;
      location?: string;
      capital?: string;
      contact?: string;
      businessContent?: string[];
      history?: { year: string; event: string }[];
    }),
  };
}
