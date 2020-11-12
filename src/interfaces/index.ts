import { ReactNode, ButtonHTMLAttributes } from 'react'

export interface Cache {
  [key: string]: any;
}

export interface TitleProps {
  children: ReactNode;
}

export interface LogoProps {
  size?: 'small' | 'normal' | 'large' | 'xlarge' | '2xlarge';
  className?: string
  href?: string;
  as?: string;
  [x: string]: any;
}

export interface UIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant: 'red' | 'black' | 'blue',
  glow?: boolean,
  fullWidth?: boolean,
  href?: string,
  as?: string,
  [x: string]: any
}

export interface LoginTwitterProfile {
  id: number,
  id_str: string,
  name?: string,
  screen_name: string,
  [x: string]: any
  // location?: string,
  // description?: string
  // url?: string | null,
  // entities: any, //------- fix (object)
  // protected: boolean,
  // followers_count: number,
  // friends_count: number,
  // listed_count: number,
  // created_at: string,
  // favourites_count: number,
  // utc_offset: any,
  // time_zone: any,
  // geo_enabled: boolean,
  // verified: boolean,
  // statuses_count: number,
  // lang: any,
  // status?: {
  //   created_at: string,
  //   id: number,
  //   id_str: string,
  //   text: string,
  //   truncated: boolean,
  //   entities: any, //------- fix (object)
  //   source: string,
  //   in_reply_to_status_id: number,
  //   in_reply_to_status_id_str: string,
  //   in_reply_to_user_id: number,
  //   in_reply_to_user_id_str: string,
  //   in_reply_to_screen_name: string,
  //   geo: any,
  //   coordinates: any,
  //   place: any,
  //   contributors: any,
  //   is_quote_status: boolean,
  //   retweet_count: number,
  //   favorite_count: number,
  //   favorited: boolean,
  //   retweeted: boolean,
  //   lang: string
  // },
  // contributors_enabled: boolean,
  // is_translator: boolean,
  // is_translation_enabled: boolean,
  // profile_background_color: string,
  // profile_background_image_url: string,
  // profile_background_image_url_https: string,
  // profile_background_tile: boolean,
  // profile_image_url: string,
  // profile_image_url_https: string,
  // profile_banner_url: string,
  // profile_link_color: string,
  // profile_sidebar_border_color: string,
  // profile_sidebar_fill_color: string,
  // profile_text_color: string,
  // profile_use_background_image: boolean,
  // has_extended_profile: boolean,
  // default_profile: boolean,
  // default_profile_image: boolean,
  // following: boolean,
  // follow_request_sent: boolean,
  // notifications: boolean,
  // translator_type: string,
  // suspended: boolean,
  // needs_phone_verification: boolean,
  // email: string
}

export interface LoginAccount {
  provider: string,
  type: string,
  id: string,
  refreshToken: string,
  accessToken: string,
  accessTokenExpires: any
}

export interface LoginUser {
  id?: number,
  compoundId?: string,
  userId?: number,
  name?: string,
  email?: string,
  image?: string
  providerType?: string,
  providerId?: string,
  providerAccountId?: string,
  refreshToken?: string,
  accessToken?: string,
  accessTokenExpires?: any,
  createdAt?: any,
  updatedAt?: any
}