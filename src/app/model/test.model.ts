
// SubjTopic interface
export interface SubjTopicResponse {
  Products: SubjTopic[];
}


export interface SubjTopic {
  topics: string;
  subject_name: string;
  id: number;
}
