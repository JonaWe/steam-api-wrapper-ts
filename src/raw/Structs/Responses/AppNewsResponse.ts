import AppNewsItem from '../AppNewsItem';

export default interface AppNewsResponse {
  appnews: {
    appid: number;
    newsitems: AppNewsItem[];
    count: number;
  };
}
