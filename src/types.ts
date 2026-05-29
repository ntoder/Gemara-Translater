export interface Sage {
  nameEn: string;
  nameHe: string;
  role: string; // e.g. Tanna, Amora, etc.
  descriptionEn: string;
  descriptionHe: string;
}

export interface Keyword {
  term: string; // The Aramaic/Hebrew term
  meaningEn: string;
  meaningHe: string;
  functionEn: string; // rhetorical function/role
  functionHe: string;
}

export interface DiscussionStep {
  stepNumber: number;
  stageEn: string; // e.g. Statement, Objection, Proof
  stageHe: string;
  detailsEn: string;
  detailsHe: string;
}

export interface LineAnalysis {
  original: string;
  translationEn: string;
  translationHe: string;
  commentaryEn: string;
  commentaryHe: string;
  talmudicType?: string;
}

export interface LegalPrinciple {
  conceptEn: string;
  conceptHe: string;
  applicationEn: string;
  applicationHe: string;
}

export interface TalmudAnalysis {
  title: string;
  tractate: string;
  category: string;
  sages: Sage[];
  keywords: Keyword[];
  discussionFlow: DiscussionStep[];
  lineByLine: LineAnalysis[];
  overallExplanationEn: string;
  overallExplanationHe: string;
  legalPrinciples: LegalPrinciple[];
}

export interface SavedAnalysis {
  id: string;
  originalText: string;
  timestamp: string;
  analysis: TalmudAnalysis;
}
