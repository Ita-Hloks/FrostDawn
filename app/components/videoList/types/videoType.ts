// eslint-disable-next-line unused-imports/no-unused-vars
type VideoData = {
  comment: number;
  typeid?: number;
  play: number;
  pic: string;
  subtitle?: string;
  description?: string;
  copyright?: string;
  title: string;
  review?: number;
  author: string;
  mid: number;
  created: number;
  length: string;
  video_review?: number;
  aid: number;
  bvid?: string;
  hide_click?: boolean;
  is_pay?: number;
  meta?: VideoMeta;
  season_id?: number;
};

// 视频数据类型定义
type VideoMeta = {
  id: number;
  title: string;
  cover: string;
  mid: number;
  intro: string;
  sign_state: number;
  attribute: number;
  ep_count: number;
  first_aid: number;
  ptime: number;
  ep_num: number;
};
