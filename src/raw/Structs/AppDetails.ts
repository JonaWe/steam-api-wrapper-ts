export default interface AppDetails {
  type: 'game' | 'dlc' | 'demo' | 'music';
  name: string;
  steam_appid: number;
  required_age: string;
  is_free: boolean;
  controller_support?: string;
  dlc?: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  fullgame?: FullGame;
  supported_languages: string;
  reviews?: string;
  header_image: string;
  website?: string;
  pc_requirements?: Requirements;
  mac_requirements?: Requirements;
  linux_requirements?: Requirements;
  legal_notice?: string;
  developers?: string[];
  publishers: string | 'N/A'[];
  demos?: Demo[];
  price_overview?: PriceOverview;
  packages?: number[]; //TODO are those appids
  package_groups: PackageGroup[];
  platforms: Platforms;
  metacritic?: MetaCritic;
  categories?: Category[];
  genres?: Genre[];
  screenshots?: Screenshot[];
  movies?: Movie[];
  recommendations?: Recommendations;
  achievements?: Achievements;
  release_date: ReleaseDate;
  support_info: SupportInfo;
  background: string;
  content_descriptors: ContentDescriptors;
}

interface Requirements {
  minimum?: string;
  recommended?: string;
}

interface PriceOverview {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
}

interface PackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: Package[];
}

interface Package {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
}

interface Platforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

interface MetaCritic {
  score: number;
  url: string;
}

interface Category {
  id: number;
  description: string;
}

interface Genre {
  id: string;
  description: string;
}

interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  webm: MovieSource;
  mp4: MovieSource;
  highlight: boolean;
}

interface MovieSource {
  480: string;
  max: string;
}

interface Recommendations {
  total: number;
}

interface Achievements {
  total: number;
  highlighted: Achievement[];
}

interface Achievement {
  name: string;
  path: string;
}

interface ReleaseDate {
  coming_soon: boolean;
  date: string;
}

interface SupportInfo {
  url: string;
  email: string;
}

interface ContentDescriptors {
  ids: number[];
  notes?: string;
}

interface Demo {
  appid: number;
  description: string;
}

interface FullGame {
  appid: number;
  name: string;
}
